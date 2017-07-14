import React from 'react';
import renderer from 'react-test-renderer';
import { assert } from 'meteor/practicalmeteor:chai';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ImagePreview from './ImagePreview';
import snapshot from './snapshot.json';

if (Meteor.isClient) {
  describe('Image Preview component', function () {
    it('renders correctly', () => {
      const room = Factory.create('room');
      const tree = renderer.create(
        <MuiThemeProvider>
          <ImagePreview
            primary={room.primary}
            secondary={room.secondary}
            answers={room.answers}
            handleNextClick={() => { }}
          />
        </MuiThemeProvider>,
      ).toJSON();
      assert.equal(
        JSON.stringify(tree),
        JSON.stringify(snapshot),
        'Snapshots do not match (did you forget to update snapshot)'
      );
    });
  });
}
