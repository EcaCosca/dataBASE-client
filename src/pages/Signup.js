import { Checkbox } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../context/auth-context';
// import Checkbox from '@material-ui/core/Checkbox'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
import Textfield from '@material-ui/core/Textfield'
import companyLogo from '../images/logoTransparente.png';

class Signup extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    
    this.props.signup( username, password );
    this.setState({
      username: "",
      password: "",
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    // const [checked, setChecked] = React.useState(true)
    return (
      <div>
        {/* <img src={companyLogo} alt="dataBASE logo" width="200" height="200"></img> */}
        
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>

          <input className="inputAuthForms inputFormsSignUp" type="text" name="username" placeholder="USER" value={username} onChange={this.handleChange} />
          <br></br>
          <input className="inputAuthForms inputFormsSignUp" type="password" name="password" placeholder="PASSWORD" value={password} onChange={this.handleChange} />
          <br></br>

          {/* <FormControlLabel
            control={<Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              inputProps={{
                'aria-label': 'secondary checkbox'
              }}
            />}
            label="Testing Checkbox"
          /> */}

          <input className="inputButton" type="submit" value="Signup" />
        </form>
        
        <br></br>
        <p className="a">Already have account?</p>
        <br></br>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}



export default withAuth(Signup);


// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;