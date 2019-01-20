import React, { Component } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import Login from './login';

import { connect } from 'react-redux';
import { logout } from '../actions/index';

class MyNavbar extends Component {
  constructor(props) {
    super(props);

    this.submitLogout = this.submitLogout.bind(this);
  }

  submitLogout() {
      this.props.logout();
  }

  render() {
    let login = (
        <Nav pullRight>
            <NavItem onClick={this.submitLogout}>Log Out</NavItem>
        </Nav>
    );
    if (!this.props.loggedIn) {
        login = (
            <Navbar.Form pullRight>
                <Login/>
            </Navbar.Form>
        );
    }

    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <div>IoT Garden</div>
                </Navbar.Brand>
            </Navbar.Header>
            {login}
        </Navbar>
    );
  }
}

export default connect(null, { logout })(MyNavbar);