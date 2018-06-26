import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Detail.css";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Modal from "../../components/Modal";
import Moment from 'react-moment';
import "./Detail.css";
import { Button, Tooltip, OverlayTrigger, Panel } from "react-bootstrap";


class Detail extends Component {
  constructor(props, context) {
    super(props, context);
  this.state = {
    cxplace: {
      comments: []  
    },
    profile: {},
    isModalOpen: false,
    open: false
  }
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


  componentDidMount() {
    this.loadCxplace();
  }

  loadCxplace = () => {
  API.getCxplace(this.props.match.params.id)
      .then(res => {
        this.setState({ cxplace: res.data, buy: "", sell: "", comments: "", user:""})
        console.log(this.state.cxplace.date)
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    let regexp = /^\d{2}(\.\d{1,2})?$/;
    
    if (regexp.test(this.state.buy) || regexp.test(this.state.sell) || this.state.comments) {

      this.setState({
        cxplace: {
          buy: this.state.buy,
          sell: this.state.sell,
          comments: this.state.cxplace.comments,
          user: this.state.profile.nickname
        },
        isModalOpen: false
      })

      API.updateCxplace(this.props.match.params.id, {
        buy: this.state.buy,
        sell: this.state.sell,
        comments: this.state.comments + " — " + this.state.profile.nickname,
        user: this.state.profile.nickname,
        date: Date.now()
       
      })
        .then(res => this.loadCxplace())
        .catch(err => console.log(err));
    }

    console.log(this.state.cxplace.date)

  };

  
  render() {
    const { isAuthenticated } = this.props.auth;
    let regexp = /^\d{2}(\.\d{1,2})?$/;
    return (
      <div>
        
            
            <div>
              <li className="listBox listDetail" key={this.state.cxplace._id}>
              <div className="flex">   
                <Link to="/cxplaces/">
                  <Button className="backButt">← Back to List</Button>
                </Link>             
                <img className="logoStyle" src={this.state.cxplace.image} alt="logo" />
              </div>
                <div className="nameContainer">
                  <h3 className="cxName">{this.state.cxplace.name}</h3>
                  <div className="info">{this.state.cxplace.hours}</div>
                  <div className="info">{this.state.cxplace.address}</div>
                  <div className="info">{this.state.cxplace.phone}</div>
                  <div className="info">Commission: {this.state.cxplace.commission}</div>
                <div className="buySellSort">
                  <OverlayTrigger placement="top" overlay={
                  <Tooltip id="tooltip">
                    If exchanging to dollars, this is the amount of pesos you pay per dollar.
                      </Tooltip>
                  }>
                  <div className="buybox buyDetail">Buy: ${this.state.cxplace.buy}</div>
                  </OverlayTrigger>

                <OverlayTrigger placement="top" overlay={
                  <Tooltip id="tooltip">
                     If exchanging to pesos, this is the amount of pesos you get per dollar you pay.
                  </Tooltip>
                }>
                  <div className="buybox sellDetail"> Sell: ${this.state.cxplace.sell}</div>
                </OverlayTrigger>
            
                  </div>
                          {
          isAuthenticated() && (
              <div>
                <button className="updateButton" onClick={() => this.openModal()}>Update Rates</button>
                  <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                    <h1>Update Rates</h1>
                      <form>
                          <Input
                            onChange={this.handleInputChange}
                            name="buy"
                            placeholder="Buy Rate (optional)"
                          />
                          <Input
                            onChange={this.handleInputChange}
                            name="sell"
                            placeholder="Sell Rate (optional)"
                          />
                          <TextArea
                            onChange={this.handleInputChange}
                            name="comments"
                            placeholder="Add Comments (optional)"
                            />
                          <FormBtn
                            disabled = {
                                !(regexp.test(this.state.buy) || regexp.test(this.state.sell) || this.state.comments)
                            }
                            onClick={this.handleFormSubmit}
                          > Update                            
                          </FormBtn>
                      </form>                        
                  </Modal>
              </div>
              )}
              {
                !isAuthenticated() && (
              < Button
              className = "btn-margin-detail"
              onClick = {
                this.login
              } > Log in to update rates </ Button>
                )}
              <div className="lastUpdated">Last updated: <Moment fromNow>{this.state.cxplace.date}</Moment>
              <br />
              By: {this.state.cxplace.user}
              </div>
                <div className="nameContainer">
                <Button onClick={() => this.setState({ open: !this.state.open })}>
                  Comments
                </Button>
                <br />
                <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
                  <Panel.Collapse>
                    <Panel.Body>
                        {this.state.cxplace.comments.map(comment => (
                          <div className="reviewBox">
                            <div className="reviews">
                              <hr></hr>
                              {comment}
                            </div>
                          </div>
                        ))}
                    </Panel.Body>
                  </Panel.Collapse>
                </Panel>

                
                </div>               
              </div>

            </li>
          </div>

      </div>
    );
  }
  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }  
}


export default Detail;