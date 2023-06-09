import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PrintLink from '../PrintLink'
import { titleC, bgC } from '../../data/const'
export default function About() {
  return (
    <View style={styles.container}> 
      <View style={styles.wrapper}>
      <Text style={styles.title}>Technologies used:</Text>
      <PrintLink
        title={'react-native'}
        link={'https://reactnative.dev'}
        value={'reactnative.dev'} >
      </PrintLink>
      <PrintLink
        title={'expo'}
        link={'https://expo.io'}
        value={'expo.io'} >
      </PrintLink>

      <PrintLink
        title={'react-navigation/native'}
        link={'https://reactnavigation.org'}
        value={'reactnavigation.org'} >
      </PrintLink> 
      <PrintLink
        title={'API'}
        link={'https://www.tvmaze.com/api'}
        value={'tvmaze.com/api'} > 
      </PrintLink>
      <Text style={styles.title}>Autor: Pavlo Podoroha</Text>
      </View>
    </View>)
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: bgC,
    alignItems:'center',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 21,
    fontWeight: "bold",
    color: titleC,
  },
  wrapper:{
    width:320,
    paddingTop:20,
    paddingHorizontal:5

}
});