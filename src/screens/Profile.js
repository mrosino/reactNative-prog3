import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput, } from "react-native";
import { auth, db } from "../firebase/config";
import Card from "../components/Card";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      fecha: "",
      userPosts: "",

    };

  }



  componentDidMount() {
    //Traer datos de la db
    console.log(auth.currentUser);
    db.collection("Posts").where("owner", "==", auth.currentUser.email).orderBy("createdAt", "desc").limit(10)
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
    console.log(auth.currentUser);
    return (
      <View>
        <TouchableOpacity style={styles.close} onPress={() => this.props.logout()}>
          <Text style={styles.textButton}>Close claw</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Miau-Space </Text>
        <View style={styles.information}>
        
        <Text> Cat-name: {this.state.name} </Text>
          <Text> Cat-mail: {this.state.email} </Text>
          <Text> Last log: {auth.currentUser.metadata.lastSignInTime}</Text>
          <Text> Pawmark amount: {this.state.userPosts.length}</Text>
        </View>



        <FlatList
          data={this.state.userPosts}
          keyExtractor={(card) => card.id}
          renderItem={({ item }) => <Card postData={item} />}
        />
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",

  },
  imagen: {
    height: 250,
  },
  textButton: {
    textAlign: "center",
    backgroundColor: "#AD4E5C",
    color: "#FFF",
    padding: 5,
    borderRadius: 4,
    margin: 5,
    alignSelf: "center",
  },
  information: {
    paddingVertical: 20,
    marginHorizontal: 15,

  },
  close:{
    alignSelf: 'flex-end'
  }
});
export default Profile;
