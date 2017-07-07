import React from 'react';
import PropTypes from 'prop-types';

function Loader({ message }) {
  return <div>{message}</div>;
}
Loader.propTypes = {
  message: PropTypes.string,
};
Loader.defaultProps = {
  message: 'Logging in...',
};

export default Loader;
