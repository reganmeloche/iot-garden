import React, { Component } from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

import { connect } from 'react-redux';
import { fetchFullUnit, getDefaultDates } from '../../actions/units';

class MetricsControl extends Component {
    constructor(props) {
        super(props);
        const history = props.model.history;
        const [startDate, endDate] = getDefaultDates(history.startDate, history.endDate);
        this.state = {
            startDate,
            endDate
        };
    }

    fetchData = () => {
        this.props.fetchFullUnit(this.props.model.id, this.state.startDate, this.state.endDate);
    }

    onChangeStartDate = startDate => this.setState({ startDate });
    onChangeEndDate = endDate => this.setState({ endDate });

    render() {
        return (
            <div className="metrics-control">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Start</InputGroup.Text>
                    </InputGroup.Prepend>
                    <DateTimePicker
                        onChange={this.onChangeStartDate}
                        value={this.state.startDate}
                    />
                    <InputGroup.Prepend>
                        <InputGroup.Text>End</InputGroup.Text>
                    </InputGroup.Prepend>
                    <DateTimePicker
                        onChange={this.onChangeEndDate}
                        value={this.state.endDate}
                    />
                    <InputGroup.Append>
                        <Button size="sm" variant="outline-secondary" onClick={() => this.fetchData()}>Go</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFullUnit: (id, startDate, endDate) => dispatch(fetchFullUnit(id, startDate, endDate)),
    };
}

export default connect(null, mapDispatchToProps)(MetricsControl);
