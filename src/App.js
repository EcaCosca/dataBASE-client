import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ExitDetail from "./pages/ExitDetail";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <Switch>
          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/exitpoint/:id" component={ExitDetail} />
        </Switch>
      </div>
    );
  }
}
export default App;