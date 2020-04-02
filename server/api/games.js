const {db} = require('../db/firebase');

// Generates a random 4 digit code
const randomCode = () => {
  let min = 1000,
    max = 9999;
  let random = Math.round(Math.random() * (max - min) + min);
  return random.toString();
};

// Returns an object to be used when initializing a new game
export const initializeGameObj = () => ({
  hintsLeft: 3,
  currentTime: {min: 0, sec: 0},
  visibleInRoom: {key: true, desk: true, spoon: true, skull: true},
  inventory: ['empty'
  ],
  selectedItemIndex: 0,
  levelName: 'spookyCabin',
  lockCombo: randomCode(),
  lightOn: true,
  puzzles: {
    colorBlock: {
      location: 'west',
      complete: false,
    },
    slidingPuzzle: {
      location: 'north',
      complete: false,
    },
    palindrome: {
      location: 'east',
      complete: false,
    },
    combo: {
      location: 'door',
      complete: false,
    },
  },
  legsBound: true,
  isLoaded: false,
});

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

export async function getSingleGame(callbackFunc, gameId) {
  try {
    let singleGame = await db
      .collection('games')
      .doc(gameId)
      .get();
    if (singleGame.exists) {
      callbackFunc(singleGame.data());
    } else {
      await db
        .collection('games')
        .doc(gameId)
        .set(initializeGameObj());
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

export const updateGame = async (userId, currentGame) => {
  try {
    await db
      .collection('games')
      .doc(userId)
      .update(currentGame);
  } catch (error) {
    console.log(error);
  }
};

//thunk to update Hints in a Game
// export async function updateHint(userId, hintCount)

// export async function createGame(userId) {
//   try {
//     await db
//       .collection('games')
//       .doc(`${userId}`)
//       .set({
//         hintsLeft: 3,
//       });
//     // scores.forEach(doc => callbackFunc(doc.data()))
//   } catch (error) {
//     console.log(error);
//   }
// }

// udpateGame('2dA2La6CAsTaK4I7fBx53iofQnF3', {hintsLeft: 2, currentTime: {min: 1, sec: 0}});
