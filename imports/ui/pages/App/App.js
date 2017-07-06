import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { createContainer } from 'meteor/react-meteor-data';
import Images from '/imports/api/images/images';

class App extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const url = this.urlInput.value.trim();

    Images.insert({ url });
    this.urlInput.value = '';
  }
  render() {
    const { images } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={(r) => { this.urlInput = r; }} placeholder="add image url" />
        <div>{_.join(_.map(images, i => i.url), ', ')}</div>
      </form>
    );
  }
}
App.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default createContainer(() => ({
  images: Images.find({}, { sort: { url: 1 } }).fetch(),
}), App);
