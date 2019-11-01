---
title: "[React Native] NativeBase UI 컴포넌트 라이브러리 사용하기"
author: anpigon
date: "2019-01-04T14:44:18Z"
permalink: "/kr/@anpigon/react-native-nativebase-ui--1546613053309"
tags:
  - "kr"
  - "dev"
  - "kr-dev"
  - "jjangjjangman"
  - "busy"
---
![스크린샷 2019-01-04 22.53.52.png](https://ipfs.busy.org/ipfs/QmaAcpZKKJHfu5ctwX6rpSR6NDRFLL3eJYvJwdRrsQTKAt)

<br>

___

**같이 읽으면 좋은 글**
* [2019년에 알아야 할 React Native UI 컴포넌트 라이브러리](https://blog.bitsrc.io/11-react-native-component-libraries-you-should-know-in-2018-71d2a8e33312)

___

<br>

[NativeBase](https://nativebase.io)는 **React Native**를 위한 크로스 플랫폼 UI 컴포넌트 오픈 소스이다. 현재 버전 v2.7.0까지 릴리즈 되었다. 그리고 [KitchenSink](https://nativebase.io/kitchen-sink-app)에서 **NativeBase**로 구현된 샘플 앱과 예제 소스를 확인할 수 있다.

**NativeBase** 처럼 미리 만들어진 UI 컴포넌트 툴킷을 사용하면, **React Native** 개발 시간을 절약할 수 있다.



<br><br>

# *NativeBase* 설치하기

[공식 문서](https://docs.nativebase.io/docs/GetStarted.html)를 참고하여 설치한다. 

```bash
$ npm install native-base --save
$ react-native link
```
> **Expo**에서 사용하려면 `@expo/vector-icons` 모듈을 설치해야한다.

<br><br>

# NativeBase 사용하기

NativeBase를 사용하는 일반적인 방법은 `<Container>` 내에 모든 컴포넌트를 포함하는 것이다.

```js
import React, ｛ Component ｝ from 'react';
import ｛ Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text ｝ from 'native-base';
export default class AnatomyExample extends Component ｛
  render() ｛
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  ｝
｝
```



## 각 구성요소

| 컴포넌트   | 설명                                                         |
| ---------- | ------------------------------------------------------------ |
| `<Header>` | 화면의 **헤더**를 렌더링한다. `<Button>`, `<Title>` 를 포함할 수 있다. |
| `<Content>`    | 화면의 메인 컨텐츠를 나타낸다. 한 화면에는 하나의 `<Content>` 컴포넌트만 있을 수 있다. |
| `<Footer>`     | 화면에서 **푸터**를 렌더링한다. `<FooterTab>` 을 포함할 수 있다. |

<br><br>

# 결과

위의 간단한 코드를 실행한 결과화면이다.

![](https://steemitimages.com/400x0/https://user-images.githubusercontent.com/3969643/50691156-259f6f80-1073-11e9-8c96-8034c3e9567c.png)

<br><center>* * *</center><br>

[「기술 동향 : React vs Angular vs Vue」 ](https://medium.com/zerotomastery/tech-trends-showdown-react-vs-angular-vs-vue-61ffaf1d8706)을 읽어보면, React의 인기가 점점 증가하고 있습니다. 대부분의 코인 거래소가 React로 개발되어 있을 정도로, 이제는 Front-End 웹개발에서 React를 제외하고 이야기하기가 어렵습니다.

사실 **React-Native**는 React 인기 득을 크게 보는 것 같습니다. 그리고 최근에 안 사실인데, **Micrisoft**에서 [react-native-windows](https://github.com/Microsoft/react-native-windows) 버전을 출시했었네요. 아마 이걸 사용하면 윈도우앱을 만들 수 있을 것 같습니다. ㅋ






---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [[보드게임] 연말연시 파티게임 추천!](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtbmF0aXZlYmFzZS11aS0tMTU0NjYxMzA1MzMwOSIsImEiOlsidC0xMjkzIl0sInVybCI6Imh0dHBzOi8vc3RlZW1pdC5jb20va3IvQHNhbmd3b29ray8tLTE1NDY0MjQ2NDI0NDgiLCJpYXQiOjE1NDY2MTMwNTMsImV4cCI6MTg2MTk3MzA1M30.Q8_N8AnQ93GCmSYzbq2x00AwodsSMTWym18br9EWOX0)
<sup>안녕하세요 여러분! 요즘 연말이라고, 연초라고 모임 많으시죠? 모여서 하는 것이라고는 술밖에 ...</sup>
</center>