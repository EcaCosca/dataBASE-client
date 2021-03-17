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
        {/* <br></br>
        <img src={companyLogo} alt="dataBASE logo" width="200" height="200"></img>
        <br></br> */}

        <div className="title-container">
          <h1 className="welcomeTo-title">Welcome back to,</h1>
          <h1 className="database-title">dataBASE</h1>
          <br></br>
        </div>

        <form onSubmit={this.handleFormSubmit}>
          
          <div className="form__group field">
            <input type="text" className="form__field" name="username" value={username} onChange={this.handleChange}/>
            <label className="form__label">
              Username
            </label>
          </div>
          <br></br>

          <div className="form__group field">
            <input className="form__field" type="password" name="password" value={password} onChange={this.handleChange} />
            <label className="form__label">Password</label>
          </div>
          <br></br>

          <input className="inputButton" type="submit" value="Log in" />
        </form>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default withAuth(Login);
