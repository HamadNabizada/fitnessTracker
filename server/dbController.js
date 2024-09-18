import { db } from './firebase.js'


async function addEntry(data){
    const { userUID, entry } = data
    const docRef = db.collection('users').doc(userUID).collection('journal').doc(entry.date)
    try{
        const doc = await docRef.get()
        if(doc){
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

function validateEntry(data){
    const { userUID, entry } = data
    let allDataIsValid = true
    if(!entry.date || !entry.weight){
        allDataIsValid = false
    }
    entry.exercises.forEach(item =>{
        if(!item.exerciseName || !item.reps || !item.sets || !item.weight){
            allDataIsValid = false
        }
    })


    return allDataIsValid
}

async function retrieveEntry(data){
    const { userUID, date } = data
    const docRef = db.collection('users').doc(userUID).collection('journal').doc(date)
    const doc = await docRef.get()
    if(doc){
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


export { addEntry, validateEntry, updateEntry, retrieveEntry}