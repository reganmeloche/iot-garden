import React, { Component } from 'react';
import { Button, Form, InputGroup, } from 'react-bootstrap';
import moment from 'moment';

import { connect } from 'react-redux';
import { readMoisture, water, } from '../../actions/control';

import UnitModal from '../unit/modal';

const MIN_WATER_SEC = 5;
const MAX_WATER_SEC = 15;

class Control extends Component {
    handleReadMoisture = () => {
        this.props.onReadMoisture(this.props.model.id);
    }

    handleWater = () => {
        const value = parseInt(this.refs.water_secs.value);
        if (value >= MIN_WATER_SEC && value <= MAX_WATER_SEC) {
            this.props.onWater(this.props.model.id, value * 1000);    
        }
    }

    getDeviceData = () => {
        let result = {
            lastActive: '--',
            moistureReading: '--',
            lastMoistureDate: '--',
            lastWaterDate: '--',
        };

        const m = this.props.model;
        if (m.deviceData) {
            const d = m.deviceData;
            result.lastActive = this.datify(d.lastActive) || result.lastActive;
            result.moistureReading = d.moistureReading || result.moistureReading;
            result.lastMoistureDate = this.datify(d.lastMoistureDate) || result.lastMoistureDate;
            result.lastWaterDate = this.datify(d.lastWaterDate) || result.lastWaterDate;
        }
        return result;
    }

    datify = (date) => {
        return moment(date).format('M/D/YYYY, h:mm:ss a');
    } 

    render() {
        const deviceData = this.getDeviceData();
        return (<>
            <div className="info-line">
                <span className="info-label">
                    Moisture:
                </span>
                <span className="info-value">
                    {deviceData.moistureReading}
                </span>
                <Button 
                    className="read-moisture-button"
                    variant="outline-secondary" size="sm"
                    disabled={this.props.isLoading} 
                    onClick={this.handleReadMoisture}
                >
                    Read
                </Button>
            </div>
            
            <div className="info-line">
                <span className="info-label">
                    Polling Period:
                </span>
                <span className="info-value">
                    {this.props.model.pollingPeriodMinutes}
                </span>
            </div>
            
            <div className="info-line">
                <span className="info-label">
                    Last reading:
                </span>
                <span className="info-value">
                    {deviceData.lastMoistureDate}
                </span>
            </div>

            <div className="info-line">
                <span className="info-label">
                    Last watering:
                </span>
                <span className="info-value">
                    {deviceData.lastWaterDate}
                </span>
            </div>

            <div className="info-line">
                <span>
                    <span className="info-label">Notes:</span> 
                    <span className="info-value">{this.props.model.notes}</span>
                </span>
            </div>

            <div className="info-line">
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Water time (sec)
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                            <input 
                                placeholder={`${MIN_WATER_SEC} - ${MAX_WATER_SEC}`} 
                                className="form-control water-input" ref="water_secs" 
                                type="number" min={MIN_WATER_SEC} max={MAX_WATER_SEC}/>
                        <InputGroup.Append>
                            <Button variant="outline-primary" disabled={this.props.isLoading} onClick={this.handleWater}>Go!</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </div>
            
            <UnitModal 
                buttonSays="Edit" 
                buttonVar="outline-warning"
                model={this.props.model}
            />
        </>);
    }
}


const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReadMoisture: (id) => dispatch(readMoisture(id)),
        onWater: (id, ms) => dispatch(water(id, ms)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Control);
