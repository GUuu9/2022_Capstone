import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { School, Major, Club, Free,ChannelCreation, Channel, Search } from '../screens';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName='Main'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.background },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="KNU" component={MainTab} options={{headerShown:false}}/>
      <Stack.Screen name="School" component={School} />
      <Stack.Screen name="Major" component={Major}  />
      <Stack.Screen name="Club" component={Club}  />
      <Stack.Screen name="Free" component={Free}/>
      <Stack.Screen name="ChannelCreation" component={ChannelCreation} />
      <Stack.Screen name="Channel" component={Channel} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default MainStack;