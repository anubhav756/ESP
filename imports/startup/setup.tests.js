import { resetDatabase } from 'meteor/xolvio:cleaner';

if (Meteor.isTest) {
  Meteor.methods({
    'test.resetDatabase': () => resetDatabase(),
  });
}
