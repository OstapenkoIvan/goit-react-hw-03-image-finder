import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  static propTypes = {
    inputData: PropTypes.arrayOf(
      PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        tags: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
  };

  //   if (e) {
  //     this.setState(prevState => {
  //       return {
  //         page: prevState.page + 1,
  //       };
  //     });
  //   }
  // };

  render() {
    const { inputData } = this.props;

    return (
      <>
        <ul className="ImageGallery">
          {inputData && <ImageGalleryItem inputData={inputData} />}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
