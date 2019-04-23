import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
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
function BillingPage(props) {
  const { classes } = props;
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Pricing Overview</h4>
        <p className={classes.cardCategoryWhite}>
          Set Pricing Details
        </p>
      </CardHeader>
      <CardBody>
        
        <div className={classes.typo}>
          <div className={classes.note}><h3>Hourly Charge</h3></div><br></br>
          <h4>Sensors are charged $5 per hour, you currently have 6 nodes up and running, which costs $720 per day.</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}><h3>Daily Charge</h3></div><br></br>
          <h4>Sensors are charged $15 per day, you currently have 6 nodes up and running, which costs $90 per day.</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}><h3>Monthly Charge</h3></div><br></br>
          <h4>Sensors are charged $300 per month, you currently have 6 nodes up and running, which costs $60 per day.</h4>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}><h3>Yearly Charge</h3></div><br></br>
          <h4>Sensors are charged $1000 per year, you currently have 6 nodes up and running, which costs $16 per day.</h4>
        </div>
        
        
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(BillingPage);
