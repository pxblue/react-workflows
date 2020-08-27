import React, { useState, useCallback, ChangeEvent } from 'react';
import {
    useSecurityState,
    useSecurityActions,
    useLanguageLocale,
    useAccountUIActions,
    initialTransitState,
    transitSuccess,
    transitStart,
    transitFailed,
    useInjectedUIContext,
    AccountActions,
} from '@pxblue/react-auth-shared';
import { Dialog, DialogTitle, DialogActions, DialogContent, Button, Grid, useTheme, Divider } from '@material-ui/core';
import { ChangePasswordForm } from './ChangePasswordForm';
import { SecureTextField } from '../SecureTextField';
import { SimpleDialog } from '../SimpleDialog';
import { FinishState } from '../FinishState';
import { CheckCircle } from '@material-ui/icons';
import { defaultPasswordRequirements } from '../../constants';
import { useDialogStyles } from '../../styles';

/**
 * Component that renders a change password form in a modal dialog. This dialog is automatically
 * shown and hidden based on the securityState context. It can be opened by calling
 * useSecurityActions().showChangePassword().
 *
 * @category Component
 */
export const ChangePasswordModal: React.FC = () => {
    const { t } = useLanguageLocale();
    const securityState = useSecurityState();
    const accountUIActions = useAccountUIActions();
    const securityHelper = useSecurityActions();
    const theme = useTheme();
    const sharedClasses = useDialogStyles();

    const [transitState, setTransitState] = useState(initialTransitState);
    const [hasAcknowledgedError, setHasAcknowledgedError] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPassword(fields.password);
            setConfirm(fields.confirm);
        },
        [setPassword, setConfirm]
    );

    const { passwordRequirements = defaultPasswordRequirements(t) } = useInjectedUIContext();

    const areValidMatchingPasswords = useCallback((): boolean => {
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(password)) return false;
        }
        return confirm === password;
    }, [passwordRequirements, password, confirm]);

    const changePassword = useCallback(async (): Promise<void> => {
        try {
            setHasAcknowledgedError(false);
            setTransitState(transitStart());
            await accountUIActions.actions.changePassword(currentPassword, password);
            setTransitState(transitSuccess());
        } catch (error) {
            setTransitState(transitFailed(error.errorMessage));
        }
    }, [accountUIActions, currentPassword, password]);

    // Dynamically change the body content based on successful change
    let body: JSX.Element;
    if (transitState.transitSuccess) {
        body = (
            <FinishState
                icon={<CheckCircle color={'primary'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
                title={t('CHANGE_PASSWORD.PASSWORD_CHANGED')}
                description={t('CHANGE_PASSWORD.SUCCESS_MESSAGE')}
            />
        );
    } else {
        body = (
            <ChangePasswordForm passwordLabel={t('LABELS.NEW_PASSWORD')} onPasswordChange={updateFields}>
                <SecureTextField
                    id="current-password"
                    label={t('LABELS.CURRENT_PASSWORD')}
                    value={currentPassword}
                    onChange={(evt: ChangeEvent<HTMLInputElement>): void => setCurrentPassword(evt.target.value)}
                />
            </ChangePasswordForm>
        );
    }

    const errorDialog = (
        <SimpleDialog
            title={t('MESSAGES.ERROR')}
            body={transitState.transitErrorMessage ?? ''}
            open={transitState.transitErrorMessage !== null && !hasAcknowledgedError}
            onClose={(): void => {
                setHasAcknowledgedError(true);
            }}
        />
    );

    const resetForm = useCallback(() => {
        setTransitState(initialTransitState);
        setCurrentPassword('');
        setPassword('');
        setConfirm('');
    }, [setTransitState, setCurrentPassword, setPassword, setConfirm]);

    return (
        <Dialog open={securityState.isShowingChangePassword} maxWidth={'xs'} onExited={resetForm}>
            {errorDialog}
            <DialogTitle className={sharedClasses.dialogTitle}>{t('CHANGE_PASSWORD.PASSWORD')}</DialogTitle>
            <DialogContent className={sharedClasses.dialogContent} style={{ flex: '1 1 auto' }}>
                {body}
            </DialogContent>
            <Divider style={{ marginTop: theme.spacing(2) }} />
            <DialogActions className={sharedClasses.dialogActions}>
                <Grid container direction="row" alignItems="center" justify="space-between" style={{ width: '100%' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={sharedClasses.dialogButton}
                        disabled={transitState.transitSuccess}
                        onClick={(): void => securityHelper.hideChangePassword()}
                    >
                        {t('ACTIONS.BACK')}
                    </Button>
                    <Button
                        variant="contained"
                        disableElevation
                        className={sharedClasses.dialogButton}
                        disabled={
                            transitState.transitInProgress ||
                            (!transitState.transitSuccess && (currentPassword === '' || !areValidMatchingPasswords()))
                        }
                        color="primary"
                        onClick={
                            transitState.transitSuccess
                                ? (): void => {
                                      accountUIActions.dispatch(AccountActions.logout());
                                      securityHelper.onUserNotAuthenticated();
                                  }
                                : changePassword
                        }
                    >
                        {transitState.transitSuccess ? t('ACTIONS.LOG_IN') : t('ACTIONS.OKAY')}
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};