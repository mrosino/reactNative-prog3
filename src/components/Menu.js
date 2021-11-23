import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Profile from "../screens/Profile";
import Upload from "../screens/Upload";
import Buscador from "../screens/Buscador";

import { auth, db } from "../firebase/config";

const Drawer = createDrawerNavigator();
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      userData: {},
      nickName: "",
      error: "",
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedin: true,
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
        console.log("Login Ok");
        this.setState({
          loggedin: true,
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
          loggedin: false,
        })
      )
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.loggedin === false ? (
          <Drawer.Navigator>
            <Drawer.Screen name="Log into your CatSpace!">
                            {props => <Login {...props} login={(email, password)=>this.login(email, password)} error={this.state.error}/>}
                        </Drawer.Screen>
                        <Drawer.Screen name = "Register your paw!">
                            {props => <Register {...props} register={(email, password,username)=>this.register(email, password,username)} error={this.state.error}/>}
                        </Drawer.Screen>
            
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator>
<<<<<<< Updated upstream
            <Drawer.Screen name = "Home">
                        {props => <Home {...props} />}
                    </Drawer.Screen>
            <Drawer.Screen name = "Buscador">
                                {props => <Buscador {...props}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name = "New pawmark">
                                {props => <Upload {...props}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name = "Miauself">
                        {props => <Profile {...props} />}
                    </Drawer.Screen>
=======
            <Drawer.Screen name="Home" component={() => <Home logout={() => this.logout()} />} />
            <Drawer.Screen name="Buscador" component={() => <Buscador />} />
            <Drawer.Screen
              name="New pawmark"
              component={(drawerProps) => <Upload drawerProps={drawerProps} />}
            />
            <Drawer.Screen
              name="Miauself"
              component={() => (
                <Profile
                  userData={this.state.userData}
                  logout={() => this.logout()}
                />
              )}
            />
>>>>>>> Stashed changes
          </Drawer.Navigator>
        )}
      </NavigationContainer>
      
    );
  }
}

export default Menu;
