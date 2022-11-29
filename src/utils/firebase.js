import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification,sendPasswordResetEmail } from 'firebase/auth';
import config from '../../firebase.json';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Alert } from 'react-native';

const app = initializeApp(config);

const Auth = getAuth(app);
firebase.initializeApp(config);

let Email;

export const login = async ({ _email, password}) => {
    const { user } = await signInWithEmailAndPassword(Auth, _email, password);
    Email = _email;
    return user;
  };

export const signup = async ({email, password}) => {
  const { user } = await signInWithEmailAndPassword(Auth, email, password);
    if(!user) {
      alert("이메일 없음");
    }
    else if(user.emailVerified == false){
      alert("이메일 인증 해주세요");
    }
    else{
      alert("회원가입 성공");
    }
    return user;
}

export const resetPassword = async ({_email}) => {
      sendPasswordResetEmail(Auth,_email)
      .then(console.log('reset email sent'))
      Alert.alert("이메일을 확인 해주세요");
}

export const comfirm = async ({email, password}) => {
  const { user } = await createUserWithEmailAndPassword(Auth, email, password);
      sendEmailVerification(user);
      alert("이메일을 전송했습니다");
      return user;
}

export const logout = async () => {
  return await Auth.signOut();
};

export const getCurrentUser = () => {
  const {email } = Auth.currentUser;
  return {email: email};
};

export const DB = firebase.firestore();

export const createChannel = async({ PostName, PostText }) => {
  const newChannelRef = DB.collection('channels').doc();
  const id = newChannelRef.id;
  const newChannel = {
    id,
    PostName,
    PostText,
    createdAt: Date.now(),
    Email,
  };
  await newChannelRef.set(newChannel);
  return id;
}

export const _comments = async({ Comment, PostId }) => {
  const newCommentsRef = DB.collection('comments').doc();
  const id = newCommentsRef.id;
  if(Comment == ''){
    Alert.alert("내용을 입력하세요");
  }
  else{
    const newComment = {
      Email,
      id,
      PostId,
      Comment,
      LikeCount:0,
      LikedUserList:[],
      createdAt: Date.now(),
    };
    await newCommentsRef.set(newComment);
    return id;
  }
}
