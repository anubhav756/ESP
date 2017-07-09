import React from 'react';
import PropTypes from 'prop-types';

function ImagePreview({ primary, secondary }) {
  return (
    <div>
      <img src={primary.url} alt={primary.url} />
      <div>
        {secondary.map(({ url }) => (
          <img
            src={url}
            alt={url}
            key={url}
            style={{
              width: 160,
              marginRight: 20,
            }}
          />
        ))}
      </div>
    </div>
  );
}
ImagePreview.propTypes = {
  primary: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  secondary: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
ImagePreview.defaultProps = {
  isThumbnail: false,
};

export default ImagePreview;
