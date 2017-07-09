import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';
import Image from '/imports/ui/components/Image';
import Loader from '/imports/ui/components/Loader';

import Images from '/imports/api/images/images';

class App extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const url = this.urlInput.value.trim();

    Meteor.call('images.insert', url);
    this.urlInput.value = '';
  }
  render() {
    const { images, loggingIn } = this.props;

    if (loggingIn) {
      return <Loader />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={(r) => { this.urlInput = r; }} placeholder="add image url" />
        </form>
        {_.map(images, i => <Image key={i._id} image={i} />)}
      </div>
    );
  }
}
App.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  loggingIn: PropTypes.bool.isRequired,
};

export default createContainer(() => {
  // redirect to login page if not logged in
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    FlowRouter.redirect('/login');
  }

  Meteor.subscribe('images');

  return {
    images: Images.find({}, { sort: { url: 1 } }).fetch(),
    loggingIn: Meteor.loggingIn(),
  };
}, App);
