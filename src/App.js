import React, { useEffect, useMemo, useState } from 'react';

import { getDefinitionByWord } from './services/dictionary';

const App = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [definitions, setDefinitions] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [word, setWord] = useState('bun');
  const [background, setBackground] = useState('');

  useEffect(() => {
    const fetchDefinition = async () => {
      const data = await getDefinitionByWord(word);

      setLoaded(true);
      setDefinitions(data[0].meanings[0].definitions);
      setPhonetic(data[0].phonetic);
    };

    if (!isLoaded) fetchDefinition();
  }, []);

  useEffect(() => {
    const endpoint = 'https://source.unsplash.com/1600x900';

    setBackground(`${endpoint}/?${word}`);
  }, [word]);

  const renderDefinitions = useMemo(() => {
    if (!isLoaded) return;

    return definitions?.map((definition) => {
      return (
        <li className="definition" key={definition.definition}>
          {definition.definition}
        </li>
      );
    });
  }, [definitions]);

  return (
    <div className="section">
      <div className="content">
        <h1 className="word">{word}</h1>
        <h2 className="phonetic">{phonetic}</h2>
        <ul className="definitions">{renderDefinitions}</ul>
      </div>
      <div className="overlay" style={{ backgroundImage: `url("${background}")` }} />
    </div>
  );
};

export default App;
