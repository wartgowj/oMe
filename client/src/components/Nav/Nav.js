import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import RatesDisplay from "../RatesDisplay";
import NavAccountButton from "../NavAccountButton"
import {Button} from "react-bootstrap"

const Nav = ({ auth }) => {

  const login = () =>  {
    auth.login();
  }

  const logout = () => {
    auth.logout();
  }


  

  return (
  <div>
    <nav className="style__navbar___n7Lsv style__sticky___3fVnd style__transparent___1YBfK style__inverse___1SzHV">
      <div className="style__header___fS1Pf">
        <div className="ratesDisplay">
          <RatesDisplay />
        </div>
        <div className="logo">
          <Link to="/">
            <img className="style__logo___p5nsH" src={require("../../utils/logo.png")} alt="logo" />
          </Link>
        </div>
        <div className="style__right___memgl">
          <span>
            {
              !auth.isAuthenticated() && (
                <Button
                  id="qsLoginBtn"
                  className="btn-margin"
                  onClick={login}
                >
                  Log In
                  </Button>
              )
            }
            {
              auth.isAuthenticated() && (
                  <NavAccountButton userProfile={auth.userProfile} getProfile={auth.getProfile} logOut={logout}/>
              )
            }
          </span>
        </div>
      </div>
    </nav>
  </div>
)};


export default Nav;