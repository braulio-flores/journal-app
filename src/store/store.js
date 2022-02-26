import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { authReducer } from "../reducers/authReducer";
import thunk from 'redux-thunk'
import { uiRreducer } from "../reducers/uiReducer";
import { notesReducer } from "../reducers/notesReducer";


const reducers = combineReducers({
  auth: authReducer,
  ui: uiRreducer,
  notes: notesReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  reducers,
  composeEnhancers( applyMiddleware(thunk) )
);

// ESTA ES TODA LA CONFIGURACION QUE DEBEMOS DE HACER PARA PODER TRABAJAR MIDDLEWARES Y DESPACHAR
// PETICIONES ASINCRONAS Y AL MISMO TIEMPO USAR LAS DEVTOOLS DE REDUX 
