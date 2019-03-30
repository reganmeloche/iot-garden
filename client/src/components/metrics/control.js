import moment from 'moment';
import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { InputGroup, ButtonGroup, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { fetchHistory, } from '../../actions/index';

class MetricsControl extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        const yesterday = today.setDate(today.getDate() - 1);
        this.state = {
            startDate: new Date(yesterday),
            endDate: new Date(),
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        let startDate = moment(this.state.startDate).valueOf();
        let endDate = moment(this.state.endDate).valueOf();
        this.props.fetchHistory(this.props.model.id, startDate, endDate);
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
        fetchHistory: (id, startDate, endDate) => dispatch(fetchHistory(id, startDate, endDate)),
    };
}

export default connect(null, mapDispatchToProps)(MetricsControl);
