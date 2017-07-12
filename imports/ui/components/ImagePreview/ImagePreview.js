import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  FlatButton,
  FloatingActionButton,
} from 'material-ui';
import Done from 'material-ui/svg-icons/action/done';

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
            style={{
              position: 'fixed',
              bottom: 30,
              right: 30,
            }}
          >
            <Done />
          </FloatingActionButton>
        }
        <Paper zDepth={5} style={{ width: 600, height: 400 }}>
          <img src={primary.url} alt={primary.url} style={{ borderRadius: 2 }} />
        </Paper>
        <div style={{ marginTop: 40, display: 'inline-block' }}>
          {secondary.map(({ _id, url }) => (
            <Paper
              key={_id}
              zDepth={selected === _id ? 0 : 3}
              style={{ marginRight: 20, marginTop: 20, float: 'left', height: 107 }}
            >
              <FlatButton
                onClick={() => this.handleImageClick(_id)}
                style={{ width: 160, height: 107 }}
              >
                <img
                  src={url}
                  alt={url}
                  width={160}
                  style={{ borderRadius: 2, opacity: selected === _id ? 0.4 : 1 }}
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
