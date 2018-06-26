import React, { Component } from 'react';
import './Profile.css';
import {Button} from "react-bootstrap";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {}
        };
    }



    componentWillMount = () => {

        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile });
        }
    }

    login = () => {
        this.props.auth.login();
    }

    logout = () => {
       this.props.auth.logout();
    }


    render() {
        const { profile } = this.state;
        return (
            <div className="container">
                <div className="profile-area">
                   
                        <img src={profile.picture} alt="profile" />
                        <h1>{profile.name}</h1>
                        <div>                          
                            <h3>username: {profile.nickname}</h3>
                        </div>

                    <Button
                        id="qsLoginBtn"
                        bsStyle="primary"
                        className="btn-margin"
                        onClick={this.logout}
                    >
                        Log Out
                  </Button>
                </div>
            </div>
        );
    }
}

export default Profile;
