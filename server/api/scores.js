const db = require('../db/firebase')



export async function getScores(req, res) {
  let allScores = db.collection('scores');
  try {
    let scores = await allScores.get()
    scores.forEach(doc => console.log(doc.data()))
  } catch (error) {
    console.log(error)
  }
}


// module.exports = getScores
