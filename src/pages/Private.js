import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import ExitPreview from './../components/ExitPreview';

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Private Route</h1>
        <h2>Welcome {this.props.user && this.props.user.username}</h2>
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}
        {/* <div>
          {this.state.articles.map((article) => <ExitPreview {...article} />)}
        </div> */}



      </div>
    );
  }
}


export default withAuth(Private);
