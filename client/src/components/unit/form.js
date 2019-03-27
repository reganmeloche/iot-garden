import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { createUnit, updateUnit } from '../../actions/index';

import { mainFile } from '../../download/template';

class UnitForm extends Component {
    constructor(props) {
        super(props);

        if (this.props.model) {
            this.state = {
                id: this.props.model.id,
                name: this.props.model.name,
                notes: this.props.model.notes,
                pollingPeriodMinutes: this.props.model.pollingPeriodMinutes,
                validation: {}
            }
        } else {
            this.state = {
                name: '',
                notes: '',
                pollingPeriodMinutes: 10,
                validation: {}
            };
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.cancel();
        const unit = {
            name: this.state.name,
            notes: this.state.notes,
            pollingPeriodMinutes: this.state.pollingPeriodMinutes,
        };

        if (this.state.id) {
            this.props.onUpdateUnit(this.state.id, unit);
        } else {
            this.props.onCreateUnit(unit);
        }      
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value});
    }

    createFile = () => {
        const fileString = mainFile;
        const replaced = fileString
            .replace(/{{UNIT_ID}}/g, this.state.id)
            .replace('{{POLLING_PERIOD}}', this.props.model.pollingPeriodMinutes);
        const encoded = encodeURIComponent(replaced);
        const result = `data:text/plain;charset=utf-8,${encoded}`;
        return result;
    }

    renderLink = () => {
        const filename = this.props.model.name.trim().split(' ').join('_') + '.ino';
        
        const fileString = mainFile;
        const replaced = fileString
            .replace(/{{UNIT_ID}}/g, this.state.id)
            .replace('{{POLLING_PERIOD}}', this.props.model.pollingPeriodMinutes);
        const encoded = encodeURIComponent(replaced);
        const contents = `data:text/plain;charset=utf-8,${encoded}`;
        
        const result = (
            <a className="download-link" 
                href={contents} 
                download={filename}>
                Download file
            </a>
        )
        return result;
    }

    render() {
        const downloadLink = this.state.id ? this.renderLink() : null;

        return (
            <div className="unit-form-container">
                <Form onSubmit={(e) => {this.handleSubmit(e)}}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" id="name" value={this.state.name} onChange={(e) => {this.handleChange(e)}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Polling Period (minutes)</Form.Label>
                        <Form.Control type="number" id="pollingPeriodMinutes" value={this.state.pollingPeriodMinutes} onChange={(e) => {this.handleChange(e)}}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows="3" id="notes" value={this.state.notes} onChange={(e) => {this.handleChange(e)}}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                    {downloadLink}
                </Form>
                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateUnit: (model) => dispatch(createUnit(model)),
        onUpdateUnit: (id, model) => dispatch(updateUnit(id, model)),
    };
}

export default connect(null, mapDispatchToProps)(UnitForm);
