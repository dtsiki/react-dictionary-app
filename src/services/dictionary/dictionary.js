export const getDefinitionByWord = async (word) => {
  const dictionaryEndpoint = ' https://api.dictionaryapi.dev/api/v2/entries/en';

  return await fetch(`${dictionaryEndpoint}/${word}`).then((response) => {
    return response.json();
  });
};
