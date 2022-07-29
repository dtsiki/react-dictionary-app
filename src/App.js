import React, { useCallback, useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';

import Header from './components/base/Header/Header';
import Layout from './components/base/Layout';
import Message from './components/base/Message';
import Spinner from './components/base/Spinner';
import Faved from './components/dictionary/Faved';
import Overlay from './components/dictionary/Overlay/Overlay';
import SearchForm from './components/dictionary/SearchForm';
import Word from './components/dictionary/Word';
import { getDefinitionByWord } from './services/dictionary';

const App = () => {
  const { dispatch, words } = useStoreon('words');
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(null);
  const [isFavedOpened, showFaved] = useState(false);
  const [word, setWord] = useState({
    value: '',
    phonetic: '',
    definitions: '',
  });
  const [status, setStatus] = useState({
    isWordLoaded: false,
    isFirstLoading: true,
    isWordChanged: false,
    isFailed: false,
  });

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
        setWord((prevWord) => ({
          ...prevWord,
          phonetic: data[0].phonetic,
          definitions: data[0].meanings[0].definitions,
        }));
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
  }, [status.isLoading, word.value]);

  const changeWord = useCallback((e) => {
    const value = e.target.value;

    setSearchValue(value);
  }, []);

  const searchWord = useCallback(
    (e) => {
      e.preventDefault();

      if (!searchValue) return;

      setWord((prevWord) => ({
        ...prevWord,
        value: searchValue,
      }));

      setStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: true,
      }));
    },
    [searchValue]
  );

  const toggleWord = () => {
    const values = words.map((word) => word.value);

    if (word.value) {
      if (values.indexOf(word.value) >= 0) {
        dispatch('words/delete', word);
      } else {
        dispatch('words/add', word);
      }
    }
  };

  const showSaved = () => {
    showFaved(!isFavedOpened);
  };

  return (
    <>
      {isFavedOpened && <Faved handleFaved={showSaved} />}
      <Layout isBackdrop={isFavedOpened}>
        <Header handleFaved={showFaved} />
        <SearchForm word={searchValue} searchWord={searchWord} changeWord={changeWord} />
        <Spinner isVisible={status.isLoading} />
        {status.isLoaded && !status.isFailed && !status.isLoading && (
          <Word word={word.value} phonetic={word.phonetic} definitions={word.definitions} toggleWord={toggleWord} />
        )}
        {status.isFirstLoading && !status.isLoading && (
          <Message text="Enter any word in the input above to get word definition." />
        )}
        {status.isFailed && <Message title={error.title} text={error.message} />}
        {status.isLoaded && <Overlay word={word.value} />}
      </Layout>
    </>
  );
};

export default App;
