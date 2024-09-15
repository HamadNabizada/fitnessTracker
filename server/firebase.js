import credentials from './credentials.json' assert{type: 'json'}
import admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore()

export {db, admin}