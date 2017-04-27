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
    RefreshControl,
    Dimensions

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class FixScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '报修列表',
            icon: (obj) => (

                <Icon name="list" size={30}  color= {obj.tintColor} />
            )
        },
        header:{
            style:{backgroundColor:'#3b5998'},
            titleStyle:{color:'white'},



        }


    };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: [{errortype:'yuyy',name:'ty'}, {errortype:'ui',name:'yuii'}],
            datafromnet: '',
            refreshing: false,
            id:this.props.navigation.state.params.id,
            fixname:this.props.navigation.state.params.fixname
        };
        this.updateSource= this.updateSource.bind(this);
        this.toDateString=this.toDateString.bind(this);
    }

    componentDidMount() {

        this.updateSource();
    }


    updateSource(){

        fetch('http://127.0.0.1:8080/fixlists',{method:'post'
        })
            .then((response) => response.json())
            .then((responseJson) => {

                newData=responseJson.greet;

                this.setState({dataSource:newData});

                console.log(newData);
                this.setState({refreshing:false})

            })
            .catch((error) => {
                console.error(error);
            });
    }
    handleSubmit (da) {

        this.props.navigation.navigate('Accept', {name:da,id:this.state.id,refresh:this.updateSource,fixname:this.state.fixname})
    }


    toDateString(n) {
        let a = new Date(n);
        return (a.toLocaleDateString())
    }

    render() {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View style={styles.viewStyle}>

                <ListView
                    enableEmptySections={true}
                    refreshControl={ <RefreshControl  refreshing={this.state.refreshing} onRefresh={this.updateSource}  />}
                    style={{height:height-110}}
                    dataSource={ds.cloneWithRows(this.state.dataSource)}
                    renderRow={(rowData) => <TouchableOpacity style={styles.touchStyle}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',marginTop:20}} >
                    <Text style={styles.rowStyle}>{rowData.errortype}</Text>

                    <Text style={styles.rowStyle}>{rowData.placename}</Text>




                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',}} >
                    <Text style={styles.rowStyle}>{this.toDateString(rowData.number)}</Text>
                     <View style={{width:80,marginTop:10}}>
                <Icon.Button name='arrow-right' backgroundColor="#1d9d74" size={10} iconStyle={{}} onPress={this.handleSubmit.bind(this,rowData)}>
                    接单
                </Icon.Button>
                    </View>
                    </View>
                    </TouchableOpacity>}>

                </ListView>


            </View>
        );
    }


}
const {height, width} = Dimensions.get('window');
const styles=StyleSheet.create({
    viewStyle:{
        borderRadius:0,
        flexDirection:'column'
    },
    touchStyle:{
        borderBottomWidth:1,
        borderColor:'rgb(204,204,204)'
    },
    rowStyle: {
        backgroundColor: 'white',
        alignItems: 'center',    //#水平居中s
        justifyContent: 'center',//  #垂直居中
        textAlign: 'left',  // #文字水平居中

        padding: 10,
        margin: 6,



    },

});
