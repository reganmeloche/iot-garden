import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { connect } from 'react-redux';
import { clearRegister } from '../../actions/register';

import LoginForm from './loginForm';
import SignupForm from './signupForm';
import ChangePasswordForm from './changePasswordForm';

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleClose = () => {
        this.setState({ show: false });
        this.props.onClearRegister();
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        // Login
        let title = 'Log in';
        let theForm = (<LoginForm cancel={this.handleClose}/>);
        let variant = 'outline-primary';

        // Signup
        if (this.props.type === 'signup') {
            title = 'Sign up';
            theForm = (<SignupForm cancel={this.handleClose}/>);
        }

        // Change Password
        if (this.props.type === 'changePassword') {
            title = 'Change Password';
            theForm = (<ChangePasswordForm 
                username={this.props.username}
                cancel={this.handleClose}/>);
            variant = 'link';
        }

        return (
            <>
                <Button variant={variant} onClick={this.handleShow}>
                    {title}
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {theForm}
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearRegister: () => dispatch(clearRegister()),
    };
}

export default connect(null, mapDispatchToProps)(RegisterModal);