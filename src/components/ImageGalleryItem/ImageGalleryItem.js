import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    imgXL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  handleClick = evt => {
    const { imgXL, tags } = this.props;
    evt.preventDefault();

    this.props.toggleModal(imgXL, tags);
  };

  render() {
    const { img, tags } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={img}
          alt={tags}
          onClick={this.handleClick}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
