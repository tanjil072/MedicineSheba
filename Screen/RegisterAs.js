import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { color } from 'react-native-reanimated';

const RegisterAs = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.head}>Register As a..</Text>
            <View style={styles.containingViewOfButton}>
                <View style={[styles.buttonTwo, { marginEnd: 20 }]}>
                    <Text
                        style={styles.registerTextStyle}
                        onPress={() => props.navigation.navigate('SellerRegistration')}>
                        <Text style={styles.text} >Seller</Text>
                    </Text>
                </View>
                <View style={styles.buttonTwo}>
                    <Text
                        style={styles.registerTextStyle}
                        onPress={() => props.navigation.navigate('BuyerRegistration')}>
                        <Text style={styles.text}>Buyer</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default RegisterAs;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B2BEB5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        color:'#0C0F12',
        fontSize: 40
        
    },
    containingViewOfButton: {
        flexDirection: 'row',


    },
    text:{
        fontSize:15,
        color:'#0C0F12'
    },
    buttonTwo: {
        marginTop: 25,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor:'white',
        width: '30%',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    }

});