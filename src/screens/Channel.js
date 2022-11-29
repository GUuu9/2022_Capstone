import React, {useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import {  StyleSheet, View } from 'react-native';
import { Button } from '../components';
import { _comments } from '../utils/firebase';
import { Alert } from 'react-native';
import {_Writer} from './Login';
import { ThemeContext } from 'styled-components/native';
import {MaterialIcons} from '@expo/vector-icons';
import {FlatList} from 'react-native';
import { app, getCurrentUser } from '../utils/firebase';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import moment from 'moment';
import IconImageButton from '../components/IconImageButton';
import { Divider, TextInput, Text, Title } from 'react-native-paper';

// define design
const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
`;
const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
`;
const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listDescription};
`;

// get datetime func
const getDateOrTime = ts => {
  const now = moment().startOf('day');
  const target = moment(ts).startOf('day');
  return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};

// 게시글의 댓글 영역
// react.memo? 컴포넌트의 리렌더링 방지, props가 변경되지 않았을 때 다시 렌더링하지 않음
const Item = React.memo(
  ({ item: { Email, Comment, createdAt,LikeCount, id}}) => {
    const theme = useContext(ThemeContext);
    return (
      <ItemContainer>
        <ItemTextContainer>
        <ItemDescription>
            {Email}
          </ItemDescription>
          <ItemDescription>
            {Comment}
          </ItemDescription>
        </ItemTextContainer>
        <ItemTime>
          <IconImageButton attrs={"favorite"} Email={Email} id={id}/>
          <Text>{LikeCount}</Text>
          <IconImageButton attrs={"del"} Email={Email} id={id}/>
          {getDateOrTime(createdAt)}</ItemTime>
      </ItemContainer>
    );
  }
);

const Channel = ({navigation, route}) => {
  const [comments, setComments] = useState([]);
  const PostId = route.params.id;
  const Post_Email = route.params.Email;
  const [Comment_Id,setComment_Id] =useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const collectionQuery = query(
      collection(db, 'comments'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(collectionQuery, snapshot => {
      const list = [];
      const list_ = [];
      snapshot.forEach(doc => {
        if (doc.data().PostId == PostId){
          list.push(doc.data());
          list_.push(doc.id);
        }
      });
      setComment_Id(list_);
      setComments(list);
    });
    return () => unsubscribe();
  }, []);

  const [Comment, setComment] = useState('');

  const _addComment = async () => {

    try {
      const id = await _comments({ Comment, PostId });
      setComment('');
    } catch (e) {
      Alert.alert('Creation Error', e.message);
    }
  };

  const _handleTextChange = text => {
    setComment(text);
  };

  const _deleteCom = async () => {
    const db = getFirestore(app);
    //console.log(Comment_Id.length);
    for(let i = 0;i<Comment_Id.length;i++){
      deleteDoc(doc(db,'comments',Comment_Id[i]));
    }
    alert("삭제 완료");
  }
  const _handlePostDel = async () => {
    const C_Email = getCurrentUser().email;
    const db = getFirestore(app);

    const target_Post = doc(db, "channels", PostId);

    const _deleteDoc = async () => (target_Post,{
      Post_Email : Post_Email == C_Email ? deleteDoc(target_Post) && _deleteCom() && navigation.pop() 
      : alert("게시글 작성자가 아닙니다"),
    });
    _deleteDoc();
  }

  return (
    <Container>
    <Container style={styles.Main}>
    <FlatList
      ListHeaderComponent={
      <>
      <Text style ={{fontSize: 11, padding: 5}}>작성자 : {route.params?.Email}</Text>
      <View>
        <View theme={{colors:{primary:'skyblue'}}} style={{flexDirection: 'row'}}> 
      <Text style ={{fontSize: 20, padding: 10, flex: 12}}>{route.params?.PostName}</Text>
      <MaterialIcons
        name="delete"
        size={25}
        style={{ margin: 10, flex: 1}}
        onPress = {_handlePostDel}
        /> 
        </View>
        <Text style ={{fontSize: 15, padding: 17}}>{route.params?.PostText}</Text>
        <Divider/>
        </View>
        </>}
        keyExtractor={item => item['id']}
        data={comments}
        renderItem={({ item }) => (
          <Item item={item}/>
        )}
        windowSize={3}
        />
    </Container>
    <Container style={styles.footer}>
    <View>
     <TextInput 
     style = {styles.textInput}
     placeholder="댓글"
     value={Comment}
     onChangeText={_handleTextChange}
     onSubmitEditing={() => {
       setComment(Comment.trim());
     }}
     onBlur={() => setComment(Comment.trim())}
     theme={{colors:{primary:'skyblue'}}}
     mode = "outlined"
     />
     <Button style = {styles.button} title = "확인" onPress={_addComment}/>
     </View>  
    </Container>
    </Container>
  );
};

// define design
const styles = StyleSheet.create({
  Main: {
    width:"100%",
    height:"82%",
  },
  footer: {
    width:"100%",
    height:"18%",
    justifyContent: 'flex-end',
  },
  button: {
      width: 170,
      height : 130,
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: '#dddddd',
      padding: 10,
      margin: 10,
      alignItems: "stretch",
    justifyContent: 'flex-end',
  },
  textInput: {
    backgroundColor: '#ffffff',
    height:50,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: "stretch",
    justifyContent: 'flex-start',
  },
  rootContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
},
})

export default Channel;
