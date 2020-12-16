import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withAuth } from "../context/auth-context";
import Button from '@material-ui/core/Button'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import SaveIcon from '@material-ui/icons/Save';


class EditExit extends Component {
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

  componentDidMount() {
    this.getSingleExit()
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log('event.target', event.target.value)
    this.setState({ [name]: value });
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    const id = this.props.match.params.id
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
      creator,
      altitude,
    } = this.state;
    
    axios
      .put(`http://localhost:5000/exit/exitpoint/${id}`, {
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
      }, {withCredentials: true})
      .then(() => {
        this.props.history.push("/home")
      })
      .catch((err) => console.error(err));
  };
  setAproachLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>{
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({aproachLat: lat, aproachLong: long})
    });
}
  setExitLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>{
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({exitLat: lat, exitLong: long})
    });
}
  setLandingZoneLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>{
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({landingZoneLat: lat, landingZoneLong: long})
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
    console.log('this.state', this.state)
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
            <Button type="submit" startIcon={<SaveIcon/>} variant="contained" color="primary" size="" >Aproach GPS</Button>
          </div>
        </form>
        <Button onClick={this.setAproachLocation} startIcon={<GpsFixedIcon/>} variant="outlined" color="primary" size="small" >Aproach GPS</Button>
          <br/>
        <Button onClick={this.setExitLocation} startIcon={<GpsFixedIcon/>} variant="outlined" color="primary" size="small" >Exit GPS</Button>
          <br/>
        <Button onClick={this.setLandingZoneLocation} startIcon={<GpsFixedIcon/>} variant="outlined" color="primary" size="small" >Landing Zone GPS</Button>
          <br/>
      </div>
    );
  }
}
export default withAuth(EditExit);