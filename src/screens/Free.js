import React from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Free = () => {
  return (
      <Container>
       <Text style = {{fontSize: 24}}>자유 게시판</Text>
      </Container>
  );
};

export default Free;