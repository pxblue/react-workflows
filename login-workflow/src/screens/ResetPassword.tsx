import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import {
    useLanguageLocale,
    useAccountUIState,
    useAccountUIActions,
    AccountActions,
    useInjectedUIContext,
} from '@pxblue/react-auth-shared';
import { useQueryString } from '../hooks/useQueryString';
import { useRoutes } from '../contexts/RoutingContext';
import { useHistory } from 'react-router-dom';
import { CardHeader, Typography, CardContent, Divider, CardActions, Grid, Button, useTheme } from '@material-ui/core';
import { BrandedCardContainer, SecureTextField, PasswordRequirements, SimpleDialog, FinishState } from '../components';
import { defaultPasswordRequirements } from '../constants';
import { CheckCircle, Error } from '@material-ui/icons';

/**
 * Renders a screen stack which handles the reset password flow (deep link from email).
 *
 * @category Component
 */
export const ResetPassword: React.FC = () => {
    const { t } = useLanguageLocale();
    const history = useHistory();
    const { routes } = useRoutes();
    const theme = useTheme();
    const accountUIState = useAccountUIState();
    const accountUIActions = useAccountUIActions();
    const { code, email } = useQueryString();

    // Local State
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    // Network state (verifyResetCode)
    const verifyResetCodeTransit = accountUIState.setPassword.verifyResetCodeTransit;
    const verifyIsInTransit = verifyResetCodeTransit.transitInProgress;
    const validationTransitErrorMessage = verifyResetCodeTransit.transitErrorMessage;
    const verifySuccess = verifyResetCodeTransit.transitSuccess;
    const verifyComplete = verifyResetCodeTransit.transitComplete;

    // Network state (setPassword)
    const setPasswordTransit = accountUIState.setPassword.setPasswordTransit;
    const setPasswordTransitSuccess = setPasswordTransit.transitSuccess;
    const setPasswordIsInTransit = setPasswordTransit.transitInProgress;
    const setPasswordHasTransitError = setPasswordTransit.transitErrorMessage !== null;
    const setPasswordTransitErrorMessage = setPasswordTransit.transitErrorMessage;

    // Reset state on dismissal
    useEffect(
        () => (): void => {
            accountUIActions.dispatch(AccountActions.setPasswordReset());
            accountUIActions.dispatch(AccountActions.verifyResetCodeReset());
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    useEffect(() => {
        if (!verifyIsInTransit && !verifyComplete && code.length > 0) {
            void accountUIActions.actions.verifyResetCode(code, email);
        }
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [verifyIsInTransit, code, email, verifyComplete, accountUIActions.actions]);

    const { passwordRequirements = defaultPasswordRequirements(t) } = useInjectedUIContext();

    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordRequirements, passwordInput, confirmInput]);

    const resetPassword = useCallback(
        (password: string): void => {
            void accountUIActions.actions.setPassword(code, password, email);
        },
        [accountUIActions, code, email]
    );

    const canContinue = useCallback(
        (): boolean => areValidMatchingPasswords() && !setPasswordTransit.transitInProgress,
        [areValidMatchingPasswords, setPasswordTransit]
    );
    const onContinue = useCallback(() => {
        if (setPasswordTransitSuccess) {
            history.push(routes.LOGIN);
        } else {
            resetPassword(passwordInput);
        }
    }, [resetPassword, setPasswordTransitSuccess, passwordInput, history, routes]);

    const getBody = useCallback(
        () =>
            verifySuccess && !verifyIsInTransit ? (
                setPasswordTransitSuccess ? (
                    <FinishState
                        icon={
                            <CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />
                        }
                        title={t('PASSWORD_RESET.SUCCESS_MESSAGE')}
                        description={t('CHANGE_PASSWORD.SUCCESS_MESSAGE')}
                    />
                ) : (
                    <>
                        <Typography>{t('CHANGE_PASSWORD.PASSWORD_INFO')}</Typography>

                        <Divider style={{ margin: `${theme.spacing(4)}px 0px` }} />

                        <SecureTextField
                            id="password"
                            name="password"
                            label={t('FORMS.PASSWORD')}
                            value={passwordInput}
                            onChange={(evt: ChangeEvent<HTMLInputElement>): void => setPasswordInput(evt.target.value)}
                        />
                        <PasswordRequirements style={{ marginTop: theme.spacing(2) }} passwordText={passwordInput} />
                        <SecureTextField
                            id="confirm"
                            name="confirm"
                            label={t('FORMS.CONFIRM_PASSWORD')}
                            style={{ marginTop: theme.spacing(2) }}
                            value={confirmInput}
                            onChange={(evt: ChangeEvent<HTMLInputElement>): void => setConfirmInput(evt.target.value)}
                        />
                    </>
                )
            ) : !verifyComplete ? (
                <></>
            ) : (
                <FinishState
                    icon={<Error color={'error'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
                    title={t('MESSAGES.FAILURE')}
                    description={validationTransitErrorMessage}
                />
            ),
        [
            t,
            theme,
            passwordInput,
            setPasswordInput,
            confirmInput,
            setConfirmInput,
            verifySuccess,
            verifyIsInTransit,
            verifyComplete,
            validationTransitErrorMessage,
            setPasswordTransitSuccess,
        ]
    );

    const errorDialog = (
        <SimpleDialog
            title={t('MESSAGES.ERROR')}
            body={t(setPasswordTransitErrorMessage ?? '')}
            open={setPasswordHasTransitError && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    return (
        <BrandedCardContainer loading={verifyIsInTransit || setPasswordIsInTransit}>
            {errorDialog}
            <CardHeader
                title={
                    <Typography variant={'h6'} style={{ fontWeight: 600 }}>
                        {t('FORMS.RESET_PASSWORD')}
                    </Typography>
                }
            />
            <CardContent style={{ flex: '1 1 0px', overflow: 'auto' }}>{getBody()}</CardContent>
            <Divider />
            <CardActions style={{ padding: theme.spacing(2) }}>
                <Grid container direction="row" alignItems="center" justify="space-between" style={{ width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled={setPasswordTransitSuccess}
                        onClick={(): void => history.push(routes.LOGIN)}
                        style={{ width: 100 }}
                    >
                        {t('ACTIONS.BACK')}
                    </Button>
                    {verifySuccess && (
                        <Button
                            variant="contained"
                            disabled={!canContinue()}
                            color="primary"
                            onClick={onContinue}
                            style={{ width: 100 }}
                        >
                            {setPasswordTransitSuccess ? t('ACTIONS.DONE') : t('ACTIONS.OKAY')}
                        </Button>
                    )}
                </Grid>
            </CardActions>
        </BrandedCardContainer>
    );
};
