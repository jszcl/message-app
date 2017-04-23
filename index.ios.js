/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Alert,
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
    ListView,
    StatusBar
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import {TabNavigator}   from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import InformScreen from './components/InformScreen';
import ScoreScreen from './components/ScoreScreen';
import FaqScreen from './components/FaqScreen';
import  ChooseScreen from './components/ChooseScreen';
import FixScreen from './components/FixScreen';
import HandleScreen from './components/HandleScreen';
import RateScreen from './components/RateScreen';
import AcceptScreen from './components/AcceptScreen';
import MineScreen from './components/MineScreen'

class LoginScreen extends React.Component {
    static navigationOptions = {header:{
        left:null,
        style:{backgroundColor:'#3b5998'},
        titleStyle:{color:'white'}


    },
        cardStack:{gesturesEnabled:false}};

    constructor(props) {
        super(props);
        this.state = {
          CMCODE:'',
            REGPASSWORD:''
        };
        this.submits = this.submits.bind(this);
    }

    submits() {

        const {navigate}= this.props.navigation;
        const lists= {
          CMCODE:this.state.CMCODE, REGPASSWORD: this.state.REGPASSWORD
        };
        fetch('http://127.0.0.1:8080/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lists),
        })
            .then((response) => {

                return response.json()
            })
            .then((responseData) => {
                Alert.alert(responseData[0]);
                if(responseData [0]== 'success'){
                    navigate('ChooseScreen',{name:responseData[1],id:this.state.CMCODE})
                }
            })
            .catch((error) => {
                console.error('error', error)
            });
        // navigate('ChooseScreen',{name:'blunt',id:'123456'});

    }

    render() {


        return (
            <View style={{flexDirection:'column',alignItems:'center'}}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <View>
                    <Image source={require('./img/bocimgs.png')}/>
                </View>
                <View style={{alignSelf:'stretch'}}>
                    <TextInput style={{height:35,borderColor:'gray',borderWidth:0.5,margin:10,borderRadius:5}}
                               placeholder='请输入用户名' onChangeText={(text)=>this.setState({CMCODE:text}) }>


                    </TextInput>
                    <TextInput secureTextEntry={true} type="number"
                               style={{height:35,borderColor:'gray',borderWidth:0.5,margin:10,borderRadius:5}}
                               placeholder='请输入密码' onChangeText={(text)=>this.setState({REGPASSWORD:text})}>

                    </TextInput>
                </View>
                <View
                    style={{height:25,borderRadius:5,backgroundColor:'#3b5998',margin:20,alignSelf:'stretch',flexDirection:'column',alignItems:'center'}}>
                    <TouchableOpacity onPress={this.submits}><Text
                        style={{color:'rgb(233,233,239)',fontSize:20,width:200,textAlign:'center'}}>登录</Text></TouchableOpacity>
                </View>
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
});



const handleFixNavigator = StackNavigator({
    Fix :{screen:FixScreen},
    Accept: {screen: AcceptScreen}

},{
    headerMode:'none'
});

const myHandleListNavigator = StackNavigator({
    Mine:{screen:MineScreen},
    Handle:{screen:HandleScreen}
},
    {
        headerMode:'none'
    });

const scoreRateNavigator = StackNavigator({
   score : {screen:ScoreScreen},
   rate:   {screen:RateScreen}
},
{
    headerMode:'none'
}
);
const MainScreenNavigator = TabNavigator({
        Home: {screen: HomeScreen},
        Inform: {screen: InformScreen},
        scoreRate: {screen: scoreRateNavigator},
        Faq: {screen: FaqScreen}
    },
    {
        tabBarOptions: {
            activeTintColor: '#3b5998',
            inactiveTintColor: '#cccccc'

        },
    });
const ViceScreenNavigator = TabNavigator({
        Home: {screen: HomeScreen},
        Fixes: {screen: handleFixNavigator},

        Faq: {screen: myHandleListNavigator}
    },
    {
        tabBarOptions: {
            activeTintColor: '#3b5998',
            inactiveTintColor: '#cccccc'

        },
    });

const SimpleApp = StackNavigator({
    LoginScreen: {screen: LoginScreen},
    ChooseScreen: {screen: ChooseScreen},
    MainScreen: {screen: MainScreenNavigator},
    ViceScreen:{screen:ViceScreenNavigator}


});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);