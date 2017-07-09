import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Rooms from '/imports/api/rooms/rooms';
import Images from './images';

/**
 * returns a random image from db
 * based on the specified condition object
 * @param {Object} condition mongodb specific condition object
 */
function findRandomImage(condition = {}) {
  return Images.find(condition, {
    limit: -1,
    skip: Math.floor(
      Math.random() *
      Images.find(condition).count(),
    ),
  }).fetch()[0];
}

Meteor.methods({
  'images.createQuestion'(roomId) {
    check(roomId, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error(401, 'unauthorized');
    }

    const currentRoom = Rooms.findOne({ _id: roomId });

    if (!currentRoom) {
      throw new Meteor.Error(404, 'room not found');
    }

    // to prevent duplicate images
    const usedImages = [];

    // use a random image as primary
    const primary = findRandomImage();
    usedImages.push(primary._id);

    const secondary = [];

    // use 4 random and unrelated images as secondary images
    for (let i = 0; i < 4; i += 1) {
      secondary.push(findRandomImage({
        _id: { $nin: usedImages },
        tags: { $nin: primary.tags },
      }));
      usedImages.push(secondary[i]._id);
    }

    // find a random but related image as one of the secondary images
    // and put it at a random index in secondary images array
    secondary.splice(
      Math.floor(Math.random() * secondary.length),
      0,
      findRandomImage({
        _id: { $nin: usedImages },
        tags: { $in: primary.tags },
      }),
    );

    Rooms.update({ _id: currentRoom._id }, { ...currentRoom, primary, secondary });
  },
  'images.submitAnswer'(imageId, roomId) {
    check(imageId, String);
    check(roomId, String);

    const currentRoom = Rooms.findOne({ _id: roomId });
    if (!currentRoom) {
      throw new Meteor.Error(404, 'room not found');
    }

    const currenImage = Images.findOne({ _id: imageId });
    if (!currenImage) {
      throw new Meteor.Error(404, 'image not found');
    }

    // TODO: compare answers
  },
});
