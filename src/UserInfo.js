import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useOktaAuth } from '@okta/okta-react';
import styles from './UserInfo.module.scss';

const ClaimTable = ({ id, token }) => (
    <table className={styles.tokenTable} id={ id }>
        <thead>
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>
        </thead>
        <tbody>
        {Object.entries(token).map((claimEntry) => {
            const claimName = claimEntry[0];
            const claimValue = JSON.stringify(claimEntry[1], null, 2);
            const claimId = `claim-${claimName}`;
            return (
                <tr key={ claimName }>
                    <td>{ claimName }</td>
                    <td id={ claimId }>{ claimValue.toString() }</td>
                </tr>
            );
        })}
        </tbody>
    </table>
);

ClaimTable.propTypes = {
    id: PropTypes.any.isRequired,
    token: PropTypes.any.isRequired
};

const UserInfo = ({ theme }) => {
    const { authState, oktaAuth } = useOktaAuth();

    const currentState = () => {
        if (!authState || !authState.isAuthenticated) {
            return null;
        }

        return {
            accessTokenString: oktaAuth.getAccessToken(),
            accessToken: JSON.parse(Buffer.from(oktaAuth.getAccessToken().split('.')[1], 'base64')),
            idTokenString: oktaAuth.getIdToken(),
            idToken: JSON.parse(Buffer.from(oktaAuth.getIdToken().split('.')[1], 'base64')),
            refreshToken: oktaAuth.getRefreshToken()
        };
    };

    const userInfo = currentState();
    if (!userInfo) {
        return (
            <div>
                <p>Not logged in - refresh the page</p>
            </div>
        );
    }
    return (
        <div className={ styles.userinfo }>
            <p>Access Token: <span>{userInfo.accessTokenString}</span></p>
            <ClaimTable id="AccessToken" token={ userInfo.accessToken }/>
            <p>Id Token: <span>{ userInfo.idTokenString }</span></p>
            <ClaimTable id="IdToken" token={ userInfo.idToken }/>
            <p>Refresh Token: <span>{ oktaAuth.getRefreshToken() }</span></p>
            <Link to="/">Go home</Link>
        </div>
    );
};

export default UserInfo;
