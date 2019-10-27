---
title: '[React Native #5] 리액트 네이티브 날씨앱 만들기 #4'
tags:
author: anpigon
date: 2018-11-25 11:38:51
---

![](https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/anpigon/yEuqXKgU-weather-28719_640.png)

# 리액트 네이티브로 날씨앱 만들기 네번째 강좌
리액트 네이티브를 사용하여 날씨앱을 만드는 네번째 강좌입니다. 이번에는 `styles`를 이용하여 화면을 이쁘게 디자인합니다.

<br>

---

**이전글**

* [[React Native #1] 리액트 네이티브 시작하기](https://steemit.com/kr/@anpigon/react-native-1--1542639852750)
* [[React Native #2] 리액트 네이티브 날씨앱 만들기 #1](https://steemit.com/kr/@anpigon/react-native-2--1542732103861)
* [[React Native #3] 리액트 네이티브 날씨앱 만들기 #2](https://steemit.com/kr/@anpigon/react-native-3-2-1542874472110)
* [[React Native #4] 리액트 네이티브 날씨앱 만들기 #3](https://steemit.com/kr/@anpigon/react-native-4-3-1542990470234)
---

<br>

# 날씨 아이콘 사용하기

`expo` 모듈에서 제공하는 아이콘을 사용하여 날씨를 표현해보자. 아이콘 종류는 아래 사이트에서 확인 가능하다.

https://expo.github.io/vector-icons/

![](https://cdn.steemitimages.com/DQmaxALZZsyfvB1VKM2CPZceu3qDwP6a9YpBXFxxB7fihQu/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202018-11-25％2000.32.24.png)
> **weather**라고 검색하면, MaterialCommunityIcons 그룹에 날씨 아이콘이 있는 것을 확인 할 수 있다.

<br><br>

Weather.js 파일을 열어 수정한다.

```js
import ｛ MaterialCommunityIcons ｝ from "@expo/vector-icons";

const Weather = (｛ data ｝) => ｛
  return (
    <View>  
      <MaterialCommunityIcons size=｛150｝ name='weather-cloudy'/>
      <Text>｛data.weather[0].main｝</Text>
      <Text>｛Math.ceil(data.main.temp - 273.15)｝℃</Text>
    </View> 
  );
｝
```
> `@expo/vector-icons`를 **import**하고, `<MaterialCommunityIcons>` 아이콘 크기 150을 사용했다.

<br><br>여기까지 하고 앱을 확인해보자.

![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmXrFtCdAm7xqgFFYy2eBLXE3BingvbLXvcRavui9EsdYW/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202018-11-25％2000.58.20.png)


<br><br>

# 날씨에 해당하는 아이콘 표시하기

아래 **openweathermap** 사이트에서 날씨 그룹을 확인해 보자.

https://openweathermap.org/weather-conditions

![](https://cdn.steemitimages.com/DQmTJqs2pdF6237KbZNUtWekXCm9qi7rZsa5hFZYfbJdbok/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202018-11-25％2001.01.38.png)
> **ID**가 *2xx* 이면 *Thunderstorm* 이고, *3xx* 이면 *Drizzle* 이다.

<br><br>

그룹 번호에 맞게 아이콘 데이터를 생성한다.  Weather.js 에 아래 코드를 입력한다.

```js
const WeatherGroup = ｛
  0: ｛
    icon: 'weather-sunny'
  ｝,
  2: ｛
    icon: 'weather-lightning'
  ｝,
  3: ｛
    icon: 'weather-rainy'
  ｝,
  5: ｛
    icon: 'weather-pouring'
  ｝,
  6: ｛
    icon: 'weather-snowy'
  ｝,
  7: ｛
    icon: 'weather-fog'
  ｝,
  8: ｛
    icon: 'weather-cloudy'
  ｝
｝
```
> 참고로 *Clear(sunny)* 는 그룹 800이지만, *Clouds* 와 겹치기 때문에 임의로 0번 그룹으로 지정하였다.

<br><br>

이제 `WeatherGroup` 데이터에서 그룹 번호에 맞는 정보를 가져오자.

```js
const Weather = (｛ data ｝) => ｛
  const id = data.weather[0].id;
  const weather = id === 800 ? WeatherGroup[0] : WeatherGroup[parseInt(id / 100)];
  return (
    <View>  
      <MaterialCommunityIcons size=｛150｝ name=｛weather.icon｝/>
      <Text>｛data.weather[0].main｝</Text>
      <Text>｛Math.ceil(data.main.temp - 273.15)｝℃</Text>
    </View> 
  );
｝
```
> *Clear* 와 *Clouds* 가 같은 그룹 8xx 라서 조건문을 넣었다.

<br><br>

# 스타일 지정하기

Weather.js 파일 하단에 아래와 같이 작성한다.

```js
const styles = StyleSheet.create(｛
  top: ｛
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  ｝,
  bottom: ｛
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  ｝,
  main: ｛
    fontSize: 50,
    marginBottom:10,
    fontWeight: '600'
  ｝,
  temp: ｛
    fontSize: 30
  ｝
｝);
```
> **StyleSheet**은 기본적으로 **CSS** 개념과 비슷하다. `flex` 속성을 사용하여 상단, 하단을 50:50으로 나눴다. 그리고 각각의 텍스트 크기도 키웠다. flex은 [flexbox의 기본 개념](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout/Flexbox％EC％9D％98_％EA％B8％B0％EB％B3％B8_％EA％B0％9C％EB％85％90)을 참고한다.

<br><br>

생성한 `styles`을 JSX에 적용한다.

```js
const Weather = (｛ data ｝) => ｛
  const id = data.weather[0].id;
  const weather = id === 800 ? WeatherGroup[0] : WeatherGroup[parseInt(id / 100)];
  return (
    <View>  
      <View style=｛styles.top｝>
        <MaterialCommunityIcons size=｛150｝ name=｛weather.icon｝/>
      </View>
      <View style=｛styles.bottom｝>
        <Text style=｛styles.main｝>｛data.weather[0].main｝</Text>
        <Text style=｛styles.temp｝>｛Math.ceil(data.main.temp - 273.15)｝℃</Text>
      </View>
    </View> 
  );
｝
```
<br>

여기까지 하고 앱을 확인해보자.

![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmNidc4ZdzGw2zSRqFyWhGiDChhwKvVQe6htSfe81afRE9/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202018-11-25％2001.13.41.png)

<br><br>

# 배경색 바꾸기

날씨앱 배경으로 그라데이션을 사용해보자. 좀 더 예쁘게 보일수 있다.

```js
import ｛ StyleSheet, Text, View, Dimensions ｝ from 'react-native';
import ｛ LinearGradient ｝ from 'expo';
const ｛ width, height ｝ = Dimensions.get('window');

const styles = StyleSheet.create(｛
  container: ｛
    flex: 1,
    width,
    height
  ｝,
  
  // ... 이하 생략 ...
｝
```
>  `LinearGradient`를 사용하기 위해 `expo`를 **import**했다. 그리고 `react-native`의 `Dimensions`을 사용하여 `window`의 **width**와 **height**를 가져왔다. 마지막으로 `styles`에 **container**를 추가했다.

<br><br>

view는 아래와 같이 LinearGradient로 감싼다. 그리고 그라데이션 색상과 스타일을 지정한다.

```xlm
    <LinearGradient colors=｛['#108dc7', '#ef8e38']｝ style=｛styles.container｝>
      <View style=｛styles.top｝>
        <MaterialCommunityIcons size=｛150｝ color='white' name=｛weather.icon｝/>
      </View>
      <View style=｛styles.bottom｝>
        <Text style=｛styles.main｝>｛data.weather[0].main｝</Text>
        <Text style=｛styles.temp｝>｛Math.ceil(data.main.temp - 273.15)｝℃</Text>
      </View>
    </LinearGradient> 
```

<br><br>

그라데이션 색상은 아래 사이트에서 찾아볼수 있다.

https://uigradients.com/#GradeGrey

![](https://cdn.steemitimages.com/DQmPGapF2hy1EkYdWU6VLMDL3oMLF9vr3PjswkvtmfYD8PW/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202018-11-25％2001.27.30.png)

<br>

여기까지 하고 앱을 확인해보자.

![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmRBpSQnmBfeG6oDFZ2mMrxSswzvtgdykXBE8VLHs4a6HV/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202018-11-25％2001.30.54.png)

날씨 앱을 완성하였습니다.

<br>

___

<br>

여기에 작성하지는 않았지만, 조금 더 수정하여 날씨마다 배경색에 변화를 주었습니다.

그리고 모든 소스는 깃허브에서 확인할 수 있습니다.

https://github.com/anpigon/weather_app

<br>

여기까지 읽어주셔서 감사합니다.
