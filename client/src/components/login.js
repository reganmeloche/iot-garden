import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { login } from '../actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin() {
    const value = { text: this.refs.password.value };
    this.props.login(value);
  }

  render() {
    return (
        <div>
            <Form>
                <FormGroup>
                    <InputGroup>
                        <input className="form-control" type="password" ref="password" placeholder="Password"/>
                        <InputGroup.Button>
                            <Button type="button" onClick={this.submitLogin}>Login</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
          </Form>
        </div>
    );
  }
}

export default connect(null, { login })(Login);