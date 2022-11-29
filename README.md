# Capstone #

## 개발환경 설정 ##

### RN dependency 패키지 설치 ###

#### On Mac ####

    brew install node

    brew install watchman

    npm install -g expo-cli

    sudo gem install cocoapods

    brew tap AdoptOpenJDK/openjdk
    brew cask install adoptopenjdk8
    


#### 프로젝트 생성 ####

    expo init <Project name>

#### 로컬 실행 ####

    npm start



#### Paper 패키지를 추가하였습니다 ####
    npm install react-native-paper


#### Wallet Connect 관련 ####

    npm install react-native-walletconnect --legacy-peer-deps
    npm install react-native-webview --legacy-peer-deps

    공식적으로 지원하는 wallet connect 패키지는 type script 환경에서 온전히 작동하기 때문에 
    의존성을 무시하고 공식패키지의 기능을 사용할 수 있는 비공식패키지를 사용했습니다.

    https://github.com/cawfree/react-native-walletconnect
    https://docs.walletconnect.com/client-api