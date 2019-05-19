import React from "react";

export default function userDetails(props) {
    return (
        <div className="userDetails clearfix-t">
            <span className="title">Intro</span>
            <div className="body">
                <ul>
                    <li>
                        <i className="userIcon rss"></i>
                        <a className="link_sm" href={`mailto:${props.user.email}`}>{props.user.email}</a>
                    </li>
                    <li>
                        <i className="userIcon job"></i>
                        Works at Intel
                    </li>
                    <li>
                        <i className="userIcon clock"></i>
                        Joined on {new Date(props.user.created).toDateString()}
                    </li>
                    <li>
                        <i className="userIcon home"></i>
                        Lives in Haifa, Israel
                    </li>
                </ul>
            </div>
        </div>
    )
}