import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    handleLogin = () => {
        const { login } = this.props;
        const { email, password } = this.state;  
        login(email, password)
    }

    handleInputChange = (key) => {
        return (value) => {
            this.setState({ [key]: value })
        }
    }

    render() {
        const { error } = this.props;
        const { email, password } = this.state;
        const isButtonDisabled = !email || !password;

        return (
            <View style={styles.form}>
                <Text>Log into your catspace</Text>
                <TextInput
                    style={styles.text}
                    onChangeText={this.handleInputChange('email')}
                    placeholder='Type your email'
                    keyboardType='email-address' 
                />
                <TextInput
                    style={styles.text}
                    onChangeText={this.handleInputChange('password')}
                    placeholder='Type your catsignal'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                <TouchableOpacity 
                    style={isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled}                     
                    onPress={this.handleLogin}
                    disabled={isButtonDisabled}
                >
                    <Text style={styles.textButton}>Fur-ward</Text>
                </TouchableOpacity>
                {error && <Text style={styles.alert}>{error}</Text>}

                 
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register your paw!')}>
                <Text>Haven't registered your paw? <br></br> Paw-some, follow me to Register</Text>
               
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
    buttonDisabled: {
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderColor: 'darkGrey',
        backgroundColor: 'grey', 
        cursor: 'not-allowed',
        fontWeight: "bold",
    },
    buttonEnabled: {
        textAlign: "center",
        backgroundColor: "#CC8E93",
        margin: 2,
        borderStyle: "solid",
        fontWeight: "bold",
        paddingVertical: 6,
        paddingHorizontal: 10,        
        borderRadius: 4,        
        cursor: 'pointer'
      },
   
    textButton: {
        color: 'black',
        fontWeight: 'bold'
    },
    alert: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
   
});

export default Login;