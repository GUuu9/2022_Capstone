import React, {useContext, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, ChannelList, Wallet } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


const MainTab = ({navigation, route}) => {

  useEffect(() => {
    const titles = route.state?.routeNames || ['Channels'];
    const index = route.state?.index || 0;
    navigation.setOptions({
      headerTitle: titles[index] });
  }, [route]);


  return (

    <Tab.Navigator tabBarOption = {{showlabel: false}}>
      
        <Tab.Screen name = "Channels" component = {ChannelList}
        options={{
          tabBarIcon: () => (
            <Icon name="list" size={25} color="black"/>
          )
        }}/>
        <Tab.Screen name = "Wallet" component = {Wallet}
        options={{
          tabBarIcon: () => (
            <Icon name="wallet" size={25} color="black"/>
          )
        }}/>
        <Tab.Screen name = "Profile" source component = {Profile}
        options={{
          tabBarIcon: () => (
            <Icon name="settings" size={25} color="black"/>
          )
        }}/>
    </Tab.Navigator>
  );
};

export default MainTab;
