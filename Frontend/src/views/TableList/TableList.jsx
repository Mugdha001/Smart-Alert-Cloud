import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";

import CardBody from "components/Card/CardBody.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends Component {


  constructor(props){
    super(props);
    this.state={
      tableDisplay:0
    }
  }

  getData=()=>{
    this.setState({
      tableDisplay:1
    })
  }
  reset=()=>{
    this.setState({
      tableDisplay:0
    })
  }
  
  render(){

  
  const { classes } = this.props;
  let varTable=null;

  if(this.state.tableDisplay==1){
  varTable= <Card>
  <CardHeader color="primary">
    <h4 className={classes.cardTitleWhite}>Data</h4>
    <p className={classes.cardCategoryWhite}>
     Sensor Data    </p>
  </CardHeader>
  <CardBody>
    <Table
      tableHeaderColor="primary"
      tableHead={["Region", "Cluster ID", "Sensor ID", "Date","Time"]}
      tableData={[
        ["California", "1", "2", "2/12/2019","4.00 PM"],
        ["Newyork", "2", "2", "2/14/2019","3.00 PM"],
        ["Arizona", "3", "6", "2/15/2019","2.00 PM"],
        ["Washington", "5", "8", "2/13/2019","4.00 PM"],
        ["Colarado", "4", "9", "2/12/2019","5.00 PM"],
      ]}
    />
  </CardBody>
</Card>
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <label>Start Date</label>
                <input className="drp-down" type="date"></input>
                  </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                <label>End Date</label>
                <input  className="drp-down" type="date"></input>
                  </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <label>Select Cluster Id</label>
                  <select className="select-drp">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                  </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                 <label>Select Node Id</label>
                  <select className="select-drp">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                 
                </GridItem>
              </GridContainer>
             
            </CardBody>
            <CardFooter>
              <Button onClick={this.getData} color="primary">Get Data</Button>
              <Button onClick={this.reset} color="primary">Reset</Button>
            </CardFooter>
          </Card>
       
      </GridItem>
     {varTable}
    </GridContainer>
  );
  }
}

export default withStyles(styles)(TableList);
