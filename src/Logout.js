import React from 'react';
import {Link} from 'react-router-dom';
const Logout = () => {
    return (
       <h1>
           Logged Out
       </h1>
       <ul>
          <li><a href="http://localhost:4000">IDP Launch Page</a></li>
          <li><Link to="/">Login</Link></li>
       </ul>
    );
}

export default Logout;
