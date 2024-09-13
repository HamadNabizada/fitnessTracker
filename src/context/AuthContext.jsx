import React, { useContext, useEffect, useState } from "react"
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth"

const AuthContext = React.createContext()

//Sign up with email and password
export const signUpUserWithEmailAndPassword = async (email, password) =>{
    return await createUserWithEmailAndPassword(auth, email, password)
}

//Log in with email and password
export  const loginWithEmailAndPassword =  async (email, password) =>{
    return await signInWithEmailAndPassword(auth, email, password)
}

//Log in Anonymously
export const signUserInAnonymously = async () => {
   return  await signInAnonymously(auth)
}




export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])


    const value = {
        currentUser
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}