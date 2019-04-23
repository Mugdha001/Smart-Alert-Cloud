
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
    color: "FFFFFF",
    display: "block",
    fontWeight: "400",
    fontSize: "20px",
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
        <h4 className={classes.cardTitleWhite}>Billing cycle</h4>
        <p className={classes.cardCategoryWhite}>
          Pricing overview
        </p>
      </CardHeader>
      <CardBody>
        <div className={classes.typo}>
          <div className={classes.note}>HOURLY CHARGE</div>
          <h1>Sensors are charged $2.99 per hour.</h1>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>DAILY CHARGE</div>
          <h2>Sensors are charged $12.99 per day.</h2>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>MONTHLY CHARGE</div>
          <h3>Sensors are charged $29.99 per month.</h3>
        </div>
        <div className={classes.typo}>
          <div className={classes.note}>YEARLY CHARGE</div>
          <h4>Sensors are charged $299.99 per year.</h4>
        </div>
        

          
      </CardBody>
    </Card>
  );
}

export default withStyles(style)(BillingPage);
