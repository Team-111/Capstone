const {db} = require('../db/firebase');

export async function getScores(callbackFunc) {
  let allScores = db.collection('scores');
  try {
    let scores = await allScores.get();
    //create an array of objects. We run this new array through callbackFunc
    //Need to get id and data for each element.
    callbackFunc(
      scores.docs.map(element => {
        return {id: element.id, ...element.data()};
      }),
    );
    // scores.forEach(doc => callbackFunc(doc.data()))
  } catch (error) {
    console.log(error);
  }
}

// module.exports = getScores
