import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from "../components/MyCamera";


class Upload extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            showCamera: true,
            url: '',
            loaded: false            
        }
    }
    componentDidMount(){
        this.setState({
            loaded:true
          });
    }

    uploadPhoto(url){
        this.setState({
            showCamera: false,
            url: url

        })
    }

    onSubmit(){
        db.collection('Posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoPost: this.state.textoPost,
            image: this.state.url,
            likes:[],
            comments:[],
        })
        .then(()=>{
            this.setState({
                textoPost: '',
                image:''
            })
          
            this.props.drawerProps.navigation.navigate('Home');
        })
        .catch( e => console.log(e))
    }


    render(){
        return(
            <View style={styles.formContainer}>
                   {this.state.showCamera?(
                    <MyCamera uploadPhoto={(url)=>this.uploadPhoto(url)}/>
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
                     {this.state.loaded == false ?<ActivityIndicator color={"black"} size={"large"} /> : <React.Fragment></React.Fragment>}
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
        flex: 1
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
        backgroundColor:'#AD4E5C',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#AD4E5C'
    },
    textButton:{
        color: '#fff'
    }

})
export default Upload;

//lo mio