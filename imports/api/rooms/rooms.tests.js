import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import _ from 'lodash';
import Rooms from './rooms';

Factory.define('room', Rooms, {
  players: () => [Random.id(), Random.id()],
  primary: () => Factory.create('image'),
  secondary: () => _.map(Array(5), () => Factory.create('image')),
  answers: () => ({ [Random.id()]: Random.id() }),
});

if (Meteor.isServer) {
  describe('Rooms collection', function () {
    beforeEach(function (done) {
      Meteor.call('test.resetDatabase', done);
    });

    it('creates a room', function () {
      Factory.create('room');
      assert.equal(Rooms.find().fetch().length, 1);
    });
    it('updates a room', function () {
      const room = Factory.create('room');
      assert.equal(Rooms.find().fetch().length, 1);
      room.primary = Factory.create('image');
      room.secondary = _.map(Array(5), () => Factory.create('image'));
      room.answers = {};
      Rooms.update({ _id: room._id }, { $set: room });
      assert.deepEqual(Rooms.findOne({ _id: room._id }), room);
    });
    it('deletes a room', function () {
      const room = Factory.create('room');
      assert.equal(Rooms.find().fetch().length, 1);
      Rooms.remove(room._id);
      assert.equal(Rooms.find().fetch().length, 0);
    });
  });
}
