import React from 'react';
import styled from 'styled-components/native';
import { Text, View, Linking } from 'react-native';
import { List, Button, Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Major = () => {
  return (
  <ScrollView>
    <List.AccordionGroup>
      <List.Item title="공학대학" onPress={() => Linking.openURL('https://cms.kangwon.ac.kr/gonghak/index.do')}/>
      <Divider/>
      <List.Item title="보건과학대학" onPress={() => Linking.openURL('https://cms.kangwon.ac.kr/hanbang/index.do')}/>
      <Divider/>
      <List.Item title="인문사회-디자인스포츠대학" onPress={() => Linking.openURL('https://cms.kangwon.ac.kr/inmun/index.do')}/>
      <Divider/>
      <List.Item title="미래융합가상학과" onPress={() => Linking.openURL('https://multimajor.kangwon.ac.kr/multimajor/index.do')}/>
      <Divider/>
      <List.Item title="삼척자유전공학부" onPress={() => Linking.openURL('https://cms.kangwon.ac.kr/freemajor/index.do')}/>
      <Divider/>
      <List.Item title="연계전공" onPress={() => Linking.openURL('https://multimajor.kangwon.ac.kr/multimajor/index.do')}/>
      <Divider/>
  </List.AccordionGroup>
  </ScrollView> 
  );
};

export default Major;


/*
<List.Accordion title="춘천" id="1" theme={{colors:{background:'skyblue', backdrop:'blue'}}}>
      <List.Item title="간호학과" onPress={() => Linking.openURL('https://nurse.kangwon.ac.kr/nurse/index.do')}/>
      <Divider/>
      <List.Item title="경영대학" onPress={() => Linking.openURL('https://cba.kangwon.ac.kr/cba/index.do')}/>
      <Divider/>
      <List.Item title="농업생명과학대학" onPress={() => Linking.openURL('https://knucals.kangwon.ac.kr/knucals/index.do')}/>
      <Divider/>
      <List.Item title="동물생명과학대학" onPress={() => Linking.openURL('https://cals.kangwon.ac.kr/cals/index.do')}/>
      <Divider/>
      <List.Item title="문화예술-공과대학" onPress={() => Linking.openURL('https://ace.kangwon.ac.kr/ace/index.do')}/>
      <Divider/>
      <List.Item title="사범대학" onPress={() => Linking.openURL('https://educatio.kangwon.ac.kr/educatio/index.do')}/>
      <Divider/>
      <List.Item title="사회과학대학" onPress={() => Linking.openURL('https://social.kangwon.ac.kr/social/index.do')}/>
      <Divider/>
      <List.Item title="산림환경과학대학" onPress={() => Linking.openURL('https://forest.kangwon.ac.kr/forest/index.do')}/>
      <Divider/>
      <List.Item title="수의과대학" onPress={() => Linking.openURL('https://vetmed.kangwon.ac.kr/vetmed/index.do')}/>
      <Divider/>
      <List.Item title="약학대학" onPress={() => Linking.openURL('https://pharmacy.kangwon.ac.kr/pharmacy/index.do')}/>
      <Divider/>
      <List.Item title="의과대학" onPress={() => Linking.openURL('https://smed.kangwon.ac.kr/smed/index.do')}/>
      <Divider/>
      <List.Item title="의생명과학대학" onPress={() => Linking.openURL('https://bmcollege.kangwon.ac.kr/bmcollege/index.do')}/>
      <Divider/>
      <List.Item title="인문대학" onPress={() => Linking.openURL('https://humanities.kangwon.ac.kr/humanities/index.do')}/>
      <Divider/>
      <List.Item title="자연과학대학" onPress={() => Linking.openURL('https://natursci.kangwon.ac.kr/natursci/index.do')}/>
      <Divider/>
      <List.Item title="IT대학" onPress={() => Linking.openURL('https://it.kangwon.ac.kr/it/index.do')}/>
      <Divider/>
      <List.Item title="미래웅합가상학과" onPress={() => Linking.openURL('https://multimajor.kangwon.ac.kr/multimajor/index.do')}/>
      <Divider/>
      <List.Item title="춘천자유전공학부" onPress={() => Linking.openURL('https://liberal.kangwon.ac.kr/liberal/index.do')}/>
      <Divider/>
      <List.Item title="연계전공" onPress={() => Linking.openURL('https://multimajor.kangwon.ac.kr/multimajor/index.do')}/>
      <Divider/>
    </List.Accordion>
    <Divider/>
    */
