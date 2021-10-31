import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Message = ({ title, text }) => {
  return (
    <div className="message">
      {title && <h3 className="message__title">{title}</h3>}
      {text && <h4 className="message__text">{text}</h4>}
    </div>
  );
};

Message.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default Message;
