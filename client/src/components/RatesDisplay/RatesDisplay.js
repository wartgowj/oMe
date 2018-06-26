import React, { Component } from "react";
import "./RatesDisplay.css";
import ExchangeRates from '../../services/ExchangeRates.js'
import { Tooltip, OverlayTrigger } from "react-bootstrap"

class RatesDisplay extends Component {
    state = {
        pesoRate: ''
    };

    componentDidMount() {
        this.loadRates();
        
    }

    loadRates = () => {
        
        ExchangeRates.getRates()
            .then(results => {
                return results.json();
            }).then(data => {
                
                this.setState({ pesoRate: data.rates.MXN})
            })
    };

    render() {
        return (
            <OverlayTrigger placement="bottom" overlay={
                <Tooltip id="tooltip">
                    These international exchange rates are updated hourly.
                </Tooltip>
            }>
                <div>
                    <div className="live">Live Exchange Rates :</div>
                    USD: <span className="dollar">$1</span>
                    MXN: <span className="dollar">${this.state.pesoRate}</span>
                </div>
            </OverlayTrigger>

        )
        
    }
}  

export default RatesDisplay;