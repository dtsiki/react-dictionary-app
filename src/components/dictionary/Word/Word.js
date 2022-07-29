import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useStoreon } from 'storeon/react';

import Spinner from '../../base/Spinner';

import './style.scss';

const Word = ({ word, phonetic, definitions, toggleWord }) => {
  const { words } = useStoreon('words');
  const [showAllDefinitions, setShowAllDefinitions] = useState(false);
  const [isFaved, setIsFaved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const toggleDefinitions = () => {
    setShowAllDefinitions(!showAllDefinitions);
  };

  useEffect(() => {
    const values = words.map((word) => word.value);

    setIsFaved(values.indexOf(word) >= 0);
    setIsInitialized(true);
  }, [words, word]);

  const renderDefinitions = useMemo(() => {
    return definitions?.map((definition, index) => {
      const showOnlyFirstDefinition = !showAllDefinitions && index === 0;

      if (showOnlyFirstDefinition || showAllDefinitions) {
        return (
          <li className="word__definition" key={definition.definition}>
            {definitions.length !== 1 && <span>{index + 1}.</span>} {definition.definition}
          </li>
        );
      }
    });
  }, [definitions, showAllDefinitions]);

  return (
    <>
      {isInitialized ? (
        <div className="word">
          <div className="word__heading">
            <h2 className="word__title">{word}</h2>
            <button onClick={toggleWord} className={`button word__toggle ${isFaved ? ' is-faved' : 'is-not-faved'}`}>
              <span className="visually-hidden">Save</span>
              <span className="word__icon">
                <FontAwesomeIcon icon={faHeart} size="2x" color="#ffffff" />
              </span>
            </button>
          </div>
          <h3 className="word__phonetic">/{phonetic}/</h3>
          <ul className="word__definitions">{renderDefinitions}</ul>
          {definitions?.length > 1 && (
            <button onClick={toggleDefinitions} className="button word__button">
              {showAllDefinitions ? 'Show less' : 'Show all definitions'}
            </button>
          )}
        </div>
      ) : (
        <div className="layout__spinner">
          <Spinner />
        </div>
      )}
    </>
  );
};

Word.propTypes = {
  word: PropTypes.string,
  phonetic: PropTypes.string,
  definitions: PropTypes.array,
  toggleWord: PropTypes.func,
};

export default Word;
