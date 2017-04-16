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
    ScrollView,
    RefreshControl

} from 'react-native';

export default class FixScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '报修列表',
            icon: ({tintcolor}) => (
                <Image source={require('../img/faq.png')} style={[{tintcolor:tintcolor}]}/>
            )
        },
        title: '报修列表'
    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ['row 1', 'row 2'],
            datafromnet: '',
            refreshing: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        this.setState({

            dataSource: [{errortype:'yuyy',name:'ty'}, {errortype:'ui',name:'yuii'}]
        })
    }


    updateSource(){

        fetch('http://127.0.0.1:8080/fixlists',{method:'post',})
            .then((response) => response.json())
            .then((responseJson) => {

                newData=responseJson.greet;

                this.setState({dataSource:newData});

                console.log(newData)

            })
            .catch((error) => {
                console.error(error);
            });
    }
    handleSubmit () {
        this.props.navigation.navigate('Score')
    }

    render() {
        const {navigate} = this.props.navigation;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View style={styles.viewStyle}>

                <ListView
                    refreshControl={ <RefreshControl  refreshing={this.state.refreshing}  />}
                    dataSource={ds.cloneWithRows(this.state.dataSource)}
                    renderRow={(rowData) => <TouchableOpacity style={styles.touchStyle}><View style={{flexDirection:'row',justifyContent:'space-between'}} >
                    <Text style={styles.rowStyle}>{rowData.errortype}</Text><Button title = '处理' onPress={this.handleSubmit}/></View></TouchableOpacity>}>

                </ListView>
                <Button title="submit"   onPress={this.updateSource.bind(this)}/>
            </View>
        );
    }


}

const styles=StyleSheet.create({
    viewStyle:{
        borderRadius:5,
        flexDirection:'column'
    },
    touchStyle:{

    },
    rowStyle: {
        backgroundColor: 'skyblue',
        alignItems: 'center',    //#水平居中s
        justifyContent: 'center',//  #垂直居中
        textAlign: 'left',  // #文字水平居中

        padding: 10,
        margin: 6,



    },
});
