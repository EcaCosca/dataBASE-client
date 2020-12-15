import React, { Component } from "react";
import { withAuth } from "../context/auth-context";
import axios from "axios";

// const aproachMap = <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47707.44372139716!2d1.8134470298467127!3d41.64028635447897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f5965e738c1d%3A0x400fae021a40550!2sCastellbell%20y%20Vilar%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1607773008058!5m2!1ses!2ses" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
// const exitMap = <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47707.44372139716!2d1.8134470298467127!3d41.64028635447897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f5965e738c1d%3A0x400fae021a40550!2sCastellbell%20y%20Vilar%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1607773008058!5m2!1ses!2ses" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
// const landinghMap = <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47707.44372139716!2d1.8134470298467127!3d41.64028635447897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f5965e738c1d%3A0x400fae021a40550!2sCastellbell%20y%20Vilar%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1607773008058!5m2!1ses!2ses" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
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
  getSingleExit = () => {
    const id = this.props.match.params.id;
    console.log("this propops", this.props);
    console.log("IDIDIDID", id);
    axios.get(`http://localhost:5000/exit/exitpoint/${id}`).then((response) => {
      const exit = response.data;
      console.log("exit", response);
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
        <h1>{name}</h1>
        {/* <h2>Jumps Counter: {jumpCount}</h2>
        <h2>Jumps from this exit: {jumpThisExitCount}</h2>
        <button onClick={this.handleClick}> 1+</button> */}
        {/* <h4>EXIT LAT AND LONG</h4> */}
        {/* EXIT IMAGE */}
        {/* <img src="exit.url"> </img> */}
        {exitLat}
        {exitLong}
        {this.state.isReady
          ? (<iframe width="650" height="450" src={`https://embed.windy.com/embed2.html?lat=${exitLat.toFixed(3)}lon=${exitLong.toFixed(3)}&detailLat=${exitLat.toFixed(3)}&detailLon=${exitLong.toFixed(3)}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`} frameborder="0"></iframe>)
          :"Loading"
        }
        
        
      </div>
    );
  }
}
export default withAuth(ExitDetail);