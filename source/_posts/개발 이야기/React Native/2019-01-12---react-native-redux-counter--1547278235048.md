---
title: "[React Native] Redux로 Counter 앱 만들기"
author: anpigon
date: "2019-01-12T07:30:36Z"
permalink: "/kr/@anpigon/react-native-redux-counter--1547278235048"
tags:
  - "React Native"
---
![](https://cdn.steemitimages.com/p/9vWp6aU4y8kwSZ9GrA6TWcxjsEnJX399aXrr8f5QWawsEAFBDLtXCm1DRywaBMM2GAzKPK4BCw7mwWwMQNn8fq1MJH6oVYmTio2ynn3L1oHHv1ZnF4FG6kg53xFXhAiTZ6ozT2XGYYH6sikF8?format=match&mode=fit)

[Redux](https://github.com/reactjs/react-redux) 와 [NativeBase](https://nativebase.io/) 를 사용하여 카운터 앱을 만들어 봅니다. **NativeBase**를 사용하니 컴포넌트 UI가 좀더 수려해졌습니다. 그리고 복잡한 앱을 구현할 때에는 Redux가 필수입니다.

리덕스(Redux)를 사용하지 않을 때와 사용할 때의 차이점은 아래 그림이 잘 표현하고 있습니다.
![](https://cdn.steemitimages.com/p/62PdCoV9UZqKxEeNM1pVMLWxNVQ2bXSbEJE5Zsy5GRmfJJVqkTDFJabcyNcoJjSTQXqPYqvSRGX4whxtqtbFvfJ8f1Q3bdF4iJXKfh4uidSqL54?format=match&mode=fit)

<br><br>

# 필요한 모듈 설치하기

[expo-cli](https://docs.expo.io/versions/latest/workflow/expo-cli)가 설치되어 있지 않으면 아래와 같이 설치한다.

```bash
$ npm install expo-cli --global
```

<br>**expo-cli**를 사용하여 프로젝트를 생성한다.

```bash
$ expo init redux-counter-app
$ cd redux-counter-app
```

<br>그리고 **Redux**와 **react-redux**를 설치한다.

```bash
$ npm install redux react-redux --save
```

<br>마지막으로 **NativeBase**를 설치한다.

```bash
$ npm install native-base --save
$ npm install @expo/vector-icons --save
```

<br><br>

# 구현하기

프로젝트의 루트에 세 개의 폴더 `reducers, components` 를 생성한다.

### Redux Reducers 구현

Reducers는 앱에서 필요한 데이터를 반환한다. 여기서는 `Counter` 값을 반환하는 reducer가 필요하다. `reducers` 폴더에 `countReducer.js` 파일을 생성한다. 

다음과 같이 하나의 `js` 파일에 액션과 리듀서를 모두 구현하는 것을 **Ducks 구조**이라고 한다. Ducks 구조를 사용하면 나중에 코드 관리하기가 편하다.

**reducers/countReducer.js** 

```js
// Default State
const initialState = ｛
	count: 0
｝;

// Actions
export const INCREMENT = "Increment";
export const DECREMENT = "Decrement";

// Action Functions
export function increment()｛
  return ｛
    type: INCREMENT
  ｝;
｝
export function decrement()｛
  return ｛
    type: DECREMENT
  ｝;
｝

// Reducer
function reducer(state = initialState, action) ｛
  switch (action.type) ｛
    case INCREMENT: 
      return ｛
        count: state.count + 1
      ｝
    case DECREMENT: 
      return ｛
        count: state.count - 1
      ｝
  ｝
  return state;
｝

// Exports Default
export default reducer;
```
`INCREMENT `과 `DECREMENT ` 액션은 카운트 값을 계산하여 반환한다. 

그 다음은 `index.js` 파일에서 모든 Reducer를 결합한다. 지금은 하나의 리듀서 `countReducer`만 있지만, 나중에 리듀서가 여러 개일 경우 유용하다.

**reducers/index.js**

```js
import ｛ combineReducers ｝ from 'redux';
import countReducer from './countReducer.js';

const allReducers = combineReducers(｛
  countReducer,
｝);

export default allReducers;
```

<br>

### Redux 컴포넌트 구현

이제 `<Counter>` 컴포넌트를 구현한다. 

**components/counter.js** 

```js
import React, ｛ Component ｝ from 'react';
import ｛ connect ｝ from 'react-redux';
import ｛ bindActionCreators ｝ from 'redux';
import ｛ Container, Content, Text, Card, Header, Body, Button, Title, CardItem ｝ from 'native-base';
import ｛ increment, decrement ｝ from '../reducers/countReducer';

class Counter extends Component ｛
	render() ｛
    return(
      <Container>
        <Header>
          <Body>
            <Title>Redux Counter</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Text>
                ｛ this.props.state.count ｝
              </Text>
            </CardItem>
          </Card>
          <Button full onPress= ｛() => this.props.increment()｝ style=｛｛marginVertical: 10｝｝>
            <Text>Increment</Text>
          </Button>
          <Button full dark bordered onPress= ｛() => this.props.decrement()｝>
            <Text>Decrement</Text>
          </Button>
        </Content>
      </Container>
    );
  ｝
｝

// Reducer 데이터를 props로 변환
function mapStateToProps(state)｛
  return ｛
    state: state.countReducer
  ｝;
｝

// Actions을 props로 변환
function matchDispatchToProps(dispatch)｛
  return bindActionCreators(｛
    increment: increment,
    decrement: decrement
  ｝, dispatch);
｝

export default connect(mapStateToProps, matchDispatchToProps)(Counter);
```

<br>

### Redux Store 구현

마지막으로 `App.js` 파일에 store를 만들어야 한다. Redux에 대한 기본 개념은 [Redux 공식 문서](http://redux.js.org/)를 참고한다. `App.js` 파일을 아래와 같이 수정한다.

**App.js** 

```js
import React, ｛ Component ｝ from 'react';
import ｛ Provider ｝ from 'react-redux';
import ｛ createStore ｝ from 'redux';
import allReducers from './reducers';
import Counter from './components/counter.js';

const store = createStore(allReducers);

export default class App extends Component｛
  render()｛
    return(
      <Provider store=｛store｝>
        <Counter />
      </Provider>
    );
  ｝
｝
```

 <br><br>

# 실행하기

앱을 실행하고 확인해보자.

```bash
$ npm start
```

<br>

![](https://user-images.githubusercontent.com/3969643/51070641-f945ad80-1687-11e9-92ef-30895ec9359e.gif)

<br>

여기까지 읽어주셔서 감사합니다.

<br>

___ 

**같이 읽으면 좋은 글:**
* [리덕스(Redux)를 왜 쓸까? 그리고 리덕스를 편하게 사용하기 위한 발악 (i)](https://velopert.com/3528)
* [리덕스(Redux)를 왜 쓸까? 그리고 리덕스를 편하게 사용하기 위한 발악 (ii)](https://velopert.com/3533)

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [DCLICK: An Incentivized Ad platform by Proof of Click - 스팀 기반 애드센스를 소개합니다.](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtcmVkdXgtY291bnRlci0tMTU0NzI3ODIzNTA0OCIsImEiOlsidC0xIl0sInVybCI6Imh0dHBzOi8vc3RlZW1pdC5jb20vZGNsaWNrL0BkY2xpY2svZGNsaWNrLWFuLWluY2VudGl2aXplZC1hZC1wbGF0Zm9ybS1ieS1wcm9vZi1vZi1jbGljay0iLCJpYXQiOjE1NDcyNzgyMzUsImV4cCI6MTg2MjYzODIzNX0.Ke2puEP3Ed5ygIDTapqiEgpKZzjfe-89xyA78Dkwn9s)
<sup>안녕하세요 스티미언 여러분. 오늘 여러분께 스팀 블록체인 기반 광고 플랫폼 DCLICK을 소개...</sup>
</center>