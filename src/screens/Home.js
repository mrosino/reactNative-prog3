import React, { Component } from "react";
import { Text,View,StyleSheet,FlatList, TouchableOpacity, Image} from "react-native";
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
      
        <Text style={styles.title}> I tawt I taw puddy tat </Text>
        <Image
          style={styles.imageT}
          source={require( '../../assets/tweety.png' )}
          resizeMode="contain"
        />
       
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
    textAlign: "center",
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
  imagen: {
    height: 250,
  },
  imageT: {
    height: 150,
    marginEnd: 40,
  },
});
export default Home;
