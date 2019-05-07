import React, { Component } from "react";
import axios from 'axios';
import {rootUrl} from "../../components/helpers/urlhelper";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import avatar from "assets/img/faces/marc.jpg";
import { ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
//export default user
class userList extends Component {
  constructor(props){
    super(props);
    const { classes } = props;
    this.state={
      userDetails:[],
      email:"",
      name:"",
      role:"", 
      userId:"",
      value:""
    }
    //this.addRegion=this.addRegion.bind(this);
  }
  changeHandler=(property1,e)=>{
    this.setState({
      [property1]:e.target.value
    })
  }
  
  
  getUserData=()=>{
    (async()=>{
    try {
      
      let {data:userDetails}=await axios.get(rootUrl+'/users');
      
      
      this.setState({
        userDetails         
      })
      
    } catch (error) {
    }
  })();
  }

 

  deleteUserId=()=>{
    (async()=>{
      try {
        let {delUserId}=this.state;
        console.log("in userId", delUserId);
        console.log("in selected", this.state.value);
        // let i=selectedUser;
         if(!delUserId){
           delUserId=this.state.userDetails[0]._id;
        }
        let result=await axios.post(rootUrl+'/deleteUser',{userId:delUserId});
        if(result.status==200){
          this.setState({
           // clusterIp:"",
            //regionId:""
          });
          alert("User Deleted successfully!");
          this.getUserData();
        }
      } catch (error) {
        
      }
    })();
  }
  async componentDidMount(){
    this.getUserData();
   }
render(){
  const { classes } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>See user details</h4>
              <p className={classes.cardCategoryWhite}>You can view and modify user details</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
              <ExpansionPanel>
              <ExpansionPanelSummary >
                 See User Details
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                
                <Table>
                  <TableHead>
                    <TableRow>
                    <TableCell align="right">User Name</TableCell>
                    <TableCell align="left">User Email</TableCell>
                    <TableCell align="left">User Role</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
                {this.state.userDetails.map((data)=>{
                      
                      return(
                      //<option value={data.userId}>User name:{data.name}, Email:{data.email}, Role:{data.role}</option>
                      <Table>
                      <TableBody>
                        <TableRow>
                        <TableCell >{data.name}</TableCell>
                        <TableCell >{data.email}</TableCell>
                        <TableCell >{data.role}</TableCell>
                        </TableRow>
                        </TableBody>
                        </Table>                    
                      )
                      
                      })}            
              </ExpansionPanelDetails>
              </ExpansionPanel>
              <br></br>
              <ExpansionPanel>
              <ExpansionPanelSummary >
                 Delete User
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <label>Select a User</label>
              
              <select value={this.state.selectedValue} onChange={(e)=>{this.changeHandler('deluserId',e)}}>
                    {this.state.userDetails.map((data)=>{
                      console.log("in on change" ,data._id);
                      return(<option value={data._id}>{data.name}</option>)
                      }
                    )}
              </select>
            
              </ExpansionPanelDetails>
              <Button
                onClick={this.deleteUserId}
                  fullWidth
                  color="primary"
                //onClick={() => this.showNotification("br")}
                >
                  Delete User
                  </Button>
              </ExpansionPanel>
                

              </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}
}
export default withStyles(styles)(userList);
