import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">LogBook</h1>
                <p className="lead">
                  {' '}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/adminlogin" className="btn btn-lg btn-info mr-2">
                  Admin Login
                </Link>
                <Link to="/create" className="btn btn-lg btn-light">
                  User Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
