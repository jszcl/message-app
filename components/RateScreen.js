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
    ScrollView,
    RefreshControl,


} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RateScreen extends  React.Component {
    static navigationOptions =  {
        tabBar: {
            label: '评价',
            icon: (obj) => (

                <Icon name="star-half-empty" size={30}  color= {obj.tintColor} />
            )
        },
        header:{
            style:{backgroundColor:'#3b5998'},
            titleStyle:{color:'white'},



        }



    };
    constructor(props){
        super(props);
        this.state={
            detail:this.props.navigation.state.params.name,
            number:this.props.navigation.state.params.name.number,
            stars:0,

                star1:false,
                star2:false,
                star3:false,
                star4:false,
                star5:false

        }
    }

    press1(){
        this.setState({
            stars:1,
            star1:true,
            star2:false,
            star3:false,
            star4:false,
            star5:false
        })
    }

    press2(){
        this.setState({
            stars:2,
            star1:true,
            star2:true,
            star3:false,
            star4:false,
            star5:false
        })
    }

    press3(){
        this.setState({
            stars:3,
            star1:true,
            star2:true,
            star3:true,
            star4:false,
            star5:false
        })
    }

    press4(){
        this.setState({
            stars:4,
            star1:true,
            star2:true,
            star3:true,
            star4:true,
            star5:false
        })
    }
    press5(){
        this.setState({
            stars:5,
            star1:true,
            star2:true,
            star3:true,
            star4:true,
            star5:true
        })
    }

    goBack () {

        const {goBack} = this.props.navigation;
        this.props.navigation.state.params.refresh();
        goBack()
    }

    submitStar () {
        let lists = {starNumber:this.state.stars,number:this.state.number};
        fetch('http://127.0.0.1:8080/dorate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lists),
        })
            .then((response) => {

                return response.text()
            })
            .then((responseData) => {
                Alert.alert(responseData);
                this.goBack()
            })
            .catch((error) => {
                console.error('error', error)
            });


    }
    render() {
        return(
            <ScrollView>
            <View>

            <View>
                <View style={styles.bigView}>
                <View style={styles.viewStyle}>
                    <Icon.Button name="bookmark" backgroundColor="#3b5998" size={15}>
                        <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>故障类型</Text>
                    </Icon.Button>
                <Text>{this.state.detail.errortype}</Text>
                </View>
                </View>


                <View style={styles.bigView}>
                <View style={styles.viewStyle}>
                    <Icon.Button name="info-circle" backgroundColor="#3b5998" size={15}>
                        <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>报修信息</Text>
                    </Icon.Button>
                    <Text></Text>
                </View>
                <Text style={styles.text}>{this.state.detail.otherinfo}</Text>
                </View>

                <View style={styles.bigView}>
                    <View style={styles.viewStyle}>
                        <Icon.Button name="user-circle" backgroundColor="#3b5998" size={15}>
                            <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>维修人</Text>
                        </Icon.Button>
                        <Text>{this.state.detail.fixname}</Text>
                    </View>
                </View>


                <View style={styles.bigView}>
                    <View style={styles.viewStyle}>
                        <Icon.Button name="calendar" backgroundColor="#3b5998" size={15}>
                            <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>维修日期</Text>
                        </Icon.Button>
                        <Text>{this.state.detail.fixdate}</Text>
                    </View>
                </View>

                <View style={styles.bigView}>
                    <View style={styles.viewStyle}>
                        <Icon.Button name="comment" backgroundColor="#3b5998" size={15}>
                            <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>维修方法</Text>
                        </Icon.Button>
                        <Text></Text>
                    </View>
                    <Text style={styles.text}>{this.state.detail.waytofix}</Text>
                </View>


                <View style={styles.bigView}>
                    <View style={styles.viewStyle}>
                        <Icon.Button name="star" backgroundColor="#990066" size={15}>
                            <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>评价</Text>
                        </Icon.Button>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                            <Icon.Button name="star" size={22}  color= {this.state.star1 ? 'orange' : 'grey'} backgroundColor="white" onPress={this.press1.bind(this)}/>
                            <Icon.Button name="star" size={22}  color= {this.state.star2 ? 'orange' : 'grey'} backgroundColor="white" onPress={this.press2.bind(this)}/>
                            <Icon.Button name="star" size={22}  color= {this.state.star3 ? 'orange' : 'grey'}backgroundColor="white" onPress={this.press3.bind(this)}/>
                            <Icon.Button name="star" size={22}  color= {this.state.star4 ? 'orange' : 'grey'} backgroundColor="white" onPress={this.press4.bind(this)}/>
                            <Icon.Button name="star" size={22}  color= {this.state.star5 ? 'orange' : 'grey'} backgroundColor="white" onPress={this.press5.bind(this)}/>
                        </View>

                    </View>
                    <View style={{alignSelf:'center'}}>
                        <Icon.Button name="check" backgroundColor="#00aa55" disabled={true} >
                            <Button color='white' title="提交" disabled={!this.state.star1} onPress={this.submitStar.bind(this)}> </Button>
                        </Icon.Button>

                    </View>
                </View>
            </View>
            </View>
            </ScrollView>
        );

    }

}

const styles = StyleSheet.create({
  viewStyle:{
      backgroundColor:'white',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      margin:8,
      overflow:'hidden'
  },
    bigView:{
      backgroundColor:'white',
        margin:9
    },
    text:{
      marginLeft:15,
        marginBottom:8
    }
});