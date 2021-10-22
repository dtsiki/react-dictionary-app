import { StatusCodes } from 'http-status-codes';

export const getDefinitionByWord = async (word) => {
  const dictioneryEndpoint = ' https://api.dictionaryapi.dev/api/v2/entries/en';

  const result = await fetch(`${dictioneryEndpoint}/${word}`).then((response) => {
    if (response.status === StatusCodes.OK) {
      return response.json();
    }
  });

  return result;
};
