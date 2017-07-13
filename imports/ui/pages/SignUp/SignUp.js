import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import {
  TextField,
  RaisedButton,
} from 'material-ui';
import Loader from '/imports/ui/components/Loader';
import styles from './styles';

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      cPassword: '',
      errors: {},
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCPasswordChange = this.handleCPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleCPasswordChange(e) {
    this.setState({ cPassword: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();

    let { username, password, cPassword } = this.state;

    username = username.trim();
    password = password.trim();
    cPassword = cPassword.trim();

    if (!username || !password || !cPassword) {
      this.setState({
        errors: {
          username: !username ? 'Required' : null,
          password: !password ? 'Required' : null,
          cPassword: !cPassword ? 'Required' : null,
        },
      });
      return;
    }

    if (password !== cPassword) {
      this.setState({
        errors: {
          cPassword: 'Passwords do not match',
        },
      });
      return;
    }

    Accounts.createUser(
      { username, password },
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
      <center style={styles.container}>
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
          <div>
            <TextField
              type="password"
              floatingLabelText="Confirm Password"
              errorText={errors.cPassword}
              onChange={this.handleCPasswordChange}
            />
          </div>
          <RaisedButton primary type="submit" label="Sign up" style={styles.submit} />
          {' or '}<a href="/login" style={styles.link}>Login</a>
        </form>
      </center>
    );
  }
}
SignUp.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  // redirect to app if already logged in
  if (!Meteor.loggingIn() && Meteor.userId()) {
    FlowRouter.redirect('/');
  }

  return { loggingIn: Meteor.loggingIn() };
}, SignUp);
