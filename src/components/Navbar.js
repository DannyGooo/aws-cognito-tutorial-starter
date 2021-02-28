import React, { Component } from 'react'
import { Auth } from 'aws-amplify';
import Typography from '@material-ui/core/Typography';

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <Typography style={{fontWeight:"900", fontSize:"20px", color:"#00d1b2" }}>GP Management</Typography>  
          </a>
          {/* <div style={{display:"inline-block", color: "lightblue", paddingRight:"30px" }}>
            <Typography style={{fontWeight:"900", fontSize:"20px" }}>GP Management</Typography>         
          </div> */}
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {/* <a href="/" className="navbar-item">
              Home
            </a> */}
            <a href="/clinics" className="navbar-item">
              Clinics
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {this.props.auth.isAuthenticated ? 
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log out
                  </a>
                 : 
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
