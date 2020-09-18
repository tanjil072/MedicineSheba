import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import Dialog from "react-native-dialog";


var text = ""; //Dialogue Title setter





export default class AdminProfile extends Component {


    state = {
        dialogVisible: false,
        UserName: "Admin",
        Phone: "+88016********",
        Password: "********"
    };



    logout = () => {
        this.props.navigation.navigate('LoginScreen');
    }

    showDialog = (mail) => {
        this.text = mail;
        this.setState({ dialogVisible: true });

    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleSubmit = () => {
        //alert(this.Text2)
        this.setState({ dialogVisible: false });
    };

    handleText = (textinp, store) => {

        if (store == 'UserName') {
            this.setState({ UserName: textinp });
        }
        if (store == 'Phone') {
            this.setState({ Phone: textinp });
        }
        if (store == 'Password') {
            this.setState({ Password: textinp });
        }

    };


    render() {

        return (


            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

                        <Text style={styles.name}>Admin User </Text>
                        <Text style={styles.userInfo}>{this.state.UserName}</Text>
                    </View>
                </View>

                <View style={styles.body}>


                    <View style={styles.detailBox}>
                        <View style={styles.box1}>
                            <Text style={{ fontSize: 20, color: 'black' }}>User</Text>
                            <Text style={{ fontSize: 20, color: 'rgb(133, 146, 158)' }}>{this.state.UserName}</Text>
                        </View>
                        <View style={styles.box2}>
                            <Icons name="pencil" size={25} style={{ marginTop: 5 }} onPress={() => { this.showDialog('UserName') }} />
                        </View>
                    </View>




                    <View style={styles.detailBox}>
                        <View style={styles.box1}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Email</Text>
                            <Text style={{ fontSize: 20, color: 'rgb(133, 146, 158)' }}>adminMS@outlook.com</Text>
                        </View>

                    </View>






                    <View style={styles.detailBox}>
                        <View style={styles.box1}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Phone/Mobile</Text>
                            <Text style={{ fontSize: 20, color: 'rgb(133, 146, 158)' }}>{this.state.Phone}</Text>
                        </View>
                        <View style={styles.box2}>
                            <Icons name="pencil" size={25} style={{ marginTop: 5 }} onPress={() => { this.showDialog('Phone') }} />
                        </View>
                    </View>

                    <View style={styles.detailBox}>
                        <View style={styles.box1}>
                            <Text style={{ fontSize: 20, color: 'black' }}>Password</Text>
                            <Text style={{ fontSize: 20, color: 'rgb(133, 146, 158)' }}>{this.state.Password}</Text>
                        </View>
                        <View style={styles.box2}>
                            <Icons name="pencil" size={25} style={{ marginTop: 5 }} onPress={() => { this.showDialog('Password') }} />
                        </View>
                    </View>

                    <View style={styles.item}>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={this.logout}
                        >

                            <Text style={styles.buttonTextStyle}>Log Out</Text>
                        </TouchableOpacity>


                    </View>

                    <View>

                        <Dialog.Container visible={this.state.dialogVisible}>
                            <Dialog.Title>Edit {this.text}</Dialog.Title>

                            <Dialog.Input style={styles.DialogStyle} placeholder={this.text} onChangeText={(textinp) => this.handleText(textinp, this.text)} > </Dialog.Input>
                            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                            <Dialog.Button label="Submit" onPress={this.handleSubmit} />

                        </Dialog.Container>
                    </View>

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({


    DialogStyle:
    {

        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,


    },

    box1: {
        flex: 1,

    },
    container: {
        height: '100%'
    },

    box2: {
        flex: 1,
        alignItems: 'flex-end'
    },
    detailBox: {
        flexDirection: 'row',
        margin: 10
    },
    header: {
        backgroundColor: "rgb(171, 235, 198)",
    },
    headerContent: {
        padding: 10,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "pink",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#000000",
        fontWeight: '600',
    },
    buttonStyle: {
        backgroundColor: 'rgb(230, 45, 82)',
        borderWidth: 0,
        color: '#FFFFFF',
        height: 45,
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginLeft: '38%',
        marginTop: 85,

    },
    buttonTextStyle: {
        color: 'rgb(255,255, 255)',
        paddingVertical: 10,
        fontSize: 16,
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",

    },
    body: {
        backgroundColor: "rgb(255,255,255)",
        height: '68%',

    },
    item: {
        flexDirection: 'row',
        marginTop: 20,

    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    iconContent: {
        flex: 1,
        paddingRight: 1,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 10,
        color: "white",
        marginLeft: 20
    }

});







