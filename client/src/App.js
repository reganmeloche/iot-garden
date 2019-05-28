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
		if (this.props.login) {
			dashboard = (<Dashboard/>);
		}

		return (
			<div className="App">
				<MyNavbar login={this.props.login}/>
				<div>{dashboard}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		login: state.login,
	};
}

export default connect(mapStateToProps, { fetchUser })(App);