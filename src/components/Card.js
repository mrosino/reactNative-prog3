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
      author: auth.currentUser.displayName,
      createdAt: Date.now(),
      commentText: this.state.comment,
    };

    db.collection("Posts")
      .doc(this.props.postData.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(oneComment),
      })
      .then(() => {
        this.setState({
          comment: "",
        });
      })
      .catch((e) => console.log(e));
  }

  deletePost() {
    const { onPostDelete, postData } = this.props;
    const postId = postData.id;
    let question = confirm("Are you sure?");
    if (question) {
      db.collection("Posts").doc(postId).delete();
      if (onPostDelete) {
        onPostDelete(postId);
      }
    }
  }

  render() {
    console.log(this.props.postData.data.comments.length);
    return (
      <View style={styles.postContainer}>
        {auth.currentUser.email === this.props.postData.data.owner ? (
          <TouchableOpacity onPress={() => this.deletePost()}>
            <Text style={styles.sand}>Hide under the sand</Text>
          </TouchableOpacity>
        ) : (
          console.log("Permission not granted")
        )}
        <Image
          style={styles.image}
          source={{ uri: this.props.postData.data.image }}
          resizeMode="contain"
        />

        <Text style={styles.info}>
          {console.log(this.props.postData.data.author)}
          {this.props.postData.data.author} said: "
          {this.props.postData.data.textoPost}"{" "}
        </Text>
        <Text style={styles.info}>{this.state.likes} paws up </Text>
        <View style={styles.textpost}>
          {this.state.myLike ? (
            <TouchableOpacity onPress={() => this.unlike()}>
              <Text style={styles.postbutton1}>Paws down :( </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => this.likear()}>
              <Text style={styles.postbutton2}>Paws up! :) </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => this.showModal()}>
            <Text style={styles.postbutton}>
              {" "}
              {this.props.postData.data.comments.length} InteraCations
            </Text>
          </TouchableOpacity>
        </View>

        {this.state.showModal ? (
          
          <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.showModal}
            resizeMode="contain"
          >
            <TouchableOpacity onPress={() => this.closeModal()}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>

            {this.props.postData.data.comments ? (
              <FlatList
                data={this.props.postData.data.comments}
                keyExtractor={(post) => post.createdAt.toString()}
                renderItem={({ item }) => (
                  <Text style={styles.com}>
                    {item.author} said: "{item.commentText}"
                  </Text>
                )}
              />
            ) : (
              <Text style={styles.no}>No impressions on your paw :( </Text>
            )}

            <View>
              <TextInput
                style={styles.box}
                keyboardType="defualt"
                placeholder="Type your reaction"
                onChangeText={(text) => {
                  this.setState({ comment: text });
                }}
                multiline
                value={this.state.comment}
              />
              {this.state.comment.length > 1 ? (
                <TouchableOpacity
                  style={styles.postContainer}
                  onPress={() => this.publicarComentario()}
                >
                  <Text style={styles.postbutton}>Send</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.postbutton}>
                  {" "}
                  Write a reaction to your mate{" "}
                </Text>
              )}
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
    borderColor: "#C68085",
    borderRadius: 6,
    borderStyle: "solid",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    marginHorizontal: 10,
    textAlign: "center",
  },

  modalContainer: {
    borderRadius: 25,
    padding: 100,
    alignSelf: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#C68085",
    borderRadius: 6,
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
  textpost: {
    borderRadius: 3,
    borderColor: "#28a745",
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  postbutton: {
    backgroundColor: "#BC6760",
    margin: 2,
    paddingVertical: 6,
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 4,
    borderStyle: "solid",
    width: "inherit",
  },
  postbutton1: {
    backgroundColor: "#B14D3A",
    margin: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderStyle: "solid",
  },
  postbutton2: {
    backgroundColor: "#CC8E93",
    margin: 2,
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 10,
    textAlign: "center",
    borderRadius: 4,
    borderStyle: "solid",
  },
  sand: {
    backgroundColor: "#B14D3A",
    margin: 2,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderStyle: "solid",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  box: {
    alignSelf: "center",
    margin: 2,
    borderRadius: 2,
    borderStyle: "solid",
    padding: 5,
    width: "90%",
    borderColor: "#B14D3A",
    borderWidth: 3,
  },
  info: {
    backgroundColor: "#F2E3E4",
    margin: 2,
    paddingVertical: 6,
    textAlign: "center",
    fontWeight: "bolder",
    borderRadius: 4,
  },
  no: {
    color: "#AD4E5C",
    padding: 25,
    fontSize: 32,
    fontWeight: "bolder",
    alignSelf: "center",
  },
  com: {
    color: "#AD4E5C",
    padding: 1,
    fontSize: 10,
    fontWeight: "bolder",
    alignSelf: "stretch",
  },
});

export default Card;
