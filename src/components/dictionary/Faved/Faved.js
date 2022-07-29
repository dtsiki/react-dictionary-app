import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useMemo, useRef } from 'react';
import { useStoreon } from 'storeon/react';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import ScrollWrapper from './../../base/ScrollWrapper';

import './style.scss';

const Faved = ({ handleFaved }) => {
  const ref = useRef();
  const { words, dispatch } = useStoreon('words');

  const removeWord = (word) => {
    dispatch('words/delete', word);
  };

  useOnClickOutside(ref, () => handleFaved(false));

  const wordsList = useMemo(() => {
    return words.map((word) => {
      const { value, definitions } = word;

      return (
        <li key={value} className="faved__item">
          <div className="faved__word">
            <h3 className="faved__value">{value}</h3>
            <button className="faved__button faved__button--remove" onClick={() => removeWord(word)}>
              <FontAwesomeIcon icon={faTrash} />
              <span className="visually-hidden">Remove from faved</span>
            </button>
          </div>
          {definitions && <p className="faved__definition">{definitions[0].definition}</p>}
        </li>
      );
    });
  }, [words]);

  return (
    <div className="faved faved--active">
      <div ref={ref} className="faved__wrapper">
        <div className="faved__heading">
          <div className="faved__main">
            <button className="faved__button" onClick={handleFaved}>
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
              <span className="visually-hidden">Close faved</span>
            </button>
            <h2 className="faved__title">Faved</h2>
          </div>
        </div>
        <div className="faved__content">
          {words.length > 0 ? (
            <ScrollWrapper>
              <ul className="faved__list">{wordsList}</ul>
            </ScrollWrapper>
          ) : (
            <div className="faved__message">You have not yet save any word.</div>
          )}
        </div>
      </div>
    </div>
  );
};

Faved.propTypes = {
  handleFaved: PropTypes.func,
};

export default Faved;
