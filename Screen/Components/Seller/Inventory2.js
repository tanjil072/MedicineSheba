
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import flatListData from './flatListData';




class FlatListItem extends Component {


    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato'
            }}>
                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});

export default class Inventory2 extends Component {
    render() {
        return (
            <View style={{ flex: 1, marginTop: 22 }}>
                <FlatList
                    data={flatListData}
                    renderItem={({ item, index }) => {
                        //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                        return (
                            <FlatListItem item={item} index={index}>

                            </FlatListItem>);
                    }}
                >

                </FlatList>
            </View>
        );
    }
}