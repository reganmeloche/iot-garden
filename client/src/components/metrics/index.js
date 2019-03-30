import React, { Component } from 'react';

import Chart from './chart';
import MetricsControl from './control';

class Metrics extends Component {
    render() {
        return (
            <>
                <Chart model={this.props.model}/>
                <MetricsControl model={this.props.model}/>
            </>
        );
    }
}

export default Metrics;