---
title: "[React Native] Redux와 Thunk Middleware 사용하기"
author: anpigon
date: "2019-01-29T02:31:21Z"
permalink: "/kr/@anpigon/react-native-redux-thunk-middleware--1548729080369"
tags:
  - "kr"
  - "dev"
  - "kr-dev"
  - "busy"
  - "jjangjjangman"
---
![](https://cdn.steemitimages.com/DQmTgVAN4hsYVVbKkfkj2RubNMErmHRaRsQf6SqEk7V4CrA/1.png)

이번에는 **Redux**와 **Thunk Middleware**를 사용해서 프로젝트의 전체적인 구조를 다시 잡아 보겠습니다. [[React Native] 인스타그램 UI 만들기](https://steemit.com/kr/@anpigon/react-native-ui-1) 시리즈의 개발환경을 그대로 사용합니다.

&nbsp;

# 라이브러리 설치하기 

먼저 리덕스를 구현하는 필요한 라이브러리를 설치합니다. *Redux* 라이브러리는 이전 글 ["Redux로 Counter 앱 만들기"](https://busy.org/@anpigon/react-native-redux-counter--1547278235048)에서도 한번 포스팅했었습니다.

**redux 와 react-redux 설치**

```bash
$ yarn add redux react-redux
```

<br>

설치가 완료되고 나면  `package.json` 파일의 내용은 다음과 같습니다.

![](https://cdn.steemitimages.com/DQmPMKN9nFJY1bfyqMnQRrq2MFk8x36wNwkUbBJDeBN2DZE/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-01-29％2009.49.44.png)

&nbsp;

# 프로젝트 폴더 구조 만들기

이전 프로젝트에서 사용했던 폴더 구조를 조금 조정하겠습니다. 첫 번째로 `src` 폴더를 생성합니다. 그리고 `App.js`파일과 `components` 폴더를 `src`에  옮김니다. 그다음 Redux에 필요한   `./src/reducers` 폴더를 생성합니다. `reducers` 폴더에는 리듀서 관련 파일을 넣을 것입니다. 마지막으로 루트에 `App.js` 파일을 생성합니다.

우리가 생성한 폴더 구조는 다음과 비슷해야합니다.

![](https://cdn.steemitimages.com/250x0/https://cdn.steemitimages.com/DQmQ21NviEyBPePriS9dYdNAD94zok3zdvHkUfFEaxVeEdp/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-01-29％2009.50.53.png)

&nbsp;

# Redux Store 설정하기

Redux 및 개념에 익숙하지 않은 경우에는 [redux 문서](https://redux.js.org/)를 참고하세요.
루트에 있는 `./App.js` 파일에 **Redux Store**를 만듭니다 . **Store**에는 앱에 필요한 모든 데이터가 저장됩니다. 그리고 앱은 필요한 모든 데이터를 모두 **Store**에서 가져옵니다.

```js
import ｛ Provider ｝ from 'react-redux';
import ｛ createStore, applyMiddleware ｝ from 'redux';

import allReducers from './src/reducers';
import App from './src/App';

const store = createStore(allReducers);
```

- [Reducers](http://redux.js.org/docs/basics/Reducers.html) 는 단순히 일부 데이터를 반환하는 함수라고 볼 수 있습니다.
- 앱에는 여러 개의 reducers가 있을 수 있습니다. 우리는 이 reducers를 사용하여 가능한 많은 **Store** 을 구성 할 것 입니다.
- 위의 코드에서 우리는 모든 **Reducers**를 포함하는 **allReducers** 객체를 사용하고 있습니다.
- `createStore` 함수를 **redux** 모듈에서 **import** 합니다. 그리고 `createStore()` 함수를 사용하여 Store를 생성합니다.
  
<br>`./App.js` 파일의 전체 코드는 다음과 같아야 합니다.

```jsx
import React, ｛ Component ｝ from 'react';
import ｛ Provider ｝ from 'react-redux';
import ｛ createStore, applyMiddleware ｝ from 'redux';

import App from './src/App';
import allReducers from './src/reducers';

const store = createStore(allReducers);

export default class Root extends Component ｛
  render() ｛
    return (
      <Provider store=｛ store ｝>
        <App/>
      </Provider>
    )
  ｝
｝
```
- `App.js` 파일에서 제일 중요한 **App** 컴포넌트를 **import**하여 가져옵니다.
- **Provider** 컴포넌트를 **react-redux** 모듈에서 **import** 합니다. 이 컴포넌트는 **App** 컴포넌트를 하위 컴포넌트로 사용합니다. 그리고 **Store** 데이터를 **App**의 모든 부분에서 사용할 수 있도록 해줍니다. 
- 마지막으로 `store`를  **Provider** 컴포넌트에 전달합니다. **Store**는 AllReducers 객체를 전달받아 생성되었습니다.

&nbsp;

# Redux Reducers 만들기

우리는 하나의 리듀서(reducer)만 만들 것입니다. 그리고 만들어진 **steemReducer** 리듀서는 스팀잇 API 서버에서 데이터를 가져올 것입니다. `./src/reducers` 폴더에 `steemReducer.js` 파일을 생성합니다.


**./src/reducers/steemReducer.js**

```jsx
import ｛ createAction, handleActions ｝ from 'redux-actions';

// 액션 타입을 정의해줍니다.
const GET_FEEDS = 'steem/getFeeds';

// 액션 생성 함수를 만듭니다.
export const getFeeds = createAction(GET_FEEDS);

// 초기 State를 정의합니다.
const initialState = ｛
  feeds: []
｝

// 리듀서 함수를 정의합니다.
export default handleActions(｛
  [GET_FEEDS]: (state, action) => ｛
    state = ｛
      ...state,
      feeds: [
        ...state.feeds,
        ...action.payload
      ]
    ｝
    return state;
  ｝,
｝, initialState);
```

- `handleActions()` 함수에 의해서 정의된 **reducer** 함수는 *state*와 *action*을 인자값으로 전달받습니다. 
- 앱에서 [Action](http://redux.js.org/docs/basics/Actions.html)이 전달되는 경우, action은 우리가 만든 모든 Reducers로 보내질 것입다.

&nbsp;

마지막으로 모든 reducer를 하나의 개체로 결합할 파일이 필요합니다. `reducer` 폴더 아래에 `index.js` 파일을 만듭니다. 지금은 리듀서가 하나라서 불필요한 작업일 수 있습니다. 하지만 리듀서가 여러개일 경우에는 반드시 필요한 작업입니다.



**./reducers/index.js**

```jsx
import ｛ combineReducers ｝ from 'redux';
import steem from './steemReducer';

export default combineReducers(｛
  steem
｝);
```

&nbsp;

# Redux Thunk Middleware 사용하기

스팀잇 피드 목록을 가져 오는 작업은 [Async operations](http://redux.js.org/docs/advanced/AsyncActions.html) 에 해당합니다. [Async operations](http://redux.js.org/docs/advanced/AsyncActions.html) 은 오퍼레이션(operation)에 대한 응답이 바로 오지 않습니다. 따라서 [Async operations](http://redux.js.org/docs/advanced/AsyncActions.html)에 대한 응답을 받을때까지 프로그램 실행을 잠시 중단하는 매커니즘이 필요합니다.  비동기로 가져오기 오퍼레이션(Async fetch operation)의 경우에 [redux-thunk](https://github.com/gaearon/redux-thunk)를 사용합니다.

**라이브러리 설치하기**

```bash
$ yarn add redux-thunk
```

<br>**미들웨어 설정하기**

`App.js` 파일로 돌아가서 **store**에 Thunk 미들웨어를 인식 시켜야 합니다.

**./App.js**

```jsx
import thunk from 'redux-thunk'
import ｛ createStore, applyMiddleware ｝ from 'redux';
const store = createStore(allReducers, applyMiddleware(thunk));
```

<br>이제 thunk action을 포함한 모든 actions을 생성할 수 있습니다.

&nbsp;

# Redux Actions 만들기

리듀서에 `fetchFeeds()`함수를 생성합니다. `fetchFeeds()` 함수는 스팀잇 서버에서 피드를 가져오는 비동기 오퍼레이션을 수행할 것입니다.

**./src/reducers/steemReducer.js**

```jsx
export const fetchFeeds = (tag) => ｛
  const data = ｛
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
          "database_api",
          "get_discussions_by_created",
          [
              ｛
                  tag: tag,
                  limit: 10,
              ｝
          ]
      ]
  ｝;
  return (dispatch, state) => ｛
    return fetch('https://api.steemit.com',
    ｛
        method: 'POST',
        body: JSON.stringify(data)
    ｝)
    .then(res => res.json())
    .then(res => ｛
      dispatch(getFeeds(res.result))
    ｝)
    .catch(error => ｛
      console.error('ERROR', error); 
    ｝);
  ｝;
｝
```

&nbsp;

# Redux components에 적용하기

모든 Redux 설정이 끝나면, 우리는 이제 컴포넌트에서 리덕스를 사용할 수 있습니다. `HomeTab.js` 파일을 수정합니다.

**./src/components/AppTabNavigator/HomeTab.js**

```jsx
import ｛ connect ｝ from 'react-redux';
import ｛ fetchFeeds ｝ from '../../reducers/steemReducer';

// (...)

// props에 전달할 state값 정의
const mapStateToProps = (state) => ｛
    return ｛
        feeds: state.steem.feeds
    ｝
｝;

// props에 전달할 액션 함수 정의
const mapDispatchToProps = ｛ fetchFeeds ｝;

// 컴포넌트와 리덕스를 연결
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTab);
```

* `steemReducer` 리듀서에서 `fetchFeeds` 액션을 **import** 하였습니다.
* `mapStateToProps()` 함수는 Props에 전달할 값을 정의합니다. `steem` 리듀서에서` feeds` 값을 Props에 전달하고 있습니다. 
* `mapDispatchToProps()` 함수는 Props에 전달할 액션을 정의합니다. 
* 마지막으로 `connect()` 함수를 사용하여 컴포넌트와 리덕스를 연결합니다. 이제 Reducers와 Actions를 Props로 전환하였습다.

&nbsp;

그다음 `componentWillMount()` 함수를 수정합니다.

```jsx
componentWillMount() ｛

  // this.fetchFeeds().then(feeds => ｛
  //     this.setState(｛
  //         feeds
  //     ｝)
  // ｝);
 
  this.props.fetchFeeds('kr'); // 리듀서 액션 호출
  
  this.fetchFollowing().then(followings => ｛
    this.setState(｛
      followings
    ｝)
  ｝);
｝
```

* 원래 `this.fetchFeeds()` 함수를 호출하던 부분을 주석처리 하였습니다.
* 리듀서 액션 `this.props.fetchFeeds()`를 호출하도록 수정합니다.

&nbsp;

마지막으로 `render()` 부분의 컴포넌트를 수정합니다.

```jsx
render() ｛
  return (
    <Container style=｛style.container｝>
      <Header>
        ｛/* (...) */｝
      </Header>
      <Content>
        ｛/* 여기부터 스토리 헤더 시작 */｝
        ｛/* (...) */｝
        ｛/* 여기까지 스토리 헤더 끝 */｝
        ｛
          !this.props.feeds || this.props.feeds.length === 0
            ?
            <Spinner color='blue'/>
            :
          this.props.feeds.map(feed => (
            <CardComponent data=｛ feed ｝ key=｛ feed.url ｝/>
          ))
        ｝
      </Content>
    </Container>
  );
｝
```

* `this.state.feeds`를 `this.props.feeds`로 수정하였습니다. 이제 스팀잇 피드 가져오는 부분을 리듀서에서 처리하기 때문에, Props에서 가져와야 합니다.
* 그리고 `<Spinner color='blue'/>` 컴포넌트를 추가하여 피드를 가져오기 전에 로딩 이미지가 보이도록 하였습니다.

&nbsp;

여기까지 작업한 구동 앱 화면입니다. 

![](https://cdn.steemitimages.com/DQmbaBQuuTFPD7eFycvgyQhuWmofMx2BViaYiKJoiy9R3xL/2019-01-29％2010-39-04.2019-01-29％2010_40_04.gif)
> UI는 달라진 부분이 없어서 변화가 크진 않네요.

&nbsp;

작업한 소스코드는 모두 [깃허브](https://github.com/anpigon/rn_instagram_clone/tree/12e9fc792a45e5bf8c9f04e0f110fab32abe3adc)에 업로드 되어있습니다.

<br><center>* * *</center><br>

인스타그램UI 형태의 스팀잇 모바일 앱을 원하는 분이 있다면, 개발을 더 진행하여 앱을 완성할 가치는 있을 것 같습니다. 하지만 **partiko**나 **esteem**와 같은 훌륭한 스팀잇 모바일 앱이 존재하므로, 저는 다른 형태의 모바일 앱을 개발하는 것이가치 있을 것으로 생각합니다. 

그리고 이제 많은 분이 제 블로그 글을 보고 간단한 모바일 앱은 만들 수 있다고 생각합니다. 앞으로 다양한 아이디어를 가진 모바일 앱이 나오길 기대합니다. 개인적으로 스팀이 기반의 모바일 앱이 나오면 더 좋겠습니다. 예를 들어, 스팀잇 기반의 웹툰 서비스가 나오면 좋지 않을까요? 광고 수익과 스팀 저자 보상을 받을 수 있는 플랫폼이라면 괜찮을 거로 생각합니다.

여기까지 읽어주셔서 감사합니다.

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [DCLICK: An Incentivized Ad platform by Proof of Click - 스팀 기반 애드센스를 소개합니다.](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtcmVkdXgtdGh1bmstbWlkZGxld2FyZS0tMTU0ODcyOTA4MDM2OSIsImEiOlsidC0xIl0sInVybCI6Imh0dHBzOi8vc3RlZW1pdC5jb20vZGNsaWNrL0BkY2xpY2svZGNsaWNrLWFuLWluY2VudGl2aXplZC1hZC1wbGF0Zm9ybS1ieS1wcm9vZi1vZi1jbGljay0iLCJpYXQiOjE1NDg3MjkwODAsImV4cCI6MTg2NDA4OTA4MH0.BtUAzAZgMDcRfMRsIa1MnBuxX9GrY8lPVzYiuBLoSvo)
<sup>안녕하세요 스티미언 여러분. 오늘 여러분께 스팀 블록체인 기반 광고 플랫폼 DCLICK을 소개...</sup>
</center>