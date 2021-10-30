import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Spinner = ({ size = 'medium' }) => {
  return (
    <div className={`spinner spinner--${size}`}>
      <span className="spinner__label">Loading</span>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.string,
};

export default Spinner;
