import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class EditMedi extends Component {
    
    constructor() {
        super();
      }
      
    render() {

        const text =  this.props.navigation.getParam('text', 'nothing sent')

        //console.log(text)
        return (
            <View>
                <Text>{text}</Text>
            </View>
        )
    }
}