import { types } from "../types/types";


export const setError = ( error ) => {
  return {
    type: types.uiSetMessage,
    payload: error,
  };
};

export const unsetError = (  ) => {
  return {
    type: types.uiSetMessage,
    payload: '',
  };
};

export const uiStartLoading = ( ) => {
  return {
    type: types.uiStartLoading,
  };
};

export const uiFinishLoading = ( ) => {
  return {
    type: types.uiFinishLoading,
  };
};