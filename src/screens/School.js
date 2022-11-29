import styled from 'styled-components/native';
import { View, StyleSheet } from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import { ThemeContext } from 'styled-components/native';
import {MaterialIcons} from '@expo/vector-icons';
import {FlatList} from 'react-native';
import { app } from '../utils/firebase';
import { FAB } from 'react-native-paper';
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import moment from 'moment';

// define design
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const ItemContainer = styled.TouchableOpacity`
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

const getDateOrTime = ts => {
  const now = moment().startOf('day');
  const target = moment(ts).startOf('day');
  return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};

// 인자로 item, onpress를 받는 함수 Item
// 인자 item으로 id, postname... 을 받아오고 함수 내부에서 onpress로 id, postname... 을 전달해준다
const Item = React.memo(
  ({ item: { id, Email, PostName, PostText, createdAt }, onPress }) => {
    const theme = useContext(ThemeContext);

    return (
      <ItemContainer onPress={() => onPress({ id, Email, PostName, PostText })}>
        <ItemTextContainer>
          <ItemTitle>{PostName}</ItemTitle>
        </ItemTextContainer>
        <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={theme.listIcon}
        />
      </ItemContainer>
    );
  }
);


const School = ({navigation, route}) => {
  const [channels, setChannels] = useState([]);
  const theme = useContext(ThemeContext);

  // handleitempress 라는 이름의 함수, 인자로 params를 받고 channel에 params를 전달하고 channel로 이동함
  const _handleItemPress = params => {
    navigation.navigate('Channel', params);
  };

  const [text, setText] = useState([]);

  // firebase 에서 channel 데이터 호출 setchannels로 channels에 할당
  const db = getFirestore(app);
  useEffect(() => {
    const collectionQuery = query(
      collection(db, 'channels'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(collectionQuery, snapshot => {
      const list = [];
      snapshot.forEach(doc => {
        list.push(doc.data());
      });
      setChannels(list);
    });
    return () => unsubscribe();
  }, []);

  // title 설정 밑 channel creation 버튼 활성
  useEffect(() => {
    const titles = route.state?.routeNames || ['School'];
    const index = route.state?.index || 0;
    navigation.setOptions({
      headerTitle: titles[index],
      headerRight: () =>
        index === 0 && (
          <MaterialIcons
            name="search"
            size={26}
            style={{ margin: 10 }}
            onPress={_handleSearch}
          />
        ),
    });
  }, [route]);


  const _handleSearch = () => {
      navigation.navigate('Search');
  };

  return (
      <Container>
        <View style={styles.container}> 
        </View>
      <FlatList
        keyExtractor={item => item['id']}
        data={channels}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3}
      /> 
     <FAB 
          icon="plus"
          style={styles.fab}
          color='black'
          onPress={() => navigation.navigate('ChannelCreation')}
          />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'skyblue'
  }
});

export default School;
