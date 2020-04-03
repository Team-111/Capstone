import React, {Component} from 'react';

import {
  ViroText,
  ViroFlexView,
  ViroMaterials,
  ViroSound,
  ViroNode,
} from 'react-viro';

class Dials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solution: [],
    };
  }
  render() {
    return (
      <ViroFlexView
        backgroundColor="black"
        width={0.3}
        height={1.2}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        position={[0, -0.5, 3.2]}
        rotation={[0, 270, 0]}
        shadowCastingBitMask={2}>
        {this.state.solution.map((num, idx) => {
          return (
            <ViroFlexView
              key={`num${idx}`}
              materials={['comboBg']}
              width={0.3}
              height={0.3}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 0.1,
              }}
              onClick={
                !this.state.solved ? () => this.handleClick(idx) : () => {}
              }
              shadowCastingBitMask={2}>
              <ViroText
                color="red"
                height={0.3}
                width={0.3}
                textAlign="center"
                textAlignVertical="center"
                text={num.toString()}
                shadowCastingBitMask={2}
              />
            </ViroFlexView>
          );
        })}
      </ViroFlexView>
    );
  }
}
