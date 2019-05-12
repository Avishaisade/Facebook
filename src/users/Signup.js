import React, { Component } from "react";
import { signup } from "../auth/index";
import { Link } from "react-router-dom";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,

        };
    }
    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };
    handleSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        //  console.log(user);


        signup(user).then(data => {
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

    };

    signupForm = (name, email, password) => (
        <form className="form">
            <input
                onChange={this.handleChange("name")}
                type="text"
                className="full-input"
                value={name}
                placeholder="Full Name"
            />
            <input
                onChange={this.handleChange("email")}
                type="email"
                className="full-input"
                value={email}
                placeholder="Email"
            />
            <input
                onChange={this.handleChange("password")}
                type="password"
                className="full-input"
                value={password}
                placeholde="New Password"
            />

            <small>
                By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.
            </small>

            <button
                onClick={this.handleSubmit}
                className="signUp-btn"
            >
                Sign Up
            </button>
        </form>
    );

    render() {
        const { name, email, password, error, open } = this.state;
        return (
            <div className="SignUp">
                <div className="globalContainer">
                    <div className="float-right">
                        <h1>
                            Create a New Account
                    <span className="freeText">It’s free and always will be.</span>
                        </h1>

                        <div
                            className="alert"
                            style={{ display: error ? "" : "none" }}
                        >
                            {error}
                        </div>
                        <div
                            className="alert"
                            style={{ display: open ? "" : "none" }}
                        >
                            New account is successfully created. Please {" "}

                            <Link to="/signin">Sign In</Link>
                        </div>


                        {this.signupForm(name, email, password)}
                    </div>
                </div>
            </div>
        )
    };
}

export default Signup;