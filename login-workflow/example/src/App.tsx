import React from 'react';

// import { createStackNavigator } from '@react-navigation/stack';
import { ExampleHome } from './screens/ExampleHome';

import {
    SecurityContextProvider,
    AuthNavigationContainer,
    AuthUIContextProvider,
    useSecurityActions,
} from '@pxblue/react-auth-workflow';
import { ProjectAuthUIActions } from './actions/AuthUIActions';
import { ProjectRegistrationUIActions } from './actions/RegistrationUIActions';

// import { useLinking } from '@react-navigation/native';
// import { authLinkMapping, resolveInitialState } from './src/navigation/DeepLinking';

// import { Provider as ThemeProvider } from 'react-native-paper';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import * as PXBThemes from '@pxblue/react-themes';
import { CssBaseline } from '@material-ui/core';
import { routes } from './navigation/Routing';

// const Stack = createStackNavigator();

export const AuthUIConfiguration: React.FC = (props) => {
    const securityContextActions = useSecurityActions();

    return (
        <AuthUIContextProvider
            authActions={ProjectAuthUIActions(securityContextActions)}
            registrationActions={ProjectRegistrationUIActions}
            showSelfRegistration={false}
            allowDebugMode={true}
            htmlEula={false}
            contactEmail={'something@email.com'}
            contactPhone={'1-800-123-4567'}
            projectImage={require('./assets/images/eaton_stacked_logo.png')}
        >
            {props.children}
        </AuthUIContextProvider>
    );
};

export const App: React.FC = () => (
    <ThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
        <CssBaseline />
        <SecurityContextProvider>
            <AuthUIConfiguration>
                <AuthNavigationContainer routeConfig={routes}>
                    <ExampleHome />
                </AuthNavigationContainer>
            </AuthUIConfiguration>
        </SecurityContextProvider>
    </ThemeProvider>
);
