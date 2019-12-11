import React, { useEffect, useState } from 'react';
import {
    View, StyleSheet, FlatList, TouchableOpacity,
    Platform, DatePickerIOS
} from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Separator, Button } from 'native-base';
import firebase from 'firebase';
import DatePicker from 'react-native-modern-datepicker';



import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import CategoryGridTile from '../components/CategoryGridTile';
import { REPORTS, LacREPORTS } from '../data/dummy-data';



const ReportScreen = props => {
    const getReports = useSelector(state => state.reports.reports);
    const getUser = useSelector(state => state.reports.email)
    const [reports, setReports] = useState([])
    const [selectedDate, setSelectedDate] = useState('');
    const [hide, setHide] = useState(true);

    const setHideHandler = () => {
        setHide(!hide)
    }

    const searchReportHandler = () => {

    }

    useEffect(() => {
        var firebaseConfig = {
            apiKey: "AIzaSyCfbvfp6THi50AIoXRLU3MrHzLSy0vkc8E",
            authDomain: "taurus-260113.firebaseapp.com",
            databaseURL: "https://taurus-260113.firebaseio.com",
            projectId: "taurus-260113",
            storageBucket: "taurus-260113.appspot.com",
            messagingSenderId: "633348361866",
            appId: "1:633348361866:web:3dceff7be1f9b3d3d3e773"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }


        // firebase.database().ref('users/010').set(
        //     {
        //         email:"cool@uq.com",
        //         title:"testThis"

        //     }
        // ).then(()=>{
        //     console.log('added')
        // }).catch((error)=>{
        //     console.log(error)
        // })

        // setReports(firebase.database().ref('reports').once('value',data=>{
        //     console.log(data.val())
        //      return data.val()
        // }))

        firebase.database().ref('reports').orderByChild("email").equalTo(getUser).once('value', data => {
            console.log(data.val())
            setReports(data.val())

        }

        )
        // firebase.database().ref('reports').once('value',data=>
        // {
        //     console.log(data.val())
        //     setReports(data.val().filter(report=>report.email!==getUser).sort((a,b)=>new Date(b.Date)-new Date(a.Date)).slice(0,1))

        // }

        // )

        console.log(getUser)

    }, [getUser])

    // useEffect(()=>{
    //     setReports(LacREPORTS.filter(report=>new Date(report.date)==selectedDate))
    // },selectedDate)

    const renderGridItem = itemData => {

        return (

            <View>
                <ListItem><Text>Date: {itemData.item.Date}</Text></ListItem>
                <ListItem>
                    <Text>Volume: {itemData.item.Litres}</Text>
                </ListItem>
                <ListItem><Text>Fat: {itemData.item.MilkFat}</Text></ListItem>
                <ListItem><Text>Protein: {itemData.item.Protein}</Text></ListItem>
                <ListItem><Text>SNF: {itemData.item.SNF}</Text></ListItem>
                <ListItem><Text>Temperature: {itemData.item.Temperature}</Text></ListItem>
                <ListItem><Text>Somatic: {itemData.item.Somatic}</Text></ListItem>
            </View>

        );
    };

    ReportScreen.navigationOptions = {
        headerTitle: 'Reports',
        // headerStyle: {
        //   backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        // },
        // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    };

    return (
        <Container>

            <Content>

                <Separator bordered>
                    <Text>RESULTS</Text>
                </Separator>
                <ListItem last>

                    <FlatList
                        keyExtractor={(item, index) => 'key' + index}
                        data={reports == null ?
                            reports
                            : reports.slice(-1)
                        }
                        // data={reports==null?
                        //     reports
                        // :reports.sort((a,b)=>new Date(b.Date)-new Date(a.Date)).slice(0,1)
                        // }
                        renderItem={renderGridItem}
                        numColumns={1}
                    >

                    </FlatList>
                </ListItem>

                <Button light onPress={setHideHandler}><Text>Select Date</Text></Button>

                {hide ?
                    null
                    : <View><DatePicker
                        onSelectedChange={date => setSelectedDate(date)} />

                    </View>

                }


            </Content>
        </Container>
        //      <View>
        //   <Text>why{getUser}</Text>
        //   </View>

    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    }
});

export default ReportScreen;
