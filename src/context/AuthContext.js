import React, { useContext, useEffect, useState } from "react"
import { auth } from "../../firebase/firebase.js"
import { onAuthStateChanged } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe
    }, [])

    async function initializeUser(user){
        if(user){
            setCurrentUser({...user})
            setUserLoggedIn(true)
        } else{
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setIsLoading(false)
    }

    const value = {
        currentUser,
        userLoggedIn,
        isLoading
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}