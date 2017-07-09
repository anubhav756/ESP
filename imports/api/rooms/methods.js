import { Meteor } from 'meteor/meteor';

import Rooms from './rooms';

Meteor.methods({
  'rooms.join'() {
    if (!Meteor.userId()) {
      throw new Meteor.Error(401, 'unauthorized');
    }

    if (!Rooms.find({ player: Meteor.userId() }).count()) {
      Rooms.insert({ player: Meteor.userId() });
    }
  },
  'rooms.leave'() {
    if (!Meteor.userId()) {
      throw new Meteor.Error(401, 'unauthorized');
    }

    Rooms.remove({ player: Meteor.userId() });
  },
});
