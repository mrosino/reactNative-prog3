import React, { Component } from "react";
import {Text,TouchableOpacity,View,StyleSheet,Image,ActivityIndicator,FlatList,TextInput,} from "react-native";
import { auth, db } from "../firebase/config";
import Card from "../components/Card";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name:auth.currentUser.nickname,
      email: auth.currentUser.email,
      fecha:"",
      userPosts:"",

    };
    
  }



  componentDidMount() {
    //Traer datos de la db
    console.log(auth.currentUser);
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
        <Text style={styles.title}>Miau-Space </Text>
       <Text> Cat-mail:{this.state.email} </Text>
        <Text> Last log{auth.currentUser.metadata.lastSignInTime}</Text>
        <Text> Paw-amount{this.state.userPosts.length}</Text>
      
        <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
          <Text style={styles.textButton}>Close claw</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.userPosts}
          keyExtractor={(card) => card.id}
          renderItem={({ item }) => <Card postData={item}/>}
        />
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
    textAlign: "center",
    backgroundColor: "#AD4E5C",
    color: "#FFF",
    padding: 5,
    borderRadius: 4,
    margin: 5,
    alignSelf: "flex-end",
  
  },
});
export default Profile;
