import React, { Component } from 'react';
import {searchUsers} from "../users/apiUser";
import { Redirect } from "react-router-dom";

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            query: null,
            peoples: [],
        }
        console.log(this.state.peoples)
    }

    componentDidMount = () => {
        searchUsers(this.state.query).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    peoples: data,
                });
            }
        });
    };
    componentDidMount() {
        ;
    }

    onChange(e) {
        this.setState({ query: e.target.value }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    searchUsers(this.state.query);
                }
            } else {
                searchUsers(this.state.query);
            }
        })
    }

            
        
    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
    }

    render() {
        return (
            <div className="searchBox">
                <form>               
                    <input
                        type="text"
                        className="search-box"
                        placeholder="Search"
                        onChange={this.onChange.bind(this)}
                    />
                    <button 
                        className="search-btn-wrapper" 
                        placeholdertext="Search" 
                        type="submit"
                        onClick={this.clickSubmit}
                    >
                        <i className="search-icon"></i>
                    </button>
                </form>
                {this.state.loading?
                <Redirect to={`/users/${this.state.peoples._id}`} />:
                null
                }}
            </div>
        )
    }
}

export default SearchBar;


                        