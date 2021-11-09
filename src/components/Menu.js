import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Profile from '../screens/Profile';
import Upload from '../screens/Upload';
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
                    // this.setState({
                    //     nickName: ''
                    // })

                    console.log("Creado")
                })
                .catch( e => console.log(e))
                
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
                    <Drawer.Screen name="Login" component={ ()=> <Login login={(email, pass)=>this.login(email, pass) } />}/>
                    <Drawer.Screen name="Registro" component={ ()=> <Register register={(email, pass, nickName)=>this.register(email, pass, nickName)} />}/>
                </Drawer.Navigator>:
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={ ()=> <Home />}/>
                    <Drawer.Screen name="Nuevo Post" component={ (drawerProps)=> <Upload drawerProps={drawerProps}/>}/>
                    <Drawer.Screen name="Mi Perfil" component={ ()=> <Profile userData={this.state.userData} logout={()=>this.logout()} />}/>
                </Drawer.Navigator>
                }
            </NavigationContainer>
        )
    }
}

export default Menu;