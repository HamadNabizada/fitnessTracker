import { db } from './firebase.js'


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
    let allDataIsValid = true
    if(!data.date || !data.weight){
        allDataIsValid = false
    }
    data.exercises.forEach(item =>{
        if(!item.exerciseName || !item.reps || !item.sets || !item.weight){
            allDataIsValid = false
        }
    })


    return allDataIsValid
}

export { addEntry, validateEntry, updateEntry}