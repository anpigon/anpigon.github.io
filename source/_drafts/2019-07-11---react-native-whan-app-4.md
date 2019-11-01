---
title: "[React Native] WHAN APP 개발 이야기 #4"
author: anpigon
date: "2019-07-11T02:05:21Z"
permalink: "/zzan/@anpigon/react-native-whan-app-4"
tags:
  - "zzan"
  - "liv"
  - "kr"
  - "kr-dev"
  - "nahasct"
  - "neoxian"
  - "palnet"
  - "busy"
  - "jjm"
---
<center>![whan_dapp_dev.png](https://files.steempeak.com/file/steempeak/anpigon/PA0Z9o93-whan_dapp_dev.png)</center>
***

안녕하세요. 안피곤입니다.

어느 정도 기본 기능(로그인, 글쓰기)이 완성됬다고 판단하여, 내부 테스트를 진행하고 있습니다. 앱개발을 완료했을때 실사용자가 있을지는 모르겠습니다. 하지만 필요한 앱이라고 생각해서 개발을 진행하고는 있습니다. 

그리고 제 기분에 따라서 언제든지 개발이 중단될 수 있습니다. 왜냐하면 스팀잇에 시리즈 글을 연재하기 위해서 개발하고 있기 때문입니다. 다른 개발 시리즈도 연재하고 싶네용. ㅋ

테스트 하고 싶으신 분은 구글 계정을 저에게 알려주시면 됩니다. 테스트 그룹에 등록하겠습니다. 참고로 참여하셔도 아무런 혜택은 없습니다. ㅋ

|||
|-|-|
|![](https://files.steempeak.com/file/steempeak/anpigon/vC9ckZHe-1.jpeg)|![](https://files.steempeak.com/file/steempeak/anpigon/ANLT0I1k-2.jpeg)|
|||
> * 테스트 앱 다운로드 링크: https://play.google.com/apps/internaltest/4698408089604846898


<br>다음은 앱을 구동하여 글을 작성하고 댓글을 쓰는 화면입니다. 해당 커뮤니티에서 글을 작성하면 메인 태그는 자동으로 입력됩니다. 예를 들어 **zzan** 탭에서 작성하면 메인태그는 #zzan이 됩니다.

![](https://files.steempeak.com/file/steempeak/anpigon/s5dsNunu-test2.gif)

<br>기본 기능만 개발하고 시리즈를 끝내려고 했습니다. 하지만 만들다보니 점점 욕심이 생깁니다. 

<br>

|||
|-|-|
|**이전글**|
|[SNAX토큰 에어드랍받기 위한 글 : WHAN APP 기획 개발 이야기](https://steemit.com/sct/@anpigon/snax-whan-app)|
|[\[React Native\] WHAN APP 개발 이야기 #2](https://steemit.com/zzan/@anpigon/react-native-whan-app-2)|
|[\[React Native\] WHAN APP 개발 이야기 #3](https://steemit.com/test/@anpigon/20190709t020445612z)|

<br>

<center>![](https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmNpcHsY4vBGAxKez3HgK3B9k1MouVQ2YSqCHHVFi4QvPD/newLOGO_％EC％96％87％EC％9D％80.png)</center>

<br>

# 개발 내용

댓글을 작성하고 화면을 새로고침 했을때 댓글이 바로 보이지 않습니다. 아마도 블럭생성되고 나서 보이는듯 합니다. 그래서 작성된 댓글을 이전 화면의 콜백함수로 전달하여 다시 렌더링하도록 구현했습니다. 텍스트로 설명하려니 어렵네요.

다음은 상세 화면에서 댓글 작성 화면으로 이동하는 코드입니다. 코드를 보면 `onUpdate`에 콜백함수를 param에 담아서 이동하고 있습니다. `_onGoReplyEditorCallback` 함수는 댓글을 인자값으로 받아서 화면을 렌더링 하는 로직을 수행 할 것입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/DlYJfIKy-code1.png)

<br>그 다음 댓글 등록이 완료되면, 이전 화면에서 넘겨받은 콜백 함수를 호출하여 이전 화면을 업데이트 합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/gHOsNbJy-code2.png)

<br>

댓글, 팔로우, 업보팅해 주시는 모든 분들 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>