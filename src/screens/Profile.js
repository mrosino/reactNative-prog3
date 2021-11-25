import React, { Component } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, StyleSheet, FlatList } from "react-native";

import { auth, db } from "../firebase/config";
import Card from "../components/Card";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      fecha: "",
      posts: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchUserPosts();
  }

  onPostDelete = (id) => {
    const { posts } = this.state;
    this.setState({ posts: posts.filter(p => p.id !== id )})
  }

  fetchUserPosts = () => {
    db.collection("Posts").where("owner", "==", auth.currentUser.email).orderBy("createdAt", "desc").limit(10)
      .onSnapshot((docs) => {
          const posts = [];
          docs.forEach((doc) => {
            posts.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({ posts });
      });
      this.setState({ loading: false });
  }

  renderPosts = () => {
    const { posts } = this.state; 

    if (!posts.length) {
      return <Text style={styles.no}> Still no PawMarks</Text>;
    }

    return (
      <>
        <Text style={styles.info}>{`Pawmark amount: ${posts.length}`}</Text>
        <View style={styles.container}>
          <FlatList
            data={posts}
            keyExtractor={(card) => card.id}
            renderItem={({ item }) => <Card postData={item} onPostDelete={this.onPostDelete} />}
          />
        </View>
      </>
    )   
  }
  
  render() {
    const { loading, name, email } = this.state; 

    if (!loading) {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.close} onPress={this.props.logout}>
            <Text style={styles.textButton}>Close claw</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Miau-Space </Text>
          <View style={styles.information}>
            <Text style={styles.info}>{`Cat-name: ${name}`}</Text>
            <Text style={styles.info}>{`Cat-mail: ${email}`}</Text>
            <Text style={styles.info}>{`Last log: ${auth.currentUser.metadata.lastSignInTime}`}</Text>
            {this.renderPosts()}
          </View>
        </View>
      );
    }

    return <ActivityIndicator color={"black"} size={"large"} />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    color: "black",
    padding: 5,
    borderRadius: 4,
    margin: 5,
    alignSelf: "center",
  },
  information: {
    backgroundColor: "#F2E3E4",
    paddingRight: 10,
    paddingVertical: 20,
    marginHorizontal: "15%",
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 2,  
    alignSelf: 'center',
    padding: 3, 
    color: "#BC6760",
    fontWeight:'bold',
    flex: 1
  },
  info: {
    backgroundColor: "#F2E3E4",   
    paddingLeft: 8, 
    color: "black",
    fontWeight:'bold',
    textAlign: 'stretch'
  },
  close:{
    alignSelf: 'flex-end',
    marginEnd: 50
  },
  no:{
    color: "#AD4E5C",
    padding: 25,
    fontSize: 32,
    fontWeight:'bolder',
    alignSelf: 'center',
  },
});
export default Profile;
