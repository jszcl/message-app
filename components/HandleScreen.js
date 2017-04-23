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
    RefreshControl

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class HandleScreen extends React.Component {

    static navigationOptions =  {
        tabBar: {
            label: '我的',
            icon: (obj) => (

                <Icon name="id-card-o" size={30}  color= {obj.tintColor} />
            )
        },
        header:{
            style:{backgroundColor:'#3b5998'},
            titleStyle:{color:'white'},



        }



    };


    constructor(props) {
        super(props);
        const {state} = this.props.navigation;

        this.state = {
            number: state.params.name.number,
            detail: state.params.name,
            method:'',
            id:state.params.id,
            fixname:state.params.fixname,
            showImg:true
        }
    }


    componentDidMount(){

    }


    goBack () {

        const {goBack} = this.props.navigation;
        this.props.navigation.state.params.refresh();
        goBack()
    }
    handleSubmit () {
        const lists= {
            id:this.state.id, method: this.state.method,number:this.state.number , fixdate:Date.now() ,fixname:this.state.fixname
        };
        fetch('http://127.0.0.1:8080/handle', {
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

    render () {

        return(
        <View >
            <ScrollView>
            <View style={styles.bigView}>
                <View style={styles.viewStyle}>
                    <Icon.Button name="flag" backgroundColor="#3b5998" size={15}>
                        <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>故障类型</Text>
                    </Icon.Button>
                    <Text>{this.state.detail.errortype}</Text>
                </View>
            </View>

                <View style={styles.bigView}>
                    <View style={styles.viewStyle}>
                        <Icon.Button name="calendar" backgroundColor="#3b5998" size={15}>
                            <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>报修日期</Text>
                        </Icon.Button>
                        <Text>{(new Date(this.state.detail.number)).toLocaleDateString()}</Text>
                    </View>
                </View>

            <View style={styles.bigView}>
                <View style={styles.viewStyle}>
                    <Icon.Button name="map" backgroundColor="#3b5998" size={15}>
                        <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>故障地址</Text>
                    </Icon.Button>
                    <Text>{this.state.detail.placename}</Text>
                </View>
            </View>



            <View style={styles.bigView}>
                <View style={styles.viewStyle}>
                    <Icon.Button name="user" backgroundColor="#3b5998" size={15}>
                        <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>联系人</Text>
                    </Icon.Button>
                    <Text>{this.state.detail.contactname}</Text>
                </View>
            </View>


            <View style={styles.bigView}>
                <View style={styles.viewStyle}>
                    <Icon.Button name="phone" backgroundColor="#3b5998" size={15}>
                        <Text style={{fontFamily: 'Arial', fontSize: 13,color:'white'}}>联系电话</Text>
                    </Icon.Button>
                    <Text>{this.state.detail.phonenumber}</Text>
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
                {this.state.showImg ?
                    <Image source={{uri: 'http://127.0.0.1:8080/uploads/'+this.state.number+'.jpg'}}
                           style={{width: 200, height: 200,alignSelf:'center'}}
                           onError={()=>{this.setState({showImg:false})}}/> : null}

                <TextInput style={styles.inputs} placeholder='处理办法' value={this.state.method}
                           onChangeText={(text)=>this.setState({method:text})}/>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <Button title='返回' onPress={this.goBack.bind(this)}/>
                    <Button style={{alignSelf:'flex-end' }} disabled={!(this.state.method && true)}
                            onPress={this.handleSubmit.bind(this)} title='提交'/>
                </View>
            </ScrollView>
        </View>

        )
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
        marginLeft:15
    }

});