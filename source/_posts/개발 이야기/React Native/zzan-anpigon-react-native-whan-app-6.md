---
title: '[React Native] WHAN APP 개발 이야기 #6'
tags:
  
  
  
  
  
  
  
  
author: anpigon
date: 2019-07-18 12:50:21
---

![](https://files.steempeak.com/file/steempeak/anpigon/PA0Z9o93-whan_dapp_dev.png)
***

안녕하세요. 안피곤입니다.

간만에 업데이트 했습니다. 이번에는 사용자 프로필 화면을 추가했습니다. 상단에서 팝업 메뉴에서 **Profile**을 선택하면 내 프로필 화면으로 이동합니다. 그리고 글 목록에서 저자를 클릭하면 저자의 프로필 화면으로 이동합니다. 

![](https://files.steempeak.com/file/steempeak/anpigon/a4hyaFKM-2019-07-182011-18-28.gifcask.2019-07-182011_31_40.gif)

<br>아래 스크린샷도 첨부합니다. 아이언맨 프로필이 너무 멋져서 리얼맨권님 프로필 화면 스샷을 같이 첨부했습니다. ㅋ 요즘 SCT에서 열일하시는 모습이 존경스럽습니다.

|||
|-|-|
|![](https://files.steempeak.com/file/steempeak/anpigon/txYlfsHv-screenshot-1563416439177.jpg)|![](https://files.steempeak.com/file/steempeak/anpigon/yWv2cCX8-screenshot-1563416385983.jpg)|

<br>

그리고 이전에 개발했던 Whan Wallet 앱에서 보유 코인과 환산 가격을 보여줬습니다. 이 기능을 가져와서 Whan Dapp에 포함할 계획입니다. 

요즘 어떻게 하면 좀더 편하게  모바일앱에서 스팀잇을 이용할 수 있을까 고민을 많이 하고 있습니다. 그리고 전 요즘 SCOT 토큰 모으는 재미에 스팀잇을 하고 있습니다. 그래서 보유하고 있는 SCOT 토큰을 Whan Dapp에서  확인 할 수 있는 기능 구현에 집중할 생각입니다.

최근에 스팀 가격이 많이 떨어져서 속상합니다. 하지만 스팀에서 앞으로 재미있는 일들이 많이 발생할 것 같습니다. 

<br><center>![](https://steemitimages.com/320x0/https://ipfs.busy.org/ipfs/QmUKxtLW5JEnqaaAnwiLc9kFK1BqpcMGoFKTF7JLKcvJqy)</center><br>

<br>

# ScrollView에서 무한 스크롤 구현하기

상단 프로필 영역과 글 목록을 같이 스크롤링 하기위해서 **ScrollView**를 사용했습니다. 그래서 글 더 보기 기능에서 `FlatList.onEndReached`를 사용하지 않고 `ScrollView.onScroll` 를 사용했습니다. 그래서 `onScroll`에서 화면 높이를 계산해서 글 더보기 함수 `onLoadMore()`를 호출하고 있습니다.

![](https://files.steempeak.com/file/steempeak/anpigon/SFz4VLh2-code.png)

<br>

댓글, 팔로우, 업보팅해 주시는 모든 분들 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>