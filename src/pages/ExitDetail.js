import React, { Component } from "react";
import {Link} from "react-router-dom";
import { withAuth } from "../context/auth-context";
import axios from "axios";

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
    isReady: false,
  };
  
  componentDidMount() {
    this.getSingleExit();
  }
  
  deleteSingleExit = () => {
    const id = this.props.match.params.id;
    axios.delete(`http://localhost:5000/exit/exitpoint/${id}`).then((response) => {

    });
  }
  
  getSingleExit = () => {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/exit/exitpoint/${id}`).then((response) => {
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
    return (
      <div>
        {/* <h2>Jumps Counter: {jumpCount}</h2>
        <h2>Jumps from this exit: {jumpThisExitCount}</h2>
        <button onClick={this.handleClick}> 1+</button> */}
        {/* <h4>EXIT LAT AND LONG</h4> */}
        {/* EXIT IMAGE */}
          <br/>
        <h1>{name}</h1>
          <br/>
        <h3>{altitude}</h3>
          <br/>
        <img src={img ? img : null} />
          <br/>
        {/* <a href="">Edit Exit</a> */}
          <br/>
            <Link to="#" onClick={this.deleteSingleExit}>Delete Exit</Link>
          <br/>
      {/* WEATHER SECTION */}
        <div>
          {this.state.isReady
            ? (<iframe width="650" height="450" src={`https://embed.windy.com/embed2.html?lat=${exitLat.toFixed(3)}lon=${exitLong.toFixed(3)}&detailLat=${exitLat.toFixed(3)}&detailLon=${exitLong.toFixed(3)}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`} frameborder="0"></iframe>)
            :"Loading"
          }
    
        </div>
      {/* MAPPING SECTION */}
        <div>
          <h4>aproach Laitude {aproachLat}</h4>
          <br/>
          <h4>aproach Longitude {aproachLong}</h4>
          <br/>
          <h4>aproach description</h4>
          <br/>
          <p>
            {aproachDescription}
          </p>
          <br/>
        </div>
        <div>
          <h4>Exit Laitude {exitLat}</h4>
          <br/>
          <h4>Exit Longitude {exitLong}</h4>
          <br/>
          <h4>Exit description</h4>
          <br/>
          <p>
            {exitDescription}
          </p>
          <br/>
        </div>
        <div>
          <h4>Landing Zone Laitude {landingZoneLat}</h4>
          <br/>
          <h4>Landing Zone Longitude {landingZoneLong}</h4>
          <br/>
          <h4>Landing Zone description</h4>
          <br/>
          <p>
            {landingZoneDescription}
          </p>
          <br/>
        </div>
        
      </div>
    );
  }
}
export default withAuth(ExitDetail);