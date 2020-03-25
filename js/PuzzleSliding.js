import React, {Component} from 'react';

import {ViroFlexView, ViroImage, ViroQuad, ViroMaterials, ViroSound} from 'react-viro';

class PuzzleSliding extends Component {
    constructor() {
        super();
        this.state = {
            solution: [[0, 1, 2], [3, 4, 5], [6, 7, 'Blank']],
            gameBoard: [],
            solved: false,
            secretCodeDigit: '9',
            spookyPortrait: false,
        }

        this.shuffle = this.shuffle.bind(this);
        this.clickSquare = this.clickSquare.bind(this);
        this.compareBoards = this.compareBoards.bind(this);
        this.puzzleSolved = this.puzzleSolved.bind(this);
    }

    componentWillMount() {
        const arr = this.shuffle([0, 1, 2, 3, 4, 5, 6, 7, "Blank"]);
        const newArr = [];
        let row = [];

        for (let i=0; i < arr.length; i++) {
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
        const blankIdx = arr.indexOf("Blank");
        arr[blankIdx] = arr[arr.length-1];
        arr[arr.length-1] = "Blank";

        return arr;
    }

    clickSquare(r, c) {
        return function () {
            const boardCopy = [...this.state.gameBoard];

            let blankRow;
            let blankCol;

            // Get the row and column of the blank square
            for (let i=0; i < boardCopy.length; i++) {
                const blankIdx = boardCopy[i].indexOf("Blank");
                if (blankIdx > -1) {
                    blankRow = i;
                    blankCol = blankIdx;
                    break;
                }
            }

            // Determine if the blank square is adjacent and swap if so
            if ((blankCol === c && (blankRow === r-1 || blankRow === r+1)) ||
                (blankRow === r && (blankCol === c-1 || blankCol === c+1))) {

                boardCopy[blankRow][blankCol] = boardCopy[r][c];
                boardCopy[r][c] = 'Blank';
            }
            
            this.setState({gameBoard: boardCopy});
            const playerWon = this.compareBoards(boardCopy, this.state.solution);
            if (playerWon) this.puzzleSolved();
        }
    }

    compareBoards(arr1, arr2) {
        for (let i=0; i < arr1.length; i++) {
            for (let j=0; j < arr1[i].length; j++) {
                if (arr1[i][j] !== arr2[i][j]) return false;
            }
        }

        return true;
    }

    puzzleSolved() {
        this.setState({solved: true});
        setTimeout(() => this.setState({spookyPortrait: true}), 2000);
    }

    render() {
        return (
            <ViroFlexView
                position={[0, 0, -2]}
                style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}
                rotation={[0, 0, 0]}
                height={0.94}
                width={0.94}
            >
                {!this.state.solved 
                ? (this.state.gameBoard.map((row, rowIdx) => {
                    return (
                        <ViroFlexView
                            key={`row${rowIdx}`}
                            style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}
                            height={.3}
                            width={0.94}>
                        {
                            row.map((tile, colIdx) => {
                                return (
                                    <ViroQuad 
                                        key={`tile${colIdx}`} 
                                        materials={[`grid${tile}`]}
                                        height={.3}
                                        width={.3}
                                        onClick={this.clickSquare(rowIdx, colIdx).bind(this)}
                                    />
                                )
                            })
                        }
                        </ViroFlexView>
                    )
                }
                ))
                : (
                    <ViroImage 
                        source={!this.state.spookyPortrait 
                            ? require('./res/SlidingPuzzle/portrait1.png')
                            : require('./res/SlidingPuzzle/portrait2.png')}
                        width={.94}
                        height={.94}
                    />
                )}
                {this.state.spookyPortrait && <ViroSound source={require('./sounds/horror_stab.mp3')} loop={false} /> }
            </ViroFlexView>
        )
    }
}

ViroMaterials.createMaterials({
    grid0: {
        diffuseTexture: require('./res/SlidingPuzzle/grid0.png')
    },
    grid1: {
        diffuseTexture: require('./res/SlidingPuzzle/grid1.png')
    },
    grid2: {
        diffuseTexture: require('./res/SlidingPuzzle/grid2.png')
    },
    grid3: {
        diffuseTexture: require('./res/SlidingPuzzle/grid3.png')
    },
    grid4: {
        diffuseTexture: require('./res/SlidingPuzzle/grid4.png')
    },
    grid5: {
        diffuseTexture: require('./res/SlidingPuzzle/grid5.png')
    },
    grid6: {
        diffuseTexture: require('./res/SlidingPuzzle/grid6.png')
    },
    grid7: {
        diffuseTexture: require('./res/SlidingPuzzle/grid7.png')
    },
    gridBlank: {
        diffuseTexture: require('./res/SlidingPuzzle/grid8.png')
    },
})

export default PuzzleSliding;