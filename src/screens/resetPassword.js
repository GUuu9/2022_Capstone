import React, {useState, useRef, useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import { Image, Button } from '../components';
import {images} from '../utils/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {removeWhitespace} from '../utils/common';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Alert} from 'react-native';
import { resetPassword} from '../utils/firebase';
import { UserContext } from '../contexts';
import { TextInput } from 'react-native-paper';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  `;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;
  const ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const insets = useSafeAreaInsets();
    const{dispatch} = useContext(UserContext);

    useEffect(() => {
        setDisabled(!(email && !errorMessage));
    }, [email,password,errorMessage]);

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        /*setErrorMessage(
          validateEmail(changedEmail) ? '' : '정확한 이메일을 입력해주세요.'
        );*/
      };

    const _resetPassword = async () => {
      try{
        const _email = email + '@kangwon.ac.kr';
        resetPassword({_email});
      }
      catch(e){
        Alert.alert('Email Error', e.message);
      }
    };

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        extraScrollHeight={20}>
        <Container >
          <Image url={images.logo} imageStyle={{ borderRadius: 8}}/>
            <TextInput
              value={email}
              label="Email"
              mode = "outlined"
              style={{width:350, margin: 10}}
              theme={{colors:{primary:'skyblue'}}}
              onChangeText={_handleEmailChange}
              onSubmitEditing={() => passwordRef.current.focus()}
              placeholder="Email"
              returnKeyType="next"
              right={<TextInput.Affix text="@kangwon.ac.kr" />}
            />
            <Button title = "Send E-mail" onPress={_resetPassword} disabled={disabled}/>
        </Container>
       </KeyboardAwareScrollView>
    );
  };

  
  
  export default ResetPassword;
  