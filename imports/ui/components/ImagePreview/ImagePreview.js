import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  FlatButton,
  FloatingActionButton,
} from 'material-ui';
import Done from 'material-ui/svg-icons/action/done';

import styles from './style.js';

class ImagePreview extends Component {
  constructor() {
    super();

    this.state = {
      selected: null,
      waiting: false,
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }
  handleImageClick(selected) {
    this.setState({ selected, waiting: false });
  }
  handleNextClick() {
    const { handleNextClick } = this.props;
    const { selected } = this.state;

    handleNextClick(selected);
    this.setState({ waiting: true });
  }
  render() {
    const { primary, secondary } = this.props;
    const { selected, waiting } = this.state;

    return (
      <center>
        {
          selected &&
          <FloatingActionButton
            disabled={waiting}
            onClick={this.handleNextClick}
            style={styles.nextButton}
          >
            <Done />
          </FloatingActionButton>
        }
        <Paper zDepth={5} style={styles.primaryContainer}>
          <img src={primary.url} alt={primary.url} style={styles.primary} />
        </Paper>
        <div style={styles.secondaryWrapper}>
          {secondary.map(({ _id, url }) => (
            <Paper
              key={_id}
              zDepth={selected === _id ? 0 : 3}
              style={styles.secondaryContainer}
            >
              <FlatButton
                onClick={() => this.handleImageClick(_id)}
                style={styles.secondaryButton}
              >
                <img
                  src={url}
                  alt={url}
                  width={160}
                  style={styles.secondary(selected === _id)}
                />
              </FlatButton>
            </Paper>
          ))}
        </div>
      </center>
    );
  }
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
  handleNextClick: PropTypes.func.isRequired,
};
ImagePreview.defaultProps = {
  isThumbnail: false,
};

export default ImagePreview;
