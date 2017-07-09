import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImagePreview extends Component {
  constructor() {
    super();

    this.state = {
      selected: null,
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }
  handleImageClick(selected) {
    this.setState({ selected });
  }
  handleNextClick() {
    const { handleNextClick } = this.props;
    const { selected } = this.state;

    handleNextClick(selected);
  }
  render() {
    const { primary, secondary } = this.props;
    const { selected } = this.state;

    return (
      <div>
        <img src={primary.url} alt={primary.url} />
        <div>
          {secondary.map(({ _id, url }) => (
            <a
              key={_id}
              role="button"
              tabIndex="0"
              onClick={() => this.handleImageClick(_id)}
              style={{ marginRight: 20 }}
            >
              <img
                src={url}
                alt={url}
                width={160}
                style={
                  selected === _id ?
                    { border: '2px solid red', opacity: 0.4 } :
                    { margin: 2 }
                }
              />
            </a>
          ))}
        </div>
        {
          selected &&
          <button onClick={this.handleNextClick}>Next</button>
        }
      </div>
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
