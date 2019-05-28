import React, { Component } from "react";
import { findPeople, follow } from "./apiUser";
import UserPicture from './UserPicture'
import { isAuthenticated } from "../auth";

class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false,
            loading: true
        };
    }

    componentWillMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
                this.setState({ loading: false });
            }
        });
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `You are now friends with ${user.name}.`
                });
            }
        });
    };

    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                <div className="p-12" key={i}>
                    <div className="mr-10 inline-block v-top">
                        <UserPicture
                            id={user._id}
                            name={user.name}
                        />
                    </div>
                    <div className="inline-block">
                        <span className="f-13">{user.name}</span>
                        <button
                            className="btn-s mr-10"
                            onClick={`window.location.href='/users/${user._id}'`}
                        >
                            View Profile
                        </button>

                        <button
                            onClick={() => this.clickFollow(user, i)}
                            className="btn-s mr-10"
                        >
                            Add Friend
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users, open, followMessage, loading } = this.state;
        return (
            <div className="userEditProfileComp friendList">
                <div className="dialog">
                    <div className="t1">Find People</div>

                    {open && (
                        <div className="p-12 f-13">{followMessage}</div>
                    )}

                    {loading ? "" : this.renderUsers(users)}
                </div>
            </div>
        );
    }
}

export default FindPeople;