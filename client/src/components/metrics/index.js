import React, { Component } from 'react';

import Chart from './chart';
import MetricsControl from './control';

class Metrics extends Component {
    render() {
        return (
            <>
                <Chart history={this.props.model.history}/>
                <MetricsControl model={this.props.model}/>
            </>
        );
    }
}

export default Metrics;