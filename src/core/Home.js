import React, { Component } from "react";
import { isAuthenticated } from "../auth";
// import Timeline from "../core/Timeline";
import NewPost from "../Posts/newPost";
import Avatar from "../users/avatar";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    render() {
        return (
            <div className="globalContainer">
                <div className="col-180 float-left home-RightNav clearfix-t mr-10">
                    <ul>
                        <li>
                            <Avatar
                                _id={this.state.user._id}
                            />
                            <span>{this.state.user.name}</span>
                        </li>
                        <div style={{ height: "10px" }}></div>
                        <li className="active">
                            <i className="icons feed"></i>
                            <span>News Feed</span>
                        </li>
                        <li>
                            <i className="icons msg"></i>
                            <span>Messenger</span>
                        </li>
                        <li>
                            <i className="icons vid"></i>
                            <span>Watch</span>
                        </li>

                        <div style={{ height: "10px" }}></div>
                        <h4>Shortcuts</h4>
                        <li>
                            <i className="icons rec"></i>
                            <span>Recommendations</span>
                        </li>
                        <li>
                            <i className="icons fr"></i>
                            <span>Friend Lists</span>
                        </li>

                        <div style={{ height: "10px" }}></div>
                        <h4>Explore</h4>
                        <li>
                            <i className="icons2 event"></i>
                            <span>Events</span>
                        </li>
                        <li>
                            <i className="icons groups"></i>
                            <span>Groups</span>
                        </li>
                        <li>
                            <i className="icons pages"></i>
                            <span>Pages</span>
                        </li>
                    </ul>
                </div>
                <div className="col-500 float-left mr-10">
                    <NewPost />
                    <div className="feed">
                        {/* <Timeline /> */}
                    </div>
                </div>
                <div className="col-200 float-left clearfix-t">
                    <div className="panel f-13">
                        Birthdays
                    </div>
                    <div className="home-footer">
                        <div> Facebook © 2019</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;