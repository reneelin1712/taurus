
import React, { useState } from 'react';
import { View, FormLabel, FormInput, StyleSheet, Button, Text, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup, fetchUsers } from '../store/actions/login';
import userReducer from '../store/reducers/users';

const LoginScreen = props => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginStatus, setLoginStatus] = useState(false)
    const [users, setUsers] = useState([])
    const getUsers = useSelector(state => state.reports.users)


    const dispatch = useDispatch()
    const loginHandler = (email, password) => {
        setLoginStatus(true)
        dispatch(login(email, password))
        props.navigation.navigate('Main')
    }

    const signupHandler = (email, password) => {

        dispatch(signup(email, password))
        setEmail("")
        setPassword("")
        props.navigation.navigate('Main')

    }

    const fetchUsersHandler = () => {
        dispatch(fetchUsers()).then(res => setUsers(res))
    }
    return (
        <Container>
            <Header><Text>AUTH</Text></Header>
            <Content>

                <View style={styles.form}>

                    <View style={styles.formControl}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>

                    <View style={styles.formControl}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>

                </View>

                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="#03A9F4"
                    title="SIGN IN"
                    onPress={() => {
                        return loginHandler(email, password)
                    }}
                />
                <Button
                    buttonStyle={{ marginTop: 20 }}
                    backgroundColor="#03A9F4"
                    title="SIGN UP"
                    onPress={() => {
                        return signupHandler(email, password)
                    }}
                />

            </Content>




        </Container>

    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default LoginScreen;


