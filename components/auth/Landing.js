import React from 'react';
import { Text, View, Button } from 'react-native';

const Landing = ({ navigation }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: '1rem' }}>Hello!</Text>
        <Button title="Register" onPress={(event) => navigation.navigate('Register')} />
        <Button title="Login" onPress={(event) => navigation.navigate('Login')} />
    </View>
);

export default Landing;