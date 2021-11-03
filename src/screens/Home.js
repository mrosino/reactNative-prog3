import React, { Component } from "react";
import { Text,TouchableOpacity,View,StyleSheet,Image,ActivityIndicator,FlatList,TextInput,} from "react-native";
import { db, auth } from "../firebase/config";
import Card from "../components/Card"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    //Traer datos de la db
    db.collection("Posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((docs) => {
        let posteos = [];
        docs.forEach((doc) => {
          posteos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        console.log(posteos);
        this.setState({
          posts: posteos,
        });
      });
      console.log(auth.currentUser.userName + "hola");
  }
  render() {
    return (
      <View>
        <Text style={styles.title}> Hola Mundo </Text>

        <FlatList
          data={this.state.posts}
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
});
export default Home;
