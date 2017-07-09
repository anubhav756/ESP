import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Loader from '/imports/ui/components/Loader';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const username = this.username.value.trim();
    const password = this.password.value.trim();

    if (!username || !password) {
      this.setState({ error: 'Please provide all the details' });
      return;
    }

    Meteor.loginWithPassword(username, password, _error => this.setState({ error: _error ? _error.reason : '' }));
  }
  render() {
    const { loggingIn } = this.props;
    const { error } = this.state;

    if (loggingIn) {
      return <Loader />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>Username: <input ref={(i) => { this.username = i; }} /></div>
          <div>Password: <input ref={(i) => { this.password = i; }} type="password" /></div>
          <button type="submit">Login</button>
        </form>
        <div style={{ color: 'red' }}>{error}</div>
        <a href="/signup">Sign up</a>
      </div>
    );
  }
}
Login.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  // redirect to app if already logged in
  if (!Meteor.loggingIn() && Meteor.userId()) {
    FlowRouter.redirect('/');
  }

  return { loggingIn: Meteor.loggingIn() };
}, Login);
