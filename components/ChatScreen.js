import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    DatePickerIOS,
    Switch,
    PickerIOS,
    Slider,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Picker
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const photoOptions = {


        title:'请选择',
        cancelButtonTitle:'取消',
        takePhotoButtonTitle:'拍照',
        chooseFromLibraryButtonTitle:'选择相册',
        quality:0.75,
        allowsEditing:true,
        noData:false,
        storageOptions: {
            skipBackup: true,
            path:'images'
        }
    };


export default  class ChatScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '故障报修',
            icon: ({tintcolor}) => (
                <Image source={require('../img/camera.png')} style={[{tintcolor:tintcolor}]}/>
            )
        },
        title: '故障报修'
    };

    constructor(props) {
        super(props);
        this.state = {avatarSource: ''};
        this.cameraAction = this.cameraAction.bind(this);


    }

    cameraAction() {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};
                this.setState({
                    avatarSource: source

                });
            }
        });
    }

    uploadImage(imageuri){
        let formData = new FormData();
        let file = {uri: imageuri,type:'multipart/form-data',name:'image.jpg'};
        formData.append('avatar',file);
        fetch('http://127.0.0.1:8080/images',{
            method:'post',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
        })
            .then((response)=>response.text())
            .then((responseData)=>{
                    console.log('responseData',responseData);
            })
            .catch((error)=>{console.error('error',error)});
    }

    render() {
        return (
            <View>
                <ScrollView>


                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View >


                            <View
                                style={{height: 40,width:80}}


                            />

                            <TextInput style={styles.inputs} placeholder='设备类型'/>

                            <TextInput style={styles.inputs} placeholder='联系人'/>

                            <TextInput keyboardType="numeric" style={styles.inputs} placeholder='联系人电话'/>

                            <TextInput  style={styles.inputs} placeholder='故障说明'/>


                            <Image source={this.state.avatarSource} style={{height:100,width:100}}/>
                            <View>
                                <Button title="choose" onPress={this.cameraAction}/>
                                <Button title="up" onPress={this.uploadImage.bind(this,this.state.avatarSource.uri)}/>
                            </View>
                            <Picker selectedValue='python' >
                                <Picker.Item label="java" value="java" />
                                <Picker.Item label="javascript" value="javascript" />
                            </Picker>
                        </View>

                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    inputs: {
        height: 40,
        fontSize: 15,
        backgroundColor: '#FFF',
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10
    },

});