import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { toAbsoluteUrl } from '@okta/okta-auth-js';

const LogoutHandler = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const history = useHistory();

    useEffect(() => {
        if (authState && authState.isAuthenticated) {
            oktaAuth.signOut({
                postLogoutRedirectUri: `${toAbsoluteUrl('/logout', window.location.origin)}`
            }).then(() => {
                sessionStorage.clear();
            });
        }
    }, [authState, oktaAuth]);

    if (!authState || authState.isAuthenticated) {
        return (
            <h2>
                Logging out...
            </h2>
        );
    }
    history.replace('/logout');
    return (<div />);
};

export default LogoutHandler;

