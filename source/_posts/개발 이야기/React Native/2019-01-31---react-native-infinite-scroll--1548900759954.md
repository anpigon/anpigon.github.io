---
title: "[React Native] 무한 스크롤(infinite scroll) 만들기"
author: anpigon
date: "2019-01-31T02:12:39Z"
permalink: "/kr/@anpigon/react-native-infinite-scroll--1548900759954"
tags:
  - "React Native"
  - "Infinite Scroll"
---
![](https://cdn-images-1.medium.com/max/2600/1*069gU67uQesMgg-kQS_2CQ.png)

이번에는 무한 스크롤(infinite scroll)를 구현합니다. ["\[React Native\] 인스타그램 UI 만들기"](https://steemit.com/kr/@anpigon/react-native-ui-1) 시리즈의 개발환경을 그대로 사용합니다. 그리고  아래 블로그 내용을 참고 하여 구현하였습니다.
> 참고: https://blog.nativebase.io/building-infinite-scroll-in-react-native-e717602553f8

&nbsp;

# 라이브러리 설치하기

무한 스크롤을 구현하기 위해서 [**impagination**](https://www.npmjs.com/package/impagination) 라이브러리를 사용합니다. [**impagination**](https://www.npmjs.com/package/impagination)는 페이징 가능한 레코드의 lazy 데이터 처리 레이어입니다. impagination는 종속성이 없기 때문에, JS 환경이면 어디서나 사용가능합니다.

```bash
$ yarn add impagination util
```

&nbsp;

# Impagination 데이터세트 만들기

`./src/components/HomeTab.js`을 수정합니다.

&nbsp;

먼저 **impagination**를 **import** 합니다.

```js
import Dataset from 'impagination';
```

&nbsp;

그리고 **HomeTab** 컴포넌트 내부에 `setupImpagination` 함수를 작성합니다.

```jsx
class HomeTab extends Component ｛
	setupImpagination = () => ｛
    let dataset = new Dataset(｛
      pageSize: DEFAULT_LIMIT, // 한번에 가져올 레코드 갯수
      observe: (datasetState) => ｛
        // 새로운 `state`가 생성될때 마다 호출됩니다.
        this.setState(｛ datasetState ｝);
      ｝,
      fetch(pageOffset, pageSize, stats) ｛
        // 서버에서 데이터를 가져옵니다.
        return _fetchFeeds();
      ｝
    ｝);

    dataset.setReadOffset(0); // Dataset 호출
    this.setState(｛ dataset ｝);
  ｝
  
  render() ｛ //... ｝
｝
```

> * `Dataset`의 `fetch()` 함수에 전달되는 값은 세 가지입니다. 
> * `pageOffset`는 가져올 현재 페이지, `pageSize`는 한 페이지의 레코드 수, 그리고 `stats`입니다. 
> * API에서 지원한다면, `stats`에는 `totalPages`를 저장할 수 있습니다.

&nbsp;

스팀잇 피드 가져오는 API에는 `pageOffset`이 없으므로 아래와 같은 방법으로 조회해야 합니다.

```js
class HomeTab extends Component ｛
	setupImpagination = () => ｛
    _fetchFeeds = () => ｛
      const ｛ startAuthor, startPermlink ｝ = this.state.next; // 가져올 레코드 시작 지점
      return this.fetchFeeds(｛
        tag: 'kr',
        limit: DEFAULT_LIMIT + 1, 
        startAuthor,
        startPermlink
      ｝).then(feeds => ｛
        let next = ｛
          startAuthor: '',
          startPermlink: '',
        ｝
        if(feeds.length > DEFAULT_LIMIT) ｛
          const ｛ author, permlink ｝ = feeds.pop();
          next = ｛
            startAuthor: author,
            startPermlink: permlink
          ｝
        ｝
        this.setState(｛ next ｝);
        return feeds;
      ｝);
    ｝
    
    let dataset = new Dataset(｛ //... ｝);
	｝
  
  render() ｛ //... ｝
｝
```

> * 마지막 레코드에서 다음 레코드의 시작 부분을 알아야 하기 때문에, 레코드를 하나 더 가져옵니다.
> * 그리고 가져온 레코드가 `DEFAULT_LIMIT` 보다 크면 마지막 레코드를 pop하여 다음 레코드의 시작 지점을 알아냅니다.

&nbsp;

이제 컴포넌트 `constructor`에 `state`를 선언합니다.

```jsx
class HomeTab extends Component ｛
  constructor(props) ｛
    super(props);
    this.state = ｛
      dataset: null,
      datasetState: null,
      next: ｛
        startAuthor: null,
        startPermlink: null,
      ｝
    ｝;
  ｝
  setupImpagination() ｛ //... ｝
  render() ｛ //... ｝
｝
```

&nbsp;

마지막으로 컴포넌트 마운트되기 시작할때, `setupImpagination()` 함수를 호출합니다.

```jsx
componentWillMount() ｛
    this.setupImpagination();
｝
```

&nbsp;

# 화면에 datasetState 출력하기

이제 **Impagination**의 **datasetState**을 루프돌면서 **CardComponent** 컴포넌트를 반환하도록 만듭니다.

```jsx
class HomeTab extends Component ｛
  constructor(props) ｛ //... ｝
  setupImpagination() ｛ //... ｝
  componentWillMount() ｛ //... ｝
  render () ｛
    return (
      <Container style=｛style.container｝>
        <Header>｛/* ... */｝</Header>
        <Content>
        	｛/* ... */｝
          ｛
            this.state.datasetState.map(record => ｛
              const ｛ content ｝ = record;
              return <CardComponent data=｛ content ｝ key=｛ content.post_id ｝/>
            ｝)
          ｝
        </Content>
      </Container>
    )
  ｝
｝
```

> * 이렇게 하고 앱을 호출하면 `Cannot read property 'title' of null` 에러가 발생합니다. 이것은 **Impagination** 는 생성되자 마자 필요한 array 데이터를 생성합니다.
> * array에 포함되어 있는 `record` 에는 다음과 같은 속성이 있습니다.  `isRequested`, `isSettled`, `isPending`, `isResolved`, `isRejected`
> 

&nbsp;

레코드(record)가 완전한 상태가 아니면, 스피너가 보이도록 수정합니다.

```jsx
this.state.feeds.map(record => ｛
  if (!record.isSettled) ｛
    return <Spinner key=｛ Math.random() ｝/>;
  ｝
  const ｛ content ｝ = record;
  return <CardComponent data=｛ content ｝ key=｛ content.post_id ｝/>
｝)
```

&nbsp;

# 무한 스크롤 만들기

이제 마지막 단계입니다. 스크롤하여 다음 레코드를 자동으로 불러올 차례입니다.

```jsx
class HomeTab extends Component ｛
  constructor(props) ｛ //... ｝
  setupImpagination() ｛ //... ｝
  componentWillMount() ｛ //... ｝
  setCurrentReadOffset = (event) => ｛
    let itemHeight = 402;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);
    this.state.dataset.setReadOffset(currentItemIndex);
  ｝
  render () ｛
    return (
      <Container>
        <Header>｛/* ... */｝</Header>
        <Content 
          scrollEventThrottle=｛300｝ 
          onScroll=｛this.setCurrentReadOffset｝>
        	｛/* ... */｝
          ｛
            this.state.datasetState.map(record => ｛
              const ｛ content ｝ = record;
              return <CardComponent data=｛ content ｝ key=｛ content.post_id ｝/>
            ｝)
          ｝
        </Content>
      </Container>
    )
  ｝
｝
```

> * 스크롤 이벤트가 발생하면 `setCurrentReadOffset()` 함수가 호출됩니다.
> * 이벤트 호출 시간은 `scrollEventThrottle` 속성을 사용하여 `300`(ms) 로 설정하였습니다.

&nbsp;

다음은 완성한 앱입니다.

![](https://user-images.githubusercontent.com/3969643/52024723-2bd71d80-2545-11e9-91c4-3d84a6a2444a.gif)

&nbsp;

작업한 소스코드는 모두 [깃허브](https://github.com/anpigon/rn_instagram_clone/tree/e45f0658aee86ac45931936d468b93df2156f640)에 업로드 되어있습니다. 그리고 샘플앱은 [expo 클라이언트](https://expo.io/@markan/insteemgram)를 사용하면 확인해 볼 수 있습니다.

여기까지 읽어주셔서 감사합니다.

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [DCLICK: 광고 기능을 소개 합니다](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtaW5maW5pdGUtc2Nyb2xsLS0xNTQ4OTAwNzU5OTU0IiwiYSI6WyJ0LTEyOTAiXSwidXJsIjoiaHR0cHM6Ly9zdGVlbWl0LmNvbS9kY2xpY2sta3IvQGRjbGljay9kY2xpY2stLTE1NDM5ODY4MDU4MDkiLCJpYXQiOjE1NDg5MDA3NTksImV4cCI6MTg2NDI2MDc1OX0.WshdHt3ExjOtc9NfhEF_PI3oRf3w2XtQU3faowDoWxY)
<sup>지난주에 dclick 에서 Advertise 기능이 오픈 되었습니다. Advertise 메뉴 ...</sup>
</center>