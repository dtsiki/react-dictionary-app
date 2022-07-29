import { persistState } from '@storeon/localstorage';
import { createStoreon } from 'storeon';

const words = (store) => {
  store.on('@init', () => ({ words: [] }));

  store.on('words/add', ({ words }, newWord) => {
    return {
      words: words.concat([newWord]),
    };
  });

  store.on('words/delete', ({ words }, word) => {
    const updatedWords = words.filter((item) => {
      return item !== word;
    });

    return {
      words: updatedWords,
    };
  });

  store.on('words/deleteAll', () => {
    return {
      words: [],
    };
  });
};

export const store = createStoreon([words, persistState(['words'])]);
