import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "./../context/auth-context";
class AddExit extends Component {
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
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
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
    axios
      .post("http://localhost:5000/exit/exitpoint", {
        name,
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
      })
      .then(() => {
        this.props.getAllExits(); // leave this comment - we will used it later
        this.setState({
          name: "",
          img: "",
          aproachLat: undefined,
          aproachLong: undefined,
          aproachDescription: "",
          exitLat: undefined,
          exitLong: undefined,
          exitDescription: "",
          landingZoneLat: undefined,
          landingZoneLong: undefined,
          landingZoneDescription: "",
          creator: "",
          altitude: undefined,
        });
      })
      .catch((err) => console.error(err));
  };
  setAproachLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>{
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({aproachLat: lat, aproachLong: long})
    });
}
  setExitLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>{
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({exitLat: lat, exitLong: long})
    });
}
  setLandingZoneLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>{
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({landingZoneLat: lat, landingZoneLong: long})
    });
}
        
  render() {
    const {
      name,
      aproachLat,
      aproachLong,
      aproachDescription,
      exitLat,
      exitLong,
      exitDescription,
      landingZoneLat,
      landingZoneLong,
      landingZoneDescription,
      altitude,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name the exit:</label>
          <br/>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <br/>
          <label>Aproach latitude:</label>
          <br/>
          <input
            name="aproachLat"
            type="number"
            value={aproachLat}
            onChange={this.handleChange}
          />
          <br/>
          <label>Aproach longitude:</label>
          <br/>
          <input
            name="aproachLong"
            type="number"
            value={aproachLong}
            onChange={this.handleChange}
          />
          <br/>
          <label>Aproach description:</label>
          <br/>
          <textarea
            name="aproachDescription"
            type="text"
            value={aproachDescription}
            onChange={this.handleChange}
          />
          <br/>
          <label>Exit latitude:</label>
          <br/>
          <input
            name="exitLat"
            type="number"
            value={exitLat}
            onChange={this.handleChange}
          />
          <br/>
          <label>Exit Longitude:</label>
          <br/>
          <input
            name="exitLong"
            type="number"
            value={exitLong}
            onChange={this.handleChange}
          />
          <br/>
          <label>Exit description:</label>
          <br/>
          <textarea
            name="exitDescription"
            type="text"
            value={exitDescription}
            onChange={this.handleChange}
          />
          <br/>
          <label>Landing zone latitude:</label>
          <br/>
          <input
            name="landingZoneLat"
            type="number"
            value={landingZoneLat}
            onChange={this.handleChange}
          />
          <br/>
          <label>Landing zone longitude:</label>
          <br/>
          <input
            name="landingZoneLong"
            type="number"
            value={landingZoneLong}
            onChange={this.handleChange}
          />
          <br/>
          <label>Landing zone description:</label>
          <br/>
          <textarea
            name="landingZoneDescription"
            type="text"
            value={landingZoneDescription}
            onChange={this.handleChange}
          />
          <br/>
          <label>Altitude:</label>
          <br/>
          <input
            name="altitude"
            type="number"
            value={altitude}
            onChange={this.handleChange}
          />
          <br/>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
        <button onClick={this.setAproachLocation} >Aproach GeoLocation</button>
        <button onClick={this.setExitLocation} >Exit GeoLocation</button>
        <button onClick={this.setLandingZoneLocation} >Landing Zone GeoLocation</button>
      </div>
    );
  }
}
export default withAuth(AddExit);