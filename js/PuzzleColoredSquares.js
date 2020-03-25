import React, {Component} from "react";

import {ViroFlexView, ViroImage, ViroMaterials, ViroQuad, ViroText} from "react-viro";

class PuzzleColoredSquares extends Component {
    constructor() {
        super();
        this.state = {
            gameBoard: [[1,1,1,1,1],
                        [1,1,0,1,1],
                        [1,0,0,0,1],
                        [1,1,0,1,1],
                        [1,1,1,1,1]],
        }

        this.clickSquare = this.clickSquare.bind(this);
    }

    clickSquare(r, c) {
        return function () {
            const boardCopy = [...this.state.gameBoard];

            boardCopy[r][c] = boardCopy[r][c] ? 0 : 1
            if (c < 4) boardCopy[r][c+1] = boardCopy[r][c+1] ? 0 : 1;
            if (c > 0) boardCopy[r][c-1] = boardCopy[r][c-1] ? 0 : 1;
            if (r < 4) boardCopy[r+1][c] = boardCopy[r+1][c] ? 0 : 1;
            if (r > 0) boardCopy[r-1][c] = boardCopy[r-1][c] ? 0 : 1;
    
            this.setState({gameBoard: boardCopy});
        }
    }
    
    render() {
        return (
            <ViroFlexView
                style={{flexDirection: 'column', alignSelf: 'center'}}
                width={.5} 
                height={.5} 
                backgroundColor="transparent"
                >
                {
                    this.state.gameBoard.map((row, rowIdx) => {
                        return (
                            <ViroFlexView
                                key={`row${rowIdx}`}
                                style={{flexDirection: 'row'}}
                                width={.5}
                                height={.1}>
                                {
                                    row.map((tile, colIdx) => {
                                        return (
                                            <ViroQuad 
                                                key={`tile${colIdx}`}
                                                width={.1} 
                                                height={.1} 
                                                materials={tile === 1 ? ["redSquare"] : ["yellowSquare"]}
                                                onClick={this.clickSquare(rowIdx, colIdx).bind(this)}
                                            />
                                        )
                                    })
                                }
                            </ViroFlexView>
                        )
                    })
                }
            </ViroFlexView>
        )
    }
}

ViroMaterials.createMaterials({
    redSquare: {
        diffuseTexture: require('./res/ColoredSquares/redSquare.png')
    },
    yellowSquare: {
        diffuseTexture: require('./res/ColoredSquares/yellowSquare.png')
    }
})

export default PuzzleColoredSquares;