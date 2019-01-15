import React, { Component } from 'react';
import { Glyphicon, Button, Panel } from 'react-bootstrap';

import { connect } from 'react-redux';
import { readMoisture, water, } from '../actions/index';

class Control extends Component {
    constructor(props){
        super(props);
    }

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

    if (state.moisture) {
        moistureValue = state.moisture.value;
        moistureDate = state.moisture.readDate;
    }

    if (state.water) {
        waterDate = state.water.waterDate;
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
