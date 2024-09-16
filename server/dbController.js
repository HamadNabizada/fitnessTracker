import { db } from './firebase.js'


async function addEntry(data){
    const docRef = db.collection('Users').doc(data.userUID).collection('workoutJournal').doc(data.date)
    try{
        const doc = await docRef.get()
        if(doc.exists){
            return true
        }else{ 
            await docRef.set(data)
            return false
        }
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

export { addEntry, validateEntry}