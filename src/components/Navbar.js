import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button'


class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="navbar">
        <Link to={'/home'} id='home-btn'>
          <h4><HomeIcon/></h4>
        </Link>
        {this.props.isLoggedIn ? (
          <>
            <div className="userNameNavBar">
              <p>User: {this.props.user && this.props.user.username}</p>
            </div>
            <Button onClick={this.props.logout} variant="contained" color="primary" size="small">Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className="navbar-button" variant="contained" color="primary" size="small" >Login</Button>{' '}
            </Link>
            <br />
            <Link to="/signup">
              <Button className="navbar-button" variant="contained" color="primary" size="small" >Sign Up</Button>{' '}
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
