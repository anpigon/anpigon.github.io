---
title: '[React Native] WHAN APP 개발 이야기 #8 : react-native-cache  사용하기'
tags:
  
  
  
  
  
  
  
  
  
  
author: anpigon
date: 2019-08-04 18:49:45
---

![](https://files.steempeak.com/file/steempeak/anpigon/PA0Z9o93-whan_dapp_dev.png)
***

안녕하세요. 안피곤입니다.

스팀잇에 글을 올려서 보상받기 위해서 시작한 시리즈 글의 8번째 포스팅입니다.  스팀잇 초기에는 글을 써서 보상받는 게 목적이었다면, 지금은 보상받기 위해 글을 씁니다. 

이번 포스팅은 react-native-cache  사용하는 개발 이야기입니다. 개발 시리즈를 계속 진행하다 보면 **Whan Dapp**의 완성도가 올라갈 거라고 생각합니다. 지금 개발 속도로 보았을때 앱을 완성하기까지 약 1년으로 예상합니다. 이 시리즈 글도 1년 정도 유지할 수 있겠네요. ㅋ

<br>

# Whan Dapp 구현 방향 고민하기

최근 **Whan Dapp**을 사용하다가 불편해서, 하단 탭에서 지갑과 프로필 화면으로 이동할 수 있게 변경했습니다. 저는 앱에서 지갑과 프로필 화면을 자주 봅니다. 그래서 하단 탭에서 이동할 수 있으니 사용하기 편해졌습니다. 제가 사용하면서 불편한 부분을 조금씩 고치고 새로운 기능을 붙여나가는 중입니다. 

||||
|-|-|-|
|![](https://files.steempeak.com/file/steempeak/anpigon/YKLqhAHB-KakaoTalk_Photo_2019-08-04-17-05-37.jpeg)|![](https://files.steempeak.com/file/steempeak/anpigon/NvXIP7ku-KakaoTalk_Photo_2019-08-04-17-05-32.jpeg)|![](https://files.steempeak.com/file/steempeak/anpigon/yTwZpDoG-KakaoTalk_Photo_2019-08-04-17-05-42.jpeg)|

<br>

Feed 화면은 카테고리(태그?)를 어떻게 구현하는 게 사용면에서 좋을지 계속 고민 중입니다. 제가 자주 보는 태그는 #kr, #kr-dev, #sct, #zzan, #liv, #aaa, #movie, #coin, #book, #kr-book, #booksteem, #literature, #kr-hobby, #hobby, #arts 등 입니다. 게다가 다른 태그도 마찬가지겠지만, 도서(book)는 태그 파편화가 심해서 조금 불편합니다.

저는 zzan 커뮤니티의 태그 분류가 가장 잘되어 있다고 생각합니다. 하지만 nitrous에서는 페이 아웃된 글은 볼 수가 없어서 매우 불편하네요. 이렇게 불편한 게 한두 개가 아닌데 스팀잇을 열심히 하고 있는 제가 신기합니다. 아마도 돼지꼬리만한 보상 때문인 것 같습니다. 

제 스팀 파워로는 스팀잇에서 돌고래도 안됩니다. 그래서 zzan에서라도 돌고래가 되고 싶어서, zzan 토큰을 소량 매수하였습니다. 덕분에  zzan 홀더 0.1%에 겨우 도달했습니다. 하지만 zzan 토큰을 지속적으로 매수하지 않으면 곧 밀려나갈 것 같아요. ㅠ 하지만 열심히 하면 언젠가 짠고래(ZZAN Whale)가 되겠죠. ㅎㅎ

매번 포스팅에서 이야기했지만, 최근 scot-api가 많이 느려졌습니다. 그래서 토큰 지갑은 잔액을 확인하는 데에는 기다림이 필요합니다. 가끔 API에서 응답을 못 받아서 화면에 데이터가 안보이면 새로고침 한번씩 해주세요. ㅋ

<br>
<br>

# Whan Dapp 테스트 사용자는 3명

**Whan Dapp**은 현재 저를 포함하여 3분이 테스트 하고 계십니다. 누군지 알 것 같습니다. ㅋ

||
|-|
|![](https://files.steempeak.com/file/steempeak/anpigon/8oSaPeAL-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-0420E1848BE185A9E18492E185AE205.07.57.png)|

 테스트앱을 사용하고 싶은 분은 저에게 discord로 요청해주세요. 단, 안드로이드만 테스트 가능합니다.
\- discord 링크: https://discord.gg/a37gG7f

<br>

앱 퀄리티가 너무 낮아서 아직 공개하기 민망합니다. 그리고 개인적인 시간이 많지 않아서, 앱 안정화보다는 기능 구현에 집중하고 있습니다. 그러다 보니 앱을 사용하다가 가끔  FC(Force Close)가 발생합니다. FC가 발생하면 자동으로 Stack Trace를 남기고, 해당 로그를 개발자 이메일로 전송하고 싶은데 방법을 모르겠습니다. ㅠ

<br>
<br>

# Whan Dapp 개발 내용

### react-native-cache  사용하기

리액트 네이티브 캐시 기능 구현을 위해서 [react-native-cache](https://github.com/timfpark/react-native-cache) 모듈을 사용합니다.

<br>

**설치방법**
```
npm install --save react-native-cache
```

<br>

**사용방법**
```
import { Cache } from "react-native-cache";

var cache = new Cache({
    namespace: "myapp",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});
```

<br>

**적용하기**

먼저 cache의 `setItem`과 `getItem` 함수를 Promise 형태로 만듭니다.

![](https://files.steempeak.com/file/steempeak/anpigon/il6HDiaH-code1.png)

현재 react-native-cache 모듈은 Callback 함수만 제공합니다. 저는 코드에서`async/await`를 정말 많이 사용합니다. 그래서 callback 함수는 대부분 Promise wrapper 함수를 만들어 사용합니다.

<br>

아래는 제가 구현하여 사용한 코드입니다. 내용을 살펴보면 캐시 데이터가 있으면 캐시된 데이터를 먼저 사용합니다. 그리고나서 서버에서 가져온 데이터를 사용합니다. 그리고 서버에서 가져온 데이터를 캐시 저장소에 업데이트합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/jV00fSYW-code2.png)

<br>

scot-api의 느린 속도 때문에 답답해서, 마켓 정보를 가져오는 marketMetrics API 에 캐시를 적용했습니다. 사실 마켓 정보는 실시간으로 보여줘야 합니다.  하지만 whan dapp은 scot-api에 의존하기 때문에 다른 방법이 없습니다. 

최근 업데이트한 일시와 함께 캐시된 정보를 먼저 보여준다면, 앱 사용하는데 불편함을 줄일 수 있을 거라고 생각합니다.

<br>

아래는 구현된 화면입니다. 마켓 정보를 가져와서 보여주고 있습니다. 

![](https://files.steempeak.com/file/steempeak/anpigon/TboXEPNx-2019-08-042017-46-34.2019-08-042017_47_31.gif)
상단 헤더가 없으니, iOS 단말에서는 화면과  Status Bar이 겹쳐서 보입니. 하지만 **Whan Dapp**은 안드로이드 앱으로만 출시 할 것이라서, iOS에서는 화면이 이렇게 보여도 그냥 진행하고 있습니다. 

<br>
<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>

<br>

||
|-|
|**이전글**|
|[WHAN APP 기획 개발 이야기 #1](/sct/@anpigon/snax-whan-app)|
|[WHAN APP 개발 이야기 #2](/zzan/@anpigon/react-native-whan-app-2)|
|[WHAN APP 개발 이야기 #3](/test/@anpigon/20190709t020445612z)|
|[WHAN APP 개발 이야기 #4](/zzan/@anpigon/react-native-whan-app-4)|
|[WHAN APP 개발 이야기 #5](/zzan/@anpigon/react-native-whan-app-5)|
|[WHAN APP 개발 이야기 #6](/zzan/@anpigon/react-native-whan-app-6)|
|[WHAN APP 개발 이야기 #7](/zzan/@anpigon/20190721033641041z)|
