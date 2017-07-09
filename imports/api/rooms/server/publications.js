import { Meteor } from 'meteor/meteor';
import Rooms from '/imports/api/rooms/rooms';

Meteor.publish('currentRoom', function () {
  if (!this.userId) {
    throw new Meteor.Error(401, 'unauthorized');
  }

  return Rooms.find({ player: this.userId });
});
