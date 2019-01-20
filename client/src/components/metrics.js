import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

import { fetchHistory, } from '../actions/index';

import { TimeSeries, TimeRange } from "pondjs";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable,
    ScatterChart,
} from "react-timeseries-charts";

const moment = require('moment');

// Pond: http://software.es.net/pond/#/
// charts: http://software.es.net/react-timeseries-charts/#/

class Metrics extends Component {
    state = {
        highlight: null,
    };

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchHistory();
    }

    handleMouseNear = point => {
        this.setState({
            highlight: point
        });
    };

    buildMoistureTS = () => {
        const points = this.props.moistureData.map(x => {
            return [ new Date(x.readDate), x.value ];
        });

        return new TimeSeries({
            name: "AvB",
            columns: ["time", "value"],
            points
        });
    }

    buildWaterTS = (ts) => {
        const points = this.props.waterData.map(x => {
            return [ x, 0 ];
        })

        return new TimeSeries({
            name: "AvB",
            columns: ["time", "value"],
            points
        });
    }

    render() {
        if (this.props.moistureData.length == 0 || this.props.waterData.length == 0) {
            return (<div>No data to show</div>);
        }

        const moistureTS = this.buildMoistureTS();
        const waterTS = this.buildWaterTS();
        
        var begin = this.props.moistureData[0].readDate;
        var end = this.props.moistureData[this.props.moistureData.length - 1].readDate;
        var rng = new TimeRange(begin, end);

        return (
            <Panel>
                <Panel.Heading>History</Panel.Heading>
                <Panel.Body>
                    <Resizable>
                        <ChartContainer timeRange={rng}>
                            <ChartRow height="200">
                                <YAxis id="axis1" label="Moisture" min={0} max={100} width="60" type="linear"/>
                                <Charts>
                                    <LineChart axis="axis1" series={moistureTS} column={["aud"]}/>
                                    
                                    <ScatterChart
                                        axis="axis1"
                                        series={waterTS}
                                        columns={["value"]}
                                        info={'Watered!'}
                                        infoHeight={28}
                                        infoWidth={110}
                                        infoStyle={{
                                            fill: "black",
                                            color: "#DDD"
                                        }}
                                        onMouseNear={p => this.handleMouseNear(p)}
                                        highlight={this.state.highlight}
                                        radius={4}
                                    />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Resizable>
                </Panel.Body>
            </Panel>

        );
    }
}


const mapStateToProps = state => {
    return {
        moistureData: state.history.moistureData,
        waterData: state.history.waterData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHistory: () => dispatch(fetchHistory()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Metrics);

