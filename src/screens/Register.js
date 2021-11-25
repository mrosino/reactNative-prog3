import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      nickName: "",
      password: "",
    };
  }

  handleRegister = () => {
    const { email,  password, nickName } = this.state;
    this.props.register(email, password, nickName) ;
    
  };

  handleInputChange = (key) => {
    return (value) => {
      this.setState({ [key]: value });
    };
  };

  render() {
    const { error } = this.props;
    const { email, nickName, password } = this.state;
    const isButtonDisabled = !email.trim() || !nickName.trim() || !password.trim();

    return (
      <View style={styles.formContainer}>
        <Text>Register</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange("email")}
          placeholder="Type your cat-mail"
          keyboardType="email-address"
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange("nickName")}
          placeholder="catname"
          keyboardType="default"
          value={nickName}
        />
        <TextInput
          style={styles.input}
          onChangeText={this.handleInputChange("password")}
          placeholder="catsignal"
          keyboardType="email-address"
          secureTextEntry={true}
          value={password}
        />
        <TouchableOpacity
          style={
            isButtonDisabled ? styles.buttonDisabled : styles.buttonEnabled
          }
          onPress={this.handleRegister}
          disabled={isButtonDisabled}
        >
          <Text style={styles.textButton}>Register your meow</Text>
        </TouchableOpacity>
        {!error ? <></>: <Text style={styles.alert}>{error}</Text>}
      
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  input: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },
  buttonDisabled: {
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderStyle: "solid",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: "darkGrey",
    backgroundColor: "grey",
    cursor: "not-allowed",
    fontWeight: "bold",
    color: 'black'
  },
  buttonEnabled: {
    textAlign: "center",
    backgroundColor: "#CC8E93",
    margin: 2,
    borderStyle: "solid",
    fontWeight: "bold",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    cursor: "pointer",
  },

  textButton: {
    color: "black",
    fontWeight: 'bold'
  },
  alert: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
});
export default Register;
