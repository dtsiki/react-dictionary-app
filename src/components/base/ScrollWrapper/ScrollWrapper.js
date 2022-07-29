import PropTypes from 'prop-types';
import React from 'react';
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import './style.scss';

const ScrollWrapper = ({ children }) => {
  const options = {
    style: {
      maxHeight: 400,
      height: '100%',
      width: '100%',
    },
  };

  return (
    <SimpleBar {...options} className="scroll-wrapper">
      {children}
    </SimpleBar>
  );
};

ScrollWrapper.propTypes = {
  children: PropTypes.node,
};

export default ScrollWrapper;
