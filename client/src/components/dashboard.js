import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Control from './control';
import Metrics from './metrics';


class Dashboard extends Component {
    render() {
        return (
            <div id='dashboard'>
                <Grid>
                    <Row className="show-grid">
                        <Col md={4}>
                            <Control/>
                        </Col>
                        <Col md={8}>
                            <Metrics/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}



export default Dashboard;
