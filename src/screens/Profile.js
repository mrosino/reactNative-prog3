import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  TextInput,
} from "react-native";
class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text style={styles.title}> Mi perfil </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
          <Text style={styles.textButton}>Cerrar </Text>
        </TouchableOpacity>
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
export default Profile;
