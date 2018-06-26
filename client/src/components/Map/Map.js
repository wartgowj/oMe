import React, { Component } from "react";
import API from "../../utils/API";
import ReactDOM from 'react-dom';
import "./Map.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";



export default class Map extends Component {
    state = {
        cxplaces: [],
        userLat: "",
        userLng: "",
    };

    componentDidMount() {
        this.setUserLocation();
        this.loadCxplacesBuy();
    }

    componentDidUpdate(){
        this.loadMap();
    }

    setUserLocation = () => {
            this.setState({ userLat: parseFloat(sessionStorage.userLat) });
            this.setState({ userLng: parseFloat(sessionStorage.userLng) });

    }

    loadCxplacesBuy = () => {
        API.getCxplacesBuy()
            .then(res =>
                this.setState({ cxplaces: res.data })
            )
            .catch(err => console.log(err));
    };

    loadMap = () => {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps; 

            const mapRef = this.refs.map; 
            const node = ReactDOM.findDOMNode(mapRef);

            const mapConfig = Object.assign({}, {
                center: { lat: this.state.userLat, lng: this.state.userLng },
                zoom: 11
            })

            this.map = new maps.Map(node, mapConfig)

            // Creates a marker at the users location
            const usericon = {
                url: "https://www.shareicon.net/data/2015/11/26/678308_man_512x512.png",
                scaledSize: new google.maps.Size(40, 40),
            };
            const userMarker = new google.maps.Marker({
                position: { lat: this.state.userLat, lng: this.state.userLng},
                map: this.map,
                title: "You are here",
                animation: google.maps.Animation.BOUNCE,
                icon: usericon,
                url: "/profile"
            });
            google.maps.event.addListener(userMarker, 'click', function () {
                window.location.href = this.url;
            });

            // Creates a marker for each cxplace
            this.state.cxplaces.forEach(cxplace => {
                let icon = {
                    url: cxplace.icon, // url
                    scaledSize: new google.maps.Size(30, 30),
                };
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(cxplace.lat), lng: parseFloat(cxplace.lng) },
                    map: this.map, 
                    title: cxplace.name,
                    icon: icon,
                    url: "/cxplaces/"+ cxplace._id
                });
                google.maps.event.addListener(marker, 'click', function () {
                    window.location.href = this.url;
                });
            })

        }
    }


    render() {
        const style = { //sets size of map//
            width: '80vw', 
            height: '80vh',
            margin: 'auto' 
        }

        return (
            <div>
            <Link to={"/cxplaces/"}>
                <Button className="backButton">
                    <img className="backIcon" src={require("../../utils/back.png")} alt="logo" />
                    <span className="backFont">List</span>
                </Button>
            </Link>
                <div className='map' ref="map" style={style}></div>
            </div>
        )
    }
}
