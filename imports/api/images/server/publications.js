import { Meteor } from 'meteor/meteor';
import Images from '/imports/api/images/images';

Meteor.publish('images', () => Images.find());
