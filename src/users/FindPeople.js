import React, { Component } from "react";
import { findPeople, friend } from "./apiUser";
import DefaultProfile from "../Images/defult_profile.jpg";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false
        };
    }

    componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    clickFriend = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        friend(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let tofriend = this.state.users;
                tofriend.splice(i, 1);
                this.setState({
                    users: tofriend,
                    open: true,
                    friendMessage:`You and ${user.name} are now friends`
                });
            }
        });
    };

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
                            className="btn"
                        >
                            View Profile
                        </Link>

                        <button
                            onClick={() => this.clickFriend(user, i)}
                            className="btn btn-raised btn-info float-right btn-sm"
                        >
                            Add friend
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users, open, friendMessage } = this.state;
        
        return (
            <div className="container">
                <h2 className="1">Find People</h2>

                {open && (
                    <div className="alert">{friendMessage}</div>
                )}

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;