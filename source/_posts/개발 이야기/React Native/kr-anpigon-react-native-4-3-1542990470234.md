---
title: '[React Native #4] 리액트 네이티브 날씨앱 만들기 #3'
tags:
  - kr
  - kr-dev
  - jjangjjangman
  - busy
  - dclick
author: anpigon
date: 2018-11-24 01:27:51
---

![](https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/anpigon/yEuqXKgU-weather-28719_640.png)

# 리액트 네이티브로 날씨앱 만들기 세번째 강좌
리액트 네이티브를 사용하여 날씨앱을 만드는 세번째 강좌입니다. 이번에는 날씨 API 데이터를 이용해서 화면을 구현합니다.

<br>

---

**이전글**

* [[React Native #1] 리액트 네이티브 시작하기](https://steemit.com/kr/@anpigon/react-native-1--1542639852750)
* [[React Native #2] 리액트 네이티브 날씨앱 만들기 #1](https://steemit.com/kr/@anpigon/react-native-2--1542732103861)
* [[React Native #3] 리액트 네이티브 날씨앱 만들기 #2](https://steemit.com/kr/@anpigon/react-native-3-2-1542874472110)
---

<br>

# 날씨 화면 만들기

날씨를 보여줄 Weather.js 컴포넌트를 생성한다. Weather 컴포넌트는 단순히 날씨만 보여주는 용도라서 stateless 컴포넌트로 구현하였다. stateless 컴포넌트는 class가 아닌 const로 구현한다.  stateless 컴포넌트에 대한 자세한 내용은 [React Stateless Functional Components  블로그](https://medium.com/@minoo/react-stateless-functional-components-％EC％9A％B0％EB％A6％AC％EA％B0％80-％EA％B0％84％EA％B3％BC％ED％95％98％EA％B3％A0-％EC％9E％88％EB％8A％94-9％EA％B0％80％EC％A7％80-ecef2ef73d79)를 참고한다.

```
import React, ｛ Component ｝ from 'react';
import ｛ StyleSheet, Text, View, Image ｝ from 'react-native';

const Weather = () => ｛
  return (
    <View>
      <Text>Sunny</Text>
      <Text>23℃</Text>
    </View>      
  );
｝

export default Weather;
```
> 날씨를 보여주는 컴포넌트를 기존에 App.js 파일에 구현해도 된다. 하지만 컴포넌트 단위로 파일을 따로 생성하는 것을 권장한다. 

<br><br>

## App.js 수정하기

이제 App.js 파일을 열어 수정한다. App 클래스에 `state`를 추가한다. `state`는 `loading`와 `weahter` 항목을 가지고 있다. `loading`는 GPS와 날씨API를 조회 중인지를 체크한다. 그리고  `weahter`에는 날씨 정보를 담을 것이다.

```js
export default class App extends React.Component ｛
  
  state = ｛
    loading: true, // 로딩 여부
    weather: null, // 날씨 정보
  ｝

  // ... 이하 생략 ...
```
> `state`에 대한 설명은  [리액트 문서 State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)를 참조한다.

 <br><br>

그리고 App 클래스의 `render` 함수를 수정한다.

```
  render() ｛
    return (
      <View style=｛styles.container｝>
        ｛ 
          this.state.loading ? <Text>Weather</Text> : <Weather data=｛this.state.weather｝ />
        ｝
      </View>
    );
  ｝
```

> `this.state.loading` 값에 따라 보여지는 **View**가 달라진다. `loading` 값이 **True**면 Weather 텍스트가 보이고, **False**면 현재 날씨 정보가 보일 것이다.

<br><br>

이전 시간에 만들었던 `_getWeather` 함수를 아래와 같이 수정한다.

```js
_getWeather = (｛latitude, longitude｝) => ｛
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=$｛latitude｝&lon=$｛longitude｝&appid=$｛API_KEY｝`)
    .then(response => response.json()) // 응답값을 json으로 변환
    .then(json => ｛
      console.log(json);
      
      // 추가된 코드
      this.setState(｛
        weather: json,
        loading: false
      ｝)
    ｝);
  ｝
```
> `this.setState` 함수를 사용하여 `state` 값을 업데이트한다. `loading`를 **False**로 업데이트하고, 날씨 API에서 가져온 데이터를 weather에 담아준다. 리액트에서 `state` 값을 업데이트하기 위해서는 반드시 `this.setState` 함수를 사용해야 한다.

<br><br>

## Wehther.js 수정하기

 Wehther.js 파일을 아래와 같이 수정한다. 현재 날씨와 기온을 보여준다.

```
const Weather = (｛ data ｝) => ｛
  return (
    <View>    
      <Text>｛data.weather[0].main｝</Text>
      <Text>｛data.main.temp｝℃</Text>
    </View> 
  );
｝
```

> **Wehther** 컴포넌트는 `｛ data ｝` 를 전달받아 `Text` 뷰에 출력한다.


<br><br>


이제 앱을 실행하고 확인한다.

![](https://steemitimages.com/400x0/https://ipfs.busy.org/ipfs/QmdZZ552PjYuyJUQuLiq4zr4bfidg3m3PFfg7aTuPN8WvR)


현재 기온이 **286.06℃**로 표시된다. 이건 openweathermap가 기온을 켈빈 단위로 주기 때문이다. 다음 공식을 적용하여 켈빈을 썹씨(°C)로 변환한다.

*켈빈(K)을 썹씨(°C)로 변환 공식*

```
°C = K - 273.15 
```

<br>

현재 기온을 보여주는 부분에 이 공식을 적용하자.

`<Text>｛weather.main.temp｝℃</Text>` 를 `<Text>｛Math.ceil(weather.main.temp - 273.15)｝℃</Text>` 로 수정한다.

<br>

그리고 다시 앱을 확인해보자.

![](https://steemitimages.com/400x0/https://ipfs.busy.org/ipfs/Qmb8Jye2yr5MYzwjP1swWpZewtNu9HuhMwQJ79xi4h4eeD)

현재 날씨는 **Rain**, 기온은 **13℃**로 출력되었다.

<br>
다음 시간에는 이 화면을 이쁘게 꾸며보겠습니다.

<br>

___

<br>

하얀 배경에 검정 텍스트만 보여주니 깔끔하고 좋네요. ㅎㅎ

여기까지 읽어주셔서 감사합니다.


---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [기념 액자 도착](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtNC0zLTE1NDI5OTA0NzAyMzQiLCJhIjpbInQtODU5Il0sInVybCI6Imh0dHBzOi8vc3RlZW1pdC5jb20va3IvQGFybWRvd24vLS0xNTQyNjI5Mjc3MTIyIiwiaWF0IjoxNTQyOTkwNDcwLCJleHAiOjE4NTgzNTA0NzB9.UM5OZpH1hW-EI2HanaSHOOZuHcibvkXnhSBLNLYIyHM)
<sup>Sponsored ( Powered by dclick )</sup>
</center>