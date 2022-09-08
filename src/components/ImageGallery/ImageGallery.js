import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import FetchImages from '../GalleryApi/GalleryApi';

const params = {
  ADDRESS: 'https://pixabay.com/api/',
  KEY: '29510729-da386a69ed783c050b927561b',
};

export class ImageGallery extends Component {
  static propTypes = {
    inputData: PropTypes.string.isRequired,
  };

  state = {
    page: 1,
    data: null,
    loading: false,
    showModal: false,
    modalImage: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { inputData } = this.props;
    const { ADDRESS, KEY } = params;

    if (prevProps !== this.props) {
      this.setState({ page: 1 });
      this.setState({ loading: true });

      FetchImages(ADDRESS, KEY, page, inputData)
        .then(data => this.setState({ data: data.hits }))
        .catch(error => console.log(error))
        .finally(this.setState({ loading: false }));
      return;
    }

    if (page !== prevState.page) {
      this.setState({ loading: true });

      FetchImages(ADDRESS, KEY, page, inputData)
        .then(data =>
          this.setState(prevState => {
            return {
              data: [...prevState.data, ...data.hits],
            };
          })
        )
        .catch(error => console.log(error))
        .finally(this.setState({ loading: false }));
      return;
    }
  }

  toggleModal = (img, tags) => {
    if (!this.state.showModal) {
      this.setState({ modalImage: { tags, img } });
    }

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClick = e => {
    if (e) {
      this.setState(prevState => {
        return {
          page: prevState.page + 1,
        };
      });
    }
  };

  render() {
    const { loading, data, modalImage, showModal } = this.state;

    return (
      <>
        <ul className="ImageGallery">
          {data &&
            data.map(img => (
              <ImageGalleryItem
                img={img.webformatURL}
                key={img.id}
                tags={img.tags}
                imgXL={img.largeImageURL}
                toggleModal={this.toggleModal}
              />
            ))}
        </ul>

        {loading && (
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass="loader"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        )}
        {data && !loading && <Button handleClick={this.onClick} />}
        {showModal && (
          <Modal
            img={modalImage.img}
            alt={modalImage.tags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;
