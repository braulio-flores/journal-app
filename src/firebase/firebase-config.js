// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
// import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4NyzjEUZvP4SOsBE1KL_UQIth9scdohg",
  authDomain: "react-apps-inicial.firebaseapp.com",
  projectId: "react-apps-inicial",
  storageBucket: "react-apps-inicial.appspot.com",
  messagingSenderId: "360008443339",
  appId: "1:360008443339:web:4c505df6c5fb85cd3b024e",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig); //esta es la bd

const db = firebase.firestore(); //ESTA ES LA referencia a firestore

const googleAuthprovider = new firebase.auth.GoogleAuthProvider(); 
//ESTE ES MI AUTH PROVIDER PARA PODER HACER MI AUTH CON BD

export{
    app,
    db,
    googleAuthprovider,
    firebase
}
