---
title: '[React Native] Redux-Saga 학습하기 #2'
tags:
  - zzan
  - liv
  - palnet
  - neoxian
  - sct
  - sct-freeboard
  - kr-dev
  - busy
  - jjm
  - kr
author: anpigon
date: 2019-08-09 11:23:18
---


![](https://files.steempeak.com/file/steempeak/anpigon/TzysIBST-E1848CE185A6E18486E185A9E186A820E1848BE185A5E186B9E18482E185B3E186AB20E18483E185B5E1848CE185A1E1848BE185B5E186AB203.png)

***
<br>안녕하세요. 안피곤입니다.



Redux-saga를 학습하기 적당한 샘플 앱을 깃허브에서 찾았습니다. 이제 Twitter Clone 코딩을 하면서 Redux Saga에 익숙해져보겠습니다. 실제 앱에 어떻게 사용하는지를 파악하고 이론 공부를 병행하면 좀 더 쉽게 배울 수 있습니다. 혹시 이해가 안 되는 내용은 댓글에 질문하면 제가 답변하겠습니다.

* Twitter Clone App 사이트: https://startreact.com/themes/twitter-clone-app/

![](https://files.steempeak.com/file/steempeak/anpigon/sq8N9hdR-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-0720E1848BE185A9E1848CE185A5E186AB2012.06.45.png)

<br>
<br>

# 로그인 리듀서(Reducer) 정의하기

 `reducers.js`에는 로그인에 필요한 State를 설계합니다. 아래 코드를 보면, 로그인 **State**는 `username`, `password`, `loginStatus`, `user(Object)` 데이터를 관리합니다.

![](https://steemitimages.com/700x0/https://files.steempeak.com/file/steempeak/anpigon/B1lRVfqK-carbon201.png)

<br>

그리고 나서 Reducer를 추가합니다. Reducer는 이전 상태와 액션을 받아서 다음 상태를 반환하는 함수입니다. Reducer 함수의 기본 구조는 `(previousState, action) => newState` 입니다. 아래와 같이 사용자ID 입력, 패스워드 입력, 로그인 요청, 로그인 성공, 로그인 실패에 대한 액션을 각각 정의합니다.

![](https://steemitimages.com/700x0/https://files.steempeak.com/file/steempeak/anpigon/JSee6Nwr-carbon202.png)

`reducer(state = initialState)`와 같이 초기 State를 initialState로 초기화합니다. 이 기능은 ES6에서 추가된 [Default Parameters Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/default_parameters)입니다. 그리고 리듀서에서 반환하는 Object `{ ...state, username: action.payload }`는 ES7의 [Object Rest/Spread Syntax](https://github.com/tc39/proposal-object-rest-spread)을 사용했습니다. 만약 ES6를 사용한다면 `Object.assign(state, { username: action.payload })`로 작성하면됩니다.

<br>
<br>

# Redux Saga 액션(Action) 정의하기

`sagas.js`에는 Redux Saga에서 수행할 액션을 정의합니다.

![](https://steemitimages.com/700x0/https://files.steempeak.com/file/steempeak/anpigon/oXBrpHvP-carbon203.png)

<br>
그 다음 `sagas.js`에 액션에 대한 watch를 추가합니다. watch는 Store로 dispatch되는 모든 액션들을 잡아내서 처리할 것입니다.

![](https://steemitimages.com/700x0/https://files.steempeak.com/file/steempeak/anpigon/FZ8KKoVc-carbon201.png)

<br>

parallel로 처리하기 위해서 watch를 모두 `all` 함수에 담아 export 합니다. 여기에 사용된 `all`은 `Promise.all`과 비슷합니다.

![](https://steemitimages.com/700x0/https://files.steempeak.com/file/steempeak/anpigon/ZNzVaezJ-carbon202.png)

<br>
<br>

# 리듀서(Reducer) Store 정의하기

마지막으로 `store.js`에 store를 생성합니다. 그리고 sagaMiddleware를 생성하여 store에 추가합니다. 그다음 rootSaga를 실행합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/N6G059eu-carbon203.png)

<br>
<br>

# Redux-saga 사용하기

`App.js`에서는 앞에서 생성한 Store를 import 합니다. 그리고 Provider를 사용하여 Store를 App에 주입합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/QnF6ZnQV-carbon204.png)

<br>그리고 로그인 화면 `screens/login.js`을 생성합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/gnmbMtlx-carbon205.png)

<br>마지막으로 LoginScreen 컴포넌트를 Reducer에 연결(connect) 합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/SADdpgjx-carbon206.png)

이렇게 Resux-saga를 사용하여 action, state, view를 분리하였습니다. 로그인 기능 하나 만드는게 많은 파일과 코드를 생성해야합니다. 다음에 같은 기능을 mobx나 apollo-graphql 로도 구현해봐야겠습니다.

<br>

![](https://files.steempeak.com/file/steempeak/anpigon/WGb422nM-2019-08-082000-54-27.2019-08-082000_56_28.gif)


<br>
<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>

<br>