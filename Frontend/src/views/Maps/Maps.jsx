import React from "react";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Card from "components/Card/Card.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from '@material-ui/core/Select';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


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

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    > 
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
      <Marker position={{ lat: {},lng: {} }} />
    </GoogleMap>
  ))
);




//export default Maps;
function map({ ...props }) {
  const { classes } = props;
  return(
<Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Infrastructure View</h4>
        <p className={classes.cardCategoryWhite}>
          Clusters and Sensors View
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Create Cluster Node
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                
                <CustomInput
                  labelText="Cluster Node IP Address"
                  id="cluster-ip"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <label>Status</label>
                  <select>
                    <option>ON</option>
                    <option>OFF</option>
                  </select> 
                               

              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="primary"
              >
                Create Cluster Node
                  </Button>
            </ExpansionPanel>
            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Create Sensor Node
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                
                <label>Cluster Node IP Address</label>
                  <select>
                    <option>130.65.254.1</option>
                    <option>130.65.254.2</option>
                    <option>130.65.254.3</option>
                    <option>130.65.254.4</option>
                  </select>               
                <CustomInput
                  labelText="Sensor Node IP Address"
                  id="sensor-ip"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <label>Status</label>
                  <select>
                    <option>ON</option>
                    <option>OFF</option>
                  </select> 
                

                

              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="primary"
              //onClick={() => this.showNotification("br")}
              >
                Create Sensor Node
                  </Button>
            </ExpansionPanel>

            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Update Cluster Node
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <label>Cluster Node IP Address</label>
                  <select>
                    <option>130.65.254.1</option>
                    <option>130.65.254.2</option>
                    <option>130.65.254.3</option>
                    <option>130.65.254.4</option>
                  </select>
                <CustomInput
                  labelText="New Cluster IP"
                  id="new-cluster-ip"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <label>Status</label>
                  <select>
                    <option>ON</option>
                    <option>OFF</option>
                  </select> 
                
              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="primary"
              //onClick={() => this.showNotification("br")}
              >
                Update Cluster Node
                  </Button>
            </ExpansionPanel>
            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Update Sensor Node
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <label>Cluster Node IP Address</label>
                  <select>
                    <option>130.65.254.1</option>
                    <option>130.65.254.2</option>
                    <option>130.65.254.3</option>
                    <option>130.65.254.4</option>
                  </select>
                  <label>Old Sensor Node IP Address</label>
                  <select>
                    <option>130.65.124.1</option>
                    <option>130.65.124.2</option>
                    <option>130.65.124.3</option>
                    <option>130.65.124.4</option>
                  </select>
                <CustomInput
                  labelText="New Sensor IP Address"
                  id="new-sensor-ip"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <label>Status</label>
                  <select>
                    <option>ON</option>
                    <option>OFF</option>
                  </select> 
              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="primary"
              //onClick={() => this.showNotification("br")}
              >
                Update Sensor Node
                  </Button>
            </ExpansionPanel>
            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Delete Cluster
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <label>Cluster Node IP Address</label>
                  <select>
                    <option>130.65.254.1</option>
                    <option>130.65.254.2</option>
                    <option>130.65.254.3</option>
                    <option>130.65.254.4</option>
                  </select>
               
              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="danger"
              //onClick={() => this.showNotification("br")}
              >
                Delete Cluster
                  </Button>
            </ExpansionPanel>
            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Delete Sensor
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <label>Cluster Node IP Address</label>
                  <select>
                    <option>130.65.254.1</option>
                    <option>130.65.254.2</option>
                    <option>130.65.254.3</option>
                    <option>130.65.254.4</option>
                  </select>
                  <label>Sensor Node IP Address</label>
                  <select>
                    <option>130.65.124.1</option>
                    <option>130.65.124.2</option>
                    <option>130.65.124.3</option>
                    <option>130.65.124.4</option>
                  </select>
              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="danger"
              //onClick={() => this.showNotification("br")}
              >
                Delete Sensor
                  </Button>
            </ExpansionPanel>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomSkinMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </GridItem>
          </GridContainer>
          </CardBody>
          </Card>
  );
}

export default withStyles(style)(map);
