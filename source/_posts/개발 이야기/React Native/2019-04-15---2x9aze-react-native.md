---
title: "[React Native] 인증(로그인) 상태에 따라 화면 분기하기"
author: anpigon
date: "2019-04-15T01:57:57Z"
permalink: "/kr/@anpigon/2x9aze-react-native"
tags:
  - "React Native"
---
![React Native Authentication flows.png](https://files.steempeak.com/file/steempeak/anpigon/pBSMru9g-React20Native20Authentication20flows.png)

React Navigation의 **Authentication flows** 문서를 참고하여 작성하였습니다.
> 참고: https://reactnavigation.org/docs/en/auth-flow.html

<br>

# Authentication flows

일반적인 인증 Flow은 다음과 같습니다.

1. 사용자가 앱을 실행합니다.
2. 앱의 인증(로그인) 상태를 체크합니다.
3. 유효한 인증 상태에 따라 인증(로그인) 화면 또는 기본 화면이 보입니다.
4. 사용자가 로그아웃하면 인증 상태를 지우고 인증 화면으로 보냅니다.

<br>

# Navigators 설정하기
`navigation/AppNavigator.js`

    import React from 'react';
    import ｛ 
      createSwitchNavigator, 
      createStackNavigator, 
      createAppContainer 
    ｝ from 'react-navigation';

    import MainScreen from './screens/MainScreen';
    import SignInScreen from './screens/SignInScreen';
    import AuthLoadingScreen from './screens/AuthLoadingScreen';
    
    const AppStack = createStackNavigator(｛ Main: MainScreen ｝);      // 앱 메인 화면
    const AuthStack = createStackNavigator(｛ SignIn: SignInScreen ｝); // 인증 화면
    
    export default createAppContainer(createSwitchNavigator(
      ｛
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
      ｝,
      ｛
        initialRouteName: 'AuthLoading',
      ｝
    ));

화면은 기본 앱 화면<sub>MainScreen</sub>, 인증 화면<sub>SignInScreen</sub>, 로딩 화면<sub>AuthLoadingScreen</sub>으로 나누어집니다. 그리고 `SwitchNavigator`에 의해 관리됩니다. `SwitchNavigator`는 한번에 하나의 화면만 표시합니다. `SwitchNavigator`에 의해 화면이 전환되면 라우터와 상태 값이 초기화 됩니다. SwitchNavigator에 대한 자세한 내용은 [API 문서](https://reactnavigation.org/docs/en/switch-navigator.html)를 참고하세요.
앱 실행 초기 화면으로 `initialRouteName`에 `AuthLoading`를 설정합니다. `AuthLoading` 화면에서는 인증 상태를 체크하여 화면을 전환할 것입니다.

<br>

## 인증 로딩 화면 만들기

`screens/AuthLoadingScreen.js`

    import React from 'react';
    import ｛ AsyncStorage ｝ from 'react-native';
    
    class AuthLoadingScreen extends React.Component ｛
      constructor(props) ｛
    	super(props);
        this._bootstrapAsync();
      ｝
    
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => ｛
        const userToken = await AsyncStorage.getItem('userToken');
    
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
      ｝;
    
      // Render any loading content that you like here
      render() ｛
        return (
          <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
          </View>
        );
      ｝
    ｝
**localStorage**에 저장되어 있는 사용자 토큰(userToken)를 이용하여 인증 여부를 판단합니다. 인증 상태이면 App 화면, 아니면 Auth 화면으로 이동합니다. 
> 참고로, jwt의 경우에는 토큰 만료일(expiry date)이 있기때문에, expired 여부도 체크해줘야합니다.

<br>

## 로그인(인증) 화면

`screens/SignInScreen.js` 

```
export default class SignInScreen extends Component ｛

  // (...)

  // 스팀커넥트 성공
  _onSteemconnectSuccess = (tokens) => ｛
    this.setState(｛ modalVisible: false ｝, () => ｛
      this._signInAsync(tokens.access_token);
    ｝);
  ｝

  // 인증 정보 저장
  _signInAsync = async (userToken) => ｛
    await AsyncStorage.setItem('userToken', userToken);
    this.props.navigation.navigate('App');
  ｝;

  render() ｛
    // (...)
  ｝
｝
```
로그인 화면은 "[스팀커넥트(Steemconnect) 로그인 만들기](https://steemit.com/kr/@anpigon/react-native-steemconnect--1548595799187)"에서 사용했던 코드를 가져왔습니다. 스팀 커넥트 로그인이 성공하면 `_signInAsync()` 함수에서 사용자 토큰을 **localStorage**에 저장합니다. 그리고 앱 기본 화면으로 이동합니다.

<br>아래는 샘플로 구현한 화면입니다.

![](https://cdn.steemitimages.com/DQmaxpK74RYz3F8GyErm9Xg6Fp1RHDiA3XYeBzWRSSbcB6f/(null).2019-03-13％2000_28_36.gif)


<br>여기까지 읽어주셔서 감사합니다.

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [장애인의 주홍글씨 BeMinor를 여러분의 가치로 만들어 주십시오.](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiIyeDlhemUtcmVhY3QtbmF0aXZlIiwiYSI6WyJ0LTE3ODMiXSwidXJsIjoiaHR0cDovL3RoZWJlbWlub3IuY29tL3hlL3Nwb25zb3IiLCJpYXQiOjE1NTUyOTM1MzIsImV4cCI6MTg3MDY1MzUzMn0.y4JlNs6hiWdbOqAbznElks_0-VMKOQlsDxfsQMiDUo8)
<sup>1,000인의 마이너는 비마이너의 경제적 자립을 지원합니다.</sup>
