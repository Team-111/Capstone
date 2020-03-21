const db = require('../db/firebase')

export async function getScores(req, res) {
  let allScores = db.collection('scores');
  try {
    let highScores = [];
    let scores = await allScores.get()
    scores.forEach(doc => highScores.push(doc.data()))
    res.send(highScores)
  } catch (error) {
    console.log(error)
  }
}


// module.exports = getScores
