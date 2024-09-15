import { db } from './firebase.js'


async function addDailyEntry(data){
    try{
        await db.collection('journalLog').doc('currentDate').set({data})
    }catch(error){
        console.log(error)
        throw new Error("Issue with adding Daily Entry");
    }
}

export { addDailyEntry }