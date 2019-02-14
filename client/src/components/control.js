import moment from 'moment';
import React, { Component } from 'react';
import { Glyphicon, Button, Panel } from 'react-bootstrap';

import { connect } from 'react-redux';
import { readMoisture, water, } from '../actions/index';

class Control extends Component {
    handleReadMoisture = () => {
        this.props.onReadMoisture();
    }

    handleWater = () => {
        this.props.onWater();
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
                        <a href="#" onClick={this.handleReadMoisture}>
                            <Glyphicon glyph="glyphicon glyphicon-refresh" />
                        </a>
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
                        <Button bsSize="large" bsStyle="info" onClick={this.handleWater}>Water</Button>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onReadMoisture: () => dispatch(readMoisture()),
        onWater: () => dispatch(water()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Control);
