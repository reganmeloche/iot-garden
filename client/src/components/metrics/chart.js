import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import moment from 'moment';
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

const MAX_COUNT = 500;

// Pond: http://software.es.net/pond/#/
// charts: http://software.es.net/react-timeseries-charts/#/

class Chart extends Component {
    state = {
        highlight: null,
    };

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

    render() {
        if (this.props.moistureData.length === 0) {
            return (<Alert variant="warning">No data to show. Please select different dates</Alert>);
        }

        if (this.props.moistureData.length > MAX_COUNT) {
            return (<Alert variant="warning">Too many results. Please narrow your timeframe.</Alert>);
        }

        const moistureTS = this.buildMoistureTS();
        const waterTS = this.buildWaterTS();
        const rng = new TimeRange(this.props.startDate, this.props.endDate);

        const minMoisture = 200;
        const maxMoisture = 1200;

        return (
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

        );
    }
}


const mapStateToProps = state => {
    let moistureData = [];
    let waterData = [];
    let startDate = moment().valueOf();
    let endDate = moment().valueOf();

    if (state.history) {
        moistureData = state.history.moistureData;
        waterData = state.history.waterData;
        startDate = state.history.startDate;
        endDate = state.history.endDate;
    }
    return {
        moistureData,
        waterData,
        startDate,
        endDate,
    };
}

export default connect(mapStateToProps, null)(Chart);

