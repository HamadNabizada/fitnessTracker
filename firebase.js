import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from './firebaseProjectSettings.json' assert{type: 'json'}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { app, auth }