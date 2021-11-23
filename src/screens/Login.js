import React, { Component } from "react";

import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
        }
    }

    render() {

        return (
            <View style={styles.form}>
                <Text>Log into your catspace</Text>
                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='Type your email'
                    keyboardType='email-address' />
                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder='Type your catsignal'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                {
                    this.props.error ?
                        <Text style={styles.alert}>{this.props.error}</Text>
                        :
                        <React.Fragment></React.Fragment>
                }
                <TouchableOpacity style={styles.button} onPress={() => this.props.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Fur-ward</Text>
                </TouchableOpacity>
              
            </View>
        )
    }
}
const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    text: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#F8F2F8',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#AD4E5C',   
    },
    textButton: {
        color: '#AD60A9',
        fontWeight: 'bold'
    },
    alert: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
})
export default Login;