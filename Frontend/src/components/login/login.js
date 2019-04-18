import React, { Component } from 'react';
import axios from "axios";
import {rootUrl} from "../helpers/urlhelper";
import {Redirect} from "react-router";
import cookie from 'react-cookies'
import "../../assets/css/login.css";
// import img from "../images/sjsuhead.png";
// import img2 from "../images/sjsuheader.png";
import {Link} from 'react-router-dom';
class Login extends Component {

  constructor(props){
    super(props)

    this.state={
      email:"",
      password:"",
      loginSuccess:0,
      message:""
    }

    this.login=this.login.bind(this);
  }

  changeHandlerEmail=(e)=>{
    this.setState({
      email:e.target.value
    });
  }

  changeHandlerPassword=(e)=>{
    this.setState({
      password:e.target.value
    });
  }

   async login(e){
     e.preventDefault();
    let {email,password}=this.state;
    var data={
     email,
     password
    }

    try{

      axios.defaults.withCredentials=true;
    let result = await axios.post(rootUrl+"/login",data);
    if(result.status===200 && result.data.loginSuccess===1){
      console.log("successfull");
      this.setState({
        loginSuccess:1
      });
      this.props.auth();
   
    }else{
      this.setState({
        message:result.data.message
      });
    
    }
    
    }catch(error){
    console.log("error"+error);
     }

  }

  render() {
    let redirectVar = null;
    if(cookie.load("cookie")){
        redirectVar = <Redirect to= "/home"/>
    }
      return(<div>

        <header className="login-header"><span>SmartAlertCloud</span><span><img src={""}></img></span>
        <p>An IOT-based smart emergency system</p>
        </header>
        <div>{redirectVar}</div>
        <form className="login-form" onSubmit={this.login}>
        <div className="img-parent"> <p>Sign In</p></div>
       
        <div className="input-parent">
       <div> <input required onChange={this.changeHandlerEmail} type="text" placeholder="Email"></input></div>
       <div><input required onChange={this.changeHandlerPassword} type="password" placeholder="Password"></input></div>
      
       <div><input className="btn" type="submit" value="Login"></input></div> 
       </div>
       <div className="sign-up"><span>New User ? </span><Link to="/signup">Sign Up</Link></div>
        </form>
        <div>{this.state.message}</div>

      </div>)
  }
}

export default Login;
