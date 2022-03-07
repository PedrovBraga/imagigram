import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchUser } from "./auth/redux/actions";

import Feed from './Main/Feed';
import Add from './Main/Add';
import Profile from "./Main/Profile";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();

const Null = () => null;

const Main = (props) => {

    useEffect(() => {
        props.fetchUser();
    }, []);

    return (
        <Tab.Navigator initialRouteName="Feed" backBehavior="initialRoute" labeled={false}>
            <Tab.Screen name="Feed" 
            component={Feed}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="newspaper-variant" size={26} color={color} />
                )
            }} />
            <Tab.Screen name="AddContainer" 
            component={Null}
            listeners={({ navigation }) => ({
                tabPress: (event) => {
                    event.preventDefault();
                    navigation.navigate('Add');
                },
            })}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="plus-box" size={26} color={color} />
                )
            }} />
            <Tab.Screen name="Profile" 
            component={Profile}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="account-circle" size={26} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
};

const mapStateToProps = (store) => (
    {
        currentUser: store.userState.currentUser,
    }
);

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);