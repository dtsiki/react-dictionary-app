import React, { useCallback, useEffect, useState } from 'react';

import Layout from './components/base/Layout';
import Message from './components/base/Message';
import Spinner from './components/base/Spinner';
import Overlay from './components/dictionary/Overlay/Overlay';
import SearchForm from './components/dictionary/SearchForm';
import Word from './components/dictionary/Word';
import { getDefinitionByWord } from './services/dictionary';

const App = () => {
  const [definitions, setDefinitions] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [word, setWord] = useState({
    value: '',
    localValue: '',
  });

  const [status, setStatus] = useState({
    isWordLoaded: false,
    isFirstLoading: true,
    isWordChanged: false,
    isFailed: false,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDefinition = async () => {
      const data = await getDefinitionByWord(word.value);

      if (!Array.isArray(data)) {
        setError(data);
        setStatus((prevStatus) => ({
          ...prevStatus,
          isFailed: true,
        }));
      } else {
        setDefinitions(data[0].meanings[0].definitions);
        setPhonetic(data[0].phonetic);
        setStatus((prevStatus) => ({
          ...prevStatus,
          isFailed: false,
        }));
      }

      setStatus((prevStatus) => ({
        ...prevStatus,
        isLoaded: true,
        isLoading: false,
        isFirstLoading: false,
      }));
    };

    if (status.isLoading) fetchDefinition();
  }, [status.isLoading]);

  const changeWord = useCallback((e) => {
    const value = e.target.value;

    setWord((prevWord) => ({
      ...prevWord,
      localValue: value,
    }));
  }, []);

  const searchWord = useCallback(
    (e) => {
      e.preventDefault();

      if (!word.localValue) return;

      setWord((prevWord) => ({
        ...prevWord,
        value: word.localValue,
      }));

      setStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: true,
      }));
    },
    [word]
  );

  return (
    <Layout>
      <SearchForm word={word.localValue} searchWord={searchWord} changeWord={changeWord} />
      {status.isLoading && (
        <div className="layout__spinner">
          <Spinner />
        </div>
      )}
      {status.isLoaded && !status.isFailed && !status.isLoading && (
        <Word word={word.value} phonetic={phonetic} definitions={definitions} />
      )}
      {status.isFirstLoading && !status.isLoading && (
        <Message text="Enter any word in the input above to get word definition." />
      )}
      {status.isFailed && <Message title={error.title} text={error.message} />}
      {status.isLoaded && <Overlay word={word.value} />}
    </Layout>
  );
};

export default App;
