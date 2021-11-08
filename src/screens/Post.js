import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from "../components/MyCamera";

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            showCamera: true
        }
    }

    onSubmit(){
     
        db.collection('Posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoPost: this.state.textoPost,
        })
        .then(()=>{
         
            this.setState({
                textoPost: ''
            })
            
            this.props.drawerProps.navigation.navigate('Home');
        })
        .catch( e => console.log(e))
    }


    render(){
        console.log(this.props.login);
        return(
            <View style={styles.formContainer}>
                {this.state.showCamera?(
                    <MyCamera/>
                ): (
                    <>
                    <Text>Nuevo Post</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({textoPost: text})}
                        placeholder='Escriba aquí...'
                        keyboardType='default'
                        multiline
                        value={this.state.textoPost}    
                        />
                    <TouchableOpacity style={styles.button} onPress={()=>this.onSubmit()}>
                        <Text style={styles.textButton}>Postear</Text>    
                    </TouchableOpacity>
                    </>
                )}
                
           
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
        height:100,
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
    }

})
export default Post;