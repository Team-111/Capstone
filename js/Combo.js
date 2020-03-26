import React, {Component} from 'react';

import {ViroText, ViroFlexView, ViroMaterials} from 'react-viro';

class Combo extends Component {
    constructor() {
        super();
        this.state = {
            solution: [],
            digits: [0, 0, 0, 0],
            solved: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.checkMatch = this.checkMatch.bind(this);
    }

    componentWillMount() {
        this.setState({
            solution: this.props.code.toString().split(''),
        })
    }

    handleClick(idx) {
        const digitsCopy = [...this.state.digits];
        digitsCopy[idx]++;

        if (digitsCopy[idx] > 9) digitsCopy[idx] = 0;

        this.setState({
            digits: digitsCopy,
            solved: this.checkMatch(),
        });
    }

    checkMatch() {
        for (let i=0; i < this.state.digits; i++) {
            if (this.state.digits[i] !== this.state.solution[i]) return false;
        }
        return true;
    }

    render() {
        return (
            <ViroFlexView
                backgroundColor = "black"
                width={0.3}
                height={1.2}
                style={{flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}
                position={[0, -0.5, 3.2]}
                rotation={[0, 180, 0]}
            >
            {
                this.state.digits.map((digit, idx) => {
                    return (
                        <ViroFlexView
                            backgroundColor="transparent"
                            materials={["comboBg"]}
                            width={0.3}
                            height={0.3}
                            style={{flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: 0.1}}
                            onClick={() => this.handleClick(idx)}
                        >
                            <ViroText
                                key={`digit${idx}`}
                                color="red"
                                height={0.2}
                                width={0.2}
                                textAlign="center"
                                textAlignVertical="center"
                                text={digit.toString()} />
                        </ViroFlexView>
                    )
                })
            }
            </ViroFlexView>
        )
    }
}

ViroMaterials.createMaterials({
    comboBg: {
        diffuseTexture: require('./res/combo_bg.jpg'),
    }
})

export default Combo;