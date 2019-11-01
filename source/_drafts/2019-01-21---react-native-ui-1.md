---
title: "[React Native] 인스타그램 UI 만들기 #1"
author: anpigon
date: "2019-01-20T16:39:36Z"
permalink: "/kr/@anpigon/react-native-ui-1"
tags:
  - "kr"
  - "dev"
  - "kr-dev"
  - "jjangjjangman"
  - "busy"
---
![](https://user-images.githubusercontent.com/3969643/51441420-b41f1c80-1d14-11e9-9f5d-af5cd3a6aaae.png)

이번에는 리액트 네이티브(React Native)로 인스타그램 UI을 구현하는 포스팅입니다. 다른 앱을 따라 만들어 보는 것은 굉장히 재미있습니다.

구글에서 인스타그램 클론 코딩 강의를 찾아보니, 다른 개발자들이 올린 동영상 강의를 몇 개 찾을 수 있었습니다.

> * Udemy 강좌: [React-Native + Redux + Redux-Saga + INSTAGRAM Clone](https://www.udemy.com/react-native-redux-redux-saga-redux-form-react-navigation/)
> * Nomad Coders 강좌:  [인스타그램 클론 코딩](https://academy.nomadcoders.co/p/instagram-full-stack-front-end-back-end-ios)

<br>사실 위의 강의 2개는 유료입니다. 저처럼 가난한 개발자는 유료 강의도 가끔 듣지만, 무료 강의를 더 많이 이용합니다. 아래는 유튜브에 공개되어 있는 무료 강의입니다. 이 포스팅은 아래 강의를 듣고 정리한 내용입니다.

https://youtu.be/cgg1HidN4mQ

<br>

# 프로젝트 생성하기
동영상 강의에서는 라이브러리를 먼저 설치하고 프로젝트를 생성하지만, 저는 제 스타일로 프로젝트를 먼저 생성하고 시작합니다.

`expo-cli`를 이용하여 프로젝트를 생성합니다.

```bash
$ expo-cli init instagram-clone
$ cd instagram-clone
```
> `expo-cli`가 없는 분들은 [여기](https://docs.expo.io/versions/latest/introduction/installation)를 참고하세요.

<br>그다음, UI 라이브러리를 설치합니다.

```bash
$ yarn add native-base @expo/vector-icons 
```
> `yarn`이 없으신 분들은 [여기](https://yarnpkg.com/en/docs/install)를 참고하세요.

<br>그 다음은 네비게이션을 위한 라이브러리를 설치합니다.

```bash
$ yarn add react-navigation
```


<br>

# 첫 화면 MainScreen 만들기

**Components** 폴더를 생성합니다. 그리고 **Components** 폴더 아래에 `MainScreen.js`를 생성하고 아래와 같이 입력합니다.

```
import React, ｛ Component ｝ from 'react';
import ｛ StyleSheet, Platform ｝ from 'react-native';

export default class App extends Component ｛
  render() ｛
    return (
      <View style=｛styles.container｝>
        <Text>MainScreen</Text>
      </View>
    );
  ｝
｝

const styles = StyleSheet.create(｛
  container: ｛
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  ｝,
｝);
```

<br>

# createStackNavigator 생성하기

`App.js` 파일을 열어서 수정합니다. `App.js` 파일 상단에 `react-navigation`와 방금 만든 `./Components/MainScreen` 를 **import** 합니다. `createStackNavigator()` 함수를 사용하여 `AppStackNavigator`를 생성합니다. 그리고 첫 번째 Navigator에 **MainScreen** 컴포넌트를 등록합니다.

```js
import React, ｛ Component ｝ from 'react';
import ｛ StyleSheet, Text, View ｝ from 'react-native';
import ｛ createStackNavigator, createAppContainer ｝ from 'react-navigation';
import MainScreen from './Components/MainScreen';

const AppStackNavigator = createStackNavigator(｛
  Main:｛
    screen: MainScreen // MainScreen 컴포넌트를 네비게이터에 등록
  ｝
｝);

export default createAppContainer(AppStackNavigator);
```

<br>

# 상단 네비게이션 구현하기

`native-base`에서 `Icon`을 **import**하고, `navigationOptions`을 생성합니다. `navigationOptions`에는 왼쪽에 보여질 *ios-camera* 아이콘과 오른쪽에 보여질 *ios-send* 아이콘을 설정합니다.

```js
import React, ｛ Component ｝ from 'react';
import ｛ StyleSheet, Text, View ｝ from 'react-native';
import ｛ Icon ｝ from 'native-base'; // 추가된 코드

export default class MainScreen extends Component ｛

  // navigationOptions 코드 추가
  static navigationOptions = ｛
    headerLeft: <Icon name='ios-camera' style=｛｛ paddingLeft:10 ｝｝/>,
    title: 'Instagram',
    headerRight: <Icon name='ios-send' style=｛｛ paddingRight:10 ｝｝/>,
  ｝

  render() ｛
    return (
      <View style=｛styles.container｝>
        <Text>MainScreen</Text>
      </View>
    );
  ｝
｝

// 이하 코드 생략
```

<br>여기까지 작업한 화면입니다. 상단에 카메라와 비행기 아이콘이 보이나요?
![](https://cdn.steemitimages.com/300x0/https://user-images.githubusercontent.com/3969643/51429315-f2530800-1c50-11e9-98e7-9f004ab2b38b.png)

<br>

# 탭 네비게이터 구현하기

**Components** 폴더 아래에 **AppTabNavigator** 폴더를 생성합니다. 그리고  **AppTabNavigator** 폴더 아래에 5개의 파일을 생성합니다. `HomeTab.js`, `SearchTab.js`, `AddMediaTab.js`, `LikesTab.js`, `ProfileTab.js` 파일을 각각 생성합니다. 생성되는 파일의 내용은 아래와 비슷하게 입력합니다.

```js
import React, ｛ Component ｝ from 'react';
import ｛ View, Text, StyleSheet ｝ from 'react-native';
 
export default class HomeTab extends Component ｛
    render() ｛
        return (
            <View style=｛style.container｝>
                <Text>HomeTab</Text>
            </View>
        );
    ｝
｝
 
const style = StyleSheet.create(｛
    container: ｛
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    ｝
｝);
```

<br>우리가 생성한 파일 구조는 아래와 같습니다.
![](https://cdn.steemitimages.com/200x0/https://user-images.githubusercontent.com/3969643/51429532-a30dd700-1c52-11e9-9e9f-15a1c5bc42dd.png)

<br>그 다음은 `MainScreen.js` 파일을 수정합니다. `react-navigation`와 **AppTabNavigator** 컴포넌트들을  **import** 합니다. 그리고  하단에 보여줄 탭네비게이터 `AppTabNavigator`를 생성합니다.

```js
// ... 일부 import 코드 생략 ...

import ｛ createBottomTabNavigator, createAppContainer ｝ from 'react-navigation'; 

// 하단 탭에 들어갈 컴포넌트들
import HomeTab from './AppTabNavigator/HomeTab'
import SearchTab from './AppTabNavigator/SearchTab'
import AddMediaTab from './AppTabNavigator/AddMediaTab'
import LikesTab from './AppTabNavigator/LikesTab'
import ProfileTab from './AppTabNavigator/ProfileTab'

// 하단 탭 네비게이터 생성
const AppTabNavigator = createBottomTabNavigator(｛
  HomeTab: ｛ screen: HomeTab ｝,
  SearchTab: ｛ screen: SearchTab ｝,
  AddMediaTab: ｛ screen: AddMediaTab ｝,
  LikesTab: ｛ screen: LikesTab ｝,
  ProfileTab: ｛ screen: ProfileTab ｝
｝);

const AppTabContainet = createAppContainer(AppTabNavigator);

export default class MainScreen extends Component ｛
  
 // navigationOptions 코드 생략

  render() ｛
    return <AppTabContainet/>; // AppTabContainet 컴포넌트를 리턴한다.
  ｝
｝

// ... 이하 코드 생략 ...
```

> 동영상 강좌에서는 `createTabNavigator`를 사용하여 하단 탭 네비게이터를 구현했습니다. 하지만 현재는 `createTabNavigator` 가 *deprecated* 되었습니다. 그래서`createBottomTabNavigator` 또는 `createMaterialTopTabNavigator`를 사용해야 합니다.

<br>여기까지 작업한 화면입니다. 

![](https://cdn.steemitimages.com/300x0/https://user-images.githubusercontent.com/3969643/51429713-af932f00-1c54-11e9-8cf5-8640987ca76e.png)

<br>

# 탭 네비게이터에 아이콘 넣기

`HomeTab.js` 파일을 수정합니다. `navigationOptions`를 생성하고, `Icon`을 입력합니다.

```js
// ... 일부 import 코드 생략 ...

import ｛ Icon ｝ from 'native-base';
 
export default class HomeTab extends Component ｛

    static navigationOptions = ｛
        tabBarIcon: (｛ tintColor ｝) => (
            <Icon name='ios-home' style=｛｛ color: tintColor ｝｝ />
        )
    ｝

// ... 이하 코드 생략 ...
```

<br>이어서 `SearchTab.js`, `AddMediaTab.js`, `LikesTab.js`, `ProfileTab.js` 파일도 수정합니다. 파일에 아이콘을 각각 **'ios-search', 'ios-add-circle', 'ios-heart', 'person'**로 입력합니다. 각 파일 내용은 깃허브에 업로드된 [파일](https://github.com/anpigon/rn_instagram_clone/tree/master/Components/AppTabNavigator)을 참고하세요.


<br>여기까지 작업한 화면입니다.
![](https://cdn.steemitimages.com/300x0/https://user-images.githubusercontent.com/3969643/51429805-e453b600-1c55-11e9-9314-9f9d86dbb6c0.png)

<br>

# 탭 네비게이터에 스와이프와 애니매이션 넣기

스와이프와 애니매이션을 넣기 위해서는  `createMaterialTopTabNavigator`를 사용해야 합니다. 앞에서 `createBottomTabNavigator`로 구현했던 네비게이터를 `createMaterialTopTabNavigator`로 수정합니다. 그리고 네비게이터에  옵션을 설정합니다. `createMaterialTopTabNavigator` 옵션에 대한 자세한 설명은 [TabNavigatorConfig 문서](https://reactnavigation.org/docs/en/material-top-tab-navigator.html#tabnavigatorconfig)를 참고하세요.



```js
// ... 일부 import 코드 생략 ...

// createBottomTabNavigator를 createMaterialTopTabNavigator로 수정
import ｛ createMaterialTopTabNavigator, createAppContainer ｝ from 'react-navigation'; 

const AppTabNavigator = createMaterialTopTabNavigator(｛
  HomeTab:｛ screen: HomeTab ｝,
  Search:｛ screen: SearchTab ｝,
  AddMedia:｛ screen: AddMediaTab ｝,
  Likes:｛ screen: LikesTab ｝,
  Profile:｛ screen: ProfileTab ｝
｝, ｛
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions: ｛
    style: ｛
      ...Platform.select(｛
        ios:｛
          backgroundColor:'white',
        ｝
      ｝)
    ｝,
    iconStyle: ｛ height: 100 ｝,
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  ｝
｝);

// ... 이하 코드 생략 ...
```


<br>여기까지 작업한 화면입니다. 
![](https://user-images.githubusercontent.com/3969643/51430175-7f4e8f00-1c5a-11e9-946c-3817bf2b0c50.gif)
> 이제 하단 탭 아이콘을 클릭하면 페이지 슬라이드 애니메이션이 발생합니다.

<br>작업한 코드는 모두 깃허브에 업로드되어 있습니다.

https://github.com/anpigon/rn_instagram_clone

<br>

여기까지 읽어주셔서 감사합니다.

---

###### 시리즈

* [[React Native] 인스타그램 UI 만들기 #1](https://busy.org/@anpigon/react-native-ui-1)
* [[React Native] 인스타그램 UI 만들기 #2](https://busy.org/@anpigon/react-native-ui-2-1548079722841)
* [[React Native] 인스타그램 UI 만들기 #3](https://busy.org/@anpigon/react-native-ui-3-1548134597178)
* [[React Native] 인스타그램 UI 만들기 #4](https://busy.org/@anpigon/react-native-ui-4-1548207724086)
* [[React Native] 인스타그램 UI 만들기 #5](https://busy.org/@anpigon/react-native-ui-5-1548346515419)

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [[서평] 의료혁명 치료혁명 자연정혈요법 실습편](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtdWktMSIsImEiOlsidC0xMzE5Il0sInVybCI6Imh0dHBzOi8vc3RlZW1pdC5jb20va3IvQGtnYmludGVybmF0aW9uYWwvdnk5d3R4ejIiLCJpYXQiOjE1NDgwMjcxMzksImV4cCI6MTg2MzM4NzEzOX0.KwdeZbBWX67PI3ddP_8itPu8bjoxHbzgl8Sv2Sj8hcU)
<sup>이 책을 한 시간만 읽으면 의사가 못 고치는 병도 스스로 쉽게 고친다. ★장의 어혈을 제거하는...</sup>
</center>