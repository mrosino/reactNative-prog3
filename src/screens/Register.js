import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            password:'',
            error: "",
        }
    }
 
    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Type your cat-mail'
                    keyboardType='email-address'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='catname'
                    keyboardType='default'/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='catsignal'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                         {
                        this.props.error ?
                            <Text style={styles.alert}>{this.props.error}</Text>
                            :
                            <React.Fragment></React.Fragment>
                    }
                <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Register your meow</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
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
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    alert: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 10,
    },
})
export default Register;