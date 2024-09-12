import admin from 'firebase-admin'
import dotenv from 'dotenv'
import credentials from './credentials.json' assert{type: 'json'}

dotenv.config()

let db

function firebaseConnect(){

    admin.initializeApp({
        credential: admin.credential.cert(credentials)
    })

    
    
     db = admin.firestore()
}


export {firebaseConnect, db}