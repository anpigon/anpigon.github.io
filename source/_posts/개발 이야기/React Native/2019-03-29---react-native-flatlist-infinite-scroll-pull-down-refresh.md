---
title: "[React Native] FlatList으로 Infinite Scroll와 Pull Down Refresh 구현하기"
author: anpigon
date: "2019-03-29T06:11:12Z"
permalink: "/kr/@anpigon/react-native-flatlist-infinite-scroll-pull-down-refresh"
tags:
  - "React Native"
  - "Infinite Scroll"
  - "Pull Down Refresh"
  - "FlatList"
---
https://youtu.be/Jc2MX0Ew3PE
<sup>**microcode**님의 리액트 네이티브 강의입니다. 이분은 말 한마디 없이 코딩만 하네요.</sup>

**React Native**에서 제공하는 `FlatList`를 사용하여 무한 스크롤(Infinite Scroll)과 Pull Down Refresh 기능을 구현합니다. FlatList에 대한 자세한 내용은 [공식 문서](https://facebook.github.io/react-native/docs/flatlist.html)에서 확인하세요.

이번 예제를 위해서 [snack](https://snack.expo.io)를 이용하였습니다. 아래 화면처럼 브라우저에서 코딩하고 결과를 바로 확인 할 수 있습니다. 간단한 코딩 연습을 하기에 좋은 플랫폼입니다.
![](https://files.steempeak.com/file/steempeak/anpigon/LfuQuA6M-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-03-292013.49.56.png)

# 샘플 컴포넌트 생성하기

`App.js` 파일을 수정합니다. `FlatList`의 **data** 속성에는 배열 데이터를 입력합니다. 그리고 **renderItem** 속성에는 렌더링 함수를 입력합니다.

```
import React from 'react';
import ｛
  View,
  Image,
  Text,
	FlatList, // here
｝ from 'react-native';
 
export default class App extends React.Component ｛

  state = ｛
    data: [1, 2, 3]
  ｝

  _renderItem = (｛item｝) => (
    <Text>｛item｝</Text>
  );

  render() ｛
    return (
      <FlatList 
        data=｛this.state.data｝
        renderItem=｛this._renderItem｝
      />
    );
  ｝
｝
```
<br>아래는 결과화면입니다.
![](https://steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/mcj3nVAN-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-03-292014.09.33.png)

<br>

# Fake Online REST API

우리는 이번 예제를 위해서 [JSONPlaceholder](https://jsonplaceholder.typicode.com/)에서 제공하는 Fake Online REST API를 사용할 것입니다. [JSONPlaceholder](https://jsonplaceholder.typicode.com/)에서는 아래와 같이 다양한 샘플 API를 제공하고 있습니다.
![](https://files.steempeak.com/file/steempeak/anpigon/2sdlIhST-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-03-292014.17.35.png)

이중에서 `/photos` API를 사용해 보겠습니다. JSON 데이터 형태는 아래와 같습니다.

![](https://files.steempeak.com/file/steempeak/anpigon/MofIm3k6-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-03-292014.18.01.png)

<br>

# 서버에서 데이터 가져와서 출력하기

REST API에서 데이터를 가져오는 함수를 입력합니다. 한번에 10개씩 가져옵니다.
```
  _getData = async () => ｛
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10';
    fetch(url)
      .then(res => res.json())
      .then(json => ｛
        this.setState(｛ 
          data: json 
        ｝);
      ｝);
  ｝
```

<br>그리고 컴포넌트가 마운트되고 나서 호출되도록 합니다.

```
  componentDidMount() ｛
    this._getData();
  ｝
```

<br>마지막으로 `_renderItem` 함수를 수정합니다.

```
  _renderItem = (｛item｝) => (
    <View style=｛｛borderBottomWidth:1, marginTop: 20｝｝>
      <Image source=｛｛ uri: item.url ｝｝ style=｛｛ height: 200｝｝ />
      <Text>｛item.title｝</Text>
    </View>
  );
```

<br>
> 여기까지 작업한 전체 코드입니다.

```
import React from 'react';
import ｛
  View,
  Image,
  Text,
	FlatList, // here
｝ from 'react-native';

export default class App extends React.Component ｛

  state = ｛
    data: [1, 2, 3]
  ｝

  _getData = async () => ｛
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10';
    fetch(url)
      .then(res => res.json())
      .then(json => ｛
        this.setState(｛ 
          data: json 
        ｝);
      ｝);
  ｝

  componentDidMount() ｛
    this._getData();
  ｝

  _renderItem = (｛item｝) => (
    <View style=｛｛borderBottomWidth:1, marginTop: 20｝｝>
      <Image source=｛｛ uri: item.url ｝｝ style=｛｛ height: 200｝｝ />
      <Text>｛item.title｝</Text>
    </View>
  );

  render() ｛
    return (
      <FlatList 
        data=｛this.state.data｝
        renderItem=｛this._renderItem｝
        keyExtractor=｛(item, index) => item.id｝
      />
    );
  ｝
｝
```

<br>그리고 결과 화면입니다.

![](https://steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/CC1fJp4x-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-03-292014.29.28.png)

<br>

# 무한 스크롤 구현하기

맨 아래 항목까지 스크롤되면, 다음 데이터를 자동으로 가져와서 목록에 추가하는 기능을 구현할 것입니다.. 이 기능을 Infinite Scroll 또는 무한 스크롤이라고 합니다.

`state`에 `page` 변수를 추가합니다.
```
  state = ｛
    data: [],
    page: 1 // here
  ｝
```

<br>그리고 `_getData` 함수를 수정합니다. 데이터를 가져올때마다 `_page` 번호를 증가합니다. 이렇게 하면 다음 요청에서는 다음 페이지의 데이터를 가져올 것입니다. 그리고 가져온 데이터를 기존 `data`에 추가(concat)합니다.

```
  _getData = () => ｛
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' + this.state.page;
    fetch(url)
      .then(r => r.json())
      .then(data => ｛
        this.setState(｛ 
          data: this.state.data.concat(data), // 기존 data에 추가.
          page: this.state.page + 1
        ｝)
      ｝);
  ｝
```

<br>그리고 `_handleLoadMore` 함수를 입력합니다. 이 함수는 스크롤이 끝까지 도달했을때 호출됩니다.
```
  _handleLoadMore = () => ｛
    this._getData();
  ｝
```

<br>마지막으로 `render` 함수를 수정합니다.
```
  render() ｛
    return (
      <FlatList 
        data=｛this.state.data｝
        renderItem=｛this._renderItem｝
        keyExtractor=｛(item, index) => item.id｝
        onEndReached=｛this._handleLoadMore｝
        onEndReachedThreshold=｛1｝
      />
    );
  ｝
```
<br>
> 다음은 전체 코드입니다.

```
import React from 'react';
import ｛
  View,
  Image,
  Text,
	FlatList, // here
｝ from 'react-native';

export default class App extends React.Component ｛

  state = ｛
    data: [],
    page: 1 // here
  ｝

  _renderItem = (｛item｝) => (
    <View style=｛｛borderBottomWidth:1, marginTop: 20｝｝>
      <Image source=｛｛ uri: item.url ｝｝ style=｛｛ height: 200｝｝ />
      <Text>｛item.title｝</Text>
      <Text>｛item.id｝</Text>
    </View>
  );

  // _getData 함수 수정
  _getData = () => ｛
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' + this.state.page;
    fetch(url)
      .then(r => r.json())
      .then(data => ｛
        this.setState(｛ 
          data: this.state.data.concat(data),
          page: this.state.page + 1
        ｝)
      ｝);
  ｝

  componentDidMount() ｛
    this._getData();
  ｝

  // here
  _handleLoadMore = () => ｛
    this._getData();
  ｝

  render() ｛
    return (
      <FlatList 
        data=｛this.state.data｝
        renderItem=｛this._renderItem｝
        keyExtractor=｛(item, index) => item.id｝
        onEndReached=｛this._handleLoadMore｝
        onEndReachedThreshold=｛1｝
      />
    );
  ｝
｝
```

<br>다음은 결과 화면입니다. 스크롤이 끊임없이 됩니다.

![](https://files.steempeak.com/file/steempeak/anpigon/MmScFXWl-2019-03-292014-46-41.2019-03-292014_47_12.gif)

<br>

# Pull Down Refresh 구현하기

이제 마지막입니다.

`state`에 `refreshing` 변수를 추가합니다. `refreshing` 는 데이터를 가져오는 중인지를 판단합니다.

```
  state = ｛
    data: [],
    page: 1,
    refreshing: false // here
  ｝
```

<br>`_handleRefresh` 함수를 입력합니다. 이 함수는 화면을 **Pull Down**하면 호출될 것입니다. 데이터를 새로 가져올 것이기 때문에, page 번호를 1로 초기화해 줍니다.

```
  _handleRefresh = () => ｛
    this.setState(｛
      refreshing: true,
      page: 1,
    ｝, this._getData);
  ｝
```

<br>`render` 함수를 수정합니다. refreshing 속성과 onRefresh 속성을 추가하였습니다.

```
  render() ｛
    return (
      <FlatList 
        data=｛this.state.data｝
        renderItem=｛this._renderItem｝
        keyExtractor=｛(item, index) => item.id｝
        onEndReached=｛this._handleLoadMore｝
        onEndReachedThreshold=｛1｝
        refreshing=｛this.state.refreshing｝
        onRefresh=｛this._handleRefresh｝
      />
    );
  ｝
```

<br>마지막으로 `_getData` 함수를 수정합니다. `refreshing`가 **true** 일때는 가져온 데이터를 기존 데이터에 추가(concat)하지 않습니다.

```
  _getData = () => ｛
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' + this.state.page;
    fetch(url)
      .then(r => r.json())
      .then(data => ｛
        this.setState(｛ 
          data: this.state.refreshing?data:this.state.data.concat(data),
          page: this.state.page + 1,
          refreshing: false
        ｝)
      ｝);
  ｝
```

<br>다음은 결과 화면입니다. 화면을 아래로 당기면 `onRefresh` 이벤트가 발생합니다. 새로고침 해도 같은 데이터를 가져오기 때문에 화면의 변화는 없네요.

![](https://files.steempeak.com/file/steempeak/anpigon/Z1I9E54D-2019-03-292015-03-11.2019-03-292015_04_24.gif)

___

예제에 사용한 코드는 [**여기**](https://snack.expo.io/@markan/infinite-scroll-flatlist)에서 확인할 수 있습니다.

감사합니다.

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [DCLICK: 광고 기능을 소개 합니다](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtZmxhdGxpc3QtaW5maW5pdGUtc2Nyb2xsLXB1bGwtZG93bi1yZWZyZXNoIiwiYSI6WyJ0LTEyOTAiXSwidXJsIjoiaHR0cHM6Ly9zdGVlbWl0LmNvbS9kY2xpY2sta3IvQGRjbGljay9kY2xpY2stLTE1NDM5ODY4MDU4MDkiLCJpYXQiOjE1NTM4Mzk5MTYsImV4cCI6MTg2OTE5OTkxNn0.bSgKY9v1O9t4YO0VNOh7YKrMjZ7tUhVnmCU7zqAOy10)
<sup>지난주에 dclick 에서 Advertise 기능이 오픈 되었습니다. Advertise 메뉴 ...</sup>
