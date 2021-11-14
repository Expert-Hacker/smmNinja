import image1 from '../src/images/image3.png'
import './App.css';
import Header_home from './Usercomponents/Header_home';
import LandingPage from './Usercomponents/LandingPage';
import ProtectedRoute from './ProtectedRoute';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Usercomponents/Home';
import Login from './Usercomponents/Login';
import Signup from './Usercomponents/Signup';
import Header_landingPage from './Usercomponents/Header_landingPage';
import store from './Redux/store';
import { useState } from 'react';
import { useEffect } from 'react';
import Viewprofile from './Usercomponents/Viewprofile';
import Editprofile from './Usercomponents/Editprofile';
import Addfund from './Usercomponents/Addfund';
import Admin_landingPage from './Admincomponents/Admin_landingPage';
import error from './Usercomponents/Erroe404'
import Viewticket from './Usercomponents/Viewticket';
import Transaction_status from './Usercomponents/Transaction_status';
import TermsandConditions from './Usercomponents/TermsandConditions';
import Disclaimer from './Usercomponents/Disclaimer';
import PrivacyPolicy from './Usercomponents/PrivacyPolicy'
function App() {
  return (
    <>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/landing" component={LandingPage}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/v1/dashboard" component={LandingPage} />
        <Route exact path="/view-profile" component={Viewprofile}/>
        <Route exact path="/edit-profile" component={Editprofile}/>
        <Route exact path="/v1/addfund" component={Addfund}/>

        <Route exact path="/v1/terms-and-conditions" component={TermsandConditions}/>
        <Route exact path="/v1/disclaimer" component={Disclaimer}/>
        <Route exact path="/v1/privacy-policy" component={PrivacyPolicy}/>

        <Route exact path="/v1/admin-dashboard" component={Admin_landingPage}/>
        <Route exact path="/v1/dashboard/view-ticket" component={Viewticket}/>
        <Route exact path="/transaction-status" component={Transaction_status}/>
        <Route component={error}/>
      </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
