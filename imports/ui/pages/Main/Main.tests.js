import React from 'react';
import renderer from 'react-test-renderer';
import { assert } from 'meteor/practicalmeteor:chai';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main';
import snapshot from './snapshot.json';

if (Meteor.isClient) {
  describe('Main container', function () {
    it('renders correctly', () => {
      const tree = renderer.create(
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>,
      ).toJSON();
      assert.equal(
        JSON.stringify(tree),
        JSON.stringify(snapshot),
        'Snapshots do not match (did you forget to update snapshot?)',
      );
    });
  });
}
