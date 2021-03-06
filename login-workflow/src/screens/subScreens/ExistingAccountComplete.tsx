import React from 'react';
import { useLanguageLocale } from '@pxblue/react-auth-shared';
import { useTheme } from '@material-ui/core';
import { FinishState } from '../../components';
import Person from '@material-ui/icons/Person';

/**
 * Component that renders a screen displaying success for creating an account for
 * a user that already exists.
 *
 * @category Component
 */
export const ExistingAccountComplete: React.FC = () => {
    const { t } = useLanguageLocale();
    const theme = useTheme();

    return (
        <FinishState
            icon={<Person color={'primary'} style={{ fontSize: 100, marginBottom: theme.spacing(2) }} />}
            title={t('pxb:MESSAGES.WELCOME')}
            description={t('pxb:REGISTRATION.SUCCESS_EXISTING')}
        />
    );
};
