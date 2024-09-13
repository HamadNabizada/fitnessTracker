import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";


//Sign up with email and password
export const signUpUserWithEmailAndPassword = (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password)
}

//Log in with email and password
export const loginWithEmailAndPassword =  (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
}

//Log in Anonymously
export const signUserInAnonymously =  () => {
    signInAnonymously(auth)
}