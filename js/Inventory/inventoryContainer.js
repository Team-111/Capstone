import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ViroNode, ViroText, ViroImage, ViroFlexView} from 'react-viro';
import SingleItem from '../Inventory/singleItem'

const InventoryContainer = props => {
  return(
    <ViroFlexView style={{flexDirection:'row', padding: .1}} width={1} height={1} backgroundColor={"red"} >
      {props.currPage.map(item => {
        return(<SingleItem item={item} style={{flex: .5}}/>)
      })}
    </ViroFlexView>
  )
}


export default InventoryContainer
