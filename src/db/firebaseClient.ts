import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const clientCredentials = {
  apiKey: "FIREBASE_CLIENT_API_KEY",
  authDomain: "FIREBASE_CLIENT_AUTH_DOMAIN",
  databaseURL: "FIREBASE_DB_URL",
  projectId: "FIREBASE_PROJECT_ID",
  appId: "FIREBASE_CLIENT_APP_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;
