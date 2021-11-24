import React, { Component } from 'react';
import { TextInput, ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';

import { db } from '../firebase/config';
import Card from '../components/Card'

class Buscador extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            search: '',
            posts: [],
        }
    }

    fetchPosts = (search) => {
        if (!search) {
            this.setState({ loading: false, posts: [] });
            return;
        }

        db.collection('Posts').where('owner', '==', search).onSnapshot(docs => {
            const posts = [];
            docs.forEach(doc => {
                posts.push({
                    id:doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: posts,
                loading: false,
            })
        })
    }

    handleSearchChange = (value) => {
        const search = value.trim();
        this.setState({ search, loading: true });
        this.fetchPosts(search);
    }

    renderContent = () => {
        const { loading, posts, search } = this.state;
        
        if (!loading) {
            if (!posts.length && !!search) {
                return <>{`No hay resultados que concuerden con la busqueda ${search}`}</>;
            }

            if (!posts.length && !search) {
                return <>Realice una busqueda para filtrar resultados</>;
            }

            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={posts}
                        keyExtractor={(card) => card.id.toString()}
                        renderItem={({item}) => <Card postData={item} /> }                        
                        renderItem={({item}) => <Card style={styles.post} postData={item} /> }
                    />
                </View>
            );
        }

        return <ActivityIndicator color={"black"} size={"large"} />;
    }

    render(){
        return(
            <View style={styles.buscador}>
                <TextInput
                    style={styles.text}
                    onChangeText={this.handleSearchChange}
                    placeholder='Ingresa el mail del usuario que deseas buscar'
                    keyboardType='default'
                />
                {this.renderContent()}
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
        flex: 1
    },
    title: { 
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
})

export default Buscador;
