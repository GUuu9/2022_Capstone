import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import { Text, StyleSheet} from 'react-native';
import { Alert } from 'react-native';
import { createChannel } from '../utils/firebase';
import { TextInput, Button} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  padding: 0 20px;
  width: 100%;
  margin: 10px 0;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const ChannelCreation = ({navigation}) => {
  //텍스트 종류 추가
  const [PostName, postname] = useState('');
  const [PostText, posttext] = useState('');
  const PostTextRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(PostName && PostText && !errorMessage));
  }, [PostName, PostText, errorMessage]);

  const _handleTitleChange = PostName => {
    postname(PostName);
    setErrorMessage(PostName.trim() ? '' : 'Please enter the title.');
  };
  
  const _handleCreateButtonPress = async () => {
    try {
      const id = await createChannel({ PostName, PostText });
      navigation.pop();
    } catch (e) {
      Alert.alert('Creation Error', e.message);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} extraScrollHeight={20}>
      <Container>
      <Text style = {{textAlign: 'center', fontSize: 20}}>게시글 제목</Text>
      <TextInput
        style={styles.postname}
        onChangeText={_handleTitleChange}
        value={PostName}
        mode = "outlined"
        theme={{colors:{primary:'skyblue'}}}
        onSubmitEditing={() => {
          postname(PostName.trim());
          PostTextRef.current.focus();
        }}
        onBlur={() => postname(PostName.trim())}
        placeholder="제목을 입력해주세요."
      />
      <Text style = {{textAlign: 'center', fontSize: 20}}>게시글 내용</Text>    
        <TextInput
        theme={{colors:{primary:'skyblue'}}}
        ref={PostTextRef}
        style={styles.posttext}
        multiline
        mode = "outlined"
        onChangeText={text => posttext(text)}
          onSubmitEditing={() => {
            posttext(PostText.trim());
            _handleCreateButtonPress();
          }}
          onBlur={() => posttext(PostText.trim())}
        value={PostText}
        placeholder="내용을 입력해주세요."
      />
      <ErrorText>{errorMessage}</ErrorText>
        <Button icon= "send" mode="contained" theme={{colors:{primary:'skyblue'}}} style={styles.sendbutton} onPress={_handleCreateButtonPress} disabled={disabled}>
          게시글 업로드
        </Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  postname: {
    height: 40,
    margin: 12,
    padding: 10,
  },
  posttext: {
    height: 200,
    margin: 12,
    padding: 10,
  },
  sendbutton: {
    height: 40,
    margin: 12,
    fontSize: 20
  }
});


export default ChannelCreation;
