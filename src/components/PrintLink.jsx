import React from "react"
import { View,Text,StyleSheet,TouchableOpacity} from "react-native"
import { Feather } from '@expo/vector-icons'

import {textC,titleC} from '../data/const'
import showAlert from './showAlert'




export default function PrintLink(props) {
    return (
        <View style={styles.line}>
            <Text style={styles.bold}>{props.title + ': '} </Text>
            <Text style={{ color: titleC }} >{props.value}</Text>
            <TouchableOpacity
                onPress={() => showAlert(props.link)}>
                <Feather name="external-link" size={24} color={titleC} />
            </TouchableOpacity>
        </View>)
}
const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
        color: textC,
    },
    line: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
})