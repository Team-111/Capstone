import React, {Component} from 'react';

import {ViroFlexView, ViroMaterials, ViroQuad} from 'react-viro';

class PuzzleColoredSquares extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: this.makeBoard(6, 6),
      solved: false,
      secretCodeDigit: 1,
    };

    this.clickSquare = this.clickSquare.bind(this);
  }

  makeBoard = (height, width) => {
    let newBoard = [];
    for (let i = 0; i < height; i++) {
      let row = [];

      for (let j = 0; j < width; j++) {
        let sqr = Math.round(Math.random());

        row.push(sqr); //need code to guard against board being comlpeted at start
      }
      newBoard.push(row);
    }
    return newBoard;
  };

  clickSquare(r, c) {
    return function() {
      const boardCopy = [...this.state.gameBoard];

      boardCopy[r][c] = boardCopy[r][c] ? 0 : 1;
      if (c < 5) {
        boardCopy[r][c + 1] = boardCopy[r][c + 1] ? 0 : 1;
      }
      if (c > 0) {
        boardCopy[r][c - 1] = boardCopy[r][c - 1] ? 0 : 1;
      }
      if (r < 5) {
        boardCopy[r + 1][c] = boardCopy[r + 1][c] ? 0 : 1;
      }
      if (r > 0) {
        boardCopy[r - 1][c] = boardCopy[r - 1][c] ? 0 : 1;
      }

      this.setState({gameBoard: boardCopy});
      this.checkSolved(boardCopy);
    };
  }

  checkSolved = board => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }
    
    this.setState({solved: true});
  };

  render() {
    return (
      <ViroFlexView
        style={{flexDirection: 'column', alignSelf: 'center'}}
        width={0.5}
        height={0.5}
        backgroundColor="transparent">
        {this.state.gameBoard.map((row, rowIdx) => {
          return (
            <ViroFlexView
              key={`row${rowIdx}`}
              style={{flexDirection: 'row'}}
              width={0.5}
              height={0.1}>
              {row.map((tile, colIdx) => {
                return (
                  <ViroQuad
                    key={`tile${colIdx}`}
                    width={0.1}
                    height={0.1}
                    materials={tile === 1 ? ['redSquare'] : ['yellowSquare']}
                    onClick={
                      this.state.solved === true
                        ? null
                        : this.clickSquare(rowIdx, colIdx).bind(this)
                    }
                    //add ternary to check if this.state.solved is true or false, onClick={this.state.solved--
                    // ? null
                    // : this.clickSquare(rowIdx, colIdx).bind(this)} or maybe () => {} may work
                  />
                );
              })}
            </ViroFlexView>
          );
        })}
      </ViroFlexView>
    );
  }
}

ViroMaterials.createMaterials({
  redSquare: {
    diffuseTexture: require('./res/ColoredSquares/redSquare.png'),
  },
  yellowSquare: {
    diffuseTexture: require('./res/ColoredSquares/yellowSquare.png'),
  },
});

export default PuzzleColoredSquares;
