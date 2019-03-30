import React, { Component } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { login } from '../../actions/register';

class Login extends Component {
  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(e) {
    e.preventDefault();
    const value = { text: this.refs.password.value };
    this.props.login(value);
  }

  render() {
    return (
        <>
            <Form className="form-inline">
                <Form.Group>
                    <InputGroup>
                        <input className="form-control" type="password" ref="password" placeholder="Password"/>
                        <InputGroup.Append>
                            <Button variant="outline-dark" type="submit" onClick={this.submitLogin}>
                              Login
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
          </Form>
        </>
    );
  }
}

export default connect(null, { login })(Login);