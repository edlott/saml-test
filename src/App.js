import React from 'react';
import { OktaAuth, toAbsoluteUrl, toRelativeUrl} from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { Route, useHistory } from 'react-router-dom';

import Home from './Home';
import UserInfo from './UserInfo';
import LogoutHandler from './LogoutHandler';
import Logout from './Logout';
import Timer from './Timer';

const oktaAuth = new OktaAuth({
    issuer: "https://dev-71459526.okta.com/oauth2/default",
    clientId: '0oaajqt2mup8k5b0l5d7',
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

const App = () => {
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
