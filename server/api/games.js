const {db} = require('../db/firebase');

// Generates a random 4 digit code
const randomCode = () => {
  let min = 1000,
    max = 9999;
  let random = Math.round(Math.random() * (max - min) + min);
  return random.toString();
};

// Returns an object to be used when initializing a new game
 const initializeGameObj = () => ({
  hintsLeft: 3,
  currentTime: {min: 0, sec: 0},
  visibleInRoom: {
    key: true,
    desk: true,
    spoon: true,
    skull: true,
    grenade: true,
  },
  inventory: ['empty'],
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
  hints: {},
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
      let game = initializeGameObj();
      game.hints = await getGameHints(game.puzzles);
      await db
        .collection('games')
        .doc(gameId)
        .set(game);
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

export async function getPuzzles(callbackFunc) {
  let allPuzzles = db.collection('puzzles');
  try {
    let puzzles = await allPuzzles.get();
    callbackFunc(
      puzzles.docs.map(puzzle => {
        return {id: puzzle.id, ...puzzle.data()};
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getGameHints(gamePuzzles) {
  try {
    let gamePuzzArray = Object.keys(gamePuzzles);
    let hintsArray = [];
    await getPuzzles(puzzleHints => {
      hintsArray = puzzleHints.filter(
        puzzHint =>
          gamePuzzArray.includes(puzzHint.id) || puzzHint.id === 'room');
    });
    let hints = {};
    for (let i = 0; i < hintsArray.length; i++) {
      if (hintsArray[i].hints) {
        hints[hintsArray[i].id] = hintsArray[i].hints;
      }
    }
    return hints;
  } catch (error) {
    console.log(error);
  }
}
