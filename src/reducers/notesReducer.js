// {
//     notes: [],
//     active:null,
//     active: {
//         id:'',
//         tittle:'',
//         body:'',
//         imageUrl:'',
//         date:''
//     }
// }

import { types } from "../types/types";

const inicialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = inicialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: { ...action.payload },
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.notesAddNew:
      return {
        ...state,
        notes: [...state.notes, {...action.payload}],
      };
    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case types.notesLogOutCleaning:
      return {
        ...state,
        active: null,
        notes: [],
      };

    default:
      return state;
  }
};
