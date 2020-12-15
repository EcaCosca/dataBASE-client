import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import AddExit from "./../components/AddExit";
import {withAuth} from "./../context/auth-context";

export class Home extends Component {
  state = {
    listOfExits: [],
  };
  
  componentDidMount() {
    this.getAllExits();
  }

  getAllExits = () => {
    axios.get(
      "http://localhost:5000/exit/exitpoint", 
      {withCredentials: true}
    ).then((response) => {
      this.setState({ listOfExits: response.data });
    });
  };

  render() {
    const { listOfExits } = this.state;
    return (
      <div>
        <h1>Exit Points</h1>
        <AddExit getAllExits={this.getAllExits}></AddExit>

        <div>
          {listOfExits.map((exit) => (
            <div key={exit._id}>
              <Link to={`/exitpoint/${exit._id}`}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="object"
                      height="140"
                      image={exit.img}
                      title="Exit image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {exit.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {exit.exitLong}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {exit.exitLat}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default withAuth(Home);