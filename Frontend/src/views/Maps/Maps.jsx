import React from "react";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

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
  return(
<Card>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Add Sensor Node
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CustomInput
                  labelText="Cluster Id"
                  id="cluster-id"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Sensor Latitude"
                  id="sensor-latitude"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Sensor Longitude"
                  id="sensor-longitude"
                  formControlProps={{
                    fullWidth: true
                  }}
                />

              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="primary"
                onClick={() => props.Marker
                
              }
              >
                Add Sensor
                  </Button>
            </ExpansionPanel>
            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Add Cluster Node
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CustomInput
                  labelText="Cluster Latitude"
                  id="cluster-latitude"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Cluster Latitude"
                  id="cluster-longitude"
                  formControlProps={{
                    fullWidth: true
                  }}
                />

              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="primary"
              //onClick={() => this.showNotification("br")}
              >
                Add Cluster
                  </Button>
            </ExpansionPanel>

            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Edit Sensor Node
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CustomInput
                  labelText="Cluster Id"
                  id="cluster-id"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Sensor Id"
                  id="sensor-id"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Sensor Latitude"
                  id="sensor-latitude"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Sensor Longitude"
                  id="sensor-longitude"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="primary"
              //onClick={() => this.showNotification("br")}
              >
                Edit Sensor Node
                  </Button>
            </ExpansionPanel>
            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Edit Cluster Node
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CustomInput
                  labelText="Cluster Id"
                  id="cluster-id"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Cluster Latitude"
                  id="cluster-latitude"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Cluster Latitude"
                  id="cluster-longitude"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="primary"
              //onClick={() => this.showNotification("br")}
              >
                Edit Cluster Node
                  </Button>
            </ExpansionPanel>
            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Delete Sensor
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CustomInput
                  labelText="Cluster Id"
                  id="cluster-id"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText="Sensor Id"
                  id="sensor-id"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="danger"
              //onClick={() => this.showNotification("br")}
              >
                Delete Sensor
                  </Button>
            </ExpansionPanel>
            <br></br>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                Delete Cluster
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <CustomInput
                  labelText="Cluster Id"
                  id="cluster-id"
                  formControlProps={{
                    fullWidth: true
                  }}
                />

              </ExpansionPanelDetails>
              <Button
                fullWidth
                color="danger"
              //onClick={() => this.showNotification("br")}
              >
                Delete Cluster
                  </Button>
            </ExpansionPanel>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomSkinMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key="
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

export default map;
