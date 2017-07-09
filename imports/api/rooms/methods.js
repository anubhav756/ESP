import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import Rooms from './rooms';

/**
 * Helper method to remove the user from (all) the rooms
 * This method also removes the room if found empty
 * @param {String} userId, id of the user leaving room
 */
function leaveRoom(userId) {
  let currentRoom = Rooms.find({ players: { $eq: userId } }).fetch();
  currentRoom = currentRoom.length ? currentRoom[0] : null;

  if (currentRoom) {
    // remove player from current room
    currentRoom.players = _.filter(currentRoom.players, id => id !== userId);
    if (!currentRoom.players.length) {
      // remove the room if empty
      Rooms.remove({ _id: currentRoom._id });
      return;
    }

    Rooms.update({ _id: currentRoom._id }, currentRoom);
  }
}

// Make user leave room if it logs out or quits browser
UserPresence.onUserOffline(leaveRoom);

Meteor.methods({
  'rooms.join'() {
    if (!Meteor.userId()) {
      throw new Meteor.Error(401, 'unauthorized');
    }

    const availableRooms = _.filter(
      Rooms.find().fetch(),
      room => room.players && room.players.length === 1,
    );

    if (availableRooms.length) {
      const currentRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];

      // add the user into a random room from rooms with exactly 1 player (if available)
      currentRoom.players.push(Meteor.userId());
      Rooms.update({ _id: currentRoom._id }, currentRoom);
      return;
    }

    // create a new room if all other rooms are full
    Rooms.insert({ players: [Meteor.userId()] });
  },
  'rooms.leave'() {
    if (!Meteor.userId()) {
      throw new Meteor.Error(401, 'unauthorized');
    }

    leaveRoom(Meteor.userId());
  },
});
