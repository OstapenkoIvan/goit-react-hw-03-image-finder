import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchForm from '../SearchForm/SearchForm';

export class SearchBar extends Component {
  static propTypes = {
    onSub: PropTypes.func.isRequired,
  };

  render() {
    return (
      <header className="header">
        <SearchForm onSub={this.props.onSub} />
      </header>
    );
  }
}

export default SearchBar;
