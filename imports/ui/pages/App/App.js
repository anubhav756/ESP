import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';
import Image from '/imports/ui/components/Image';
import Loader from '/imports/ui/components/Loader';

import Rooms from '/imports/api/rooms/rooms';

function handleLogout() {
  Meteor.logout();
}

function handleJoinRoom() {
  Meteor.call('rooms.join');
}

function handleLeaveRoom() {
  Meteor.call('rooms.leave');
}

class App extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const url = this.urlInput.value.trim();

    Meteor.call('images.insert', url);
    this.urlInput.value = '';
  }
  render() {
    const { room, loggingIn } = this.props;
    console.log('room', room);

    if (loggingIn) {
      return <Loader />;
    }

    return (
      <div>
        <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
        {
          room ?
            <button onClick={handleLeaveRoom}>Exit game</button> :
            <button onClick={handleJoinRoom}>Start game</button>
        }
      </div>
    );
  }
}
App.propTypes = {
  room: PropTypes.shape({
    player: PropTypes.string.isRequired,
  }),
  loggingIn: PropTypes.bool.isRequired,
};
App.defaultProps = {
  room: null,
};

export default createContainer(() => {
  const visibleRooms = Rooms.find().fetch();

  // redirect to login page if not logged in
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    FlowRouter.redirect('/login');
  }

  Meteor.subscribe('currentRoom');

  return {
    room: visibleRooms && visibleRooms.length ? visibleRooms[0] : null,
    loggingIn: Meteor.loggingIn(),
  };
}, App);
