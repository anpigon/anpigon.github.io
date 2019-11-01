---
title: "[React Native] WHAN APP 개발 이야기 #2"
author: anpigon
date: "2019-07-08T05:01:36Z"
permalink: "/zzan/@anpigon/react-native-whan-app-2"
tags:
  - "zzan"
  - "liv"
  - "sct"
  - "kr"
  - "kr-dev"
  - "palnet"
  - "busy"
  - "jjm"
---
<center>![whan_dapp_dev.png](https://files.steempeak.com/file/steempeak/anpigon/PA0Z9o93-whan_dapp_dev.png)</center>
***

안녕하세요. 안피곤입니다.

SCOT 등장 이전에는 스팀잇글을 태그별로 볼 수 있는 앱이 필요하다고 생각했었습니다. 하지만 요즘 SCOT 기반 Nitrous 사이트가 계속 생겨나고 있습니다. 그래서 해당 사이트의 글을 모아 볼 수 있는 앱이 필요하다고 생각하고 있습니다. 물론 각 서비스의 특성을 지닌 앱도 필요하다고 생각하고 있습니다. 예를 들면 왓차같은 영화 리뷰앱, 비블리(Bibly)같은 독서 리뷰앱, 아하 같은 QnA앱 이런 앱들도 만들어 보고 싶습니다. 

스팀잇 블록기반의 댑(Dapp)의 장점은 크게 2가지라고 생각합니다. 첫번째는 사용자가 컨텐츠를 생산하면 보상(STEEM)이 주어집니다. 두번째는 해당 서비스 앱이 없어지더라도 데이터는 블록체인에 남아있습니다. 그래서 다른 앱이 그자리를 대신할 수가 있습니다.

<br>


||
|-|
|**이전글**|
|[SNAX토큰 에어드랍받기 위한 글 : WHAN APP 기획 개발 이야기](https://steemit.com/sct/@anpigon/snax-whan-app)|


<br>

뉴비존님께서 예전에 한 장의 기획서를 저에게 전달해주셨습니다. 이게 벌써 한 달전이네요. 시간이 참 빠르다고 느껴졌습니다. 먼 미래에는 이 기획서를 AI에 입력하면 앱이 자동으로 생성되는 날이 왔으면 좋겠습니다. 그럼 앱개발자는 할일이 없어지겠지요? ㅎㅎ

![](https://steemitimages.com/640x0/https://cdn.steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/4fGSLV65-KakaoTalk_Image_2019-06-10-14-42-02.jpeg)

<br>이전에 올렸던 글 ["WHAN APP 기획 개발 이야기"](https://steemit.com/sct/@anpigon/snax-whan-app)에 이어서 개발을 조금 더 진행했습니다. 우선 앱의 첫 화면은 피드 화면입니다. 그리고 각 SCOT 전환은 탭 스크롤링으로 바꿔봤습니다. 

![](https://files.steempeak.com/file/steempeak/anpigon/K4ZeYrhn-list.gif)

사실 개발은 조금 더 많이 진행했습니다. 하지만 조금씩 보여드리곘습니다. 왜냐하면 개발 시리즈를 써야하기 때문입니다. 한번에 다 보여주면 글쓸 분량이 없어지기 때문에... ㅎㅎㅎ 

<br>

<center>![](https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmNpcHsY4vBGAxKez3HgK3B9k1MouVQ2YSqCHHVFi4QvPD/newLOGO_％EC％96％87％EC％9D％80.png)</center>

<br>

# 개발 내용

우선 SCOT 사이트 정보를 정리해서 `config.js`을 생성했습니다. SCOT 서비스 정보는 `https://scot-api.steem-engine.com` 에서 조회해서 확인했습니다.

![](https://files.steempeak.com/file/steempeak/anpigon/dOU6aRxk-code.png)

<br>그리고 `StackNavigator`를 생성합니다. 여기서 SCOT 토큰명이 탭 이름이 됩니다. 그리고 각 토큰에 해당하는 `<FeedScreen>` 컴포넌트를 생성합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/RXkXZG9D-code2.png)

<br>그 다음 `TopTabNavigator` 를 생성합니다. `lazy: true` 옵션을 사용하여 우선 렌더링을 하지 않습니다. 그리고 `scrollEnabled: true` 옵션으로 탭이 스크롤이 되도록 합니다. 나머지는 `style` 코드 내용은 탭 style에 대한 내용입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/TX4Cdc23-code4.png)

<br>

댓글, 팔로우, 업보팅해 주시는 모든 분들 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>
