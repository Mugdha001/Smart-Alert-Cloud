import React, { Component } from 'react';
import axios from "axios";
import {rootUrl} from "../helpers/urlhelper";
import {Redirect} from "react-router";
import cookie from "react-cookies";
// import img from "../images/sjsuhead.png";
// import img2 from "../images/sjsuheader.png";
import {Link} from 'react-router-dom';
class Signup extends Component {

  constructor(props){
    super(props)

    this.state={
      name:"",
      email:"",
      password:"",
      signupSuccess:0,
      message:"",
      role:"officer"
    }

    this.signup=this.signup.bind(this);
  }

  changeHandlerName=(e)=>{
    this.setState({
      name:e.target.value
    });
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
  changeHandlerRadio=(e)=>{
    this.setState({
      role:e.target.value
    });
  }

  async signup(e){

    e.preventDefault();

    let {name,email,password,role}=this.state;
    var data={
     name,
     email,
     password,
     role
    }
    try{
    let result = await axios.post(rootUrl+"/signup",data);
    console.log("Here")
    console.log(JSON.stringify(result));
    if(result.status===200 && result.data.insertStatus===1){
      console.log("successfull");
      this.setState({
        message:result.data.message
      });
      setTimeout(()=>{
        this.setState({
          signupSuccess:1
        });
      },5000);
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
    if(this.state.signupSuccess){
        redirectVar = <Redirect to= "/login"/>
    }
    if(cookie.load("cookie")){
      redirectVar=<Redirect to="/home"/>
  }
      return(<div>
            <header className="login-header"><span>SmartAlertCloud</span><span><img src={""}></img></span>
            <p>An IOT-based smart emergency system</p>        </header>
        <div>{redirectVar}</div>
        <form className="login-form" onSubmit={this.signup}>
        <div className="img-parent"> <p>Sign Up</p></div>
       
        <div className="input-parent">
       <div> <input required onChange={this.changeHandlerName} type="text" placeholder="Name"></input></div>
       <div className="radio-parent"><input type="radio" onChange={this.changeHandlerRadio} checked={this.state.role==="support"} name="role"  value="support"></input><label>IOT Support</label></div>
       <div className="radio-parent"><input type="radio" onChange={this.changeHandlerRadio} checked={this.state.role==="admin"} name="role"  value="admin"></input><label>City Emergency Officer</label></div>
       <div className="radio-parent"><input type="radio" onChange={this.changeHandlerRadio} checked={this.state.role==="officer"} name="role" value="officer"></input><label>Infrastructure Admin</label></div>
       <div> <input required onChange={this.changeHandlerEmail} type="text" placeholder="Email"></input></div>
       <div><input required onChange={this.changeHandlerPassword} type="password" placeholder="Password"></input></div>
        <input className="btn" type="submit" value="Sign Up"></input>
        </div>
        <div className="sign-up"><span>Already registered ? </span><Link to="/login">Sign In</Link></div>
        </form>
        <div>{this.state.message}</div>
      </div>)
  }
}

export default Signup;
