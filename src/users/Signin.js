import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import Signup from "./Signup";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,

        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };



    handleSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);


        signin(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
                // authenticate
                authenticate(data, () => {
                    this.setState({ redirectToReferer: true });
                });
            }
        });

        signin(user).then(data => {
            if (data.error) this.setState({ error: data.error });
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
        });
    }

    signinForm = (email, password, ) => (
        <form>
            <div className="form-group">
                <table>
                    <tbody>
                        <tr>
                            <td class="pb-4"><label htmlFor="email">Email or Phone</label></td>
                            <td class="pb-4"><label htmlFor="pass">Password</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    onChange={this.handleChange("email")}
                                    type="email"
                                    name="email"
                                    value={email}
                                />
                            </td>
                            <td>
                                <input
                                    onChange={this.handleChange("password")}
                                    type="password"
                                    name="pass"
                                    value={password}
                                />
                            </td>
                            <td>
                                <button onClick={this.handleSubmit} className="login-btn">Log In</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    );

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading,
        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }


        return (
            <div>
                <div className="headerLoggedOut">
                    <div className="container">
                        <div className="fb-logo">
                            <i></i>
                        </div>
                        <div className="alert " style={{ display: error ? "" : "none" }}>{error}</div>
                        {loading ? (<div class="lds-facebook"><div></div><div></div><div></div></div>) : (this.signinForm(email, password))}
                    </div>
                </div>
                <Signup />
            </div>
        );
    }
}

export default Signin;