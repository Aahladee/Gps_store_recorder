import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header({title}: {title?: string}) {
  return (
    <>
    <View style={styles.header}/>
    <View style={styles.subHeader}>
        <Text style={styles.headerText}>{title}</Text>
    </View></>
  )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        backgroundColor: '#33B5EF',
        justifyContent: 'center',
        alignItems: 'center',
      },
      subHeader:{
        width: '100%',
        height: 40,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
      },
      headerText:{
        color: '#8B8B8B',
        fontSize: 15,
        marginHorizontal: 10,
      }
})