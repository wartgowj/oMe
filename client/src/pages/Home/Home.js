import React, { Component } from 'react';
import Button from "../../components/Button";
import Header from "../../components/Header";
import MAP from "../../services/Map";
import "./Home.css";




class Home extends Component {
    login() {
        this.props.auth.login();
    }

    componentDidMount(){
        this.getUserLocation();
    }

    getUserLocation = () => {
        MAP.getLocation((position) => {
            sessionStorage.userLat = position.coords.latitude;
            sessionStorage.userLng = position.coords.longitude;
        })
    }
    render() {
    
        return (
            <div className="container">
                <Header />
                        <div className="button"><Button /></div>
            </div>
        );
    }
}

export default Home; 


