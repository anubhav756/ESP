import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Images from '/imports/api/images/images';

class Image extends Component {
  constructor() {
    super();

    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    const { image: { _id } } = this.props;

    Images.remove(_id);
  }
  render() {
    const { image: { url } } = this.props;

    return (
      <div>
        {url}
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}
Image.propTypes = {
  image: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Image;
