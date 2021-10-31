import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

import './style.scss';

const Word = ({ word, phonetic, definitions }) => {
  const [showAllDefinitions, setShowAllDefinitions] = useState(false);

  const toggleDefinitions = () => {
    setShowAllDefinitions(!showAllDefinitions);
  };

  const renderDefinitions = useMemo(() => {
    return definitions?.map((definition, index) => {
      const showOnlyFirstDefinition = !showAllDefinitions && index === 0;

      if (showOnlyFirstDefinition || showAllDefinitions) {
        return (
          <li className="word__definition" key={definition.definition}>
            <span>{index + 1}.</span> {definition.definition}
          </li>
        );
      }
    });
  }, [definitions, showAllDefinitions]);

  return (
    <div className="word">
      <h1 className="word__title">{word}</h1>
      <h2 className="word__phonetic">/{phonetic}/</h2>
      <ul className="word__definitions">{renderDefinitions}</ul>
      {definitions?.length > 1 && (
        <button onClick={toggleDefinitions} className="word__button word__button--show-all">
          {showAllDefinitions ? 'Show less' : 'Show all definitions'}
        </button>
      )}
    </div>
  );
};

Word.propTypes = {
  word: PropTypes.string,
  phonetic: PropTypes.string,
  definitions: PropTypes.array,
};

export default Word;
