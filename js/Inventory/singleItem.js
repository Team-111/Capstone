import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ViroNode, ViroText, ViroImage, ViroFlexView} from 'react-viro';

class SingleItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false
    }
  }
  render() {
    return(
      <ViroFlexView style={{flexDirection:'row', padding: .1}} width={1} height={.8}>
        <ViroImage source={require('../Inventory/images/key.png')} style={{flex:.5}}/>
      </ViroFlexView>
    )
  }
}



export default SingleItem

