---
title: "[React Native] 동킹콩 모바일 게임 만들기"
author: anpigon
date: "2019-02-10T04:53:36Z"
permalink: "/kr/@anpigon/react-native"
tags:
  - "React Native"
---
이번에는 **리액트 네이티브**로 **모바일 게임**을 만들어 보겠습니다. 이미 잘 만들어진 *게임 샘플 코드*를 가져와서 빌드하는 과정이라서 어렵지는 않습니다. 매우 간단합니다.

최근에 출시되는 모바일 게임은 대부분 **unity**로 개발되어 있습니다. 하지만 리액트 네이티브로도 모바일 게임 개발이 가능합니다. [react-native-game-engine](https://github.com/bberak/react-native-game-engine)를 설치하면 리액트 네이티브에서 모바일 게임을 만들수 있습니다.  

이런 게임을 만들 수 있습니다. 추억 돋네요. ㅎㅎ

![](https://raw.githubusercontent.com/bberak/react-native-donkey-kong/master/assets/gifs/1.gif)
> 출처: https://github.com/bberak/react-native-donkey-kong

<br><center>* * *</center><br>

## React Native 프로젝트 생성하기

먼저, `my-donkey-kong-game`이라는 프로젝트 폴더를 생성합니다.

```bash
$ expo-cli init my-donkey-kong-game
```
> **expo-cli**는 [expo 설치 가이드 문서](https://docs.expo.io/versions/latest/introduction/installation/)를 참고하여 설치해주세요.

![](https://cdn.steemitimages.com/DQmYS8jBHgBHjZtGAHcN8ftpCwYQqSAVRsjoxqfktLs1JfU/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-09％2014.13.33.png)

> 1. **Choose a template**에서 **blank**를 선택합니다.
> 2. **Choose which workflow to use**에서 **managed(default)**를 선택합니다.
> 3. 마지막으로 **expo.name**에 앱 이름을 입력합니다. 저는 *"My Donkey Kong Game"* 이라고 입력하였습니다.
> 4. 엔터를 입력하면 프로젝트 생성이 시작됩니다. 필요한 모듈을 다운로드하고 설치하는데 시간이 조금 소요됩니다.

&nbsp;

## DonkeyKong 모듈 설치하기

프로젝트 폴더 생성이 완료되면, `react-native-donkey-kong`를 설치합니다. `react-native-donkey-kong`는 이미 완성되어 있는 게임 모듈입니다.

```bash
$ cd my-donkey-kong-game
$ npm install --save react-native-donkey-kong
$ npm install
```

&nbsp;

마지막으로 `App.js`를 수정합니다.

```jsx
import React, ｛ Component ｝ from "react";
import DonkeyKong from "react-native-donkey-kong";

export default class App extends Component ｛
  render() ｛
    return <DonkeyKong />;
  ｝
｝
```
> * **react-native-donkey-kong**에서 `DonkeyKong`를 **import** 합니다.
> * 그리고 `render()`함수에서 `<DonkeyKong/>`를 **return** 해주면 끝입니다.

&nbsp;

## 게임 실행하기

이제 게임 앱을 실행합니다.

```bash
$ npm start
```
&nbsp;

아래는 실제 빌드되어 실행한 게임 화면입니다. 

|![](https://cdn.steemitimages.com/300x0/https://cdn.steemitimages.com/DQmNs5bQc7AbqGF7GC6V6VVQECyAZHYxqEdm9NaepoiJUYN/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-09％2014.25.01.png)|![](https://cdn.steemitimages.com/300x0/https://cdn.steemitimages.com/DQmYt7qpyTeyf8LarRx6HNEbwENG6HgEeCW6Q1v2NHNRChV/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-09％2014.25.28.png)|![](https://cdn.steemitimages.com/300x0/https://cdn.steemitimages.com/DQmd7UckEyoNyHSXUPGdxSfVxMN7pcqdEgUFodTzKWb4XJQ/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-09％2014.26.00.png)|
|-|-|-|

&nbsp;

터치를 슬라이드하면 케릭이 움직입니다. 
키패드 방식이 아니라서 조작하기가 매우 어렵네요.

여기까지 읽어주셔서 감사합니다.

