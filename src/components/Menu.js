import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import Upload from "../screens/Upload";
import Buscador from "../screens/Buscador";
import { auth } from "../firebase/config";

const Drawer = createBottomTabNavigator();
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedin: false,
      userData: {},
      nickName: "",
      error: "",

    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loadedin: true,
          userData: user,
        });
      }
    });
  }
  register(email, pass, nickName) {
    auth
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        auth
          .onAuthStateChanged((user) => {
            user.updateProfile({
              createdAt: Date.now(),
              displayName: nickName,
            });
          })
          .catch((e) => console.log(`Error update: ${e}`));
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }
  login(email, pass) {
    auth
      .signInWithEmailAndPassword(email, pass)
      .then((user) => {
        this.setState({
          loadedin: true,
          userData: user,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }
  logout() {
    auth
      .signOut()
      .then(
        this.setState({
          loadedin: false,
          error: ''
        })
      )
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.loadedin === false ? (
          <Drawer.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === "Log into your CatSpace!") {
                iconName = focused
                  ? 'log-in'
                  : 'log-in-outline';
              } 
              else if (route.name === 'Register your paw!') {
                iconName = focused ? 'paw' : 'paw-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#BC6760',
            tabBarInactiveTintColor: 'gray',

          })}
          tabBarOptions={
            {
              // activeBackgroundColor: "grey",
              // inactiveBackgroundColor: "#BC6760",
              showLabel: true,
            }
          }
        >

            <Drawer.Screen name="Log into your CatSpace!">
                            {props => <Login {...props} login={(email, password)=>this.login(email, password)} error={this.state.error}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name = "Register your paw!">
                            {props => <Register {...props} register={(email, password,username)=>this.register(email, password,username)} error={this.state.error}/>}
                        </Drawer.Screen>
            
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } 
              else if (route.name === 'Buscador') {
                iconName = focused ?  'search' : 'search-outline';
              }
              
              else if (route.name === 'Miauself') {
                iconName = focused ? 'person' : 'person-outline';
              }
              else if (route.name === 'New pawmark') {
                iconName = focused ? 'paw' : 'paw-outline';
              }
              return <Ionicons name={iconName} size={size} color={"#BC6760"} />;
            },

          })}
          tabBarOptions={
            {
              // activeBackgroundColor: "#BC6760",
              // inactiveBackgroundColor: "grey",
              showLabel: true,
            }
          }>
            
            <Drawer.Screen name = "Home">
                            {props => <Home {...props} logout={() => this.logout()} />}
                        </Drawer.Screen>
                        <Drawer.Screen name = "Buscador">
                        {props => <Buscador {...props} />}
                        </Drawer.Screen>
                        <Drawer.Screen name="New pawmark"
              component={(drawerProps) => <Upload drawerProps={drawerProps} />} />
                       
                        <Drawer.Screen name = "Miauself">
                            {props => <Profile {...props} userData={this.state.userData} logout={() => this.logout()}/>}
                        </Drawer.Screen>
          </Drawer.Navigator>
        )}
      </NavigationContainer>
      
    );
  }
}

export default Menu;
