import PropTypes from 'prop-types';
import React from 'react';

import './style.scss';

const Input = ({
  wrapperClassName,
  inputClassName,
  labelClassName,
  type,
  id,
  value,
  onChange,
  placeholder,
  name,
  label,
}) => {
  return (
    <div className={`input${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <label className={`input__label${labelClassName ? ` ${labelClassName}` : ''}`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`input__field${inputClassName ? ` ${inputClassName}` : ''}`}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  inputClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default Input;
