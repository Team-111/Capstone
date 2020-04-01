import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updatePuzzleStatus} from '../store';
import {
  ViroFlexView,
  ViroQuad,
  ViroMaterials,
  ViroSound,
  ViroNode,
  ViroText,
} from 'react-viro';

class PuzzleSliding extends Component {
  constructor() {
    super();
    this.state = {
      solution: [[0, 1, 2], [3, 4, 5], [6, 7, 'Blank']],
      gameBoard: [],
      spookyPortrait: false,
    };

    this.shuffle = this.shuffle.bind(this);
    this.clickSquare = this.clickSquare.bind(this);
    this.compareBoards = this.compareBoards.bind(this);
    this.puzzleSolved = this.puzzleSolved.bind(this);
    this.determineSolvability = this.determineSolvability.bind(this);
  }

  componentWillMount() {
    let arr = [];
    const newArr = [];
    let row = [];
    let isSolvable = false;

    while (!isSolvable) {
      arr = this.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 'Blank']);
      isSolvable = this.determineSolvability(arr);
    }

    for (let i = 0; i < arr.length; i++) {
      row.push(arr[i]);
      if (row.length === 3) {
        newArr.push(row);
        row = [];
      }
    }

    this.setState({gameBoard: newArr});
  }

  shuffle(arr) {
    let len = arr.length;
    let temp;
    let idx;

    while (len) {
      idx = Math.floor(Math.random() * len--);

      temp = arr[len];
      arr[len] = arr[idx];
      arr[idx] = temp;
    }

    //One more switch to put Blank at last index
    const blankIdx = arr.indexOf('Blank');
    arr[blankIdx] = arr[arr.length - 1];
    arr[arr.length - 1] = 'Blank';

    return arr;
  }

  // Makes sure the puzzle is solvable by calculating the number of inversions
  // See https://www.cs.bham.ac.uk/~mdr/teaching/modules04/java2/TilesSolvability.html
  // for details about how to see whether a sliding puzzle is solvable
  determineSolvability(arr) {
    let inversions = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] !== 'Blank' && arr[i] > arr[j]) inversions++;
      }
    }

    if (inversions % 2 === 0) return true;
    return false;
  }

  clickSquare(r, c) {
    return function() {
      const boardCopy = [...this.state.gameBoard];

      let blankRow;
      let blankCol;

      // Get the row and column of the blank square
      for (let i = 0; i < boardCopy.length; i++) {
        const blankIdx = boardCopy[i].indexOf('Blank');
        if (blankIdx > -1) {
          blankRow = i;
          blankCol = blankIdx;
          break;
        }
      }

      // Determine if the blank square is adjacent and swap if so
      if (
        (blankCol === c && (blankRow === r - 1 || blankRow === r + 1)) ||
        (blankRow === r && (blankCol === c - 1 || blankCol === c + 1))
      ) {
        boardCopy[blankRow][blankCol] = boardCopy[r][c];
        boardCopy[r][c] = 'Blank';
      }

      this.setState({gameBoard: boardCopy});
      const playerWon = this.compareBoards(boardCopy, this.state.solution);
      if (playerWon) this.puzzleSolved();
    };
  }

  compareBoards(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1[i].length; j++) {
        if (arr1[i][j] !== arr2[i][j]) return false;
      }
    }

    return true;
  }

  puzzleSolved() {
    this.props.updatePuzzleStatus('slidingPuzzle');
    setTimeout(() => this.setState({spookyPortrait: true}), 2000);
  }

  render() {
    return (
      <ViroNode>
        <ViroFlexView
          position={[0, 0, -2]}
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          backgroundColor="black"
          rotation={[0, 0, 0]}
          height={0.94}
          width={0.94}>
          {!this.props.solved ? (
            this.state.gameBoard.map((row, rowIdx) => {
              return (
                <ViroFlexView
                  key={`row${rowIdx}`}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                  height={0.3}
                  width={0.94}
                  backgroundColor="black">
                  {row.map((tile, colIdx) => {
                    return (
                      <ViroQuad
                        key={`tile${colIdx}`}
                        materials={[`grid${tile}`]}
                        height={0.3}
                        width={0.3}
                        onClick={this.clickSquare(rowIdx, colIdx).bind(this)}
                      />
                    );
                  })}
                </ViroFlexView>
              );
            })
          ) : (
            <ViroFlexView
              materials={this.state.spookyPortrait ? ['portrait2'] : ['portrait1']}
              style={{justifyContent: 'center', alignItems: 'center'}}
              width={0.94}
              height={0.94}>
              {!this.props.lightOn && (
                <ViroText text={this.props.codeDigit} color="blue" style={{textAlign: 'center', textAlignVertical: 'center', fontSize: 32}} />
              )}
            </ViroFlexView>
          )}
        </ViroFlexView>
        {this.state.spookyPortrait && (
          <ViroSound
            source={require('./sounds/horror_stab.mp3')}
            loop={false}
          />
        )}
      </ViroNode>
    );
  }
}

ViroMaterials.createMaterials({
  grid0: {
    diffuseTexture: require('./res/SlidingPuzzle/grid0.png'),
    lightingModel: 'Blinn',
  },
  grid1: {
    diffuseTexture: require('./res/SlidingPuzzle/grid1.png'),
    lightingModel: 'Blinn',
  },
  grid2: {
    diffuseTexture: require('./res/SlidingPuzzle/grid2.png'),
    lightingModel: 'Blinn',
  },
  grid3: {
    diffuseTexture: require('./res/SlidingPuzzle/grid3.png'),
    lightingModel: 'Blinn',
  },
  grid4: {
    diffuseTexture: require('./res/SlidingPuzzle/grid4.png'),
    lightingModel: 'Blinn',
  },
  grid5: {
    diffuseTexture: require('./res/SlidingPuzzle/grid5.png'),
    lightingModel: 'Blinn',
  },
  grid6: {
    diffuseTexture: require('./res/SlidingPuzzle/grid6.png'),
    lightingModel: 'Blinn',
  },
  grid7: {
    diffuseTexture: require('./res/SlidingPuzzle/grid7.png'),
    lightingModel: 'Blinn',
  },
  gridBlank: {
    diffuseTexture: require('./res/SlidingPuzzle/grid8.png'),
    lightingModel: 'Blinn',
  },
  portrait1: {
    diffuseTexture: require('./res/SlidingPuzzle/portrait1.png'),
    lightingModel: 'Blinn',
  },
  portrait2: {
    diffuseTexture: require('./res/SlidingPuzzle/portrait2.png'),
    lightingModel: 'Blinn',
  },
});

const mapStateToProps = state => ({
  codeDigit: state.game.lockCombo[1],
  lightOn: state.game.lightOn,
  solved: state.game.puzzles.slidingPuzzle.complete,
});

const mapDispatchToProps = dispatch => ({
  updatePuzzleStatus: puzzle => dispatch(updatePuzzleStatus(puzzle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleSliding);
