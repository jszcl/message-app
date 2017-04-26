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
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default  class ScoreScreen extends React.Component {
    static navigationOptions = {
        tabBar: {
            label: '评价',
            icon: (obj) => (

                <Icon name="star-half-empty" size={30}  color= {obj.tintColor} />
            ),
        },
        title: '评价',
        header:{
            left:null,
            style:{backgroundColor:'#3b5998'},
            titleStyle:{color:'white'},




        }
    };

    constructor(props) {
        super(props);
        this.state={
            id:this.props.navigation.state.params.id,
            refreshing:false,
            dataSource:[{errortype:'yuyy',name:'ty'}, {errortype:'ui',name:'yuii'}],
            selectIndex:''
        };
        this.updateSource=this.updateSource.bind(this);
        this.toDateString=this.toDateString.bind(this);


    }
    // btn() {
    //     const {navigate}= this.props.navigation;
    //     navigate('LoginScreen')
    // }

    componentDidMount() {

        this.updateSource();
    }
    updateSource(){
        let lists= {id:this.state.id};
        fetch('http://127.0.0.1:8080/rate',{method:'post',
            headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(lists),})
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

    toDateString(n) {
        let a = new Date(n);
         return (a.toLocaleDateString())
    }

    render() {
        const {height, width} = Dimensions.get('window');
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View>

                {/*<View style={{marginBottom: 10}}>*/}
                    {/*<SegmentedControlIOS values={['未评价', '已评价']} selectedIndex={0} onValueChange={(value)=>{this.setState({selectIndex:value})}}/>*/}
                {/*</View>*/}

                <View style={styles.viewStyle}>

                    <ListView
                        style={{height:height-110}}
                        refreshControl={ <RefreshControl  refreshing={this.state.refreshing} onRefresh={this.updateSource} />}
                        dataSource={ds.cloneWithRows(this.state.dataSource)}
                        renderRow={(rowData) => <TouchableOpacity style={styles.touchStyle}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',marginTop:20}} >
                    <Text style={styles.rowStyle}>{rowData.errortype}</Text>
                    <Text style={styles.rowStyle}>{this.toDateString(rowData.number)}</Text>
                    <View style={{width:80,marginTop:10 }}>
               {rowData.fixed  ? <Icon.Button name='arrow-right' backgroundColor="#990066" size={10} iconStyle={{}} onPress={()=>{this.props.navigation.navigate('rate',{name:rowData,refresh:this.updateSource})}}>
                    评价
                </Icon.Button> : <Text style={{marginTop:8}}>待维修</Text>}
                </View>



                    </View>
                    </TouchableOpacity>}>

                    </ListView>

                </View>


            </View>
        );
    }
}

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