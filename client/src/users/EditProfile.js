import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { getUsersbyId, updateUserById, updateUserToken } from "./apiUser";
import { Redirect } from "react-router-dom";
import UserPicture from "./UserPicture";
import DeleteUser from "./DeleteUser";



class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
            loading: false,
            about: "",
            company: "",
            country: "",
            city: "",
            birthday: null
        };
    }

    init = userId => {
        const token = isAuthenticated().token;
        getUsersbyId(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: "",
                    about: data.about,
                    company: data.company,
                    country: data.country,
                    city: data.city,
                    birthday: data.birthday
                });
            }
        });
    };

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    isValid = () => {
        const { name, email, password, fileSize } = this.state;
        if (fileSize > 11000000) {
            this.setState({
                error: "File size should be less than 1100kb",
                loading: false
            });
            return false;
        }
        if (name.length === 0) {
            this.setState({ error: "Name is required", loading: false });
            return false;
        }
        // email@domain.com
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({
                error: "A valid Email is required",
                loading: false
            });
            return false;
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Password must be at least 6 characters long",
                loading: false
            });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.userData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            updateUserById(userId, token, this.userData).then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else if (isAuthenticated().user.role === "admin") {
                    this.setState({
                        redirectToProfile: true
                    });
                } else {
                    updateUserToken(data, () => {
                        this.setState({
                            redirectToProfile: true
                        });
                    });
                }
            });
        }
    };

    signupForm = (id, name, email, password, about, company, country, city, birthday) => (
        <form>
            <div className="i-con-images">
                <img
                    alt={name}
                    src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/08/facebook-cover-photo-header.jpg"
                />
                <i className="userIcon_2 camera" style={{ top: "10px", left: "10px" }}>
                    <span>Cover</span>
                </i>
                <input
                    onChange={this.handleChange("coverPhoto")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
                <div className="i1">
                    <UserPicture
                        id={id}
                        name={name}
                    />
                    <i className="userIcon_2 camera"></i>
                    <input
                        onChange={this.handleChange("photo")}
                        type="file"
                        accept="image/*"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="t-bg"><i className="userIcon_4 edit"></i> Edit Bio</div>
            <textarea
                onChange={this.handleChange("about")}
                type="text"
                className="txt-full txtArea"
                value={about}
                placeholder="Describe who you are"
                rows="4"
            />

            <div className="t-bg"><i className="userIcon_4 info"></i> Customize Your Info</div>

            <div className="t-bg-edit">
                <i className="userIcon_4 owl"></i>
                <div style={{ height: "131px" }}></div>
                <span>Details you select will be Public and won't post to News Feed.</span>
            </div>

            <div className="t-bg"><i className="userIcon_4 about"></i> Full Name</div>

            <div className="p-12">
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="border-0"
                    value={name}
                />
                <i className="userIcon_5 edit float-right"></i>
            </div>

            <div className="t-bg"><i className="userIcon_4 work"></i> Work</div>

            <div className="p-12">
                <input
                    onChange={this.handleChange("company")}
                    type="text"
                    className="border-0"
                    value={company}
                    placeholder="Company Name"
                />
                <i className="userIcon_5 edit float-right"></i>
            </div>

            <div className="t-bg"><i className="userIcon_6 home"></i> Hometown</div>

            <div className="p-12">
                <input
                    onChange={this.handleChange("city")}
                    type="text"
                    className="border-0"
                    value={city}
                    placeholder="City"
                />
                <input
                    onChange={this.handleChange("country")}
                    type="text"
                    className="border-0"
                    value={country}
                    placeholder="Country"
                />
                <i className="userIcon_5 edit float-right"></i>
            </div>

            <div className="t-bg"><i className="userIcon_6 bday"></i> Birthday</div>

            <div className="p-12">
                <input
                    onChange={this.handleChange("birthday")}
                    type="date"
                    className="border-0"
                    value={birthday}
                    placeholder="Birthday"
                />
            </div>

            <div className="t-bg"><i className="userIcon_6 mail"></i> Email Address</div>

            <div className="p-12">
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="border-0"
                    value={email}
                    placeholder="Email Address"
                />
            </div>

            <div className="t-bg"><i className="userIcon_6 pwd"></i> Password</div>

            <div className="p-12">
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="border-0"
                    value={password}
                />
            </div>

            <div className="p-12" style={{ height: "25px" }}>
                <button
                    onClick={this.clickSubmit}
                    className="btn-s float-right"
                >
                    Save
            </button>
                <DeleteUser
                    userId={id}
                />
            </div>
        </form>
    );

    render() {
        const {
            id,
            name,
            email,
            password,
            redirectToProfile,
            error,
            loading,
            about,
            company,
            country,
            city,
            birthday
        } = this.state;
        // console.log(this.state);

        if (redirectToProfile) {
            return <Redirect to={`/users/${id}`} />;
        }

        return (
            <div className="userEditProfileComp">
                <div className="dialog">
                    <div className="t1">Edit Profile</div>
                    <div
                        className="alert"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>

                    {loading ? (
                        <div className="text">
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                            ""
                        )}

                    {/* {isAuthenticated().user.role === "admin" &&
                    this.signupForm(name, email, password, about)} */}

                    {isAuthenticated().user._id === id &&
                        this.signupForm(id, name, email, password, about, company, country, city, birthday)}
                </div>
            </div>
        );
    }
}

export default EditProfile;