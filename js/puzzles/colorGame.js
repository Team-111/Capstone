import React from 'react';
import {ViroNode, ViroText, ViroImage} from 'react-viro';

export default class ColorGame extends React.Component {
  constructor() {
    super();

    this.state = {
      height: 3,
      width: 3,
      board: this.makeBoard(),
    };
  }

  makeBoard = () => {
    return new Array(this.height)
      .fill()
      .map(() => new Array(this.width).fill(0));
  };
  //need something to randomize some blocks to start off with color
  cellExists(row, col) {
    return row >= 0 && row < this.height && col >= 0 && col < this.width;
  }

  getCell(row, col) {
    if (this.cellExists(row, col)) {
      return this.board[row][col];
    } else {
      return 0;
    }
  }

  setCell(value, row, col) {
    if (this.cellExists(row, col)) {
      this.board[row][col] = value;
    }
  }

  toggleCell(row, col) {
    this.setCell(1 - this.getCell(row, col), row, col);
  }

  forEachCell(iterator) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        iterator(row, col);
      }
    }
  }

  colorRule(cell) {
    let isOn = cell === 1;
    if (!isOn) {
      return 1;
    } else {
      return 0;
    }
  }

  toggleColor() {
    const newBoard = this.makeBoard();

    this.forEachCell((row, col) => {
      const nextCell = this.colorRule(this.getCell(row, col));
      newBoard[row][col] = nextCell;
    });

    this.board = newBoard;
  }

  render() {
    return(
      <ViroNode>

      </ViroNode>
    )
  }
}
