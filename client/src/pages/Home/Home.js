import React, { Component } from 'react';
import Button from "../../components/Button";
import Header from "../../components/Header";
import "./Home.css";




class Home extends Component {
    login() {
        this.props.auth.login();
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


