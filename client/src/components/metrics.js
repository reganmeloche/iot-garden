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

// Pond: http://software.es.net/pond/#/
// charts: http://software.es.net/react-timeseries-charts/#/

class Metrics extends Component {
    state = {
        highlight: null,
    };

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
            return [ new Date(x.date), x.value ];
        });

        return new TimeSeries({
            name: "AvB",
            columns: ["time", "value"],
            points
        });
    }

    buildWaterTS = (ts) => {
        const points = this.props.waterData.map(x => {
            return [ new Date(x.date), 200 ];
        })

        return new TimeSeries({
            name: "AvB",
            columns: ["time", "value"],
            points
        });
    }

    getChartRange() {
        const firstMoisture = new Date(this.props.moistureData[0].date);
        const firstWater = new Date(this.props.waterData[0].date);
        const begin = Math.min(firstMoisture, firstWater);
        
        const lastMoisture = new Date(this.props.moistureData[this.props.moistureData.length - 1].date);
        const lastWater = new Date(this.props.waterData[this.props.waterData.length - 1].date);
        const end = Math.max(lastMoisture, lastWater);

        return new TimeRange(begin, end);
    }

    render() {
        if (this.props.moistureData.length === 0) {
            return (<div>No data to show</div>);
        }

        const moistureTS = this.buildMoistureTS();
        const waterTS = this.buildWaterTS();
        const rng = this.getChartRange();

        const minMoisture = 200;
        const maxMoisture = 1200;

        return (
            <Panel>
                <Panel.Heading>History</Panel.Heading>
                <Panel.Body>
                    <Resizable>
                        <ChartContainer timeRange={rng}>
                            <ChartRow height="200">
                                <YAxis id="axis1" label="Moisture" min={minMoisture} max={maxMoisture} width="60" type="linear"/>
                                <Charts>
                                    <LineChart axis="axis1" series={moistureTS} column={["aud"]}/>
                                    
                                    <ScatterChart
                                        axis="axis1"
                                        series={waterTS}
                                        columns={["value"]}
                                        info={[{ label: "Action", value: "Watered" }]}
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
        moistureData: state.moistureData,
        waterData: state.waterData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchHistory: () => dispatch(fetchHistory()),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Metrics);

