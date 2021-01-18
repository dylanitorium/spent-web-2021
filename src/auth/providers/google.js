import firebase from "firebase/app";

export default function google() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return provider;
}
