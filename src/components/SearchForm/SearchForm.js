import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

export class SearchForm extends Component {
  static propTypes = {
    input: PropTypes.string,
    onSub: PropTypes.func.isRequired,
  };

  state = {
    input: '',
  };

  handleInput = e => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { input } = this.state;

    if (input.trim() === '') {
      return toast.warn('Enter search name!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    this.props.onSub(input);
  };

  render() {
    const { input } = this.state;
    return (
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={this.handleInput}
        />
      </form>
    );
  }
}

export default SearchForm;
