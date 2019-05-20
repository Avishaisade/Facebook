import React, { Component } from "react";
import { getUsers } from "./apiUser";
import { Link } from "react-router-dom";
import DefaultProfile from "../Images/defult_profile.jpg";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        getUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="card " key={i}>
                    <img
                        style={{ height: "200px", width: "auto" }}
                        className="img"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn "
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <h2 className="m">Users</h2>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;