import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import {Camera} from 'expo-camera'
import {storage} from '../firebase/config'

export default class MyCamera extends Component {
    constructor (props) {
        super (props) 
        this.state= {
            permissions: false,
            photo: "",
            showCamera: true
        }
        this.camera 

    }

    componentDidMount () {
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({
                permissions: true
            })
        })
    }
      takePhoto(){
          this.camera.takePictureAsync()
          .then((photo)=>{
              this.setState({
                  photo: photo.uri,
                  showCamera: false
              })
          })
      }

      newPhoto(){
          this.setState({
              photo: "",
              showCamera: true
          })
      }

      savePhoto(){
          fetch(this.state.photo)
          .then(response=>response.blob())
          .then(result=> {
            const ref= storage.ref(`photos/${Date.now()}.jpg`)
            ref.put(result)
            .then(()=>{
                ref.getDownloadURL()
            .then(url=>{
                this.props.uploadPhoto(url)
                this.setState({
                    photo: ''
                })
            })
            })
          })
      }

    render() {
        return (
            <View style={styles.viewCamera}>
                {this.state.permissions? (
                    this.state.showCamera?(
                        <View style={styles.viewCamera}>
                        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(reference)=>this.camera=reference}/> 
                        <TouchableOpacity style={styles.viewCamera} onPress={()=>this.takePhoto()}>
                            <Text>Sacar foto</Text>
                        </TouchableOpacity>
                    </View>
                    ):
                    
                (
                    <>
                    <Image style={styles.camera} source={{uri:this.state.photo}}/>
                    <TouchableOpacity style={styles.viewCamera} onPress={()=>this.savePhoto()} >
                    <Text>Guarda foto</Text>
                     </TouchableOpacity>

                       <TouchableOpacity style={styles.viewCamera} onPress={()=>this.newPhoto()}>
                       <Text>Sacar foto nueva</Text>
                   </TouchableOpacity>
                   </>

                )                    

                )
                :(
                    <Text> No hay permisos</Text>
                )
            }
            </View>
        )
    }
}

const styles = StyleSheet.create (
    {
        viewCamera: {
            flex: 1
        },
        camera: {
            flex: 7
        }

    }
)
