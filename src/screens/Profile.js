// Dentro de la aplicación deben mostrarse una pantalla con el perfil de del usuario con la siguiente información y funcionalidades:
// Nombre del usuario
// Email del usuario.
// Fecha de la última vez que ingresó a la aplicación.
// Los datos de la cantidad total de posteos publicados.
// Deben verse todos los posteos cargados por el usuario.
// Ordenados cronológicamente comenzando por el último cargado.
// Permitir borrado. Opcional: mostrar un alert para confirmar o cancelar el borrado del posteo.
// Botón para el logout completo del usuario.
// La pantalla será accesible únicamente para los usuarios logueados.


import React, { Component } from "react";
import {Text,TouchableOpacity,View,StyleSheet,Image,ActivityIndicator,FlatList,TextInput,} from "react-native";
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }
  componentDidMount() {
    //Traer datos de la db
    db.collection("Posts").where("owner","==","mvrosino@hotmail.com").orderBy("createdAt", "desc")
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
        <Text style={styles.title}> Mi perfil </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
          <Text style={styles.textButton}>Cerrar sesion </Text>
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
  textButton:{
    fontSize:30,
    textAlign: "center",
  
  },
});
export default Profile;
