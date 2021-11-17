import React, {Component} from "react";

import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            error:'',
        }
    }

    render(){
       
        return(
            <View style={styles.form}>
                <Text>Log into your catspace</Text>
                <TextInput
                    style={styles.text}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Type your email'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.text}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Type your catsignal'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Miau!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    form:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    text:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28A745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28A745'
    },
    textButton:{
        color: '#fff'
    }
})
export default Login;