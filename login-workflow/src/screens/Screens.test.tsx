import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AcceptEula } from './subScreens/AcceptEula';
import { AccountDetails } from './subScreens/AccountDetails';
import { CreateAccount } from './subScreens/CreateAccount';
import { CreatePassword } from './subScreens/CreatePassword';
import { ExistingAccountComplete } from './subScreens/ExistingAccountComplete';
import { RegistrationComplete } from './subScreens/RegistrationComplete';
import { VerifyEmail } from './subScreens/VerifyEmail';
import {
    // AccountUIActionContext,
    AuthUIContextProvider,
    // RegistrationActionContext,
    // RegistrationActionsCreator,
} from '@pxblue/react-auth-shared';
import { ContactSupport } from './ContactSupport';
import { ForgotPassword } from './ForgotPassword';
// import { InviteRegistrationPager } from './InviteRegistrationPager';
// import { BrowserRouter } from 'react-router-dom';
// import { RoutingContext } from '../contexts/RoutingContext';
// import { Login } from './Login';
// import { PreAuthContainer } from './PreAuthContainer';
// import { ResetPassword } from './ResetPassword';
// import { SelfRegistrationPager } from './SelfRegistrationPager';
import { Splash } from './Splash';
// import { RoutingContext } from '../contexts/RoutingContext';
// import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

// @TODO: register useLanguageLocale
// console.warn > react-i18next:: You will need to pass in an i18next instance by using initReactI18next

// jest.mock('@pxblue/react-auth-shared', () => ({
//     ...jest.requireActual('@pxblue/react-auth-shared'),
//     useLanguageLocale: jest.fn().mockReturnValue(() => {}),
// }));

// jest.mock('../assets/images/background.svg', () => 'https://picsum.photos/200');

describe('AcceptEula tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onEulaChanged = jest.fn();
        ReactDOM.render(
            <AcceptEula eulaAccepted={false} loadEula={(): void => {}} onEulaChanged={onEulaChanged} />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('AccountDetails tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onDetailsChanged = jest.fn();
        ReactDOM.render(<AccountDetails onDetailsChanged={onDetailsChanged} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('CreateAccount tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onEmailChanged = jest.fn();
        ReactDOM.render(<CreateAccount onEmailChanged={onEmailChanged} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('CreatePassword tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onPasswordChanged = jest.fn();
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <CreatePassword onPasswordChanged={onPasswordChanged} />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('ExistingAccountComplete tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ExistingAccountComplete />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('RegistrationComplete tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <RegistrationComplete
                firstName={'Betty'}
                lastName={'White'}
                email={'potentiallyImmortal@email.com'}
                organization={'Not Your Typical Granny Inc.'}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('VerifyEmail tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const onVerifyCodeChanged = jest.fn();
        const onResendVerificationEmail = jest.fn();
        ReactDOM.render(
            <VerifyEmail
                onVerifyCodeChanged={onVerifyCodeChanged}
                onResendVerificationEmail={onResendVerificationEmail}
            />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('ContactSupport tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <ContactSupport />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

// @TODO: Fix the [TypeError: accountUIActions.dispatch is not a function] issue

jest.mock('@pxblue/react-auth-shared', () => ({
    ...jest.requireActual('@pxblue/react-auth-shared'),
    useAccountUIActions: jest.fn().mockReturnValue(() => {}),
}));

describe('ForgotPassword tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <ForgotPassword />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});

// @TODO: Fix this!... ugh!

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useLocation: jest.fn().mockReturnValue('test-location'),
// }));

// jest.mock('@pxblue/react-auth-shared', () => ({
//     ...jest.requireActual('@pxblue/react-auth-shared'),
//     useRegistrationUIActions: jest.fn().mockReturnValue(() => {}),
// }));

// describe('InviteRegistrationPager tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         const authUIActions = jest.fn();
//         const registrationUIActions = jest.fn();
//         // const registrationDispatch = jest.fn();
//         // const registrationActions = {
//         //     loadEULA: jest.fn(),
//         //     requestRegistrationCode: jest.fn(),
//         //     validateUserRegistrationRequest: jest.fn(),
//         //     completeRegistration: jest.fn(),
//         // };

//         const defaultRoutes = {
//             LOGIN: '/login',
//             FORGOT_PASSWORD: '/forgot-password',
//             RESET_PASSWORD: '/reset-password',
//             REGISTER_INVITE: '/register/invite',
//             REGISTER_SELF: '/register/create-account',
//             SUPPORT: '/support',
//         };

//         ReactDOM.render(
//             <BrowserRouter>
//                 <RoutingContext.Provider value={{ routes: defaultRoutes }}>
//                     <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
//                         <InviteRegistrationPager />
//                     </AuthUIContextProvider>
//                 </RoutingContext.Provider>
//             </BrowserRouter>,
//             div
//         );
//         ReactDOM.unmountComponentAtNode(div);
//     });
// });

// @TODO: Fix image issue for the stackedEatonLogo and cyberBadge

// src/screens/Login.tsx:27:30 - error TS2307: Cannot find module '../assets/images/eaton_stacked_logo.png' or its corresponding type declarations.
// 27 import stackedEatonLogo from '../assets/images/eaton_stacked_logo.png';
// src/screens/Login.tsx:28:24 - error TS2307: Cannot find module '../assets/images/cybersecurity_certified.png' or its corresponding type declarations.
// 28 import cyberBadge from '../assets/images/cybersecurity_certified.png';

// jest.mock('../assets/images/eaton_stacked_logo.png');
// jest.mock('../assets/images/cybersecurity_certified.png');

// describe('Login tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(<Login />, div);
//         ReactDOM.unmountComponentAtNode(div);
//     });
// });

// @TODO: Fix image issue for the stackedEatonLogo and cyberBadge

// src/screens/Login.tsx:27:30 - error TS2307: Cannot find module '../assets/images/eaton_stacked_logo.png' or its corresponding type declarations.
// 27 import stackedEatonLogo from '../assets/images/eaton_stacked_logo.png';
// src/screens/Login.tsx:28:24 - error TS2307: Cannot find module '../assets/images/cybersecurity_certified.png' or its corresponding type declarations.
// 28 import cyberBadge from '../assets/images/cybersecurity_certified.png';

// describe('PreAuthContainer tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(<PreAuthContainer />, div);
//         ReactDOM.unmountComponentAtNode(div);
//     });
// });

// @TODO: Fix this too! So close...

// type QueryParams = {
//     code: string;
//     email: string;
// };

// jest.mock('../hooks/useQueryString', () => ({
//     useQueryString: (): QueryParams => ({ code: 'test', email: 'test@email.com' }),
// }));

// jest.mock('@pxblue/react-auth-shared', () => ({
//     ...jest.requireActual('@pxblue/react-auth-shared'),
//     useAccountUIActions: jest.fn().mockReturnValue(() => ({
//         actions: {
//             verifyResetCode: (): any => ({
//                 type: 'VerifyResetCode',
//             }),
//         },
//     })),
// }));

// describe('ResetPassword tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         const authUIActions = jest.fn();
//         const registrationUIActions = jest.fn();
//         const defaultRoutes = {
//             LOGIN: '/login',
//             FORGOT_PASSWORD: '/forgot-password',
//             RESET_PASSWORD: '/reset-password',
//             REGISTER_INVITE: '/register/invite',
//             REGISTER_SELF: '/register/create-account',
//             SUPPORT: '/support',
//         };
//         const authActions = {
//             initiateSecurity: jest.fn(),
//             logIn: jest.fn(),
//             forgotPassword: jest.fn(),
//             verifyResetCode: jest.fn(),
//             setPassword: jest.fn(),
//             changePassword: jest.fn(),
//         };
//         const authDispatch = jest.fn();

//         ReactDOM.render(
//             <BrowserRouter>
//                 <RoutingContext.Provider value={{ routes: defaultRoutes }}>
//                     <AccountUIActionContext.Provider value={{ actions: authActions, dispatch: authDispatch }}>
//                         <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
//                             <ResetPassword />
//                         </AuthUIContextProvider>
//                     </AccountUIActionContext.Provider>
//                 </RoutingContext.Provider>
//             </BrowserRouter>,
//             div
//         );
//         ReactDOM.unmountComponentAtNode(div);
//     });
// });

// @TODO: Fix this!... ugh!

// describe('SelfRegistrationPager tests', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(<SelfRegistrationPager />, div);
//         ReactDOM.unmountComponentAtNode(div);
//     });
// });

describe('Splash tests', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const authUIActions = jest.fn();
        const registrationUIActions = jest.fn();

        ReactDOM.render(
            <AuthUIContextProvider authActions={authUIActions} registrationActions={registrationUIActions}>
                <Splash />
            </AuthUIContextProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});