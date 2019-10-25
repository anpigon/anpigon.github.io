---
title: '[React Native #2] 리액트 네이티브 날씨앱 만들기'
tags:
  - kr
  - kr-dev
  - jjangjjangman
  - dclick
  - busy
author: anpigon
date: 2018-11-21 01:41:45
---

![](https://files.steempeak.com/file/steempeak/anpigon/yEuqXKgU-weather-28719_640.png)

<br>

# 리액트 네이티브로 날씨앱 만들기

리액트 네이티브를 사용하여 날씨앱을 만드는 첫번째 강좌입니다. 간단하게 현재 위치(GPS좌표)를 읽어 날씨를 조회하여 보여줄 것입니다. 기능을 하나씩 천천히 구현하면서 진행하겠습니다.

<br>

---

**이전글**

* [[React Native #1] 리액트 네이티브 시작하기](https://steemit.com/kr/@anpigon/react-native-1--1542639852750)

---
<br>

# 리액트 네이티브 프로젝트 생성

```js
$ create-react-native-app weather_app
```

<br>*Choose a template*에서 **blank**를 선택한다.

![](https://files.steempeak.com/file/steempeak/anpigon/OWbQ5A2d-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-11-212000.36.30.png)

아래와 같이 **weather_app** 프로젝트가 생성된다.

![](https://files.steempeak.com/file/steempeak/anpigon/OrErlAKb-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-11-212000.37.12.png)

<br>

# 현재 위치 GPS 가져오기

`navigator.geolocation`에서 제공하는 `getCurrentPosition` 함수를 사용하면 현재 GPS 좌표를 가져올 수 있다.

```
navigator.geolocation.getCurrentPosition(function(position) ｛
	console.log(position);
｝);
```

<br>`App.js`에서 아래와 같이 `componentDidMount()` 함수를 구현한다.

```js
export default class App extends React.Component ｛

  // ... 생략 ...

  componentDidMount() ｛
    navigator.geolocation.getCurrentPosition(
      function(position) ｛
        console.log(position);
      ｝, 
      function(error) ｛
        console.log(error);
      ｝
    );
  ｝
｝
```
> `componentDidMount` 함수는 리액트 컴포넌트 마운트가 되었을때 실행된다.
> [[React.Component의 lifecycle 문서]](https://reactjs.org/docs/react-component.html#the-component-lifecycle)를 참고.

<br><br>

# 앱 실행하기

```bash
$ npm start
```

<br>또는,

```bash
$ expo start
```

<br>앱을 실행하면 아래와 같이 브라우저에 `http://localhost:19002/` 페이지가 표시된다. 브라우저가 자동 실행되지 않은 경우에는 URL을 직접입력한다.

![](https://files.steempeak.com/file/steempeak/anpigon/nbbO1e4T-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-11-212001.14.00.png)

디바이스에서 **Expo앱**을 실행하고 QR코드를 촬영한다. 그리고 앱에서 *위치정보 액세스 권한*을 물어보는 경우 **확인**을 누른다.

![](https://steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/Zc2kyQba-Screenshot_20181121-010232_Package20installer.jpg)

그러면 콘솔창에 현재 GSP좌표 데이터가 `Object` 형태로 출력된다.

```js
Object ｛
  "coords": Object ｛
    "accuracy": 15.47599983215332,
    "altitude": 54.5,
    "heading": 0,
    "latitude": 37.5354432,
    "longitude": 127.0542137,
    "speed": 0,
  ｝,
  "mocked": false,
  "timestamp": 1542729762017,
｝
```

<br>참고로 브라우저 콘솔창에서도 확인 가능하다.
![](https://files.steempeak.com/file/steempeak/anpigon/iYad1VVX-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-11-212001.03.11.png)

다음번 강좌에서는 위치정보(GPS)로 날씨를 조회하는 기능을 구현할 것입니다.

<br>

---

<br>

날씨 앱을 안드로이드 자바로 구현할 때는 개발환경 세팅이나 필요한 모듈을 다운로드하는데 시간이 많이 걸렸습니다. 그런데 리액트 네이티브는 개발환경 세팅이나 모듈 설치하는데 많은 시간이 필요하지 않아서 좋네요. 그리고 저는 리액트 네이티브가 자바스크립트로 구현해서 그런지 코딩이 금방 손에 익었습니다.ㅋ 구글의 플러터도 자바스크립트를 사용했으면 더 좋았을 텐데 하는 아쉬움이 남았습니다.


여기까지 읽어주셔서 감사합니다.




---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [My Actifit Report Card: 11월 18 2018](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtMi0tMTU0MjczMjEwMzg2MSIsImEiOlsidC04ODUiXSwidXJsIjoiaHR0cHM6Ly9zdGVlbWl0LmNvbS9hY3RpZml0L0BzZWxmdm90ZWp1c3RpY2UvYWN0aWZpdC1zZWxmdm90ZWp1c3RpY2UtMjAxODExMTh0MTAxMzIzNjUxeiIsImlhdCI6MTU0MjczMjEwMywiZXhwIjoxODU4MDkyMTAzfQ.tlnfvApXOuUCbqqDdTpR5KuVxCxItkf_hewxrZNJ8as)
<sup>Many sets of tennis doubles game. Enough is enough. ...</sup>
</center>