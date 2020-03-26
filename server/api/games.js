const {db} = require('../db/firebase');

export async function getGames(callbackFunc) {
  let allGames = db.collection('games');
  try {
    let games = await allGames.get();
    //create an array of objects. We run this new array through callbackFunc
    //Need to get id and data for each element.
    callbackFunc(
      games.docs.map(element => {
        return {id: element.id};
      }),
    );
    // scores.forEach(doc => callbackFunc(doc.data()))
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleGame (callbackFunc, gameId) {
  try {
    let singleGame = await db
      .collection('games')
      .doc(`${gameId}`)
      .get();
    if (singleGame.exists) {
      callbackFunc(singleGame.data());
    } else {
      await db
        .collection('games')
        .doc(`${gameId}`)
        .set({
          hintsLeft: 3,
          currentTime: {min: 0, sec: 0},
        });
      let newGame = await db
        .collection('games')
        .doc(`${gameId}`)
        .get();
      callbackFunc(newGame.data());
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createGame(userId) {
  try {
    await db
      .collection('games')
      .doc(`${userId}`)
      .set({
        hintsLeft: 3,
      });
    // scores.forEach(doc => callbackFunc(doc.data()))
  } catch (error) {
    console.log(error);
  }
}
