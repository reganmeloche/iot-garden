import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { changePassword } from '../../actions/register';
import Utilities from './utilities';

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            password: '',
            newPassword: '',
            verifyNewPassword: '',
            errorMessage: '',
        };
    }
    
    handleSubmit = () => {
        // Ensure fields are populated
        if (!this.state.password || !this.state.newPassword) {
            this.setState({ errorMessage: 'Please enter current password.' });
            return;
        }
        // Validate password strength
        const validatePassword = Utilities.validatePassword(this.state.newPassword);
        if (validatePassword.error) {
            this.setState({errorMessage: validatePassword.error });
            return;
        }
        // Ensure passwords match
        if (this.state.newPassword !== this.state.verifyNewPassword) {
            this.setState({errorMessage: 'Passwords do not match.'});
            return;
        }
        this.setState({errorMessage: ''});
        this.props.onSubmit(this.state.username, this.state.password, this.state.newPassword);     
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
            <div className="change-password-form-container">
                <Form>
                    <Form.Group>
                        <Form.Label>Current password</Form.Label>
                        <Form.Control type="password" id="password" value={this.state.password} onChange={(e) => {this.handleChange(e)}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>New password</Form.Label>
                        <Form.Control type="password" id="newPassword" value={this.state.newPassword} onChange={(e) => {this.handleChange(e)}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Verify new password</Form.Label>
                        <Form.Control type="password" id="verifyNewPassword" value={this.state.verifyNewPassword} onChange={(e) => {this.handleChange(e)}}/>
                    </Form.Group>
                    {this.renderError()}

                    <Button variant="primary" type="button" onClick={() => {this.handleSubmit()}}>
                        Submit
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
        onSubmit: (username, password, newPassword) => dispatch(changePassword(username, password, newPassword)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
