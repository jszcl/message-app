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
    RefreshControl
    } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: 'Home',
            icon: (obj) => (

                <Icon name="rocket" size={30}  color= {obj.tintColor} />
            )
        },
        title: '主页',

        header: (navigation) => ({

            style:{backgroundColor:'#3b5998'},
            titleStyle:{color:'white'},
            right: <Icon.Button name="power-off"  backgroundColor='#1d9d74' onPress={()=>navigation.navigate('LoginScreen')}>
                <Text style={{color:'white'}}>注销</Text>
            </Icon.Button>,
            left: <Icon name="chevron-left"  color='white' size={25} onPress={()=>navigation.goBack(null)} />
        })



    };


    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row ']),
            datafromnet:'',
            refreshing: false
        };
        this.updata=this.updata.bind(this);
        // this.updatefromServer=this.updatefromServer.bind(this);
    }
    componentDidMount(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({

            dataSource:ds.cloneWithRows(['wfweffffffwefwefasfawegvjabjvbajhdjdsjkdsvjkdsvjkdsvjkdvskvjksjkvskv','dsjskjksjkvskv'])
        })
    }

    updata(){
        this.setState({refreshing: true});
        let newData;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        fetch('http://127.0.0.1:8080/news',{method:'post',})
            .then((response) => response.json())
            .then((responseJson) => {
                newData=responseJson.greet;

                // alert(newData[0]);
                this.setState({

                    dataSource:ds.cloneWithRows(newData)
                });
                this.setState({refreshing:false});
            })
            .catch((error) => {
                console.error(error);
            });



    }
    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.viewStyle}>

                <ListView refreshControl={ <RefreshControl  refreshing={this.state.refreshing}  onRefresh={this.updata}/>}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <TouchableOpacity style={styles.touchStyle}><Text style={styles.rowStyle}>{rowData}</Text></TouchableOpacity>} >

                </ListView>


            </View>
        );
    }
}



const styles=StyleSheet.create({
    viewStyle:{
        borderRadius:5,
        flexDirection:'column',



    },
    touchStyle:{

    },
    rowStyle: {
        backgroundColor: 'white',
        alignItems: 'center',    //#水平居中s
        justifyContent: 'center',//  #垂直居中
        textAlign: 'left',  // #文字水平居中

        padding: 10,
        margin: 6,

        marginLeft:0,
        marginRight:0




    },
});
