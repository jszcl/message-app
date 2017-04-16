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
export default  class ScoreScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '评价',
            icon: ({tintcolor}) => (
                <Image source={require('../img/rate.png')} style={[{tintcolor:tintcolor}]} />

            )
        },
        title: '评价',
        header:{
            left:null
        }
    };

    constructor(props) {
        super(props);

        this.state = {star: '3星', stars: '', opc: 0};
        this.btn=this.btn.bind(this)
    }
    btn() {
        const {navigate}= this.props.navigation;
        navigate('LoginScreen')
    }
    render() {
        return (
            <View>

                <View style={{marginBottom: 10}}>
                    <SegmentedControlIOS values={['未评价', '已评价','yi']} selectedIndex={0} />
                </View>
                <View >

                    <View style={{left:80}}><Text> 日期20170321   单号：001</Text></View>
                    <View style={{left:70}}><Slider width={180} maximumValue={5} minimumValue={1} step={1} value={3}
                                                    onValueChange={(value)=>this.setState({star:value+'星'})}><Text>{this.state.star}</Text></Slider></View>
                    <Button title='确认' onPress={this.btn}/></View>
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