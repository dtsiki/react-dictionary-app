import PropTypes from 'prop-types';
import React from 'react';

import Input from '../../base/Input/Input';

import './style.scss';

const SearchForm = ({ searchWord, changeWord, word }) => {
  return (
    <form onSubmit={searchWord} className="form">
      <Input
        value={word}
        onChange={changeWord}
        type="search"
        name="city"
        id="city"
        placeholder="Example: bun"
        label="Search word"
        inputClassName="form__input"
        labelClassName="form__label"
      />
      <button className="form__button">Search</button>
    </form>
  );
};

SearchForm.propTypes = {
  word: PropTypes.string,
  searchWord: PropTypes.func,
  changeWord: PropTypes.func,
};

export default SearchForm;
