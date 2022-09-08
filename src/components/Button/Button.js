import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Button extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
  };

  onClickEvent = e => {
    this.props.handleClick(e);
  };

  render() {
    return (
      <div type="button" className="Button" onClick={this.onClickEvent}>
        Load more
      </div>
    );
  }
}

export default Button;
