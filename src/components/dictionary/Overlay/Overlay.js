import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import './style.scss';

const Overlay = ({ word }) => {
  const [background, setBackground] = useState('');

  useEffect(() => {
    const endpoint = 'https://source.unsplash.com/1600x900';

    setBackground(`${endpoint}/?${word}`);
  }, [word]);

  return <div className="overlay" style={{ backgroundImage: `url("${background}")` }} />;
};

Overlay.propTypes = {
  word: PropTypes.string,
};

export default Overlay;
