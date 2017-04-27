import React, {Component} from 'react';
import {

    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ListView,
    RefreshControl,
    Slider,
    SegmentedControlIOS,
} from 'react-native';

export default  class LoginScreen extends React.Component {
    static navigationOptions = {header:{
        style:{backgroundColor:'#3b5998'},
        titleStyle:{color:'white'},
        left:null



    },
        };

    constructor(props) {
        super(props);
        const abc = this.props.navigation.state;
        this.state={name:abc.params.name,id:abc.params.id};
        this.btn1=this.btn1.bind(this);
        this.btn2=this.btn2.bind(this);
    }

    btn1 () {
        const {navigate}= this.props.navigation;

        navigate('MainScreen',{name:this.state.name,id:this.state.id})
    }

    btn2 (){
        const {navigate}= this.props.navigation;
        navigate('ViceScreen',{id:this.state.id,fixname:this.state.name})
    }

    render () {

            return(
                <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',flex:1}}>
                    <TouchableOpacity
                        style={{backgroundColor:'rgb(0,95,60)',height:60,width:120,borderRadius:8,borderWidth:1,borderColor:'rgb(0,95,60)',marginBottom:40}}
                        onPress={this.btn1}><Text style={{color:'white',textAlign:'center',marginTop:20}}>报修入口</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{backgroundColor:'rgb(0,95,60)',height:60,width:120 ,borderRadius:8,borderWidth:1,borderColor:'rgb(0,95,60)'}}
                        onPress={this.btn2}><Text style={{color:'white',textAlign:'center',marginTop:20}}>维修入口</Text>
                    </TouchableOpacity>
                </View>
            )
    }
}