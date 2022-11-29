import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title } from 'react-native-paper'

const ChannelList = ({ navigation }) => {
    return (
    <ScrollView>
        <Card>
            <Card.Content>
                <Title>학교생활</Title>
            </Card.Content>
            <Card.Actions>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('School')}>
                    <Text styled={styles.text1}>
                        대학 공지
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Major')}>
                    <Text styled={styles.text1}>
                        학과 공지
                    </Text>
                </TouchableOpacity>
            </Card.Actions>
            <Card.Actions>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Club')}>
                    <Text styled={styles.text1}>
                        동아리 공지
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://www.kangwon.ac.kr/www/index.do')}>
                    <Text styled={styles.text1}>
                        강원대 바로가기
                    </Text>
                </TouchableOpacity>
            </Card.Actions>

            <Card.Content>
                <Title>자유게시판</Title>
            </Card.Content>
            <Card.Actions>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Club')}>
                    <Text styled={styles.text1}>
                    게시판 1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Free')}>
                    <Text styled={styles.text1}>
                    게시판 2
                    </Text>
                </TouchableOpacity>
            </Card.Actions>
            <Card.Actions>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Club')}>
                    <Text styled={styles.text1}>
                    게시판 3
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Free')}>
                    <Text styled={styles.text1}>
                    게시판 4
                    </Text>
                </TouchableOpacity>
            </Card.Actions>
            <Card.Actions>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Club')}>
                    <Text styled={styles.text1}>
                    게시판 5
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Free')}>
                    <Text styled={styles.text1}>
                    게시판 6
                    </Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    Main: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text1: {
        fontSize: 24,
        color: 'black'
    },
    button: {
        width: 170,
        height : 130,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        padding: 10,
        margin: 10,
    },
})


export default ChannelList;
