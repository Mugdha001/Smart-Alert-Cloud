import React, { Component } from "react";
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
import {rootUrl} from "../../components/helpers/urlhelper";
import axios from 'axios';
import "../../assets/css/login.css"
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
      <Marker position={{ lat: {}, lng: {} }} />
    </GoogleMap>
  ))
);




//export default Maps;
class map extends Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state={
      regionName:"",
      regionAddress:"",
      lattitude:"",
      longitude:"",
      regions:[],
      clusters:[],
      clusterIp:"",
      regionId:"",
      sensorIp:"",
      clusterId:"",
      sensors:[],
      updateSensorOld:[]
    }
    this.addRegion=this.addRegion.bind(this);
  }
  changeHandler=(property,e)=>{
    this.setState({
      [property]:e.target.value
    })
  }
  updateSensorDropdown=(e)=>{
    let array=this.state.clusters.filter((data)=>{return data._id==e.target.value})
    this.setState({
      updateSensorOld:array[0].sensorNodeArray
    })
  }
  update=()=>{
    (async()=>{
    try {
      let {data:regions}=await axios.get(rootUrl+'/allregions');
      let {data:clusters}=await axios.get(rootUrl+"/allclusters");
      let {data:sensors}=await axios.get(rootUrl+"/allsensors");

      this.setState({
        regions,
        clusters,
        sensors,
        updateSensorOld:clusters[0]?clusters[0].sensorNodeArray:[]
      })
    } catch (error) {
    }
  })();
  }
  async componentDidMount(){
   this.update();
  }
  async addRegion(){
   try {
     let {regionName:name,regionAddress:address,lattitude,longitude}=this.state;
     let result=await axios.post(rootUrl+'/addregion',{name,address,lattitude,longitude});
     if(result.status==200){
       this.setState({
        regionName:"",
        regionAddress:"",
        lattitude:"",
        longitude:"",
        clusterIp:"",
        regionId:""
       })
       console.log(result);
       alert("Region Added Successfully!")
     }
   } catch (error) {
     
   }
  }
  createCluster=()=>{
    (async()=>{
      try {
        let {regionId,clusterIp:ipaddress,regions}=this.state;
        if(!regionId){
          regionId=regions[0]._id;
        }
        let result=await axios.post(rootUrl+'/addcluster',{ipaddress,regionId});
        if(result.status==200){
          this.setState({
            clusterIp:"",
            regionId:""
          });
          alert("Cluster Added successfully!");
          this.update();
        }
      } catch (error) {
        
      }
    })();
  }
  deleteClusterId=()=>{
    (async()=>{
      try {
        let {delClusterId}=this.state;
        if(!delClusterId){
          delClusterId=this.state.clusters[0]._id;
        }
        let result=await axios.post(rootUrl+'/deleteCluster',{clusterId:delClusterId});
        if(result.status==200){
          this.setState({
            clusterIp:"",
            regionId:""
          });
          alert("Cluster Deleted successfully!");
          this.update();
        }
      } catch (error) {
        
      }
    })();
  }
  deleteSensorId=()=>{
    (async()=>{
      try {
        let {delsensorId}=this.state;
        if(!delsensorId){
          delsensorId=this.state.updateSensorOld[0]._id;
        }
        let result=await axios.post(rootUrl+'/deletesensorNode',{sensornodeId:delsensorId});
        if(result.status==200){
          this.setState({
            clusterIp:"",
            regionId:""
          });
          alert("Sensor Node Deleted successfully!");
          this.update();
        }
      } catch (error) {
        
      }
    })();
  }
  updateCluster=()=>{
    (async()=>{
      try {
        
        let {updateClusterId,newclusterIp:ipaddress,clusters,clusterStatus:status}=this.state;
        if(!updateClusterId){
          updateClusterId=clusters[0]._id;
        }
        if(!ipaddress ||ipaddress==""){
          ipaddress=clusters.filter(data=>data._id==updateClusterId)[0].ipaddress;
        }
        if(!status || status==""){
          status="ON"
        }
        let result=await axios.post(rootUrl+'/updatecluster',{clusterId:updateClusterId,ipaddress,status});
        if(result.status==200){
          this.setState({
            newclusterIp:"",
            status:""
          });
          alert("Cluster Updated successfully!");
          this.update();
        }
      } catch (error) {
        
      }
    })();
  }
  updateSensorNode=()=>{
    (async()=>{
      try {
          

        let {oldsensorId,newsensorIp:ipaddress,clusters,updateSensorStatus:status}=this.state;
        if(!oldsensorId){
          oldsensorId=this.state.updateSensorOld[0]._id;
        }
        if(!ipaddress ||ipaddress==""){
          ipaddress=this.state.updateSensorOld.filter(data=>data._id==oldsensorId)[0].ipaddress;
        }
        if(!status || status==""){
          status="ON"
        }
        let result=await axios.post(rootUrl+'/updatesensornode',{sensorId:oldsensorId,ipaddress,status});
        if(result.status==200){
          this.setState({
            newclusterIp:"",
            status:""
          });
          alert("Sensor Node Updated successfully!");
          this.update();
        }
      } catch (error) {
        
      }
    })();
  }
  createSensor=()=>{
    (async()=>{
      try {
        let {clusterId,sensorIp:ipaddress,clusters}=this.state;
        if(!clusterId){
          clusterId=clusters[0]._id;
        }
        let result=await axios.post(rootUrl+'/addsensornode',{ipaddress,clusterId});
        if(result.status==200){
          this.setState({
            sensorIp:"",
            clusterId:""
          });
          alert("Sensor Added successfully!");
          this.update();
        }
      } catch (error) {
        
      }
    })();
  }

  render() {

    const { classes } = this.props;


    return (
      <Card className="dashboard">
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
                 Add a Region
              </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                 <div><input onChange={(e)=>{this.changeHandler("regionName",e)}} value={this.state.regionName} placeholder="Name of the region"></input></div>
                 <div> <input onChange={(e)=>{this.changeHandler("regionAddress",e)}} value={this.state.regionAddress} placeholder="Address"></input></div>
                 <div><input onChange={(e)=>{this.changeHandler("lattitude",e)}} value={this.state.lattitude} placeholder="Lattitude"></input></div>
                 <div><input onChange={(e)=>{this.changeHandler("longitude",e)}} value={this.state.longitude} placeholder="Longitude"></input></div>
                 
                </ExpansionPanelDetails>
                <Button
                onClick={this.addRegion}
                  fullWidth
                  color="primary"
                >
                  Add a Region
                  </Button>
              </ExpansionPanel>
              <br></br>
              <ExpansionPanel>
                <ExpansionPanelSummary>
                  Create Cluster Node
              </ExpansionPanelSummary>
                <ExpansionPanelDetails>

                <input value={this.state.clusterIp} onChange={(e)=>{this.changeHandler('clusterIp',e)}} placeholder="Ip Address"></input>
                  <label>Select a region</label>
                  <select onChange={(e)=>{this.changeHandler('regionId',e)}}>
                    {this.state.regions.map((data)=>{
                      return(<option value={data._id}>{data.name}</option>)
                    })}
                  </select>


                </ExpansionPanelDetails>
                <Button
                onClick={this.createCluster}
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

                <input value={this.state.sensorIp} onChange={(e)=>{this.changeHandler('sensorIp',e)}} placeholder="Ip Address"></input>
                  <label>Select a cluster</label>
                  <select onChange={(e)=>{this.changeHandler('clusterId',e)}}>
                    {this.state.clusters.map((data)=>{
                      return(<option value={data._id}>{data.ipaddress}</option>)
                    })}
                  </select>



                </ExpansionPanelDetails>
                <Button
                onClick={this.createSensor}
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
                  <label>Cluster Node Ip Address</label>
                  <select onChange={(e)=>{this.changeHandler('updateClusterId',e)}}>
                    {this.state.clusters.map((data)=>{
                      return(<option value={data._id}>{data.ipaddress}</option>)
                    })}
                  </select>
                  <input value={this.state.newclusterIp} onChange={(e)=>{this.changeHandler('newclusterIp',e)}} placeholder="New Ip Address"></input>
                  
                  <label>Status</label>
                  <select onChange={(e)=>{this.changeHandler('clusterStatus',e)}}>
                    <option>ON</option>
                    <option>OFF</option>
                  </select>

                </ExpansionPanelDetails>
                <Button
                onClick={this.updateCluster}
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
                    <select onChange={this.updateSensorDropdown}>
                    {this.state.clusters.map((data)=>{
                      return(<option value={data._id}>{data.ipaddress}</option>)
                    })}
                    </select>
                  <label>Old Sensor Node IP Address</label>
                  <select onChange={(e)=>{this.changeHandler('oldsensorId',e)}}>
                    {this.state.updateSensorOld.map((data)=>{
                      return(<option value={data._id}>{data.ipaddress}</option>)
                    })}
                    </select>                  
                  <input value={this.state.newsensorIp} onChange={(e)=>{this.changeHandler('newsensorIp',e)}} placeholder="New Ip Address"></input>

                  <label>Status</label>
                  <select onChange={(e)=>{this.changeHandler('updateSensorStatus',e)}}>
                    <option>ON</option>
                    <option>OFF</option>
                  </select>
                </ExpansionPanelDetails>
                <Button
                onClick={this.updateSensorNode}
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
                  <select onChange={(e)=>{this.changeHandler('delClusterId',e)}}>
                    {this.state.clusters.map((data)=>{
                      return(<option value={data._id}>{data.ipaddress}</option>)
                    })}
                  </select>

                </ExpansionPanelDetails>
                <Button
                onClick={this.deleteClusterId}
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
                <select onChange={this.updateSensorDropdown}>
                    {this.state.clusters.map((data)=>{
                      return(<option value={data._id}>{data.ipaddress}</option>)
                    })}
                    </select>
                  <label>Old Sensor Node IP Address</label>
                  <select onChange={(e)=>{this.changeHandler('delsensorId',e)}}>
                    {this.state.updateSensorOld.map((data)=>{
                      return(<option value={data._id}>{data.ipaddress}</option>)
                    })}
                    </select>     
                </ExpansionPanelDetails>
                <Button
                onClick={this.deleteSensorId}
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
}

export default withStyles(style)(map);
