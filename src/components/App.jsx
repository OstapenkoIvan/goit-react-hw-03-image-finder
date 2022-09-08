import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    input: '',
  };

  onSubmit = input => {
    this.setState({
      input,
    });
  };

  render() {
    return (
      <>
        <SearchBar onSub={this.onSubmit} />
        <ImageGallery inputData={this.state.input} />
        <ToastContainer />
      </>
    );
  }
}

export default App;

//fetch change to async/await+
//write props +
//status machine (1.13) -
//make alert +
