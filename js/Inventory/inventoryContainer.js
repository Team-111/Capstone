import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ViroNode, ViroText, ViroImage, ViroFlexView} from 'react-viro';
import SingleItem from '../Inventory/singleItem'

const InventoryContainer = props => {
  return(
  <ViroText text={props.selectedItem}/>

  )
}


export default InventoryContainer
