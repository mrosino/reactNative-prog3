import React, { Component } from 'react';
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
                
                <View >
                <TextInput
                    style={styles.text}
                    onChangeText={(text)=>this.search(text)}
                    placeholder='Ingresa el mail del usuario que deseas buscar'
                    keyboardType='default'
                />
                </View>
               
                {this.state.loading ?
                <ActivityIndicator color={"green"} size={"large"} /> :
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(card) => card.id.toString()}
                        renderItem={({item}) => <Card postData={item} /> }
                        // si no hay resultados  mensaje: “El usuario no existe o aún no tiene publicaciones”
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
        borderRadius: 6,
        marginVertical:10,
        textAlign: "center",
        backgroundColor: "white",
        paddingStart: 10,
        paddingEnd: 10,
    },
    buscador:{
        borderWidth: 1,
        backgroundColor: "#D9ABAE",
        paddingVertical: 10,
        marginVertical: 50,
        width: "100%",
    },
   
    title: { 
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
      },

    })



export default buscador;
