import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Camera } from "expo-camera";
import { storage } from "../firebase/config";



export default class MyCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: false,
      photo: "",
      showCamera: true,
    };
    this.camera;
  }

  componentDidMount() {
    Camera.requestCameraPermissionsAsync().then((response) => {
      this.setState({
        permissions: response.granted,
      });
    });
  }
  takePhoto() {
    this.camera.takePictureAsync().then((photo) => {
      this.setState({
        photo: photo.uri,
        showCamera: false,
      });
    });
  }

  newPhoto() {
    this.setState({
      photo: "",
      showCamera: true,
    });
  }

  savePhoto() {
    fetch(this.state.photo)
      .then((response) => response.blob())
      .then((result) => {
        const ref = storage.ref(`photos/${Date.now()}.jpg`);
        ref.put(result).then(() => {
          ref.getDownloadURL().then((url) => {
            this.props.uploadPhoto(url);
            this.setState({
              photo: "",
            });
          });
        });
      });
  }

  render() {
    return (
      <View style={styles.viewCamera}>
        {this.state.permissions ? (
          this.state.showCamera ? (
            <View style={styles.viewCamera}>
              <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                ref={(reference) => (this.camera = reference)}
              />
              <TouchableOpacity
                style={styles.viewCamera}
                onPress={() => this.takePhoto()}
              >
                <Text style={styles.shoot}>Say Whiskas!</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Image style={styles.camera} source={{ uri: this.state.photo }} />
              <TouchableOpacity
                style={styles.viewCamera}
                onPress={() => this.savePhoto()}
              >
                <Text style={styles.accept}>Purr-fect!</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewCamera}
                onPress={() => this.newPhoto()}
              >
                <Text style={styles.reject}>Not my profile</Text>
              </TouchableOpacity>
            </>
          )
        ) : (
          <Text> Not allowed</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewCamera: {
    flex: 1,
  },
  camera: {
    flex: 6,
    width: "90%",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 20,
    borderWidth: 12,
    borderColor: "B14D3A"
    
  },
  accept: {
    marginTop: 10,
    width: 100,
    backgroundColor: "#A550A0",
    borderRadius: 50,
    alignItems: "center",
    padding: 4,
   shadowColor: 'black',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: 'bolder', 
    fontsize: 12,
  },
  shoot: {
    marginTop: 10,
    width: 120,
    backgroundColor: "#AD4E5C",
    borderRadius: 50,
    alignItems: "center",
    padding: 4,
    shadowColor: 'black',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: 'bolder', 
    fontsize: 12,
  },
  reject: {
      marginTop: 10,
    backgroundColor: "#B44C18",
    borderRadius: 50,
    alignItems: "center",
    padding: 6,
    shadowColor: 'black',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: 'bolder', 
    fontsize: 12,
  },
});

//lo mio
