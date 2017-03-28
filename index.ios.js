/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
    ListView
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {TabNavigator}   from 'react-navigation';
import HomeScreen from './components/HomeScreen'



class LoginScreen extends React.Component {
    static navigationOptions = {};

    constructor(props) {
        super(props);
        this.submits = this.submits.bind(this);
    }

    submits() {
        const {navigate}= this.props.navigation;
        navigate('Home')
    }

    render() {


        return (
            <View style={{flexDirection:'column',alignItems:'center'}}>
                <View>
                    <Image source={require('./img/bocimgs.png')}/>
                </View>
                <View style={{alignSelf:'stretch'}}>
                    <TextInput style={{height:35,borderColor:'gray',borderWidth:0.5,margin:10,borderRadius:5}}
                               placeholder='请输入用户名'>

                    </TextInput>
                    <TextInput secureTextEntry={true}
                               style={{height:35,borderColor:'gray',borderWidth:0.5,margin:10,borderRadius:5}}
                               placeholder='请输入密码'>

                    </TextInput>
                </View>
                <View
                    style={{height:25,borderRadius:5,backgroundColor:'rgb(88,196,250)',margin:20,alignSelf:'stretch',flexDirection:'column',alignItems:'center'}}>
                    <TouchableOpacity onPress={this.submits}><Text
                        style={{color:'white',fontSize:20,width:200,textAlign:'center'}}>登录</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}


class ChatScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '故障报修',
            icon: ({tintcolor}) => (
                <Image source={require('./img/tool.png')} style={[{tintcolor:tintcolor}]}/>
            )
        },
        title: '故障报修'
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View >
                    <Text>请填写报修信息</Text>
                    <View
                        style={{height: 40,width:80}}


                    />
                    <Text>设备类型</Text>
                    <TextInput style={styles.inputs} placeholder='设备类型'/>
                    <Text>联系人</Text>
                    <TextInput style={styles.inputs} placeholder='联系人'/>
                    <Text>联系人电话</Text>
                    <TextInput keyboardType="numeric" style={styles.inputs} placeholder='联系人电话'/>
                    <Text>故障说明</Text>
                    <TextInput style={{height:160,width:500, borderColor:'gray',borderWidth:0.5}} placeholder='故障说明'/>
                    <View>
                        <Button title='提交' onPress={()=>alert('已提交')}/>
                    </View>
                </View></TouchableWithoutFeedback>
        );
    }
}

class ScoreScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '评价',
            icon: ({tintcolor}) => (
                <Image source={require('./img/star.png')} style={[{tintcolor:tintcolor}]}/>
            )
        },
        title: '评价'
    };

    constructor(props) {
        super(props);

        this.state = {star: '3星', stars: '', opc: 0};
    }

    render() {
        return (
            <View>
                <Text style={{fontSize:20}}> 未评价</Text>

                <View >

                    <View style={{left:80}}><Text> 日期20170321   单号：001</Text></View>
                    <View style={{left:70}}><Slider width={180} maximumValue={5} minimumValue={1} step={1} value={3}
                                                    onValueChange={(value)=>this.setState({star:value+'星'})}><Text>{this.state.star}</Text></Slider></View>
                    <Button title='确认' onPress={()=>this.setState({stars:('维修单号(001):'+this.state.star)})}/></View>
                <View style={{top:200}}>
                    <Text style={{fontSize:20}}>
                        已评价
                    </Text>
                    <Text>
                        {this.state.stars}
                    </Text>
                </View>
            </View>
        );
    }
}

class FaqScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '常见问题',
            icon: ({tintcolor}) => (
                <Image source={require('./img/mush.png')} style={[{tintcolor:tintcolor}]}/>
            )
        },
        title: '常见问题'
    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbutton: {


        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonone: {
        color: 'red',
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 3,
        margin: 30
    },
    inputs: {height: 40, width: 120, borderColor: 'gray', borderWidth: 3, marginBottom: 20},
    est: {opacity: 1}
})
const MainScreenNavigator = TabNavigator({
        Home: {screen: HomeScreen},
        Fix: {screen: ChatScreen},
        Score: {screen: ScoreScreen},
        Faq: {screen: FaqScreen}
    },
    {
        tabBarOptions: {
            activeTintColor: 'rgb(18,120,189)',
        },
    });

const SimpleApp = StackNavigator({
    LoginScreen: {screen: LoginScreen},
    Home: {screen: MainScreenNavigator},


});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);