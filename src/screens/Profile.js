import React, {useContext} from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import {logout} from '../utils/firebase';
import {UserContext} from '../contexts';
import { Button } from 'react-native-paper';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = () => {
    const {dispatch} = useContext(UserContext);

    const _handleLougoutButtonPress = async () => {
        try{
            await logout();
        } catch(e) {
            console.log('[profile] logout', e.message);
        } finally {
            dispatch({});
        }
    };
 return (
     <Container>
        <Button icon="logout" mode="contained" theme={{colors:{primary:'skyblue'}}} 
                style={styles.out} onPress={_handleLougoutButtonPress}>
            logout
        </Button>
     </Container>
     
 );
};

const styles = StyleSheet.create({
    postname: {
      height: 40,
      margin: 12,
      borderWidth: 2,
      padding: 10,
      flex:10
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    out: {
      position: 'absolute',
      width: '100%',
      right: 20,
      bottom: 10,
    },
  });

export default Profile;
