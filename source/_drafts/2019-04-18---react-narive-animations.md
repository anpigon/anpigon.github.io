---
title: "[React Native] 인터렉티브한 애니메이션(Animations) 만들기"
author: anpigon
date: "2019-04-18T13:39:36Z"
permalink: "/kr/@anpigon/react-narive-animations"
tags:
  - "kr"
  - "kr-dev"
  - "busy"
---
![](https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<div class='pull-right'><i>Design by imrahelk</i></div> 

<hr>

> 이쁜 대문 이미지를 만들어주신 **레이첼(imrahelk)**님 감사합니다. 아직 대문 이미지가 없으신 분은 ["☆축환갑☆ 환갑기념 대문장이 리턴즈"](https://steemit.com/kr-event/@imrahelk/4kchpq)에 이벤트 응모해보세요.


<br><br>
<center>* * *</center>
<br><br>

# Lottie

 [Lottie](https://airbnb.design/lottie/)는 Airbnb에서 출시한 애니메이션 라이브러리입니다. 아래 화면과 같은 아름다운 애니메이션 효과를 만들 수 있습니다.

![](https://github.com/react-native-community/lottie-react-native/raw/master/docs/gifs/Example2.gif)


<br>하지만 애니메이션을 만들기 위해서는 [Adobe After Effect](https://www.adobe.com/kr/products/aftereffects.html)로 애니메이션을 만들고, [Bodymovin](https://github.com/airbnb/lottie-web)로 다시 JSON 파일을 만들어야 합니다.

<br>맥OS 사용자라면,  lottie Bodymovin 플러그인을 brew로 설치할 수 있습니다.

```
brew tap danielbayley/adobe
brew cask install lottie
```
> 하지만 저는 설치하다가 오류가 발생하네요. ㅠㅠ 
그리고 Adobe After Effect 로 애니메이션 만드는 방법도 잘 모르겠습니다.

<br>

## Lottie Files
[https://lottiefiles.com](https://lottiefiles.com/recent)
그러나 Adobe After Effect를 할 줄 몰라도 괜찮습니다. LottieFiles 사이트에는 많은 디자이너들이 만든 애니메이션이 업로드되어 있습니다. 원하는 애니메이션을 검색하고 다운로드하세요. 그리고 모바일앱에 적용하면 됩니다.
![](https://files.steempeak.com/file/steempeak/anpigon/CcPQMlgw-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-1820E1848BE185A9E18492E185AE204.30.56.png)
> 저는 첫번째의 지갑에 동전 넣은 애니메이션이 마음에 드네요. ㅋ

<br>Lottie로 애니메이션을 구현하고 싶었습니다. 하지만 Adobe After Effect 다루는게 익숙하지가 않네요.

<br><br>
<center>* * *</center>
<br><br>

# React Native Animated API
React Native에서 제공하는 Animated API으로 애니메이션을 구현해보겠습니다. Animated API 사용 방법은 매우 간단합니다. React-Native API 문서를 참고하였습니다.
* 참고: https://facebook.github.io/react-native/docs/animations

<br>
아래와 같이 이미지가 뱅글뱅글 돌아가는 애니메이션을 만들어 봅니다. 이미지는 뉴비존님(newbijohn)께서 디자인해주셨습니다.

|||
|-|-|
| ![](https://files.steempeak.com/file/steempeak/anpigon/GCgECeAt-whan_loader.gif) | ![](https://cdn.steemitimages.com/500x0/http://www.pngmart.com/files/5/Snow-PNG-Transparent-Image.png) |

<br>


코드를 작성합니다.

```
import React, ｛ Component ｝ from 'react';
import ｛ Animated, Easing, StyleSheet, View ｝ from 'react-native';

export default class AuthLoadingScreen extends Component ｛
  constructor(props) ｛
    super(props);

    this.state = ｛
      spinValue: new Animated.Value(0),
    ｝
  ｝
  
  componentDidMount() ｛
    // 애니메이션을 설정한다.
    Animated.timing(
      this.state.spinValue,
      ｛
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      ｝
    ).start()
  ｝

  render() ｛
    // 회전 애니매이션을 수행한다.
    const spin = this.state.spinValue.interpolate(｛
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    ｝);

    return (
      <View style=｛styles.container｝>
        <Animated.Image
          style=｛｛transform: [｛rotate: spin｝] ｝｝
          source=｛require('../../assets/images/icon.png')｝ />
      </View>
    );
  ｝
｝

const styles = StyleSheet.create(｛
  container: ｛
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  ｝
｝);
```
> 회전값 Value 는 `state`의 `spinValue`에 맵핑됩니다. 그리고 `Animated.timing` 의 `easing` 함수를 사용하여 시간에 따른 애니메이션 효과를 보여줍니다.

<br>

위 코드를 적용하면 아래와 같이 보여집니다.

![](https://files.steempeak.com/file/steempeak/anpigon/OcCUa1U8-1.gif)

<br>여기까지 읽어주셔서 감사합니다.

***

<center>
### WHAN DEV TEAM
[\[출범식\] WDT(WHAN DEV TEAM) 공식 활동 개시](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team)
[![](https://steemitimages.com/320x0/https://cdn.steemitimages.com/DQmbo4bis7WgjdVYdXR9VbzWdzh2aCXw2JFVKfruYNCNV4G/wdt.png)](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team)


![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)
</center>

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
[![dclick-imagead](https://s3.ap-northeast-2.amazonaws.com/dclick/image/dclick/1552477485946.png)](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXJpdmUtYW5pbWF0aW9ucyIsImEiOlsiaS0xOTUiXSwidXJsIjoiaHR0cHM6Ly93d3cuZGNsaWNrLmlvL21vbmV0aXplIiwiaWF0IjoxNTU1NTk2MDU4LCJleHAiOjE4NzA5NTYwNTh9.g6-IsuyGOTzbmmkQU_iwAjrcHTumMkV2yOQIlPO1oG8)