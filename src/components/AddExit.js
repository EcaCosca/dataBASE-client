import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "./../context/auth-context";
import Button from '@material-ui/core/Button'
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddLocationIcon from '@material-ui/icons/AddLocation';

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
      .post(`${process.env.REACT_APP_API_URL}/exit/exitpoint`, {
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
      }, {withCredentials: true})
      .then(() => {
        this.props.getAllExits(); 
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
  handleFileUpload = (e) => {
    const file = e.target.files[0];

    const uploadData = new FormData();
    uploadData.append("img", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}/exit/upload`, uploadData, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({ img: response.data.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
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
          <label>Name</label>
          <br/>
          <input
            className="inputAuthForms form__field"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <br/>
          <label>Image:</label>
          <br/>
          <input
            name="image"
            className="choseImg"
            type="file"
            onChange={this.handleFileUpload}
          ></input>
          <br/>
          <span>
            <img
              style={{ width: "100px" }}
              src={this.state.img && this.state.img}
              alt=""
            ></img>
          </span>
          <br />
          <label>Altitude:</label>
          <br/>
          <input
            name="altitude"
            className="inputAuthForms form__field"
            type="number"
            value={altitude}
            onChange={this.handleChange}
          />
          <br/>

          {/* APROACH */}
          
          <div class="add-exit-div">            
            <div className="latitude-longitud-container">              
            <h3>APPROACH</h3>
            <button className="inputButton gpsButton" onClick={this.setAproachLocation} startIcon={<GpsFixedIcon/>} variant="contained" color="primary" size="small" ><AddLocationIcon /></button>
            </div>
            <div className="latitude-longitud-container">
              <div className="latitude-container">
                <label>Latitude</label>
                <br/>
                <input
                  name="aproachLat"
                  className="inputAuthForms form__field"
                  type="number"
                  value={aproachLat}
                  onChange={this.handleChange}
                  />
                <br/>
              </div>
              <div className="longitud-container">
                <label>Longitude</label>
                <br/>
                <input
                  name="aproachLong"
                  className="inputAuthForms form__field"
                  type="number"
                  value={aproachLong}
                  onChange={this.handleChange}
                  />
                <br/>
              </div>
            </div>
            <div className="description-container">
              <label>Description</label>
              <textarea
                className="form__field"
                name="approachDescription form__field"
                type="text"
                value={aproachDescription}
                onChange={this.handleChange}
                />
                <br/>
                <br/>
                <br/>
            </div>
          </div>
          <br/>

          {/* EXIT */}

          <div className="add-exit-div">
            <div className="latitude-longitud-container">              
              <h3>EXIT</h3>
              <button className="inputButton gpsButton" onClick={this.setExitLocation} startIcon={<GpsFixedIcon/>} variant="contained" color="primary" size="small" ><AddLocationIcon /></button>
            </div>
            <div className="latitude-longitud-container">
              <div className="latitude-container">
                <label>Latitude</label>
                <br/>
                <input
                  name="exitLat"
                  className="inputAuthForms form__field"
                  type="number"
                  value={exitLat}
                  onChange={this.handleChange}
                />
                <br/>
              </div>
              <div className="longitud-container">
                <label>Longitude</label>
                <br/>
                <input
                  name="exitLong"
                  className="inputAuthForms form__field"
                  type="number"
                  value={exitLong}
                  onChange={this.handleChange}
                />
                <br/>
              </div>
            </div>
            <div className="description-container">
              <label>Description</label>
              <textarea
                className="form__field"
                name="exitDescription form__field"
                type="text"
                value={exitDescription}
                onChange={this.handleChange}
              />
              <br/>
              <br/>
              <br/>
            </div>
          </div>
          <br/>


          {/* LANDING */}

          <div className="add-exit-div">
            <div className="latitude-longitud-container">              
              <h3>LANDING</h3>
              <button className="inputButton gpsButton" onClick={this.setLandingZoneLocation} startIcon={<GpsFixedIcon/>} variant="contained" color="primary" size="small" ><AddLocationIcon /></button>
            </div>
            <div className="latitude-longitud-container">
              <div className="latitude-container">
                <label>Latitude</label>
                <br/>
                <input
                  name="landingZoneLat"
                  className="inputAuthForms form__field"
                  type="number"
                  value={landingZoneLat}
                  onChange={this.handleChange}
                />
                <br/>
              </div>
              <div className="longitud-container">
                <label>Longitude</label>
                <br/>
                <input
                  name="landingZoneLong"
                  className="inputAuthForms form__field"
                  type="number"
                  value={landingZoneLong}
                  onChange={this.handleChange}
                />
                <br/>
              </div>
            </div>
            <div className="description-container">
              <label>Description</label>
              <br/>
              <textarea
                className="form__field"
                name="landingZoneDescription form__field"
                type="text"
                value={landingZoneDescription}
                onChange={this.handleChange}
              />
              <br/>
              <br/>
              <br/>
            </div>
          </div>
          <div>
            <Button type="submit" startIcon={<SaveIcon/>} variant="contained" color="primary" size="">Create</Button>
          </div>
          <br/>
        </form>
      </div>
    );
  }
}
export default withAuth(AddExit);