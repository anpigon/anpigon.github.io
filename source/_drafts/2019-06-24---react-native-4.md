---
title: "[React Native] 영화 리뷰 모바일 앱 개발 이야기 #4"
author: anpigon
date: "2019-06-23T23:00:09Z"
permalink: "/sct/@anpigon/react-native-4"
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

이번에는 포스팅 본문 내용을 보여주는 상세 화면을 구현합니다. body에 포함된 마크다운/HTML을 파싱하여 렌더링된 결과물을 네이티브 화면으로 출력합니다. 

웹 화면과 최대한 비슷하게 구현하려고 노력했습니다. 하지만 아직 미흡한 부분이 보여서 WEB으로 가는 링크를 우측상단에 넣었습니다. 클릭하면 웹페이지로 이동합니다.

![](https://steemitimages.com/360x0/https://files.steempeak.com/file/steempeak/anpigon/f4XxWj35-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2320E1848BE185A9E1848CE185A5E186AB209.16.18.png)

<center>![](https://cdn.steemitimages.com/200x0/https://cdn.pixabay.com/photo/2019/03/01/05/01/developer-4027334_1280.png)</center>

### Remarkable : 마크다운(markdown) 파서

> https://github.com/jonschlinkert/remarkable

마크다운(markdown) 파서는 [remarkable](https://github.com/jonschlinkert/remarkable)를 사용했습니다. remarkable는 마크다운 문서를 HTML로 변환해주는 라이브러리입니다. common/extensions 마크다운 문법을 모두 지원하고,  syntax 플러그인과 매우 빠른 속도를 자랑합니다. 그리고 MIT 라이센스입니다.

다음은 remarkable를 사용한 일부 코드입니다. 


![](https://files.steempeak.com/file/steempeak/anpigon/f35wPLmR-code.png)

<br>

### React-Native Render HTML

> https://github.com/archriss/react-native-render-html

HTML 렌더링에는 [react-native-render-html](https://github.com/archriss/react-native-render-html)를 사용했습니다. react-native-render-html는 리액트 네이티브 컴포넌트를 사용하여 HTML을 100％ 네이티브 뷰로 렌더링해줍니다. 그리고 BSD-2-Clause 라이센스입니다.

다음은 react-native-render-html를 사용한 일부 코드입니다. 

`import HTMLView from 'react-native-render-html';` 

![](https://files.steempeak.com/file/steempeak/anpigon/Z18ygvTR-code2.png)

<br>

### 완성 화면

![](https://files.steempeak.com/file/steempeak/anpigon/t4tRTiQ2-2019-06-232009_13_56_2.gif)


<br>

해피 코딩하세요~!

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>

