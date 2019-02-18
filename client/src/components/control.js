import moment from 'moment';
import React, { Component } from 'react';
import { Glyphicon, Button, Panel, FormGroup, InputGroup, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { readMoisture, water, } from '../actions/index';

class Control extends Component {
    handleReadMoisture = () => {
        this.props.onReadMoisture();
    }

    handleWater = () => {
        const value = parseInt(this.refs.water_secs.value);
        if (value >= 5 && value <= 15) {
            this.props.onWater(value * 1000);    
        }
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>Pump Info</Panel.Heading>
                <Panel.Body>
                    <div className="info-line">
                        <span className="info-label">
                            Moisture:
                        </span>
                        <span className="info-value">
                            {this.props.moistureValue}
                        </span>
                        <Button disabled={this.props.isLoading} bsSize="small" bsStyle="info" onClick={this.handleReadMoisture}>
                            <Glyphicon glyph="glyphicon glyphicon-refresh" />
                        </Button>
                    </div>

                    <div className="info-line">
                        <span className="info-label">
                            Last reading:
                        </span>
                        <span className="info-value">
                            {this.props.moistureDate}
                        </span>
                    </div>

                    <div className="info-line">
                        <span className="info-label">
                            Last watering:
                        </span>
                        <span className="info-value">
                            {this.props.waterDate}
                        </span>
                    </div>

                    <div className="info-line">
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Water time (sec)</InputGroup.Addon>
                                    <input placeholder="5 - 15" className="form-control" type="text" ref="water_secs" maxLength="2"/>
                                <InputGroup.Button>
                                    <Button disabled={this.props.isLoading} bsStyle="info" onClick={this.handleWater}>Water</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    let moistureValue = "--";
    let moistureDate = "--";
    let waterDate = "--";

    if (state.lastMoisture) {
        moistureValue = state.lastMoisture.value;
        moistureDate = moment(state.lastMoisture.date).format('M/D/YYYY, h:mm:ss a');
    }

    if (state.lastWater) {
        waterDate = moment(state.lastWater.date).format('M/D/YYYY, h:mm:ss a');
    }

    return {
        moistureValue,
        moistureDate,
        waterDate,
        isLoading: state.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReadMoisture: () => dispatch(readMoisture()),
        onWater: (ms) => dispatch(water(ms)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Control);
