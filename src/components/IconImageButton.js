import React, { useState, useEffect, Alert } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { IconImages } from './IconImages';
import { app, getCurrentUser } from '../utils/firebase';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin: 5px;
`;

const IconImageButton = ({ attrs, Email, id }) => {
  const [isClicked, setState] = useState(false);
  const [comment, setComment] = useState([]);
  const C_Email = getCurrentUser().email;

  // comment id 로 지금 접근하는 하나의 댓글 특정
  const db = getFirestore(app);
  useEffect(() => {
    const collectionQuery = query(
      collection(db, 'comments'),
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(collectionQuery, snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        if (doc.data().id == id){
          list.push(doc.data());
          doc.data().LikedUserList.indexOf(C_Email) == -1 ?
          setState(false) : setState(true)
        }
      });
      setComment(list);
    });

    return () => unsubscribe();
  }, []);

  const docRef = doc(db, "comments", id);

  const _updateDoc = async () => await updateDoc(docRef, {
    LikeCount : !isClicked ? increment(1) : increment(-1),
    LikedUserList : !isClicked ? arrayUnion(C_Email) : arrayRemove(C_Email),
  });

  const _deleteDoc = async () => (docRef,{
    Email : Email == C_Email ? deleteDoc(docRef) && alert("삭제 완료") : alert("댓글 작성자가 아닙니다"),
  });

  return (
    attrs === "favorite" ?
    <TouchableOpacity onPress={() => {
      setState(!isClicked);
      _updateDoc();
    }}>
      <Icon source={isClicked ? IconImages.Favorite : IconImages.Favorite_border} />
    </TouchableOpacity>:

    attrs === "del" &&
    <TouchableOpacity onPress={() => {
      _deleteDoc();
    }}>
      <Icon source={IconImages.Delete} />
    </TouchableOpacity>
);
};

export default IconImageButton;
