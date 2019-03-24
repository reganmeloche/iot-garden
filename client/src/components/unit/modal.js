import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UnitForm from './form';

class UnitModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Button variant={this.props.buttonVar} onClick={this.handleShow}>
                    {this.props.buttonSays}
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Unit Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UnitForm 
                            model={this.props.model}
                            cancel={this.handleClose}
                        />
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default UnitModal;
