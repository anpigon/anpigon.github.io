---
title: "[React Native] 이더리움 모바일 지갑(Ethereum Mobile Wallet)  만들기 #1"
author: anpigon
date: "2019-02-01T02:27:27Z"
permalink: "/kr/@anpigon/react-native-ethereum-mobile-wallet"
tags:
  - "kr"
  - "kr-dev"
  - "busy"
  - "jjangjjangman"
  - "ethereum"
---
![](https://cdn.steemitimages.com/720x0/https://cdn.steemitimages.com/DQmTBYPHABLZoXJMWL9msssEoTsXz9LvVaK7dT49uXXGQi7/galaxy-2.png)
> 오래 전 멀고 먼 블록체인 저편에...
> 암호화폐는 암흑의 시기이다. 하지만, 네드 베이더는 물리쳤고, 스티미디언 부대들은 스팀 얼라이언스 기지를 구축했다.

&nbsp;

이번에는 리액트 네이티브로 이더리움 모바일 지갑을 만들어 봅니다. 리액트 네이티브로 암호화폐 지갑을 만드는 과정이 쉽지는 않을 것입니다. 

개발하기 앞서 자신의 시스템 환경을 꼭 체크하기 바랍니다. Node 8, Python2, JDK 8 이 필요합니다. 자세한 설치 방법은 [「리액트 네이티브 설치 가이드 문서」](https://facebook.github.io/react-native/docs/getting-started.html)의 **Building Projects with Native Code** 탭을 참고하세요.
> 개발환경이 윈도우OS이라면 윈도우 패키지 관리자인  [Chocolatey](https://chocolatey.org/)를 통해 Node와 Python2를 설치하길 권장합니다.


<br><center>* * *</center><br>


# 프로젝트 생성하기

이번에는 **expo**를 사용하지 않고 **React Native CLI**를 사용하여 프로젝트를 생성합니다. 

```bash
$ react-native init rn_ethereum_wallet
$ cd rn_ethereum_wallet
```
>  * **React Native CLI**가 없으면 설치해주세요. `npm i -g react-native-cli`

&nbsp;

# 라이브러리 설치

UI 라이브러리와 네비게이션 라이브러리를 설치합니다.

```bash
$ npm install --save native-base react-navigation react-native-gesture-handler
$ react-native link
```

&nbsp;

# 프로젝트 폴더 구조 만들기

첫 번째로 `src` 폴더를 생성합니다.  `src` 폴더 아래에 `components` 폴더를 생성합니다. 그리고 `src` 폴더에 `App.js` 파일을 생성합니다.

**./src/App.js**

```jsx
import ｛ createStackNavigator, createAppContainer ｝ from 'react-navigation';
import WalletsScreen from './components/WalletsScreen';

const AppStackNavigator = createStackNavigator(｛
  Wallets: ｛ screen: WalletsScreen ｝,
｝);

export default createAppContainer(AppStackNavigator);
```
> * 현재 네비게이터(Navigator)에는 지갑 목록을 보여주는 **WalletsScreen**가 하나 등록되어 있습니다.

&nbsp;

그다음 루트에 있는 `App.js` 파일을 수정합니다.

**./App.js**

```js
import React from 'react';
import App from './src/App';
export default () => <App/>;
```
> * 루트에 있는 `App.js`는  `./src/App.js` 컴포넌트를 반환하는 역할만 합니다.

&nbsp;

# WalletsScreen 화면 만들기

 `components` 폴더에 `WalletsScreen.js` 파일을 생성합니다.

**./src/components/WalletsScreen.js**

```jsx
import React, ｛ Component ｝ from 'react';
import ｛ StyleSheet, View ｝ from 'react-native';
import ｛ Container, Content, Card, CardItem, Body, Text, Icon, Button ｝ from 'native-base'; 

export default class WalletsScreen extends Component ｛
  static navigationOptions = ｛
    title: "Ethereum Wallet",
  ｝

  render() ｛
    return (
      <Container style=｛styles.container｝>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Button transparent iconLeft large block>
                  <Icon name='ios-add-circle-outline' />
                  <Text>지갑 생성</Text>
                </Button>
              </Body>
      			</CardItem>
      		</Card>
      	</Content>
      </Container>
		);
  ｝
｝

const styles = StyleSheet.create(｛
  container: ｛
    flex: 1,
    backgroundColor: 'white'
  ｝,
｝);
```
> * **WalletsScreen** 화면에는 앞으로 지갑 목록이 보여질 것입니다. 
> * 지금은 생성된 지갑이 없으므로, 지갑 생성 버튼만 존재합니다.

&nbsp;

# 실행하기

여기까지 작업하고 어떻게 보이는지 앱을 실행해봅니다.

```bash
$ react-native run-ios
```
![](https://cdn.steemitimages.com/300x0/https://cdn.steemitimages.com/DQmdMGhJyw4You8U9e17KDv4L1kktYmAuHfQMAzA3em4ETk/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-01％2000.20.41.png)

&nbsp;

# CreateWalletScreen 화면 만들기

 `components` 폴더에 `CreateWalletScreen.js` 파일을 생성합니다.

```jsx
import React, ｛ Component ｝ from 'react';
import ｛ StyleSheet, View ｝ from 'react-native';
import ｛ Container, Content, Segment, Text, Icon, Button, Header, Left, Body, Title, Right, Form, Textarea, Input, Item ｝ from 'native-base'; 

export default class CreateWalletScreen extends Component ｛
	static navigationOptions = ｛
    title: '지갑 생성하기'
  ｝

  render() ｛
    return (
      <Container style=｛styles.container｝>
        <View style=｛｛ flex: 1, padding: 10 ｝｝>
          <View style=｛｛ flex: 1 ｝｝>
            <Text note>아래 12개 니모닉을 복사하여 백업하세요. 지갑을 복구하는데 매우 중요한 데이터입니다.</Text>
            <Form>
              <Textarea rowSpan=｛5｝ bordered disabled />
            </Form>
          </View>
          <View style=｛｛ flex: 1 ｝｝>
            <Button block primary>
              <Text>생성하기</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  ｝
｝

const styles = StyleSheet.create(｛
  container: ｛
    flex: 1,
  ｝,
｝);
```
> * 지갑 생성 화면에는 백업 및 복구용 니모닉을 보여줄 것입니다.

&nbsp;

`./src/App.js`를 수정합니다.

```jsx
import ｛ createStackNavigator, createAppContainer ｝ from 'react-navigation';
import WalletsScreen from './components/WalletsScreen';
import CreateWalletScreen from './components/CreateWalletScreen';

const AppStackNavigator = createStackNavigator(｛
  Wallets: ｛ screen: WalletsScreen ｝,
  CreateWallet: ｛ screen: CreateWalletScreen ｝,
｝, 
｛
  defaultNavigationOptions: ｛
    headerBackTitle: null, // 뒤로가기 버튼 타이틀 제거.
  ｝,
｝);

export default createAppContainer(AppStackNavigator);
```
> * 네비게이터(Navigator)에 `CreateWallet: ｛ screen: CreateWalletScreen ｝`를 등록합니다.
> * 네비게이터의 `headerBackTitle: null` 옵션을 설정하여, 헤더에 뒤로가기 버튼 아이콘만 보이도록 하였습니다.

&nbsp;

마지막으로 `WalletsScreen.js` 파일을 수정합니다.

```jsx
export default class WalletsScreen extends Component ｛

  // (...)

  render() ｛
    return (
      <Container style=｛styles.container｝>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Button transparent iconLeft large block
                  onPress=｛() => this.props.navigation.navigate('CreateWallet')｝>
                  <Icon name='ios-add-circle-outline' />
                  <Text>지갑 생성</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  ｝
｝
```
> * **Button**의 `onPress` 속성에 `navigate('CreateWallet')`를 입력하였습니다. 이제 버튼을 누르면 **CreateWallet**  화면으로 이동합니다.

&nbsp;

이제 지갑 생성하기 화면이 어떻게 보이는지 확인해봅니다.

![](https://cdn.steemitimages.com/300x0/https://cdn.steemitimages.com/DQme4c9vEM5vAN2tV1iAMnPFMegvs3toxgy9fsDyihxqHFS/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-01％2001.31.23.png)


<br><center>* * *</center><br>

스팀잇 커뮤니티에 암호 화폐 모바일 지갑 앱 개발에 관심 있는 분이 얼마나 있을지 모르겠습니다. 이더리움 지갑 부터 시작해서 비트코인, 스팀, 리플, 이오스, 스텔라루멘 모바일 지갑을 다 만들고 싶네요. 하지만, 제 능력으로 다 개발할 수 있을지는 잘 모르겠습니다.

여기까지 읽어주셔서 감사합니다.