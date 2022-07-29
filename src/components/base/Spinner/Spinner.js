import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Spinner = ({ size = 'medium', isVisible }) => {
  if (!isVisible) {
    return <></>;
  }

  return (
    <div className={`spinner spinner--${size}`}>
      <div className="spinner__wrapper">
        <span className="spinner__label">Loading</span>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.string,
  isVisible: PropTypes.bool,
};

export default Spinner;
