import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Images from './images';

Meteor.methods({
  'images.insert'(url) {
    check(url, String);

    Images.insert({ url });
  },
  'images.remove'(imageID) {
    check(imageID, String);

    Images.remove(imageID);
  },
});
