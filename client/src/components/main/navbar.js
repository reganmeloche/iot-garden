import React, { Component } from 'react';
import { Navbar, Button, ButtonGroup, NavDropdown } from 'react-bootstrap';

import { connect } from 'react-redux';
import { logout } from '../../actions/register';

import RegisterModal from '../register/registerModal';

class MyNavbar extends Component {
  submitLogout = () => {
      this.props.logout();
  }

  render() {

    let register = (
        <ButtonGroup>
           <RegisterModal type='login'/>
           <RegisterModal type='signup'/>
       </ButtonGroup>
    );

    if (this.props.login) {
        let username = this.props.login.username;
        register = (
            <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item>
                    <Button variant="link" onClick={this.submitLogout}>Log Out</Button>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <RegisterModal username={username} type='changePassword'/>
                </NavDropdown.Item>
            </NavDropdown>
        ); 
    }

    return (
        <Navbar className="my-navbar justify-content-between">
            <Navbar.Brand>
                <div>IoT Garden</div>
            </Navbar.Brand>
            {register}        
        </Navbar>
    );
  }
}

export default connect(null, { logout })(MyNavbar);