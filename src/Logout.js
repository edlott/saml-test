import React from 'react';
import {Link} from 'react-router-dom';
const Logout = () => {
    return (
       <div>
           <h1>
               Logged Out
           </h1>
           <ul>
              <li><a href="http://localhost:4000">IDP Launch Page</a></li>
              <li><Link to="/">Login</Link></li>
           </ul>
       </div>
    );
}

export default Logout;
