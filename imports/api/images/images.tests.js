import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import faker from 'faker';
import Images from './images';

Factory.define('image', Images, {
  url: () => faker.image.imageUrl(),
  tags: () => [faker.lorem.word()],
});

if (Meteor.isServer) {
  describe('Images collection', function () {
    beforeEach(function (done) {
      Meteor.call('test.resetDatabase', done);
    });

    it('creates an image', function () {
      Factory.create('image');
      assert.equal(Images.find().fetch().length, 1);
    });
  });
}
