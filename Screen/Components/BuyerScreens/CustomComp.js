import React from 'react';
import { Card } from 'react-native-shadow-cards';
import { TouchableOpacity, StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class CustomComp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            qty: 1,
            checked:0
        }


    }

    quantityHandler = (action, index) => {



        if (action == 'more') {
            this.setState({ qty: this.state.qty + 1 })
            //console.log("More:" + this.state.qty)
        } else if (action == 'less') {
            if (this.state.qty > 1) {
                this.setState({ qty: this.state.qty - 1 })
                //console.log("Less:" + this.state.qty)
            }

        }

    }

    render() {


        return (
            <View style={{flexDirection:'row'}}>
                

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.quantityHandler('less', this.props.index)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
                        <Icon name="remove" size={22} color="#cccccc" />
                    </TouchableOpacity>
                    <Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>
                        {this.state.qty}</Text>
                    <TouchableOpacity onPress={() => this.quantityHandler('more', this.props.index)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
                        <Icon name="add" size={22} color="#cccccc" />
                    </TouchableOpacity>
                </View>
            </View>
        )



    }
}

const styles = StyleSheet.create({

    centerElement: {
       flexDirection:'row'
    },
})