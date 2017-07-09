import React from 'react';
import PropTypes from 'prop-types';

function ImagePreview({ url, isThumbnail }) {
  return (
    <img src={url} alt={url} />
  );
}
ImagePreview.propTypes = {
  url: PropTypes.string.isRequired,
  isThumbnail: PropTypes.bool,
};
ImagePreview.defaultProps = {
  isThumbnail: false,
};

export default ImagePreview;
