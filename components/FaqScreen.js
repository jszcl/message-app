
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
    ListView,
    ScrollView

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Panel  from  './collapse';
export default  class FaqScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '常见问题',

            icon: (obj) => (

                <Icon name="book" size={30}  color= {obj.tintColor} />
            )
        },
        title: '常见问题',
        header:{
            style:{backgroundColor:'#3b5998'},
            titleStyle:{color:'white'},



        }
    };

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <ScrollView style={{flex:1,paddingTop: 30 }}>
                <Panel title='A Panel with short content text'>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                </Panel>
                <Panel title='A Panel with long content text' expanded={false}>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </Panel>
                <Panel title='Another Panel'>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</Text>
                </Panel>
                <Panel title='Another Panel'>
                    <Image source={require('../img/tool.png')} style={{height: 200, width: null, resizeMode: 'contain'}}/>
                </Panel>
            </ScrollView>

        )
    }
}