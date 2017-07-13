import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Paper,
  FlatButton,
  FloatingActionButton,
} from 'material-ui';
import Done from 'material-ui/svg-icons/action/done';
import styles from './styles';

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
  componentWillReceiveProps({ answers: { [Meteor.userId()]: correctSelected } }) {
    const { selected } = this.state;

    if (correctSelected !== selected) {
      this.setState({ selected: correctSelected });
    }
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
    const { primary, secondary, answers } = this.props;
    const { selected, waiting } = this.state;
    const otherSelected = _.reduce(
      answers,
      (result, value, key) => (key !== Meteor.userId() ? value : result),
      null,
    );

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
                  style={{
                    ...styles.secondary,
                    ...(selected === _id && styles.secondarySelected),
                  }}
                />
              </FlatButton>
              {selected && otherSelected === _id && <div style={styles.otherSelected} />}
            </Paper>
          ))}
        </div>
      </center>
    );
  }
}
/* eslint react/forbid-prop-types: 0 */
ImagePreview.propTypes = {
  primary: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  secondary: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  answers: PropTypes.object.isRequired,
  handleNextClick: PropTypes.func.isRequired,
};
ImagePreview.defaultProps = {
  isThumbnail: false,
};

export default ImagePreview;
