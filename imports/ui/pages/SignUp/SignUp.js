import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import Loader from '/imports/ui/components/Loader';

class SignUp extends Component {
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
    const cPassword = this.cPassword.value.trim();

    if (!username || !password || !cPassword) {
      this.setState({ error: 'Please provide all the details' });
      return;
    }

    if (password !== cPassword) {
      this.setState({ error: 'Passwords do not match' });
      return;
    }

    Accounts.createUser({ username, password }, _error => this.setState({ error: _error ? _error.reason : '' }));
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
          <div>Confirm Password: <input ref={(i) => { this.cPassword = i; }} type="password" /></div>
          <button type="submit">Sign up</button>
        </form>
        <div style={{ color: 'red' }}>{error}</div>
        <a href="/login">Login</a>
      </div>
    );
  }
}
SignUp.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  // Redirect to app if already logged in
  if (!Meteor.loggingIn() && Meteor.userId()) {
    FlowRouter.go('App');
  }

  return { loggingIn: Meteor.loggingIn() };
}, SignUp);
