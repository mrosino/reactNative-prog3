import React, { Component } from "react";
import {Text,TouchableOpacity,View,StyleSheet,Image,ActivityIndicator,FlatList,TextInput,} from "react-native";
import { auth, db } from "../firebase/config";
import Card from "../components/Card";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name:auth.currentUser.userName,
      email: auth.currentUser.email,
      fecha:"",
      userPosts:"",

    };
    
  }
  componentDidMount() {
    //Traer datos de la db
    db.collection("Posts").where("owner","==",auth.currentUser.email).orderBy("createdAt", "desc").limit(10)
      .onSnapshot((docs) => {
        let info = [];
        docs.forEach((doc) => {
          info.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(info);
        this.setState({
          userPosts: info,
        });
      });
      
  }
  render() {
    return (
      <View>
        <Text style={styles.title}> Mi perfil </Text>
        <Text> Nombre de usuario:</Text>
        <Text> Email:{this.state.email} </Text>
        <Text> Ultimo inicio de sesion:</Text>
        <Text> Cantidad total de posteos:{this.state.userPosts.length}</Text>
        <Text> Mis posteos:</Text>
        <FlatList
          data={this.state.userPosts}
          keyExtractor={(card) => card.id}
          renderItem={({ item }) => <Card postData={item}/>}
        />
        <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
          <Text style={styles.textButton}>Cerrar sesion </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textDecoration: "underline",
    textAlign: "center",
  },
  imagen: {
    height: 250,
  },
  textButton:{
    fontSize:30,
    textAlign: "center",
  
  },
});
export default Profile;
