---
title: '[React Native] MobX State Tree 학습하기 #1'
tags:
  
  
  
  
  
  
  
  - react-native
  
  
  
author: anpigon
date: 2019-08-11 13:18:15
---

이제 여러분은 본 포스팅을 보면서 같이 학습을 하게 됩니다. 그리고 제가 겪은 시행착오나 문제 해결에 시간을 뺏길 필요가 없습니다. 저는 여러분 모두를 앱 개발자로 만들고 싶습니다. 그래서 STEEM 블록체인 기반의 좀 더 다양한 DApp이 출시되었으면 합니다. 

참고로 SI 프로젝트에 투입된 개발자들과 이야기 해보면 디자인, 음악, 경영학 등 전공이 다양합니다. 생각보다 컴퓨터 전공자들이 적습니다. 다들 코딩을 시작해서 개발자가 된 계기는 비슷합니다. `하다보니...` `어쩌다보니...` `정신차리고 보니...` `회사에서 시켜서...` `일부 디자이너는 개발자와 이야기하다가 답답해서...`

여러분은 `스팀잇을 하다보면...` 곧 개발자가 될 것 같습니다. 제 생각에는 복잡한 스팀잇 시스템을 이해할 수 있다면, 분명히 코딩에 재능이 있습니다. **지금 바로 시작하세요!**

<br>

<center>![](https://steemitimages.com/350x0/https://files.steempeak.com/file/steempeak/anpigon/5LN9JYqS-ANPIGON201.png)</center>

<br>
<br>

___

<br>

이전글 **《[React Native] Redux-Saga 학습하기 [#1](/@anpigon/react-native-redux-saga-1) [#2](/@anpigon/react-native-redux-saga-2)》**에서는 **Redux-Saga** 를 학습하면서 포스팅 했습니다. **Redux** 를 사용하면서 느낀 점을 이전 포스팅에서도 밝혔지만, 비동기 액션 기능 하나 구현하는데 생성하는 파일과 코드량이 무척 많습니다. 저처럼 혼자 개발하는 프로젝트에서는 시간 소모가 커서 매우 비효율적입니다.

그리고 최근에 **["React에서 Mobx 경험기 (Redux와 비교기) - 우아한형제들 기술 블로그"](http://woowabros.github.io/experience/2019/01/02/kimcj-react-mobx.html)** 글을 읽었습니다. **MobX**의 `observable`를 사용하면 **Redux-Saga** 미들웨어를 사용하지 않아도 될 것 같습니다. 그리고 **Redux** 처럼 코딩량도 많지 않을 것 같습니다. 그래서 지금 바로 **Redux**에서 **MobX**로 갈아타기로 결정했습니다. 제 귀는 팔랑귀이며 제 마음은 갈대와도 같습니다. 하지만 **MobX**를 사용하다가 불편하면 다시 **Redux**로 돌아갈지도 모릅니다. 

<br>

___

본 포스팅은 아래 강의를 보면서 정리한 노트입니다.
https://www.youtube.com/watch?v=snBvYS6eC2E
___

<br><br>

# 의존성 모듈 설치하기

**MobX State Tree**에 필요한 모듈을 설치합니다. 그리고 **MobX State Tree**를 사용하기 위해 `babel-plugin-transform-decorators-legacy`를 설치합니다. 그리고 ES7 decorators babel plugin을 설정합니다.

```
$ yarn add mobx mobx-react mobx-state-tree babel-plugin-transform-decorators-legacy
```

<br>

모듈 설치가 완료되면 다음과 같이 `package.json`에 설치된 것을 확인 할 수 있습니다.
![](https://files.steempeak.com/file/steempeak/anpigon/DoEfA2LL-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-1020E1848BE185A9E18492E185AE2011.00.01.png)

<br>

그다음 `.babelrc` 파일에  babel plugin 설정을 입력합니다.
```
{ 
    "presets": ["react-native"],
    "plugins": ["transform-decorators-legacy"]
}
```

<br>
<br>

# MobX State Tree에 Store 생성하기

`BookStore.js` 파일을 생성합니다.
```
import { types } from 'mobx-state-tree';

const Book = types.model('Book', {
  title: types.string,
  author: types.string,
  read: false,
});

const BookStore = types
  .model('Books', {
    books: types.array(Book),
  })
  .create({
    books: [], // 초기 값(빈 배열)
  });

export default BookStore;

```
`mobx-state-tree` 모듈에서 `types`를 **import** 합니다. `types`은 모델(model)을 정의하고 항목(properties)의 타입을 지정하는데 사용됩니다.
그리고 **model**에서 `create` 함수를 사용하여 초기 값(빈 배열)을 전달합니다.

<br>
<br>

# 실행 그리고 오류 발생 및 문제 해결하기

실행하니 다음과 같은 에러가 발생했습니다.

![](https://steemitimages.com/400x0/https://files.steempeak.com/file/steempeak/anpigon/d1oJYKvh-1.png)

그래서 에러 내용 대로 `babel-preset-react-native` 모듈을 추가로 설치했습니다.

```
$ yarn add --dev babel-preset-react-native
```

<br>
<br>

이번에는 다른 에러가 발생했습니다. 

![](https://steemitimages.com/400x0/https://files.steempeak.com/file/steempeak/anpigon/xKZ15nIC-2.png)

[babel-plugin-transform-decorators-legacy 사이트](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)에 가서 확인해보니 Babel 7.x 이상이면 다음과 같이 안내하고 있습니다.

![](https://files.steempeak.com/file/steempeak/anpigon/BRmV8iPb-33.png)

<br>

`@babel/plugin-proposal-decorators` 모듈을 설치합니다.
```
$ yarn add --dev @babel/plugin-proposal-decorators 
```

<br>

그다음 `.babelrc` 파일에 `@babel/plugin-proposal-decorators` 플러그인을 추가합니다.
```
{ 
    "presets": ["react-native"],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
}
```

<br>
<br>

여전히 에러가 발생합니다. 

![](https://steemitimages.com/400x0/https://files.steempeak.com/file/steempeak/anpigon/0GRwEVDd-3.png)

이 오류의 해결 방법은 아래 링크에서 찾았습니다.

https://github.com/facebook/react-native/issues/20588#issuecomment-448218111

<br>필요한 의존성 모듈을 설치합니다.

```
$ yarn add -dev @babel/plugin-transform-flow-strip-types @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

<br>그 다음 `.babelrc` 파일을 다음과 같이 수정합니다.
```
{ 
    "presets": ["module:metro-react-native-babel-preset"],
    "plugins": [
        ["@babel/plugin-transform-flow-strip-types"],
        ["@babel/plugin-proposal-decorators", { "legacy": true}],
        ["@babel/plugin-proposal-class-properties", { "loose": true}]
    ]
}
```

<br>여전히 같은 에러가 발생하면 cache를 reset 하고 실행해보세요.

```
$ react-native start --reset-cache
```

<br>
<br>

# 앱 실행하기

저는 개발할때는 ios 에뮬레이터를 많이 사용합니다. 안드로이드 에뮬레이터보다 가볍고 개발하기 편합니다.

```
$ react-native run-ios
``` 

<br>앱을 실행하고 나서 브라우저 **Console**을 확인하면 우리가 출력한 `books`가 보입니다. 그런데 Object 형태가 유튜브 강의 내용과 다릅니다. 유튜브 강의가 1년 전임을 감안하면 그 동안 많은 변화가 있었을 것 같습니다.

![](https://files.steempeak.com/file/steempeak/anpigon/jiTq0SCg-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-1120E1848BE185A9E1848CE185A5E186AB2011.30.11.png)

___

<br>

오류를 해결하면서 학습하다보니 1시간이 금방 지나갔습니다. 그런데 동영상 강의는 5분 밖에 못들었습니다. ㅠ 
하지만 오후에는 다른 일정이 있어서 오늘 학습은 여기까지 입니다. 


<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>

<br>
