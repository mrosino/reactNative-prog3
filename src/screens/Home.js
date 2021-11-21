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
   
  }
  render() {
    return (
      <View>
        <Text style={styles.title}> Me parece que vi un lindo gatito </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
          <Text style={styles.textButton}>Close claw</Text>
        </TouchableOpacity>
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
