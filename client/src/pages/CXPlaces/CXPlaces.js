import React, { Component } from "react";
import API from "../../utils/API";
import "./CXPlaces.css";
import CXPlace from "../../components/CXPlace";
import { Link } from "react-router-dom";
import {
  Button,
  DropdownButton,
  MenuItem,
  ButtonToolbar
} from "react-bootstrap";
import sortByDistance from 'sort-by-distance';


class CXPlaces extends Component {
    state = {
      cxplaces: [],
      byBuy: false,
      bySell: false,
      byDistance: true
    };



  login() {
    this.props.auth.login();
  }

  componentWillMount() {
    this.loadByDistance();
  }

  loadCxplacesBuy = () => {
    API.getCxplacesBuy()
      .then(res => {
        this.setState({
          cxplaces: res.data,
          byBuy: true,
          bySell: false,
          byDistance: false
        })
      })
      .catch(err => console.log(err));
  }

  loadCxplacesSell = () => {
    API.getCxplacesSell()
      .then(res => {
        this.setState({
          cxplaces: res.data,
          byBuy: false,
          bySell: true,
          byDistance: false
        })
      })
      .catch(err => console.log(err));
  }


  loadByDistance = () => {
    const points = [];
    const origin = {
      x: sessionStorage.userLat,
      y: sessionStorage.userLng
    }
    API.getCxplacesDistance()
      .then(res => {
        res.data.forEach((item,index) => {
          points.push({
            x: item.lat,
            y: item.lng,
            _id: item._id,
            name: item.name,
            address: item.address,
            buy: item.buy,
            sell: item.sell,
            date: item.date,
            user: item.user
          })
          
        })
       
      })
      .then(res => {
        const sortedDistances = sortByDistance(origin, points);
        this.setState({
          cxplaces: sortedDistances, 
          byBuy: false,
          bySell: false,
          byDistance: true
        })
      })
      .then(res => {
        console.log(this.state.cxplaces)
      })
   
  }

  calulateDistance = (lat1, lon1, lat2, lon2) => {
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;
    return (12742 * Math.asin(Math.sqrt(a)))*0.621371;
  }

  render() {
    return (
      <div className="cxplaceContainer">
        <div className="buttons">

            <ButtonToolbar>
              <DropdownButton
                bsStyle = "default"
                title="Sort by"
                key="1"
                id="dropdown-size-medium"
              >
                <MenuItem onClick={this.loadCxplacesBuy} eventKey="1">Buy</MenuItem>
                <MenuItem onClick={this.loadCxplacesSell} eventKey="2">Sell</MenuItem>
                <MenuItem onClick={this.loadByDistance} eventKey="3">Distance</MenuItem>
              </DropdownButton>
            </ButtonToolbar >

          </div>
        <ul>
          {
            this.state.cxplaces.map((cxplace) => {
              return (
                <CXPlace
                  auth={this.props.auth}
                  key={cxplace._id}
                  cxplaceId={cxplace._id}
                  cxplaceName={cxplace.name}
                  cxplaceAddress={cxplace.address}
                  cxplaceDistance = {this.calulateDistance(cxplace.lat || cxplace.x, cxplace.lng || cxplace.y, sessionStorage.userLat, sessionStorage.userLng).toFixed(1)}
                  cxplaceBuy={cxplace.buy}
                  cxplaceSell={cxplace.sell}
                  loadCxplacesBuy={this.loadCxplacesBuy}
                  loadCxplacesSell={this.loadCxplacesSell}
                  loadCxplacesDistance={this.loadByDistance}
                  byBuy={this.state.byBuy}
                  bySell={this.state.bySell}
                  byDistance={this.state.byDistance}
                  cxplaceDate={cxplace.date}
                  cxplaceUser={cxplace.user}
                />
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default CXPlaces;