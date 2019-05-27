import React, { Component } from "react";
import { getUsers } from "./apiUser";
import { Link } from "react-router-dom";
import UserPicture from './UserPicture'

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
                    <UserPicture
                     className="img"
                    style={{ height: "200px", width: "auto" }}
                    id={user.id}
                    name={user.name}
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