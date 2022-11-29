import React, { useState, useRef, useEffect, useContext} from 'react';
import styled from 'styled-components/native';
import { Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import {Alert, StyleSheet} from 'react-native';
import {signup, comfirm} from '../utils/firebase';
import { UserContext } from '../contexts';
import { TextInput, Divider } from 'react-native-paper';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const {dispatch} = useContext(UserContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const didMountRef = useRef();
  
  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = '이름을 입력해주세요.';
      } else if (!validateEmail(email)) {
        _errorMessage = '강원대 이메일을 입력해주세요';
      } else if (password.length < 6) {
        _errorMessage = '비밀번호는 최소 6자리로 입력해주세요.';
      } else if (password !== passwordConfirm) {
        _errorMessage = '비밀번호가 일치하지 않습니다.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      const user = await signup({ email, password});
    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } 
  };

  const _comfirm = async () => {
    try{
      const user = await comfirm({email, password});
      return user;
    }catch (e) {
      Alert.alert('Signup Error', e.message);
    } 
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} extraScrollHeight={20}>
      <Container>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
          mode = "outlined"
          style={{width:350, margin: 10}}
          theme={{colors:{primary:'skyblue'}}}
        />
        <TextInput
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={text => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
          mode = "outlined"
          style={{width:350, margin: 10}}
          theme={{colors:{primary:'skyblue'}}}
        />
        <TextInput
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry
          mode = "outlined"
          style={{width:350, margin: 10}}
          theme={{colors:{primary:'skyblue'}}}
        />
        <TextInput
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry
          mode = "outlined"
          style={{width:350, margin: 10}}
          theme={{colors:{primary:'skyblue'}}}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button style = {styles.button} title = "이메일 인증" onPress={_comfirm}/>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
          style = {styles.button}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
      width: 170,
      height : 130,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: '#dddddd',
      padding: 20,
      margin: 10,
      alignItems: "stretch",
    justifyContent: 'flex-end',
  }
})

export default Signup;
