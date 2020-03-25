const {db} = require('../db/firebase');

async function createGame(userId) {
  try {
    db.collection("games").doc(`${userId}`).set({
      hints: 3
    });
    // scores.forEach(doc => callbackFunc(doc.data()))
  } catch (error) {
    console.log(error);
  }
}
