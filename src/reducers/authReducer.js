import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  // EL STATE ESTARA VACIO CUANDO NO ESTE AUTENTICADO
  switch (action.type) {
    case types.login:
      return {
        uuid: action.payload.uuid,
        name: action.payload.displayName,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
