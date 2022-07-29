import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Layout = ({ children, isBackdrop }) => {
  return (
    <div className={`layout${isBackdrop ? ' layout--backdrop' : ''}`}>
      <div className="layout__content">{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  isBackdrop: PropTypes.bool,
};

export default Layout;
