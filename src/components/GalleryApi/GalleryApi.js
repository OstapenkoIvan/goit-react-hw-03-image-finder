import PropTypes from 'prop-types';

// function fetchImages(address, key, page, inputData) {
//   return fetch(
//     `${address}?key=${key}&image_type=photo&orientation=horizontal&page=${page}&per_page=12&q=${inputData}`
//   ).then(response => response.json());
// }

async function fetchImages(address, key, page, inputData) {
  try {
    const response = await fetch(
      `${address}?key=${key}&image_type=photo&orientation=horizontal&page=${page}&per_page=12&q=${inputData}`
    );
    const parsed = await response.json();
    return parsed;
  } catch (error) {
    console.log(error.message);
  }
}

fetchImages.propTypes = {
  address: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  inputData: PropTypes.string.isRequired,
};

export default fetchImages;
