import React, { Component } from 'react';
import axios from "axios";
import {rootUrl} from "../helpers/urlhelper";
import {Redirect} from "react-router";
import cookie from 'react-cookies'
// import img from "../images/sjsuhead.png";
// import img2 from "../images/sjsuheader.png";
import {Link} from 'react-router-dom';
class Home extends Component {

  constructor(props){
    super(props)
  }

  

  render() {
    let redirectVar = null;
    // if(cookie.load("cookie")){
    //     redirectVar = <Redirect to= "/admin/dashboard"/>
    // }
      return(<div>

        <header className="login-header home-header"><span>SmartAlert Cloud</span><span><img src={""}></img></span>
        <p>An IOT-based smart emergency system</p>        </header>
        <div>{redirectVar}</div>
        <div className="login-form">
        <div className="img-parent"> <p>Welcome</p></div>
       
        <div className="input-parent home-parent">
       <div>
         <button className="btn"><Link to="/login">Login</Link></button>
         <button className="btn"><Link to="/signup">Sign Up</Link></button>
         </div>
         </div>
        </div>
      </div>)
  }
}

export default Home;
