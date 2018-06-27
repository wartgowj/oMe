import React from "react";
import "./Footer.css";
import { Button } from "react-bootstrap";
import swal from "sweetalert2";


const Footer = () => (
    <div className="footer">
        <div className="github">
            <a href ="https://github.com/wartgowj/oMe">
                <img className="githubLogo" src={require("../../utils/github.png")} alt="github"/>
                </a>
        </div>
        <div className="copyright">{['Copyright',<span>&copy;</span>," oMe 2018"]}</div>
        <div>
            <Button onClick={() => swal({
                width: 600,
                type:'info',
                title:'ABOUT oMe',
                html:'<h4>Worried about your \"friends\" not returning money, things or favors when they \"borrow\" stuff\? Track who owes you what and when you need it back by. oMe can also track what you owe people, but we know you always repay your debts so why bother, right?</h4>'
                })} className="aboutButton">About</Button>
        </div>
    </div>

); 


export default Footer;