---
title: '[React Native #3] 리액트 네이티브 날씨앱 만들기 #2'
tags:
author: anpigon
date: 2018-11-22 17:14:33
---

![](https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/anpigon/yEuqXKgU-weather-28719_640.png)

# 리액트 네이티브로 날씨앱 만들기 두번째 강좌
리액트 네이티브를 사용하여 날씨앱을 만드는 두번째 강좌입니다. 이번에는 GPS위치정보로 날씨API를 조회합니다.

<br>

---

**이전글**

* [[React Native #1] 리액트 네이티브 시작하기](https://steemit.com/kr/@anpigon/react-native-1--1542639852750)
* [[React Native #2] 리액트 네이티브 날씨앱 만들기 #1](https://steemit.com/kr/@anpigon/react-native-2--1542732103861)

---
<br>

# 날씨 조회 API 서비스 가입하기

날씨 정보를 조회하기 위해서 **openweathermap API  서비스**를 이용한다. 사이트에 가입하고  API키를 발급 받는다.

[https://openweathermap.org](https://openweathermap.org/api)


![](https://ipfs.busy.org/ipfs/QmSiXQKWap2EMNGZaNfiTrCGEHin6Awe7tAQSnwtmmnBJa)

API 페이지에서 **Current weather data** 항목의 **subscribe** 버튼을 클릭한다.

<br>

![](https://ipfs.busy.org/ipfs/QmQ6dNHqZqJ6EMtnf9yPYvvVCCehem5dZtK8vHvcfc3LcG)

**Free** 항목의 **Get API key and Start** 버튼을 클릭한다.

<br>

![](https://ipfs.busy.org/ipfs/Qmddae7vJex4k4mQSkLyo8c7eCswUE29WwyXsknhL7pf5W)

**Sign up**을 눌러 회원가입을 한다. 가입을 완료하면 아래 페이지로 이동된다.

<br>

![](https://ipfs.busy.org/ipfs/QmdkG2BfpaSFVupkzAhBJJ3U3V4mXf6LrgpiDDk49po9wJ)

**API Keys** 탭으로 이동한다. **Name**을 입력하고 **Generate** 버튼을 클릭하여 Key를 발급받는다.

그리고 **App.js** 파일을 열어 발급받은 키를 `API_KEY` 변수에 선언한다. 

```js
const API_KEY = '894c0c1d03546d1843b5efd334d6e479';
```
> 사이트에 가입하지 않고 예제에 있는 키를 그대로 사용해도 된다.

<br><br>

#  현재 날씨 조회하기

openweathermap API  문서를 읽어보자. 
https://openweathermap.org/current

GPS 좌표로 현재 날씨를 가져오는 API 규격은 다음과 같다.
![](https://ipfs.busy.org/ipfs/QmfFS9TjWCLm1cvSY73QUm7dtyKPdKvSoxqAQVddVZjX36)

현재 날씨를 조회하는 URL 형태는 다음과 같다.
 `https://api.openweathermap.org/data/2.5/weather?lat=｛lat｝&lon=｛lon｝&appid=｛API_KEY｝`

<br>

현재 날씨를 조회하는 `_getWeather` 함수를 구현하자. **App.js** 파일에 아래 코드를 추가한다.
```
export default class App extends React.Component ｛

  // ... 생략 ...

  // 추가된 코드
  _getWeather(｛latitude, longitude｝) ｛
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=$｛latitude｝&lon=$｛longitude｝&appid=$｛API_KEY｝`)
    .then(response => response.json()) // 응답값을 json으로 변환
    .then(json => ｛
      console.log(json)
    ｝);
  ｝
```
> [`fetch`](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)는 네트워크 통신을 위한 인터페이스다.  [`XMLHttpRequest`](https://developer.mozilla.org/ko/docs/XMLHttpRequest)보다 강력한 기능을 가지고 있다.

<br>

이제 `App` 클래스의 `componentDidMount` 함수를 수정한다. `navigator.geolocation.getCurrentPosition` 함수에서 GPS 정보를 가져오면 `_getWeather` 함수를 호출하도록 한다.

```js
export default class App extends React.Component ｛
  componentDidMount() ｛
    navigator.geolocation.getCurrentPosition(
      (position) => ｛
        console.log(position);
        this._getWeather(position.coords); // 추가된 코드
      ｝, 
      (error) => ｛
        console.log(error);
      ｝
    );
  ｝
```
> `navigator.geolocation.getCurrentPosition` 콜백함수를 화살표 함수(`()=>｛｝`)로 수정하였다. `function` 함수와 화살표 함수의 `this`의 참조 대상이 다르기 때문이다. 자세한 내용은 다음에...


<br>이제 앱을 실행하고 콘솔창을 확인하자.

 ```bash
$ npm start
```

![](https://ipfs.busy.org/ipfs/QmdMuj9ehvWMs2meZZn73guLV5CZZqt6RboGsg1wT11ZHX)

콘솔창을 확인하면 GPS 정보를 가져오고 바로 날씨 데이터를 가져온것을 확인 할 수 있다.

아래는 날씨 API에서 가져온 전체 날씨 데이터이다. 우리는 여기서 `temp` 와 `weather` 데이터만 사용할 것이다.

```json
Object ｛
  "base": "stations",
  "clouds": Object ｛
    "all": 40,
  ｝,
  "cod": 200,
  "coord": Object ｛
    "lat": 37.49,
    "lon": 126.91,
  ｝,
  "dt": 1542868200,
  "id": 1948005,
  "main": Object ｛
    "humidity": 35,
    "pressure": 1025,
    "temp": 279.92,
    "temp_max": 280.85,
    "temp_min": 279.15,
  ｝,
  "name": "Kwangmyong",
  "sys": Object ｛
    "country": "KR",
    "id": 7668,
    "message": 0.0083,
    "sunrise": 1542838741,
    "sunset": 1542874653,
    "type": 1,
  ｝,
  "visibility": 10000,
  "weather": Array [
    Object ｛
      "description": "haze",
      "icon": "50d",
      "id": 721,
      "main": "Haze",
    ｝,
  ],
  "wind": Object ｛
    "deg": 310,
    "speed": 4.1,
  ｝,
｝
```

<br>다음 강좌에서 현재 날씨를 보여주는 화면을 구현할 것입니다.

<br>

___

<br>

 날씨앱은 많이 구현해본 앱 인데 만들때 마다 새롭습니다. 예전에는 SKP에서 제공하는 날씨 API를 자주 사용했는데, 이제는 SKT에서 유료로 서비스하고 있습니다. kweather는 날씨 API 서비스를 중단했네요.ㅠ 기상청은 예전에 공공데이터포털(data.go.kr)에서 API를 제공했었는데, 이젠 검색이 안됩니다.

유주완님의 서울버스앱을 시발점으로 **정부3.0 - 공공 데이터 개방의 시대**가 열린 적이 있었습니다. 그런데 공공데이터 시절에 공개되었던 데이터들이 지금은 대부분 비공개로 전환되었네요.ㅋ

여기까지 읽어주셔서 감사합니다.
