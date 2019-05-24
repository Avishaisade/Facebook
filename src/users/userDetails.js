import React from "react";

export default function userDetails(props) {
    const {about,email,company,created,city,country,birthday}= props.user;
    console.log(props.user);
    return (
        <div className="userDetails clearfix-t">
            <span className="title">Intro</span>
            <div className="body">
                <ul>
                    <li>
                        {about}
                    </li>
                    <li>
                        <i className="userIcon rss"></i>
                        <a className="link_sm" href={`mailto:${email}`}>{email}</a>
                    </li>
                    <li>
                        <i className="userIcon job"></i>
                        {company}
                    </li>
                    <li>
                        Birthday: {new Date(birthday).toDateString()}
                    </li>
                    <li>
                        <i className="userIcon clock"></i>
                        Joined on {new Date(created).toDateString()}
                    </li>
                    <li>
                        <i className="userIcon home"></i>
                         {`Lives in ${city}, ${country}`}
                    </li>
                </ul>
            </div>
        </div>
    )
}