import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';

export default class InProgress extends React.Component {
  constructor() {
    super();
  }

  render() {

    //console.log(this.props)


    return (

      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 25,textAlign: 'center',marginBottom: 16}}>
              Order 1
           </Text>
            <Text style={{fontSize: 25,textAlign: 'center',marginBottom: 16}}>
              Total Cost:{this.props.data}
           </Text>

          </View>

        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
