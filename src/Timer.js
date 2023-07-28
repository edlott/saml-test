import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import * as workerInterval from 'worker-interval';
import styles from './Timer.module.scss';

const Timer = () => {
    const testing = true;

    const [refreshCount, setRefreshCount] = useState(0);
    const [changeCount, setChangeCount] = useState(0);
    const [badCount, setBadCount] = useState(0);
    const { authState, oktaAuth } = useOktaAuth();

    const history = useHistory();
    const doRefresh = () => {
        if (authState && authState.isAuthenticated) {
            const old = oktaAuth.getRefreshToken();
            oktaAuth.isAuthenticated().then((isAuthenticated) => {
                const next = oktaAuth.getRefreshToken();
                if (old !== next) {
                    setChangeCount(changeCount + 1);
                }
                if (!isAuthenticated) {
                    history.replace('/doLogout');
                }
            });
            setRefreshCount(refreshCount + 1);
        } else {
            setBadCount(badCount + 1);
        }
    };

    useEffect(() => {
        const interval = workerInterval.setInterval(() => doRefresh(), 1000);
        return () => workerInterval.clearInterval(interval);
    });

    const timerDebugView = testing
        ? (<div className={ styles.panel }>
            <h4>Token Refresh Statistics</h4>
            <table>
                <tbody>
                    <tr><td>token refresh count: [{refreshCount}]</td></tr>
                    <tr><td>token change count: [{changeCount}]</td></tr>
                    <tr><td>token bad count: [{badCount}]</td></tr>
                </tbody>
            </table>
        </div>)
        : '';
    return (
        <div id="timerComponent">
            { timerDebugView }
        </div>
    );
};

export default Timer;
