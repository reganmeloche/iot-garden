import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { login } from '../../actions/register';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: '',
        };
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        // Ensure fields are populated
        if (!this.state.username || !this.state.password) {
            this.setState({ errorMessage: 'Please enter a username and password.' });
            return;
        }
        this.setState({ errorMessage: ''});
        this.props.onLogin(this.state.username, this.state.password);     
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value});
    }

    renderError = () => {
        let result = null;
        let message = this.state.errorMessage || this.props.serverError; 

        if (message) {
            result = (<div className='register-error'>{message}</div>);
        }
        return result;
    }

    render() {
        return (
            <div className="login-form-container">
                <Form onSubmit={(e) => {this.handleSubmit(e)}}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" id="username" value={this.state.username} onChange={(e) => {this.handleChange(e)}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" value={this.state.password} onChange={(e) => {this.handleChange(e)}}/>
                    </Form.Group>

                    {this.renderError()}

                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </Form> 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        serverError: state.register.errorMessage
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (username, password) => dispatch(login(username, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
