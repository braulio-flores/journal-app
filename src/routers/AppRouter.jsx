import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { firebase } from "../firebase/firebase-config";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { startSetNotes } from "../actions/notes";

const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {

      if (user?.uid) {
        //SOLO SI EL USUARIO ESTA AUTENTICADO Y ESTO LO OBTENEMOS DESDE FIRESTORE
        dispatch(login(user.uid, user.displayName));
        setisLoggedIn(true);
        dispatch(startSetNotes(user.uid));

      } else {
        setisLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return <h1>Loading</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes path="/auth" isLoggedIn={isLoggedIn} />
          <PrivateRoutes exact path="/" isLoggedIn={isLoggedIn} />
          <Redirect to="auth/register" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
