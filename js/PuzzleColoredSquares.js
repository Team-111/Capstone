import React from "react";

import {ViroFlexView, ViroImage, ViroMaterials} from "react-viro";

const PuzzleColoredSquares = props => {
    const gameBoard = [[1,1,1,1,1],
                       [1,1,0,1,1],
                       [1,0,0,0,1],
                       [1,1,0,1,1],
                       [1,1,1,1,1]];
    
    return (
        <ViroFlexView
            style={{flexDirection: 'column', alignSelf: 'center'}}
            width={.5} 
            height={.5} 
            position={[0,0,.1]}
            backgroundColor="black">
            {
                gameBoard.map((row, rowIdx) => {
                    return (
                        <ViroFlexView
                            key={`row${rowIdx}`}
                            style={{flexDirection: 'row'}}
                            width={.5}
                            height={.1}>
                            {
                                row.map((tile, tileIdx) => {
                                    return (
                                        <ViroImage 
                                            key={`tile${tileIdx}`}
                                            width={.1} 
                                            height={.1} 
                                            source={tile === 1 
                                                ? require('./res/ColoredSquares/redSquare.png')
                                                : require('./res/ColoredSquares/yellowSquare.png')
                                            }
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

export default PuzzleColoredSquares;