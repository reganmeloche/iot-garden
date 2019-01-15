import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Metrics extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>History</Panel.Heading>
                <Panel.Body>
                    Charty chart
                </Panel.Body>
            </Panel>

        );
    }

}


export default Metrics;