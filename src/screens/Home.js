import React, { Component } from "react";
import { Text,View,StyleSheet,FlatList, Image,ActivityIndicator} from "react-native";

import { db } from "../firebase/config";
import Card from "../components/Card"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    this.setState({ loading: true });

    db.collection("Posts").orderBy("createdAt", "desc").onSnapshot((docs) => {
      let posteos = [];
      docs.forEach((doc) => {
        posteos.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      this.setState({
        posts: posteos,
        loading: false
      });
    });
  }

  render() {
    const { loading } = this.state;
    if (!loading) {
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
          keyExtractor={(card) => card.id.toString()}
          renderItem={({ item }) => <Card postData={item}/>}
        />
        </View>
      )
    }

    return <ActivityIndicator color={"black"} size={"large"} />;
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
