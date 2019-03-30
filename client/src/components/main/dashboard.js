import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { fetchUnits } from '../../actions/units';

import UnitModal from '../unit/modal';
import UnitPanel from './unitPanel';

class Dashboard extends Component {
    componentWillMount() {
        this.props.onFetchUnits();
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
        onFetchUnits: () => dispatch(fetchUnits()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
