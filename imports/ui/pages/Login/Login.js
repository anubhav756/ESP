import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {
  TextField,
  RaisedButton,
} from 'material-ui';
import Loader from '/imports/ui/components/Loader';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      errors: {},
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();

    let { username, password } = this.state;

    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      this.setState({
        errors: {
          username: !username ? 'Required' : null,
          password: !password ? 'Required' : null,
        },
      });
      return;
    }

    Meteor.loginWithPassword(
      username,
      password,
      _error => this.setState({ errors: { username: _error ? _error.reason : null } }),
    );
  }
  render() {
    const { loggingIn } = this.props;
    const { errors } = this.state;

    if (loggingIn) {
      return <Loader />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              floatingLabelText="Username"
              errorText={errors.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <TextField
              type="password"
              floatingLabelText="Password"
              errorText={errors.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <RaisedButton primary type="submit" label="Login" /> or <a href="/signup">Sign up</a>
        </form>
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
