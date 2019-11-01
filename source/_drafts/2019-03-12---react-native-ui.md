---
title: "[React Native]  레트로 게임 UI 만들기"
author: anpigon
date: "2019-03-12T04:36:06Z"
permalink: "/kr/@anpigon/react-native-ui"
tags:
  - "kr"
  - "kr-dev"
  - "busy"
  - "jjangjjangman"
---
![](https://www.dafont.com/img/illustration/p/r/press_start_2p.png)
<sup>Illustration © [Codeman38](http://www.zone38.net/font/)</sup>

어렸을 때 Final Fantasy와 같은 RPG 게임을 좋아했습니다. 옛날 레트로 느낌을 살려서, Final Fantasy UI 처럼 보이는 컨테이너를 만들어 봅니다.

<br><center>* * *</center>

# 프로젝트 생성하기

**expo-cli**를 사용하여 프로젝트를 생성합니다. 프로젝트 명은 **ffcontainer**라고 하였습니다.

    $ expo init ffcontainer

&nbsp;

# 라이브러리 설치

이번에는 **styled-components** 모듈을 설치하여 사용해 봅니다. 

    $ yarn add styled-components

&nbsp;

## **FFContainer** 만들기

`App.js` 파일의 내용을 지우고 아래와 같이 작성합니다. 먼저 필요한 모듈을 **import** 합니다.

    import React from 'react';
    import ｛ View, Text, StyleSheet ｝ from 'react-native';
    import ｛ Constants, LinearGradient ｝ from 'expo';
    import styled from 'styled-components';

<br>그리고 **styled-components**를 사용하여, 앱 컨테이너를 담당할 `<Container>` 를 작성합니다. **styled-components**를 사용하면 다음과 같이 CSS 비슷하게 사용할 수 있습니다. 

    const Container = styled.View`
      flex: 1;
      background-color: black;
      paddingTop: $｛Constants.statusBarHeight｝;
    `;

<br>**styled-components**로 만든 `<Container>`가 어떻게 렌더링되는지 확인해봅니다.

    export default class App extends React.Component ｛
    
      render() ｛
        return (
          <Container>
          </Container>
        );
      ｝
    ｝;

![](https://steemitimages.com/300x0/https://user-images.githubusercontent.com/3969643/54168418-ba7a7b00-44b1-11e9-9732-dd9939ef93aa.png)

&nbsp;

이제 본격적으로 **FFContainer**를 만들어 봅니다. 아래와 같이 작성합니다.

    const FFContainer = styled.View`
      border-radius: 8;							
      border-width: 4;
      border-color: #e7dfe7;
      border-style: solid;
      background-color: #e7dfe7;	
      margin-horizontal: 10; 
      margin-vertical: 10;
    `;
    
    const styles = StyleSheet.create(｛
      FFContents: ｛
        padding: 10, 
        borderRadius: 5,
      ｝
    ｝);
    
    const GRADIENT_COLOR = ['#6c6eb2', '#181870', '#000028'];
    
    export default class App extends React.Component ｛
      render() ｛
        return (
          <Container>
            <FFContainer>
              <LinearGradient 
                style=｛styles.FFContents｝
                colors=｛GRADIENT_COLOR｝>
                <Text style=｛｛color:'white'｝｝>Hello World!</Text>
              </LinearGradient>
            </FFContainer>
          </Container>
        );
      ｝
    ｝;

아래와 같이 보여집니다.

![](https://steemitimages.com/300x0/https://ipfs.busy.org/ipfs/Qmcci7iMVbsGKbvHNvFsKejJDPLg5mwUtXE8rfdPswuHVt)

&nbsp;

## Fonts 적용하기

이번에는 레트로 감성의 폰트를 적용해봅시다. 구글에서 제공하는 폰트 중에 [Press+Start+2P](https://fonts.google.com/specimen/Press+Start+2P)가 있습니다.

![](https://steemitimages.com/0x0/https://ipfs.busy.org/ipfs/QmQ9DJ62YkZJfYmqw9AnKY1nJtP7mCWEvHN8tm81PCmwnz)


**Press Start 2P** Font를 다운로드 합니다. [\[여기\]](https://www.dafont.com/press-start-2p.font)에서 다운로드 가능합니다.


<br>`App.js` 를 수정합니다. **expo**에서 Font 모듈을 추가로 import 합니다.

    import ｛ 
      Constants, 
      LinearGradient, 
      Font,       // here
    ｝ from 'expo';

<br>그리고 **Font.loadAsync**를 사용하여 assets 폴더에 있는 Font 파일을 가져옵니다.  Font 파일 로딩이 완료되기 전에 Font 를 사용하면 에러가 발생합니다. 그래서`state.fontLoaded`로 Font 파일 로딩 완료 여부를 판단할 것 입니다.

    export default class App extends React.Component ｛
    
      state = ｛
        fontLoaded: false // here
      ｝
    
      async componentWillMount() ｛
        await Font.loadAsync(｛
          'PressStart2P': require('./assets/PressStart2P.ttf'),
        ｝);
    
        this.setState(｛ fontLoaded: true ｝);
      ｝
    
    	// (...)

> expo에서 커스텀 폰트 사용방법은 [Using Custom Fonts 문서](https://docs.expo.io/versions/latest/guides/using-custom-fonts/)를 참고하였습니다.

<br>`<Text>` 에 '**Hello World!'** 를 출력하여 Font를 확인해봅니다.


    export default class App extends React.Component ｛
    
    	// (...)
    	
      render() ｛
        if(this.state.fontLoaded) ｛
          return (
            <Container>
              <FFContainer>
                <LinearGradient 
                  style=｛ styles.FFContents ｝
                  colors=｛ GRADIENT_COLOR ｝>
                  <Text style=｛｛color:'white', fontFamily:'PressStart2P'｝｝>Hello World!</Text>
                </LinearGradient>
              </FFContainer>
            </Container>
          );
        ｝
        return null;
      ｝
    ｝;

![](https://steemitimages.com/300x0/https://ipfs.busy.org/ipfs/QmbepC3x61hFG82MZVGHryBwbj84dghc5C2kAqLnySVAfd)

&nbsp;

## 스팀잇 프로필 화면 만들기

스팀잇 프로필을 아래와 같은 UI로 만들어 보았습니다. 화면에서 명성(Reputation)을 **LV**라고 표현해보았습니다. 게임 화면처럼 보이나요? ㅎㅎ

![](https://steemitimages.com/400x0/https://ipfs.busy.org/ipfs/QmcSsXhtNEsspdi2tDXecvYaSxGwgkhpVoEZXvThS6n9Sg)

<br>위 코드 내용은 [snack.expo.io](https://snack.expo.io/@markan/ffcontainer)에서 확인할 수 있습니다.
[![](https://steemitimages.com/0x0/https://ipfs.busy.org/ipfs/QmTVnuTbditvDLhggrrfkCVCgdwnU1MyveLfqrjbyzHvfk)](https://snack.expo.io/@markan/ffcontainer)

여기까지 읽어주셔서 감사합니다.

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
[![dclick-imagead](https://s3.ap-northeast-2.amazonaws.com/dclick/image/dclick/1552477485946.png)](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtdWkiLCJhIjpbImktMTk1Il0sInVybCI6Imh0dHBzOi8vd3d3LmRjbGljay5pby9tb25ldGl6ZSIsImlhdCI6MTU1MjU1NjI0NCwiZXhwIjoxODY3OTE2MjQ0fQ.FiO_qBavmlNqL0xUBnJ6Fabwh725lf-xt4VZxcIMtfQ)