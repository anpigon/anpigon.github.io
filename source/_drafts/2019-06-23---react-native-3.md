---
title: "[React Native] 영화 리뷰 모바일 앱 개발 이야기 #3"
author: anpigon
date: "2019-06-22T23:51:21Z"
permalink: "/sct/@anpigon/react-native-3"
tags:
  - "sct"
  - "kr"
  - "kr-dev"
  - "jjm"
  - "thegivingtree"
  - "busy"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
***

안녕하세요. 안피곤입니다.

이 시리즈는 리액트 네이티브로 영화 리뷰 모바일 앱을 만드는 과정입니다. 

코딩 마법사는 마법으로 앱을 금방 만들지만, 저는 한 땀 한 땀 노가다(삽질?)를 하면서 만들고 있습니다. 그리고 제가 속해 있는  Whan 개발팀에도 마법사가 여럿분 계십니다. 아직 Whan 개발팀의 존재를 모르시는 분은 뉴비존님이 작성한 "[\[출범식\] WDT(WHAN DEV TEAM) 공식 활동 개시](/steemengine/@newbijohn/wdt-whan-dev-team)" 글을 읽어보세요.

어제 @nhj12311님이 Whan 개발팀에 합류하였습니다. 축하해주세요. 그래서 기념으로 Whan 개발팀을 삼국지 인물에 매칭 시켜 보았습니다. 이것은 순전히 저의 개인적인 의견입니다. nhj12311님은 **제갈공명**, 뉴비존님은 **유비**, 원사마님은 **관우**, 햄뽀이님은 **장비**, 그리고 제이콥님은 **조운**. 마지막으로 부기님은 **마초**입니다. 죄송합니다. ㅠ_ㅜ

<center>![](https://cdn.steemitimages.com/200x0/https://cdn.pixabay.com/photo/2019/03/01/05/01/developer-4027334_1280.png)</center>

댓글로 많은 분들이 응원해주셨습니다. 그래서 다시 코딩 의욕이 살아나고 있습니다. 제이콥님, 토크잇님, 독거노인님 모두 감사합니다. 

![](https://files.steempeak.com/file/steempeak/anpigon/vitmUnFD-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2320E1848BE185A9E1848CE185A5E186AB2012.46.27.png)

<br>이번에는 스팀커넥트를 이용한 로그인을 구현했어요. "[[React Native] 스팀커넥트(Steemconnect) 로그인 만들기](https://steemit.com/kr/@anpigon/react-native-steemconnect--1548595799187)"에서 작성했던 코드를 재활용했습니다. 덕분에 금방 구현했습니다.

<br>

### 로그인 화면

로그인 화면에는 스팀 커넥션 로그인 버튼과 회원가입 링크가 보입니다. 나중에 포스팅 키로 로그인할 수 있는 기능도 넣을 생각입니다. 그리고 앱 로고 텍스트는 **[Sweet Sensations Personal Use](https://www.dafont.com/sweet-sensations.font)** 폰트를 사용했습니다. 개인적인 용도로는 무료로 사용할 수 있다고 명시되어 있습니다.

![](https://steemitimages.com/360x0/https://files.steempeak.com/file/steempeak/anpigon/PUsySRgL-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2320E1848BE185A9E1848CE185A5E186AB2012.40.37.png)

<br>

### 회원가입

회원가입 링크를 누르면 **[스팀 피플](https://www.steempeople.com/)** 사이트로 연결됩니다. 한국 사용자는 이곳에서 스팀잇 계정을 생성하는 것이 매우 간편하다고 생각합니다. 하지만 스팀 피플에서 회원가입할 때는 개인 정보를 입력해야 하기 때문에 이용약관을 잘 읽어보셔야 합니다.

![](https://steemitimages.com/360x0/https://files.steempeak.com/file/steempeak/anpigon/p3SP0oN0-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2320E1848BE185A9E1848CE185A5E186AB2012.40.51.png)

<br>

### 스팀커넥션 로그인

스팀 커넥션 로그인은 모달 컴포넌트와 웹뷰를 사용하였습니다. 아직 스팀 커넥션 계정을 생성하지 않아서 eSteem-app 계정을 무단으로 잠깐 빌렸습니다. 

![](https://steemitimages.com/360x0/https://files.steempeak.com/file/steempeak/anpigon/4hoh7bfM-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2320E1848BE185A9E1848CE185A5E186AB2012.41.20.png)

<br>다음은 스팀 커넥션 로그인 모달 컴포넌트를 구현한 코드의 일부입니다. 웹뷰에서 제공하는 `onNavigationStateChange` 이벤트 옵션을 사용하여 URL 변화를 캐치하여 `accessToken`을 취득합니다. 

![](https://files.steempeak.com/file/steempeak/anpigon/cSey9o44-code.png)

<br>

### 완성 화면

로그인 기능이 잘 동작하네요.

![](https://files.steempeak.com/file/steempeak/anpigon/VEQUpvQd-2019-06-232000-31-16.2019-06-232000_32_25.gif)

<br>

해피 코딩하세요~!

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>
