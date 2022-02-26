import Swal from "sweetalert2";
import { googleAuthprovider, firebase } from "../firebase/firebase-config";
import { types } from "../types/types";
import { uiFinishLoading, uiStartLoading } from "./ui";


export const startLoginEmailPasswordShowingUseOfThunksandDispatch = (
  email,
  password
) => {
  return (dispatch) => {
    // ESTA ES UN CALLBACK, ESE DISPATCH LO DEVULEVE THUNKS AUTOMATICAMENTE POR ESO PODEMOS LANZARLO
    // DE AHI ENTONCES YA LLAMAMOS A UN METODO SINCRONO
    // EN ESTE CASO SOLO ES UN SETTIMEOUT PERO PUEDE SER UN fetch, ACCIOS, ETC
    setTimeout(() => {
      dispatch(login(123, "pedro"));
    }, 3500);
  };
};

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(uiStartLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: error
        })
      })
      .then((res) => {
        dispatch(uiFinishLoading());
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(uiStartLoading());

    firebase
      .auth()
      .signInWithPopup(googleAuthprovider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Login Error',
          text: error
        })
      })
      .then((res) => {
        dispatch(uiFinishLoading());
      });
  };
};

// ESTA ES LA ACCION QUE VOY A LLAMAR CUANDO TENGA EL UUID Y EL DISPLAY NAME
export const login = (uuid, displayName) => {
  return {
    type: types.login,
    payload: {
      uuid,
      displayName,
    },
  };
};

// LA SIGUIENTE ACCION COMIENZA EL REGISTRO POR MEDIO DE CORREO Y PASSWORD Y NOMBRE
// EL REGISTRO ES UNA TAREA ASINCRONA POR LO QUE DEBULVE UN DISPATCH GRACIAS A THUNKS
export const startRegisterWithEmailPasswordNname = (email, password, name) => {
  return (dispatch) => {

    dispatch(uiStartLoading());
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({
          displayName: name,
        });

        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Register Error',
          text: error
        })
      })
      .then((res) => {
        dispatch(uiFinishLoading());
      });
  };
};

export const startLogout = () => {
  
  return async (dispatch)=>{
    dispatch(uiStartLoading());
    await firebase.auth().signOut()
    .then(res=>{
      dispatch(logout());
      dispatch(uiFinishLoading());
    })
    .catch(error=>{
      Swal.fire({
        icon: 'error',
        title: 'LogOut Error',
        text: error
      })
    })
  }
};

// ESTA ES LA ACCION QUE VOY A LLAMAR CUANDO HAGA LOGOUT
export const logout = () => {
  return {
    type: types.logout
  };
};