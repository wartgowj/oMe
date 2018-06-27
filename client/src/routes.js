import React from 'react';
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Home from './pages/Home';
import Callback from './components/Callback/Callback';
import Auth from './components/Auth/Auth';
import history from './utils/history';
import NoMatch from "./pages/NoMatch";
import Profile from './pages/Profile';




//import pages here: 
import Detail from "./pages/Detail";
import CXPlaces from "./pages/CXPlaces";
import Nav from './components/Nav';
import Footer from './components/Footer'



const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const makeMainRoutes = ({ children }) => {
  return (
      <Router history={history}>
        <div>
          <Nav auth={auth} />
    
          <Switch>
            <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
            <Route exact path="/cxplaces/:id" render={(props) => <Detail auth={auth} {...props} />} />
            <Route exact path="/cxplaces" render={(props) => <CXPlaces auth={auth} {...props} />} />
            <Route exact path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} /> 
            }}/>
            <Route path="/profile" render={(props) => (
              !auth.isAuthenticated() ? (
                <Redirect to="/home" />
              ) : (
                  <Profile auth={auth} {...props} />
                )
            )} />
            <Route component={NoMatch}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
  );
}

export default makeMainRoutes;
