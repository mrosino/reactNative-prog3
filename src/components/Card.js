import React, { Component } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  requireNativeComponent,
} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      myLike: false,
      showModal: false,
      comment: "",
    };
  }
  componentDidMount() {
    if (this.props.postData.data.likes) {
      this.setState({
        likes: this.props.postData.data.likes.length,
        myLike: this.props.postData.data.likes.includes(auth.currentUser.email),
      });
    }
  }

  likear() {
    db.collection("Posts")
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        console.log("likeado...");

        this.setState({
          likes: this.props.postData.data.likes.length,
          myLike: true,
        });
      })
      .catch((e) => console.log(e));
  }

  unlike() {
    db.collection("Posts")
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        console.log("quitando like...");

        this.setState({
          likes: this.props.postData.data.likes.length,
          myLike: false,
        });
      })
      .catch((e) => console.log(e));
  }

  showModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  publicarComentario() {
    let oneComment = {
      author: auth.currentUser.email,
      createdAt: Date.now(),
      commentText: this.state.comment,
    };

    db.collection("Posts")
      .doc(this.props.postData.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(oneComment),
      })
      .then(() => {
        console.log("Comentario guardado");
        this.setState({
          comment: "",
        });
      })
      .catch((e) => console.log(e));
  }

  render() {
    console.log(this.props.postData);
    return (
      <View style={styles.postContainer}>
        <Image
          style={styles.image}
          source={{ uri: this.props.postData.data.image }}
          resizeMode="contain"
        />

       
        <Text>{this.props.postData.data.owner}</Text>
        <Text>Likes: {this.state.likes}</Text>
        {this.state.myLike ? (
          <TouchableOpacity onPress={() => this.unlike()}>
            <Text>Paws down</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.likear()}>
            <Text>Paws up!</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => this.showModal()}>
          <Text>Comment</Text>
        </TouchableOpacity>

        {this.state.showModal ? (
          <Modal
            style={styles.modalContainer}
            animationType="fade"
            transparent={false}
            visible={this.state.showModal}
          >
            <TouchableOpacity onPress={() => this.closeModal()}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>

            {this.props.postData.data.comments ? (
              <FlatList
                data={this.props.postData.data.comments}
                keyExtractor={(post) => post.createdAt.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.tpost}>
                    {" "}
                    {item.author}: {item.commentText}
                  </Text>
                )}
              />
            ) : (
              <Text></Text>
            )}

            <View>
              <TextInput
                keyboardType="defualt"
                placeholder="Send love"
                onChangeText={(text) => {
                  this.setState({ comment: text });
                }}
                multiline
                value={this.state.comment}
              />
              <TouchableOpacity onPress={() => this.publicarComentario()}>
                <Text>Send</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#F9F1F1",
    borderWidth: 1,
    borderColor:"#C68085",
    borderRadius: 6,
    borderStyle: "solid",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    marginHorizontal: 10,
  },
 
  modalContainer: {
    width: "80%",
    borderRadius: 25,
    padding: 10,
    alignSelf: "center",
    marginVertical: 10,
    boxShadow: "rgb(204 204 204) 0px 0px 12px 9px",
    backgroundColor: "#F9F1F1",
  },
  image: {
    height: 400,
  },
  closeButton: {
    backgroundColor: "#7E3511",
    color: "#FFF",
    padding: 5,
    borderRadius: 4,
    margin: 5,
    alignSelf: "flex-end",
  },
  tpost:{
    alignSelf: 'center',
    textAlign: "center",
  }
});

export default Card;
