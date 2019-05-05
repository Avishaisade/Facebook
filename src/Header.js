import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header-fb">
                <div className="inner-container">
                    <div className="fb-logo"></div>
                    <div className="searchBox">
                        <button className="search-btn-wrapper" placeholderText="Search" type="submit"><i className="search-icon"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;