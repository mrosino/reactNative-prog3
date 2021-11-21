import React, { Component } from 'react';

//Aquí importo la configuración del auth que me ofrece firebase
import { auth, db } from '../firebase/config';
import { TextInput, ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import Card from '../components/Card'



class buscador extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            posts: []
        }
    }
    
    search(text){
        console.log(text);
        db.collection('Posts').where('owner','==',text).onSnapshot(
            docs => {
                console.log(docs)
            let posts=[];
            docs.forEach(doc => {
                posts.push({
                    id:doc.id,
                    data: doc.data()
                })
            })
            console.log(posts);
            this.setState({
                posts: posts,
                loading: false
            })
        })
    }

    render(){
        return(
            <View style={styles.buscador}>
                <TextInput
                    style={styles.text}
                    onChangeText={(text)=>this.search(text)}
                    placeholder='Ingresa el mail que quieres buscar'
                    keyboardType='default'
                />
               
                {this.state.loading ?
                <ActivityIndicator color={"green"} size={"large"} /> :
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(card) => card.id.toString()}
                        renderItem={({item}) => <Card style={styles.post} postData={item} /> }
                    />       
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text:{
        width:"100%",
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        textAlign: "center"
    },
    buscador:{
        borderColor: 'green',
        borderWidth: 1,
        borderStyle:'solid',
        backgroundColor:""
    
    },
    post: {
        width:1000,
        
      },

    })



export default buscador;
