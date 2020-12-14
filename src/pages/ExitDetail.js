import React, { Component } from "react";
import { withAuth } from '../context/auth-context';
import axios from "axios"


const windyWeatherForecast = <iframe width="650" height="450" src="https://embed.windy.com/embed2.html?lat={exit.exitLat}lon={exit.exitLong}&detailLat={exit.exitLat}&detailLon={exit.exitLong}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0"></iframe>
// const aproachMap = <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47707.44372139716!2d1.8134470298467127!3d41.64028635447897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f5965e738c1d%3A0x400fae021a40550!2sCastellbell%20y%20Vilar%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1607773008058!5m2!1ses!2ses" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
// const exitMap = <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47707.44372139716!2d1.8134470298467127!3d41.64028635447897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f5965e738c1d%3A0x400fae021a40550!2sCastellbell%20y%20Vilar%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1607773008058!5m2!1ses!2ses" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
// const landinghMap = <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47707.44372139716!2d1.8134470298467127!3d41.64028635447897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4f5965e738c1d%3A0x400fae021a40550!2sCastellbell%20y%20Vilar%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1607773008058!5m2!1ses!2ses" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>



class ExitDetail extends Component {
  state = {
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
    // jumpCount: 0,
    // jumpThisExitCount: 0,
  };

  componentDidMount() {
    this.getSingleExit()
  }

  getSingleExit = () => {
    const {id} = this.props.match.params

    axios.get(`http://localhost:5000/exit/exitpoint/${id}`)
    .then((response) => {
      this.setState({listOfExits: response.data})
    })


    
  } 

  // handleClick = () => {
    // UPDATE JUMP COUNT
    //   const updatedCount = this.state.jumpCount + 1;
    // UPDATE JUMP FROM THIS EXIT COUNT
    //   const updatedExitCount = this.state.jumpThisExitCount + 1;

    //   this.setState( { jumpCount: updatedCount, jumpThisExitCount: updatedExitCount })
  // }


  render() {
    const { name, img, aproachLat, aproachLong, aproachDescription, exitLat, exitLong, exitDescription, landingZoneLat, landingZoneLong, landingZoneDescription, creator, altitude } = this.state;

    return (
      <div>
        <h1>
          {name}
        </h1>

        {/* <h2>Jumps Counter: {jumpCount}</h2>
        <h2>Jumps from this exit: {jumpThisExitCount}</h2>
        <button onClick={this.handleClick}> 1+</button> */}

        {/* <h4>EXIT LAT AND LONG</h4> */}


        {/* EXIT IMAGE */}
        {/* <img src="exit.url"> </img> */}

        {windyWeatherForecast}




        




        {/* <h2>Welcome {this.props.exit && this.props.user.username}</h2> */}
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}
        {/* <div>
          {this.state.articles.map((article) => <ExitPreview {...article} />)}
        </div> */}



      </div>
    );
  }
  componentDidMount() {}
}


export default withAuth(ExitDetail);
