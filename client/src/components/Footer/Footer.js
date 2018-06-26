import React from "react";
import "./Footer.css";
import { Button } from "react-bootstrap";
import swal from "sweetalert2";


const Footer = () => (
    <div className="footer">
        <div className="github">
            <a href ="https://github.com/wartgowj/CX">
                <img className="githubLogo" src={require("../../utils/github.png")} alt="github"/>
                </a>
        </div>
        <div className="copyright">{['Copyright',<span>&copy;</span>," CX 2018"]}</div>
        <div>
            <Button onClick={() => swal({
                width: 600,
                type:'info',
                title:'ABOUT CX',
                html:'<h4>CX is a user updated site with one objective in mind: To help you find the best exchange rates in your area! To fully take advantage of CX, please create an account. If you prefer to remain a guest, you can still view rates but will not be able to contribute. Click on the "Get Rates" button to see a list of exchanges in your area. If you visit an exchange and the rates on CX are not up to date you can update them! And you\'re done!! Take pride in the fact that you are helping the community to save money!!</h4>'
                })} className="aboutButton">About</Button>
        </div>
    </div>

); 


export default Footer;