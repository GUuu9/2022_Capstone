import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { UserContext } from '../contexts';

const Navigation = () => {

    const {user} = useContext(UserContext);

    return (
        <NavigationContainer>
            {user?.uid && user?.email?<MainStack/>:<AuthStack/>}
        </NavigationContainer>
    );
};

export default Navigation;