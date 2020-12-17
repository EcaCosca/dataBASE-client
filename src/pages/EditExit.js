import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withAuth } from "../context/auth-context";
import Button from '@material-ui/core/Button'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


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
      .put(`${process.env.REACT_APP_API_URL}/exit/exitpoint/${id}`, {
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
      <Container>
        <div>
          <form onSubmit={this.handleFormSubmit} classaName="editExitForm">
            <h1>EDIT EXIT</h1>
            <label>Name the exit:</label>
            <br/>
            <input
              className="inputAuthForms"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <br/>
            <label>Altitude in meters:</label>
            <br/>
            <input
              className="inputAuthForms"
              name="altitude"
              type="number"
              value={altitude}
              onChange={this.handleChange}
            />
            <br/>
            <Grid container spacing={4}>
              <Grid item>
                <label>Aproach latitude:</label>
                <br/>
                <input
                  className="inputAuthForms"
                  name="aproachLat"
                  type="number"
                  value={aproachLat}
                  onChange={this.handleChange}
                />
                <br/>
                <label>Aproach longitude:</label>
                <br/>
                <input
                  className="inputAuthForms"
                  name="aproachLong"
                  type="number"
                  value={aproachLong}
                  onChange={this.handleChange}
                />
                <br/>
              <Button onClick={this.setAproachLocation} startIcon={<GpsFixedIcon/>} variant="contained" color="primary" size="small" >Aproach GPS</Button>
                <br/>
                <br/>
                <label>Aproach description:</label>
                <br/>
                <textarea
                  className="textForms"
                  name="aproachDescription"
                  type="text"
                  value={aproachDescription}
                  onChange={this.handleChange}
                />
                <br/>
              </Grid>
              <Grid item>
                <label>Exit latitude:</label>
                <br/>
                <input
                  className="inputAuthForms"
                  name="exitLat"
                  type="number"
                  value={exitLat}
                  onChange={this.handleChange}
                />
                <br/>
                <label>Exit Longitude:</label>
                <br/>
                <input
                  className="inputAuthForms"
                  name="exitLong"
                  type="number"
                  value={exitLong}
                  onChange={this.handleChange}
                />
                <br/>
                <Button onClick={this.setExitLocation} startIcon={<GpsFixedIcon/>} variant="contained" color="primary" size="small" >Exit GPS</Button>
                <br/>
                <br/>
                <label>Exit description:</label>
                <br/>
                <textarea
                  className="textForms"
                  name="exitDescription"
                  type="text"
                  value={exitDescription}
                  onChange={this.handleChange}
                />
                <br/>
              </Grid>
              <Grid item>
                <label>Landing zone latitude:</label>
                <br/>
                <input
                  className="inputAuthForms"
                  name="landingZoneLat"
                  type="number"
                  value={landingZoneLat}
                  onChange={this.handleChange}
                />
                <br/>
                <label>Landing zone longitude:</label>
                <br/>
                <input
                  className="inputAuthForms"
                  name="landingZoneLong"
                  type="number"
                  value={landingZoneLong}
                  onChange={this.handleChange}
                />
                <br/>
                  <Button onClick={this.setLandingZoneLocation} startIcon={<GpsFixedIcon/>} variant="contained" color="primary" size="small" >Landing Zone GPS</Button>
                <br/>
                <br/>
                <label>Landing zone description:</label>
                <br/>
                <textarea
                  className="textForms"
                  name="landingZoneDescription"
                  type="text"
                  value={landingZoneDescription}
                  onChange={this.handleChange}
                />
                <br/>
              </Grid>
            </Grid>
            <div>
              <Button type="submit" startIcon={<SaveIcon/>} variant="contained" color="primary" size="" >Save</Button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </form>
        </div>
      </Container>
    );
  }
}
export default withAuth(EditExit);