import React, { Component } from 'react';
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
        const moistureData = this.props.history.moistureData;
        const points = moistureData.map(x => {
            return [ new Date(x.date), x.value ];
        });

        return new TimeSeries({
            name: "AvB",
            columns: ["time", "value"],
            points
        });
    }

    buildWaterTS = (minVal) => {
        const waterData = this.props.history.waterData;
        const points = waterData.map(x => {
            return [ new Date(x.date), minVal ];
        })

        return new TimeSeries({
            name: "AvB",
            columns: ["time", "value"],
            points
        });
    }

    render() {
        const history = this.props.history;
        if (!history.moistureData || history.moistureData.length === 0) {
            return (<Alert variant="warning">No data to show. Please select different dates</Alert>);
        }

        if (history.moistureData.length > MAX_COUNT) {
            return (<Alert variant="warning">Too many results. Please narrow your timeframe.</Alert>);
        }

        const minMoisture = Math.min.apply(Math, history.moistureData.map(o  => o.value)) - 50;
        const maxMoisture = Math.max.apply(Math, history.moistureData.map(o  => o.value)) + 50;

        const moistureTS = this.buildMoistureTS();
        const waterTS = this.buildWaterTS(minMoisture);

        const start = moment(new Date(history.startDate)).valueOf();
        const end = moment(new Date(history.endDate)).valueOf();
        const rng = new TimeRange(start, end);

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
export default Chart;
