import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import Post from '../screens/Post';
import { auth } from '../firebase/config';
const Drawer = createDrawerNavigator();
class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedin: false,
            userData: {}
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(
            user => {
                if (user){
                    this.setState({
                        loggedin: true,
                        userData: user,
                    })    
                }
            }
        )
    }
    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then(()=>{
                console.log('Registrado ok');
            })
            .catch( error => {
                console.log(error);
            })
    }
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( user => {
                console.log('Login Ok');
                this.setState({
                    loggedin: true,
                    userData: user
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    logout(){
        auth.signoOut()
        .then( 
            this.setState({
                loggedin: false,
            })
        )
        .catch(e => console.log(e))
    }
    render(){
        return(
            <NavigationContainer>
                { this.state.loggedin === false ?
                <Drawer.Navigator>
                    <Drawer.Screen name="Login" component={ ()=> <Login login={(email, pass)=>this.login(email, pass) } />}/>
                    <Drawer.Screen name="Registro" component={ ()=> <Register register={(email, pass)=>this.register(email, pass)} />}/>
                </Drawer.Navigator>:
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={ ()=> <Home />}/>
                    <Drawer.Screen name="Nuevo Post" component={ (drawerProps)=> <Post drawerProps={drawerProps}/>}/>
                    <Drawer.Screen name="Mi Perfil" component={ ()=> <Profile userData={this.state.userData} logout={()=>this.logout()} />}/>
                </Drawer.Navigator>
                }
            </NavigationContainer>
        )
    }
}
export default Menu;