import React, { useState } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const Login = () => {

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    const handleSubmit = async () => {
        const res = firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
        
    };

    return (
        <View>
            <TextInput placeholder='E-mail' id='email' onChangeText={setEmail} />
            <TextInput placeholder='Password' id='password' secureTextEntry onChangeText={setPassword} />
            <Button title='Entrar'
                onPress={handleSubmit}
            />
        </View>
    );

};

export default Login;