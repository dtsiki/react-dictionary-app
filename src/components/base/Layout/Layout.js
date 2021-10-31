import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="layout__content">
        <h1 className="layout__heading">Dictionary</h1>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
