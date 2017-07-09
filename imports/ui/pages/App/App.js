import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import ImagePreview from '/imports/ui/components/ImagePreview';
import Loader from '/imports/ui/components/Loader';

import Rooms from '/imports/api/rooms/rooms';

function handleLogout() {
  Meteor.logout();
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      joiningRoom: false,
    };

    this.handleJoinRoom = this.handleJoinRoom.bind(this);
    this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
  }
  handleJoinRoom() {
    this.setState({ joiningRoom: true });
    Meteor.call('rooms.join', () => {
      this.setState({ joiningRoom: false });
    });
  }
  handleLeaveRoom() {
    this.setState({ joiningRoom: true });
    Meteor.call('rooms.leave', () => {
      this.setState({ joiningRoom: false });
    });
  }
  render() {
    const { room, loggingIn } = this.props;
    const { joiningRoom } = this.state;
    let buttonLabel = 'Please wait...';
    if (!joiningRoom) {
      buttonLabel = room ? 'Exit game' : 'Start game';
    }

    if (loggingIn) {
      return <Loader />;
    }

    return (
      <div>
        <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
        <button
          onClick={room ? this.handleLeaveRoom : this.handleJoinRoom}
          disabled={joiningRoom}
        >
          {buttonLabel}
        </button>
        {
          room && room.primary &&
          <ImagePreview primary={room.primary} secondary={room.secondary} />
        }
      </div>
    );
  }
}
App.propTypes = {
  room: PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.string).isRequired,
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
