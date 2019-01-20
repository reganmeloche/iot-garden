import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { fetchUser } from './actions/index';

import MyNavbar from './components/navbar';
import Dashboard from './components/dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    let dash = null;
    if (this.props.loggedIn) {
      dash = (
        <Dashboard/>
      );
    }

    return (
      <div className="App">
        <MyNavbar loggedIn={this.props.loggedIn}/>
        <div>
          {dash}
        </div>
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