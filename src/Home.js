import React from 'react';
import {Link, useHistory} from "react-router-dom";
const Home = () => {
    const history = useHistory();
    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                <li><Link to="userInfo">User Info</Link></li>
                <li><Link to="doLogout">Logout</Link></li>
            </ul>
        </div>
    );
}

export default Home;
