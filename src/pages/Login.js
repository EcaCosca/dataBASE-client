import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import companyLogo from '../images/logoTransparente.png';


class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="loginDiv">
        <br></br>
        <img src={companyLogo} alt="dataBASE logo" width="200" height="200"></img>
        <br></br>
        <h2>Log in</h2>
        <br></br>

        <form onSubmit={this.handleFormSubmit}>
          
          <label>Username:</label>
          <br></br>
          <br></br>
          <input className="inputAuthForms" type="text" name="username" value={username} onChange={this.handleChange}/>
          <br></br>
          <br></br>
          <br></br>

          <label>Password:</label>
          <br></br>
          <br></br>
          <input className="inputAuthForms" type="password" name="password" value={password} onChange={this.handleChange} />
          <br></br>
          <br></br>
          <br></br>

          <input className="inputButton" type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
