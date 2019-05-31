import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { fetchFullUnits } from '../../actions/units';
import { registerUnits } from '../../actions/register';

import UnitModal from '../unit/modal';
import UnitPanel from './unitPanel';

class Dashboard extends Component {
    componentWillMount() {
        this.props.onRegisterUnits();
        this.props.onFetchFullUnits();
    }

    renderUnits = () => {
        var res = this.props.units.map((x, i) => {
            return (<UnitPanel model={x} key={x.id} index={i}/>);
        });
        return (<>{res}</>);
    }

    render() {
        return (
            <div id='dashboard'>
                <Row className="show-grid">
                    <Col md={12}>
                        {this.renderUnits()}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col md={2}>
                        <UnitModal 
                            buttonSays="New Unit"
                            buttonVar="outline-success"
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        units: state.units,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFullUnits: () => dispatch(fetchFullUnits()),
        onRegisterUnits: () => registerUnits(),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
