import React from 'react';
import { OktaAuth, toAbsoluteUrl, toRelativeUrl} from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { Route, useHistory } from 'react-router-dom';

import Home from './Home';
import UserInfo from './UserInfo';
import LogoutHandler from './LogoutHandler';
import Logout from './Logout';
import Timer from './Timer';

const App = () => {
    const params = new URLSearchParams(window.location.search);
    const domain = params.get('domain');
    if (domain && window.location.pathname === '/') {
        sessionStorage.setItem('domain', domain);
    }
    const domainToUse = sessionStorage.getItem('domain') || 't-mypassport.oktapreview.com';

    const oktaAuth = new OktaAuth({
        issuer: `https://${domainToUse}/oauth2/default`,
        clientId: '0oacj1xu4kwkqVwfZ1d7',
        redirectUri: `${toAbsoluteUrl('/loginCallback', window.location.origin)}`,
        tokenManager: {
            autoRenew: true,
            autoRemove: false,
            expireEarlySeconds: 5,
            storage: 'sessionStorage'
        },
        services: {
            autoRenew: false
        },
        scopes: ['offline_access', 'esrx.default', 'openid']
    });

    const customAuthHandler = async () => {
        const previousAuthState = oktaAuth.authStateManager.getPreviousAuthState();
        if (!previousAuthState || !previousAuthState.isAuthenticated) {
            await oktaAuth.signInWithRedirect();
        }
    };

    const history = useHistory();

    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        const target = toRelativeUrl(originalUri || '/', window.location.origin);
        history.replace(target);
    };

    return (
        <Security
            oktaAuth={ oktaAuth }
            onAuthRequired={ customAuthHandler }
            restoreOriginalUri={ restoreOriginalUri }
        >
            <div>
                <div>
                    <SecureRoute path="/" exact>
                        <Home/>
                    </SecureRoute>
                    <SecureRoute path="/userInfo">
                        <UserInfo/>
                    </SecureRoute>
                    <Route path="/loginCallback">
                        <LoginCallback/>
                    </Route>
                    <Route path="/logout">
                        <Logout/>
                    </Route>
                    <Route path="/doLogout">
                        <LogoutHandler/>
                    </Route>
                </div>
                <Timer/>
            </div>
        </Security>
    );
};

export default App;
