---
title: "[React Native] 영화 리뷰 모바일 앱 개발 이야기 #2"
author: anpigon
date: "2019-06-22T01:29:03Z"
permalink: "/sct/@anpigon/react-native-2"
tags:
  - "React Native"
---
![](https://steemitimages.com/0x0/https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)

안녕하세요. 안피곤입니다.

매일매일 글을 써서 보상을 받기 위해 시작한 시리즈입니다. 하루라도 글을 써서 보상받지 않으면 내가 이미 받았어야 할 보상을 빼앗긴 기분이 듭니다. 스팀잇(Steemit)은 저에게 매일매일 글을 쓰게 만드는 장치입니다. 덕분에 글쓰기 스킬이 조금 좋아진 것 같습니다. 

그리고 요즘은 예전처럼 코딩 의욕이 많이 줄어들었습니다. 오로지 보상을 받기 위해서 글을 씁니다. 이 글은 보상을 받기 위해서 쓰는 글이기 때문에 대충대충 작성해보겠습니다. ㅋ

이 시리즈는 리액트 네이티브로 모바일 앱을 만드는 과정을 그냥 일기처럼 기록합니다. #AAA 태그 글을 보여주는 영화 리뷰 앱을 만들려고 기획하고 개발을 시작했습니다. 사실은 기획 없이 시작하였습니다. 세세한 기능들은 생각나는 데로 또는 사용자의 피드백이 있으면 천천히 확장해 가겠습니다.
<br>

***

<br>

이번에는 AAA 태그에서 글을 가져와서 목록으로 출력하는 화면을 구현했습니다. 글 목록, 글 상세, 로그인, 글쓰기 기능 순으로 구현할 예정입니다. 참고로 피드 화면에는 글 보상이 보이지 않습니다. 내가 작성한 글만 글 보상을 보이게 할 계획입니다. 저는 다른 사람의 글 보상은 볼 필요가 없다고 생각합니다. 다른 글의 보상을 볼 때마다 의욕상실입니다. 회사에서 동기의 연봉이 나보다 더 많다는 것을 알게 된 기분??? ㅎㅎ

![](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/EEXtSiQW-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2220E1848BE185A9E1848CE185A5E186AB209.11.26.png)

<br>
<br>

### React-Native-FAB

목록에 보이는 FAB(Floating Action Button) 버튼은 [react-native-fab](https://www.npmjs.com/package/react-native-fab)를 사용하였습니다. 나중에 글쓰기 버튼으로 활용할 예정입니다. 버튼을 누르면 아마도 글쓰기 화면으로 이동하게 되겠죠.

구글 검색해보면 알겠시만 FAB 또는 Speed Dial 라이브러가 다수 존재합니다. 저는 버튼이 나타났다 사라지게 하는 옵션이 마음에 들어서 선택하였습니다. 

![](https://media.giphy.com/media/eUa3ywxwoBwwE/giphy.gif)

<br>
<br>

### FlatList

목록 컴포넌트는 "[[React Native] FlatList으로 Infinite Scroll와 Pull Down Refresh 구현하기](https://steemit.com/kr/@anpigon/react-native-flatlist-infinite-scroll-pull-down-refresh)"에서 작성한 코드를 재활용하였습니다. FlatList 컴포넌트는 기본적으로 Pull-Down-Refresh(당겨서 새로고침) 옵션을 제공합니다. 그래서 스크롤을 아래로 당겼다가 놓았을 때 목록을 새로 고침하는 기능을 매우 쉽게 구현할 수 있습니다. 이런 것이 바로 리액트 네이티브의 장점이라고 생각합니다.

그리고 `onScrollBeginDrag`와 `onScrollEndDrag` 이벤트 속성을 사용하여 스크롤 중에는 FAB 버튼이 사라지게 합니다. FlatList는 ScrollView를 상속받았기 때문에 ScrollView 기능도 일부 사용 가능합니다.

작성한 코드 일부입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/ZMsBtzuo-code.png)
> **팁:** 코드 이미지는 VSC 확장프로그램 [polacode](https://marketplace.visualstudio.com/items?itemName=pnp.polacode)를 사용해서 만들었습니다. 코드하이라이트 기능이 없는 에디터에는 텍스트보다 이게 가독성이 훨씬 좋아보입니다. VSC에서 코드를 드래그만 하면 이미지를 자동으로 만들어 줍니다. 

<br>
<br>

### 완성 화면

#AAA 태그 글 목록에서  Pull-Down-Refresh와 Infinite Scroll 기능을 구현하였습니다. 이전에 학습하면서 작성했던 코드가 있어서 금방 구현하였네요.

![](https://cdn.steemitimages.com/DQmU4DgBJXatt6g78iCZpvrsTuqAE2nZT159PnnQQXjq5E2/2019-06-22％2009-26-50.2019-06-22％2009_28_07.gif)
> 앱 하단에 노란 텍스트 박스가 뜨는 것은 디버깅 모드라서 그렇습니다.



<br>
<br>

해피 코딩하세요~!

<hr><center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>