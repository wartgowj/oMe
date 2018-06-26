import React, { Component } from "react";
import Modal from "../../components/Modal";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import Moment from 'react-moment';


class CXPlace extends Component {
	constructor(props) {
		super(props)
		this.state = {
	      buy: "",
		  sell: "",
		  date: "",
	      isSellModalOpen: false,
		  isBuyModalOpen: false,
		  profile: {}
		};
		
		this.handleRateUpdate = this.handleRateUpdate.bind(this);
		
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

	handleInputChange = event => {
	    const { name, value } = event.target;
	    this.setState({
	    	[name]: value
	    });
	}

	handleRateUpdate = event => {
	let regexp = /^\d{2}(\.\d{1,2})?$/;

    event.preventDefault();

		if (regexp.test(this.state.sell)) {
			
	  
	  console.log ('updating sell rate to ' + this.state.sell);
	  

      API.updateCxplace(this.props.cxplaceId, {
		sell: this.state.sell,
		user: this.state.profile.nickname,
		date: Date.now()
	  }
	
	)
	  
	  .then(res => {
		  if (this.props.byBuy) {
			  this.props.loadCxplacesBuy();
		  } else if (this.props.bySell) {
			  this.props.loadCxplacesSell();
		  } else if (this.props.byDistance) {
			  this.props.loadCxplacesDistance();
		  }
		  this.setState({ sell: "" });
	  })
	
      .catch(err => console.log(err));

		} else if (regexp.test(this.state.buy)){

      console.log ('updating buy rate to ' + this.state.buy)

      API.updateCxplace(this.props.cxplaceId, {
		buy: this.state.buy,
		user: this.state.profile.nickname,
		date: Date.now()
      })
      .then(res => {
		if (this.props.byBuy) {
			this.props.loadCxplacesBuy();
		} else if (this.props.bySell) {
			this.props.loadCxplacesSell();
		} else if (this.props.byDistance) {
			this.props.loadCxplacesDistance();
		}
		  this.setState({ buy: ""});
	  })
      .catch(err => console.log(err));

	} 
	this.closeModal();
      
  }

  openModal(which) {

  	if (which === 'buy') {
		this.setState({ isBuyModalOpen: true })
  	} else if (which === 'sell') {
		this.setState({ isSellModalOpen: true })
  	}
  }

  closeModal() {
    this.setState({ 
    	isBuyModalOpen: false,
		isSellModalOpen: false
    })
  }

	render() {
		const { isAuthenticated } = this.props.auth;
		let regexp = /^\d{2}(\.\d{1,2})?$/;
		return (
	        <li className="listBox list" id="listDetail" key={this.props.cxplaceId}>
	            <Link to={"/cxplaces/" + this.props.cxplaceId}>
	                <div className="nameContainer">
	                    <h3 className="cxName">{this.props.cxplaceName}</h3>
	                    <div className="address">{this.props.cxplaceAddress}</div>
						<div className="distance">{this.props.cxplaceDistance}  miles</div>
	                </div>
	            </Link>
	            <span className="vertical_dotted_line"></span>
				
					{isAuthenticated() && (
					<div className="buyBox">
						<div className="buy">
							<OverlayTrigger placement="left" overlay={
								<Tooltip id="tooltip">
									If exchanging to dollars, this is the amount of pesos you pay per dollar.
 								</Tooltip>
							}>
								<span className="buyGreen">Buy</span>
							</OverlayTrigger>
							
							<Button className="buyButton" onClick={() => this.openModal('buy')}> ${this.props.cxplaceBuy}</Button>
							<Modal isOpen={this.state.isBuyModalOpen} onClose={() => this.closeModal()}>
								<h1>Update Rate</h1>
								<form>
									<Input
										onChange={this.handleInputChange}
										name="buy"
										placeholder="Buy Rate"
									/>
								<FormBtn
										disabled = {!regexp.test(this.state.buy)}
										onClick={this.handleRateUpdate}>
										Update
	                            </FormBtn>
								</form>
							</Modal>
						</div>
						<div className="buy">
							<OverlayTrigger placement="left" overlay={
								<Tooltip id="tooltip">
									If exchanging to pesos, this is the amount of pesos you get per dollar you pay.
 								</Tooltip>
							}>
								<span className="sellRed">Sell</span>
							</OverlayTrigger>
							<Button className="sellButton" onClick={() => this.openModal('sell')}> ${this.props.cxplaceSell}</Button>
							<Modal isOpen={this.state.isSellModalOpen} onClose={() => this.closeModal()}>
								<h1>Update Rate</h1>
								<form>
									<Input
										onChange={this.handleInputChange}
										name="sell"
										placeholder="Sell Rate"
									/>
									<FormBtn
										disabled = {!regexp.test(this.state.sell)}
										onClick={this.handleRateUpdate}>
										Update
	                            </FormBtn>
								</form>
							</Modal>
						</div>

						<div className="lastUpdated">Last updated: <Moment fromNow>{this.props.cxplaceDate}</Moment>
						<br/>
						By: {this.props.cxplaceUser}
						</div>
					</div>
					)}
				{!isAuthenticated() && (
					<div className="buyBox">
						<div className="buy">
							<OverlayTrigger placement="left" overlay={
								<Tooltip id="tooltip">
									If exchanging to dollars, this is the amount of pesos you pay per dollar.
 								</Tooltip>
							}>
								<span className="buyGreen">Buy</span>
							</OverlayTrigger>
							<p>${this.props.cxplaceBuy}</p>

						</div>
						<div className="buy">
							<OverlayTrigger placement="left" overlay={
								<Tooltip id="tooltip">
									If exchanging to pesos, this is the amount of pesos you get per dollar you pay.
 								</Tooltip>
							}>
								<span className="sellRed">Sell</span>
							</OverlayTrigger>
							<p>${this.props.cxplaceSell}</p>
						</div>
						<div className="lastUpdated">Last updated: <Moment fromNow>{this.props.cxplaceDate}</Moment>
						<br />
						By: {this.props.cxplaceUser}
						</div>
					</div>

				)}
					

		
			
	            
	        </li>
		)
	}

}

export default CXPlace;