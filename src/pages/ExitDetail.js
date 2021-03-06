import React, { Component } from "react";
import {Link} from "react-router-dom";
import { withAuth } from "../context/auth-context";
import axios from "axios";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoiZWNhY29zY2FyZWxsaSIsImEiOiJja2lydnpjZ3AwOHRhMndtbXJrYWZreHdnIn0.witvEX0TRMppWNjFFWvGxA"


class ExitDetail extends Component {
  state = {
    name: "",
    img: "",
    aproachLat: 0,
    aproachLong: 0,
    aproachDescription: "",
    exitLat: 0,
    exitLong: 0,
    exitDescription: "",
    landingZoneLat: 0,
    landingZoneLong: 0,
    landingZoneDescription: "",
    creator: "",
    altitude: 0,
    // jumpCount: 0,
    // jumpThisExitCount: 0,
    lng: 10.0787281,// mapbox element starting location marker
    lat: 10.3948976,// mapbox element starting location marker
    zoom: 10,// mapbox element starting location marker
    isReady: false,
  };
  
  componentDidMount() {
    this.getSingleExit();
    // this.createMap();
  }
  
  createMap = () => {
    const exitCoordinatesArray = [this.state.exitLong, this.state.exitLat]
    const aproachCoordinatesArray = [this.state.aproachLong, this.state.aproachLat]
    const landingCoordinatesArray = [this.state.landingZoneLong, this.state.landingZoneLat]
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/ecacoscarelli/ckis2zjq40kbp19qmjow3k5he",
      center: [this.state.exitLong, this.state.exitLat], // I need to pass the information from this.state.exitLat & this.state.exitLong location coordinates
      zoom: 11
    });
    const exitMarker = new mapboxgl.Marker()
    .setLngLat(exitCoordinatesArray)
    .setPopup(new mapboxgl.Popup().setHTML(`
    <div class="details-card">
      <h1>
    </div>
    `) )
    .addTo(this.map)
    const aproachMarker = new mapboxgl.Marker()
    .setLngLat(aproachCoordinatesArray)
    .addTo(this.map)
    const landingMarker = new mapboxgl.Marker()
    .setLngLat(landingCoordinatesArray)
    .addTo(this.map)
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       var pos = [position.coords.longitude, position.coords.latitude];
    //       this.map.setCenter(pos);
    //     },
    //     () => alert("Issue retrieving your location")
    //   );
    // } else {
    //   alert(" Your browser doesn't support Geolocation");
    // }
  }

  
  
  deleteSingleExit = () => {
    const id = this.props.match.params.id;
    axios.delete(`${process.env.REACT_APP_API_URL}/exit/exitpoint/${id}`, {withCredentials: true}).then(() => {
      this.props.history.push("/home")
    });
  }
  
  editSingleExit = () => {
    const id = this.props.match.params.id;
    axios.put(`${process.env.REACT_APP_API_URL}/exit/exitpoint/${id}`, {withCredentials: true}).then((response) => {

    });
  }
  
  getSingleExit = () => {
    const id = this.props.match.params.id;
    axios.get(`${process.env.REACT_APP_API_URL}/exit/exitpoint/${id}`, {withCredentials: true}).then((response) => {
      const exit = response.data;
      const {
        name,
        img,
        aproachLat,
        aproachLong,
        aproachDescription,
        exitLat,
        exitLong,
        exitDescription,
        landingZoneLat,
        landingZoneLong,
        landingZoneDescription,
        creator,
        altitude,
      } = exit;
      
      this.setState({
        name,
        img,
        aproachLat,
        aproachLong,
        aproachDescription,
        exitLat,
        exitLong,
        exitDescription,
        landingZoneLat,
        landingZoneLong,
        landingZoneDescription,
        creator,
        altitude,
        listOfExits: response.data,
        isReady: true,
      })
      this.createMap()
    });
  };

  // handleClick = () => {
  // UPDATE JUMP COUNT
  //   const updatedCount = this.state.jumpCount + 1;
  // UPDATE JUMP FROM THIS EXIT COUNT
  //   const updatedExitCount = this.state.jumpThisExitCount + 1;
  //   this.setState( { jumpCount: updatedCount, jumpThisExitCount: updatedExitCount })
  // }
  render() {
    const {
      name,
      img,
      aproachLat,
      aproachLong,
      aproachDescription,
      exitLat,
      exitLong,
      exitDescription,
      landingZoneLat,
      landingZoneLong,
      landingZoneDescription,
      creator,
      altitude,
    } = this.state;
    const id = this.props.match.params.id;
    return (
      <div>
        <div className="headerContainer">
          <br />

          {/* EXIT IMAGE */}
          <div  class="circular-landscape">
            <img src={img ? img : null} />
          </div>
          <h1>{name}</h1>
          <h4>Heigth: {altitude} meters</h4>
          <br/>
          {/* JUMP COUNTER SECTION */}
          {/* <h2>Jumps Counter: {jumpCount}</h2>
          <h2>Jumps from this exit: {jumpThisExitCount}</h2>
          <button onClick={this.handleClick}> 1+</button> */}
          <br/>
          <br/>

          {/* LINKS TO EDIT AND DELETE */}
          <div className="exitDetailButton" >
            <Link to={`/editexit/${id}`} >
              <EditIcon style={{ fontSize: 40 }} color="primary" />EDIT
            </Link>
          </div>
        
          <Link className="exitDetailButton delete" to="#" onClick={this.deleteSingleExit}>
            <DeleteForeverIcon style={{ fontSize: 40 }} color="primary" />DELETE
          </Link>
          <br/>
        </div>
        {/* MAPS SECTION */}
        <div className="allMapsContainer">
          {/* WEATHER SECTION */}
          <div>
          <h2>Weather Map</h2>
            {this.state.isReady && this.state.isReady
              ? (<iframe width="650" height="450" src={`https://embed.windy.com/embed2.html?lat=${exitLat.toFixed(3)}lon=${exitLong.toFixed(3)}&detailLat=${exitLat.toFixed(3)}&detailLon=${exitLong.toFixed(3)}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`} frameBorder="0"></iframe>)
              :"Loading"
            }
          </div>
          {/* HYPSOMETRIC SECTION */}
          <div>
            <h2>Hypsometric Map</h2>
            <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
          </div>
            <br/>
        </div>
        <br/>
        {/* DESCRIPTION SECTION */}
        <div className="descriptionContainer">
          {/* APROACH INFORMATION */}
          <div className="aproachContainer descriptionContainerDiv">
            <h2>APROACH INFORMATION</h2>
            <h3>Latitude</h3> 
            <h5>{aproachLat}</h5>
            <h3>Longitude</h3>
            <h5>{aproachLong}</h5>
            <h3>Description</h3>
            <p>
              {aproachDescription}
            </p>
          </div>
          {/* EXIT INFORMATION */}
          <div className="exitContainer descriptionContainerDiv">
            <h2>EXIT INFORMATION</h2>
            <h3>Latitude</h3> 
            <h5>{exitLat}</h5>
            <h3>Longitude</h3>
            <h5>{exitLong}</h5>
            <h3>Description</h3>
            <p>
              {exitDescription}
            </p>
          </div>
          {/* LANDING ZONE INFORMATION */}
          <div className="landingZoneContainer descriptionContainerDiv">
            <h2>LANDING ZONE INFORMATION</h2>
            <h3>Latitude</h3> 
            <h5>{landingZoneLat}</h5>
            <h3>Longitude</h3>
            <h5>{landingZoneLong}</h5>
            <h3>Description</h3>
            <p>
              {landingZoneDescription}
            </p>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}
export default withAuth(ExitDetail);