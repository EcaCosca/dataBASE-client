import { Checkbox } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../context/auth-context';
// import Checkbox from '@material-ui/core/Checkbox'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
import Textfield from '@material-ui/core/Textfield'

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
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>

          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />

          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />

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

          <input type="submit" value="Signup" />
        </form>
        
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}



export default withAuth(Signup);


// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;