import React from 'react';
import { useHistory } from "react-router-dom";
const Home = () => {
    const history = useHistory();
    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                <li><a href='userInfo'>User Info</a></li>
                <li><a href='doLogout'>Logout</a></li>
            </ul>
        </div>
    );
}

export default Home;
