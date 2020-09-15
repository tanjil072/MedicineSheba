import React from 'react';
import {Card} from 'react-native-shadow-cards';
import { TouchableOpacity, StyleSheet, View, Text, Button } from 'react-native';

export default class InProgress extends React.Component {
  constructor() {
    super();
  }

  render() {

    //console.log(this.props)


    return (

      <View style={styles.container}>
      <Card style={{padding: 10, margin: 10}}>
      <Text style={{position:'absolute',fontWeight:'bold',fontSize:30,marginTop:15,marginLeft:10}}>Order: 1</Text>
      
      <Text style={{fontSize:20,textAlign:'right',textDecorationLine: 'underline'}}>Total Cost</Text>
      <Text style={{fontSize:20,textAlign:'right'}}>{this.props.data}$</Text>

        
      </Card>
      
    </View>
    );
  }

}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    
  },
  text:{
    fontSize:20
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
