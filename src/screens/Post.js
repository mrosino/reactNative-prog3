import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from "../firebase/config";
import MyCamera from "../components/MyCamera";

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost:'',
            showCamera: true,
            url:'',
            loaded: false
        }
    }
    componentDidMount(){
        this.setState({
            loaded:true
          });
    }

    onSubmit(){
     
        db.collection('Posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            textoPost: this.state.textoPost,
            likes:[],
            comments:[],
            image:this.state.url
            
        })
        .then(()=>{
         
            this.setState({
                textoPost: ''
            })
            
            this.props.drawerProps.navigation.navigate('Home');
        })
        .catch( e => console.log(e))
    }

    onImageUpload(url){
        this.setState({
            showCamera:false,
            url:url
        })
        }
    render(){
       
        return(
            <View style={styles.form}>
                {this.state.showCamera?(
                    <MyCamera onImageUpload={(url)=>this.onImageUpload(url)}/>
                ): (
                    <>
                    <Text>New PawMark</Text>
                    <TextInput
                        style={styles.text}
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
    form:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    text:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#BC6760',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#BC6760'
    },
    textButton:{
        color: '#fff'
    }

})
export default Post;

