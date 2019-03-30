import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchUser } from './actions/register';

import MyNavbar from './components/main/navbar';
import Dashboard from './components/main/dashboard';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		let dashboard = null;
		if (this.props.loggedIn) {
			dashboard = (<Dashboard/>);
		}

		return (
			<div className="App">
				<MyNavbar loggedIn={this.props.loggedIn}/>
				<div>{dashboard}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.loggedIn || false,
	};
}

export default connect(mapStateToProps, { fetchUser })(App);