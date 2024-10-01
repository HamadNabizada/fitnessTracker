import { db } from './firebase.js'

//Adds an entry to the journal collection
async function addEntry(data){
    const { userUID, entry } = data
    const docRef = db.collection('users').doc(userUID).collection('journal').doc(entry.date)
    try{
        const doc = await docRef.get()
        if(doc.exists){
            return true
        }else{ 
            await docRef.set(entry)
            return false
        }
    }catch(error){  
        console.log(error)
        throw new Error("Issue with adding Entry");
    }
}

//updates an entry to the journal collection
async function updateEntry(data){
    const { userUID, entry } = data 
    const docRef = db.collection('users').doc(userUID).collection('journal').doc(entry.date)
    try{
        await docRef.set(entry)
    }catch(error){  
        console.log(error)
        throw new Error("Issue with adding Entry");
    }
}

//validates data before any queries to DB. Returns true if valid data
function validateEntry(data){
    console.log(data.entry.date)
    const { userUID, entry } = data
    let allDataIsValid = true
    if(!entry.date || !entry.weight || !entry.exercises){
        allDataIsValid = false
        return
    }
    entry.exercises.forEach(item =>{
        if(!item.exerciseName || !item.reps || !item.sets || !item.weight){
            allDataIsValid = false
            return
        }
    })


    return allDataIsValid
}

//returns entry at the specified date
async function retrieveEntry(data){
    const { userUID, date } = data
    const docRef = db.collection('users').doc(userUID).collection('journal').doc(date)
    const doc = await docRef.get()
    if(doc.exists){
        try{
            return doc.data()
        }catch(error){
            console.log(error)
            throw new Error("Issue with retrieving Entry")
        }
    }else{
        return false
    }
}

//overwrites journal entry at the specified date
async function overwriteEntry(data){
    const { userUID, entry } = data
    const docRef = db.collection('users').doc(userUID).collection('journal').doc(entry.date)
    const doc = await docRef.get()
    if(doc.exists){
        try{
            await docRef.set(data.entry)
        }catch(error){
            console.log(error)
            throw new Error("Issue with overwriting data")
        }
    }

}

export { addEntry, validateEntry, updateEntry, retrieveEntry, overwriteEntry}