import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Header = ({ handleFaved }) => {
  return (
    <div className="header">
      <h1 className="header__title">Dictionary</h1>
      <button className="button header__button" onClick={handleFaved}>
        <FontAwesomeIcon icon={faBookmark} size="2x" color="#ffffff" />
        <span className="visually-hidden">Show saved</span>
      </button>
    </div>
  );
};

Header.propTypes = {
  handleFaved: PropTypes.func,
};

export default Header;
