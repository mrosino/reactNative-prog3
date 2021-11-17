import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import Upload from '../screens/Upload';
import Buscador from '../screens/Buscador';

import { auth, db } from '../firebase/config';

const Drawer = createDrawerNavigator();
class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedin: false,
            userData: {},
            nickName:""
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
    register(email, pass, nickName){
        auth.createUserWithEmailAndPassword(email, pass)
            .then(()=>{
                db.collection('Users').add({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    nickName: nickName,
                })
                .then(()=>{
                  console.log("Creado")
                })
                .catch( e => console.log(e))
                
            })
            .catch( error => {
                console.log(`Usuario ya registrado. ${error}`);
                //armar modal de aviso

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
                console.log(`Credenciales incorrectas. ${error}`);
                //armar modal de aviso

            })
    }
    logout(){
        auth.signOut()
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
                    <Drawer.Screen name="Log into your CatSpace!" component={ ()=> <Login login={(email, pass)=>this.login(email, pass) } />}/>
                    <Drawer.Screen name="Register your paw!" component={ ()=> <Register register={(email, pass, nickName)=>this.register(email, pass, nickName)} />}/>
                </Drawer.Navigator>:
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={ ()=> <Home />}/>
                    <Drawer.Screen name="Buscador" component={ () => <Buscador /> }/>
                    <Drawer.Screen name="New pawmark" component={ (drawerProps)=> <Upload drawerProps={drawerProps}/>}/>
                    <Drawer.Screen name="Miauself" component={ ()=> <Profile userData={this.state.userData} logout={()=>this.logout()} />}/>
                </Drawer.Navigator>
                }
            </NavigationContainer>
        )
    }
}

export default Menu;