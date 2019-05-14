import React from "react";
import { Link, withRouter } from "react-router-dom";

const Footer = ({ history }) => (
    <div className="Footer">
        <ul>
            <li>English (US)</li>
        </ul>
        <div id="contentCurve"></div>
        <ul className="mt-0">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/SignIn"}>Sign Up</Link></li>
            <li><Link to={"/SignIn"}>Log In</Link></li>
        </ul>
    </div>
);

export default withRouter(Footer);


