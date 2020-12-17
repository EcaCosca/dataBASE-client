import React, { Component } from "react";
import {Link} from "react-router-dom";
import { withAuth } from "../context/auth-context";
import axios from "axios";
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
    lng: 2.0787281,// mapbox element starting location marker
    lat: 41.3948976,// mapbox element starting location marker
    zoom: 15,// mapbox element starting location marker
    isReady: false,
  };
  
  componentDidMount() {
    this.getSingleExit();
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/ecacoscarelli/ckis2zjq40kbp19qmjow3k5he",
      center: [this.state.lng, this.state.lat], // at the monet we use hardcoded location coordinates
      zoom: this.state.zoom,
    });


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
      });
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
          <h1>{name}</h1>
          <br />
          {/* JUMP COUNTER SECTION */}
          {/* <h2>Jumps Counter: {jumpCount}</h2>
          <h2>Jumps from this exit: {jumpThisExitCount}</h2>
          <button onClick={this.handleClick}> 1+</button> */}
          <br />
          <h3>ALTITUDE: {altitude}</h3>
          <br/>
          {/* EXIT IMAGE */}
          <img src={img ? img : null} />
          <br/>
          {/* LINKS TO EDIT AND DELETE */}
          <Link to={`/editexit/${id}`} >Edit Exit</Link>
          <br/>
          <Link to="#" onClick={this.deleteSingleExit}>Delete Exit</Link>
          <br/>
        </div>
        {/* MAPS SECTION */}
        <div className="allMapsContainer">
          {/* WEATHER SECTION */}
          <div>
          <h2>Weather Map</h2>
            {this.state.isReady && this.state.isReady
              ? (<iframe width="650" height="450" src={`https://embed.windy.com/embed2.html?lat=${exitLat.toFixed(3)}lon=${exitLong.toFixed(3)}&detailLat=${exitLat.toFixed(3)}&detailLon=${exitLong.toFixed(3)}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`} frameborder="0"></iframe>)
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
          <div className="aproachContainer">
            <h2>APROACH INFORMATION</h2>
            <h3>Aproach Laitude: {aproachLat}</h3>
            <h3>Aproach Longitude: {aproachLong}</h3>
            <h3>Aproach Description:</h3>
            <p>
              {aproachDescription}
            </p>
          </div>
          {/* EXIT INFORMATION */}
          <div className="exitContainer">
            <h2>EXIT INFORMATION</h2>
            <h3>Exit Laitude {exitLat}</h3>
            <h3>Exit Longitude {exitLong}</h3>
            <h3>Exit description</h3>
            <p>
              {exitDescription}
            </p>
          </div>
          {/* LANDING ZONE INFORMATION */}
          <div className="landingZoneContainer">
            <h3>LANDING ZONE INFORMATION</h3>
            <h3>Landing Zone Laitude {landingZoneLat}</h3>
            <h3>Landing Zone Longitude {landingZoneLong}</h3>
            <h3>Landing Zone description</h3>
            <p>
              {landingZoneDescription}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default withAuth(ExitDetail);