import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import "./NavAccountButton.css"



class NavAccountButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {}
        };
    }

    componentWillMount() {
        const userProfile = this.props.userProfile;
        const getProfile = this.props.getProfile;
        if (!userProfile) {
            getProfile((err, profile) => {
                this.setState({ profile });
            });
        } else {
            this.setState({ profile: userProfile });
        }
    }
    render() {
        const { profile } = this.state;
        const style = {
            left: "-100px !important"
        }
        return (
                <DropdownButton
                    bsSize="xsmall"
                    title={
                        <img className="profile-pic" src={profile.picture}
                            alt="user pic"

                        />
                    }
                    id="dropdown-size-extra-small"
                >
                    <MenuItem  style={style} href="/profile" eventKey="1">Profile</MenuItem>
                    <MenuItem divider />
                    <MenuItem style={style} onClick={this.props.logOut} eventKey="4">Log out</MenuItem>
                </DropdownButton>
           
           
)
    }
} 

export default NavAccountButton;

