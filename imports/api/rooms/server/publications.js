import { Meteor } from 'meteor/meteor';

import Rooms from '/imports/api/rooms/rooms';

Meteor.publish('currentRoom', function () {
  if (!this.userId) {
    throw new Meteor.Error(401, 'unauthorized');
  }

  // publish rooms with players containing the current user
  return Rooms.find({ players: { $eq: this.userId } });
});
