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
    Picker,
    Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const photoOptions = {


    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


export default  class InformScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '故障报修',

            icon: ({tintcolor}) => (
                <Image source={require('../img/tool.png')} style={[{tintcolor:tintcolor}]}/>
            )
        },
        title: '故障报修'
    };

    constructor(props) {
        super(props);
        const abc = this.props.navigation.state;
        this.state = {
            avatarSource: '',
            errorType: 'UPS故障',

            placeName: '',
            contactName: abc.params.name,
            phoneNumber: '',
            otherInfo: '',
            rated: false,




        };
        this.cameraAction = this.cameraAction.bind(this);
        this.submitAll = this.submitAll.bind(this);


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

    uploadImage(imageuri, filename) {
        let formData = new FormData();
        let file = {uri: imageuri, type: 'multipart/form-data', name: filename};
        formData.append('avatar', file);
        fetch('http://127.0.0.1:8080/images', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
            .then((response) => response.text())
            .then((responseData) => {
                console.log('responseData', responseData);
            })
            .catch((error) => {
                console.error('error', error)
            });
    }

    submitAll() {
        let datenow = Date.now();
        if (this.state.avatarSource) {
            this.uploadImage(this.state.avatarSource, (datenow.toString() + '.jpg'));
        }

        let lists = {
            errortype: this.state.errorType,
            placename: this.state.placeName,
            contactname: this.state.contactName,
            phonenumber: this.state.phoneNumber,
            otherinfo: this.state.otherInfo,
            rated: this.state.rated,
            number: datenow,
            fixed: false

        };
        console.log(JSON.stringify(lists));
        fetch('http://127.0.0.1:8080/lists', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lists),
        })
            .then((response) => {
                this.setState({
                    avatarSource: '',
                    errorType: 'UPS故障',

                    placeName: '',

                    phoneNumber: '',
                    otherInfo: '',
                    rated: false
                });
                return response.text()
            })
            .then((responseData) => {
                Alert.alert(responseData);
            })
            .catch((error) => {
                console.error('error', error)
            });

    }

    render() {

        return (
            <View>
                <ScrollView>


                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View >


                            <Text>请选择故障类型</Text>
                            <Picker selectedValue={this.state.errorType} mode="dropdown"
                                    onValueChange={(val)=>this.setState({errorType:val})}>
                                <Picker.Item label="网络故障" value="网络故障"/>
                                <Picker.Item label="UPS故障" value="UPS故障"/>
                                <Picker.Item label="办公电脑故障" value="办公电脑故障"/>
                                <Picker.Item label='BL终端故障' value='BL终端故障'/>
                                <Picker.Item label='其他故障' value='其他故障'/>

                            </Picker>
                            <Text style={{margin:10}}> 报修人: {this.state.contactName}</Text>
                            <TextInput style={styles.inputs} placeholder='部门或网点名称' value={this.state.placeName}
                                       onChangeText={(text)=>this.setState({placeName:text})}/>

                            
                            <TextInput keyboardType="numeric" style={styles.inputs} placeholder='联系人电话'
                                       value={this.state.phoneNumber}
                                       onChangeText={(text)=>this.setState({phoneNumber:text})}/>

                            <TextInput style={styles.inputs} placeholder='故障说明' value={this.state.otherInfo}
                                       onChangeText={(text)=>this.setState({otherInfo:text})}/>


                            <View
                                style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:20,marginTop:30}}>
                                <Image source={this.state.avatarSource}
                                       style={{height:150,width:150,backgroundColor:'white'}}/>
                                <View
                                    style={{}}>
                                    <TouchableOpacity
                                        style={{backgroundColor:'rgb(0,95,60)',height:60,width:120,marginLeft:10 ,borderRadius:8,borderWidth:1,borderColor:'rgb(0,95,60)'}}
                                        onPress={this.cameraAction}><Text
                                        style={{color:'white',textAlign:'center',marginTop:20}}>上传图片</Text>
                                    </TouchableOpacity>
                                </View></View>
                            <View>


                            </View>


                            <Button title="提交" color={'rgb(0,95,60)'}
                                    disabled={!(this.state.placeName && this.state.contactName && this.state.phoneNumber && this.state.otherInfo)}
                                    onPress={this.submitAll}/>
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
        marginBottom: 10
    },

});