import React, { Component } from 'react';
import { Row, Col, Card, Button, Collapse } from 'react-bootstrap';

import Control from '../control';
import Metrics from '../metrics/index';

class UnitPanel extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          open: (this.props.index === 0),
        };
    }

    render() {
        const { open } = this.state;

        const hideText = open ? "Hide" : "Show"; 
        const hideMe = (
            <Button 
                variant="outline-dark" size="sm" className="ml-2" 
                onClick={() => this.setState({ open: !open })}
            >
                {hideText}
            </Button>
        );

        return (
            <div className="unit-panel">
                <Card>
                    <Card.Header>{this.props.model.name} {hideMe}</Card.Header>
                    <Collapse in={this.state.open}>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Control model={this.props.model}/>
                                </Col>
                                <Col md={8}>
                                    <Metrics model={this.props.model}/>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

export default UnitPanel;
