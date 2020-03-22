const db = require('../db/firebase')



export async function getScores(callbackFunc) {
  let allScores = db.collection('scores');
  try {
    let scores = await allScores.get()
    //create an array of objects. We run this new array through callbackFunc
    callbackFunc(scores.docs.map(element => element.data()))
    // scores.forEach(doc => callbackFunc(doc.data()))
  } catch (error) {
    console.log(error)
  }
}


// module.exports = getScores
