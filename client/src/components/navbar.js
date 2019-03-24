import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Login from './login';

import { connect } from 'react-redux';
import { logout } from '../actions/index';

class MyNavbar extends Component {
  submitLogout = () => {
      this.props.logout();
  }

  render() {
    let login = (<Button variant="outline-dark" onClick={this.submitLogout}>Log Out</Button>);

    if (!this.props.loggedIn) {
        login = (<Login/>);
    }

    return (
        <Navbar className="my-navbar justify-content-between">
            <Navbar.Brand>
                <div>IoT Garden</div>
            </Navbar.Brand>
            {login}        
        </Navbar>
    );
  }
}

export default connect(null, { logout })(MyNavbar);