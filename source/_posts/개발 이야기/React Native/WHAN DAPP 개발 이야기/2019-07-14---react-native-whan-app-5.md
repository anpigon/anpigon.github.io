---
title: "[React Native] WHAN DAPP 개발 이야기 #5"
author: anpigon
date: "2019-07-14T11:39:06Z"
permalink: "/zzan/@anpigon/react-native-whan-app-5"
tags:
  - "React Native"
  - "WHAN DAPP"
---
![](https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/anpigon/PA0Z9o93-whan_dapp_dev.png)
***

안녕하세요. 안피곤입니다.

며칠 전에 React Native 버전 0.60.2가 릴리즈 되었습니다. v0.60.2 버전에는 Chain React Conf 2019에서 발표된 Hermes JavaScript Engine이 포함되었습니다. Hermes는 React Native 앱을 실행하기 위해 최적화된 자바 스크립트 엔진입니다. Hermes를 사용하면 앱 시작 시간이 빨라지고 메모리 사용량이 줄고 앱 크기가 줄어듭니다. *(참고: https://facebook.github.io/react-native/docs/hermes)*

<br>그리고 다음은 v0.60.x의 주요 변경 사항입니다.

- AndroidX support (this will be a Breaking Change!)
- Full removal of WebView & Geolocation, you now need to rely on the extracted versions
- CocoaPods integration by default
- Autolinking of packages

<br>React Native 코어에서 WebView와 Geolocation가 제거 되었습니다. 이제 WebView은 별도로 설치해서 사용해야합니다. *(참고: [https://github.com/react-native-community/react-native-webview](https://github.com/react-native-community/react-native-webview), [https://github.com/react-native-community/react-native-geolocation](https://github.com/react-native-community/react-native-geolocation))*

https://github.com/react-native-community 를 들어가보면 아시겠지만, 대부분의 모듈이 React Native에서 분리되었습니다. 라이브러리 크기가 점점 커져서 어쩔수 없는 선택이라고 생각합니다.

그리고 제가 사용하고 있는 FastImage 라이브러리도 몇 일전에 React Native 0.60.0에 대응하여 CocoaPods와 Android X 패치가 적용되었습니다. *(참고: https://github.com/DylanVann/react-native-fast-image/commit/5489f9ec4bbc80c657ac351130771637d1f61672)*

Hermes 엔진을 사용하고 싶었습니다. 그래서 개발하고 있는 Whan Dapp도 React Native 버전 0.60.2으로 업그레이드하려고 시도했습니다. 하지만 Android X를 아직 지원하지 않는 라이브러리가 있어서 빌드에서 오류가 발생합니다. ㅠㅠ 다행이 stackoverflow 에서 해결 방법을 찾았습니다. *(참고: https://stackoverflow.com/a/56956104)*

[jetifier](https://github.com/mikehardy/jetifier)를 사용하여 node_modules 라이브러리를 AndroidX 로 변환하였습니다. 이 방법으로 빌드에는 성공했습니다. 하지만 실행하자마자 앱이 죽고 화면이 백지에서 넘어가지 않는 등... 심각한 오류가 발생합니다. 그래서 다시 React Native 0.59.x로 다운그레이드 하였습니다. ㅠㅠ  아직 스킬이 많이 부족하다고 생각이 들었습니다.

<br>

<br><center>![](https://steemitimages.com/320x0/https://ipfs.busy.org/ipfs/QmUKxtLW5JEnqaaAnwiLc9kFK1BqpcMGoFKTF7JLKcvJqy)</center><br>

<br>

그리고 금일 다음 기능을 Whan Dapp에 추가하였습니다. 아직 구글 플레이 스토어에 배포는 하지 않았습니다. 오늘 밤이나 내일 중에 할 것 같습니다.

<br>

## 댓글 수정 기능

이제 내가 작성한 댓글을 수정할 수 있습니다. 내가 만든 댓글 수정 기능을 테스트하면서 햅뽀이님이 만든 happy-pick을  테스트했습니다. ㅋ 

<div class='pull-left'>

|||
|-|-|
|![](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/LMMKXKDN-KakaoTalk_Photo_2019-07-14-19-19-06.jpeg)|![](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/33ay3wsQ-KakaoTalk_Photo_2019-07-14-19-19-09.jpeg)|
</div><hr>

> 햅뽀이님의 **happy-pick**도 많이 이용해주세요. - 관련글: "[happy-pick 추첨기능 한번 이용해보세요.(wdice와 유사한 기능입니다.)](https://steemit.com/sct/@happyberrysboy/happy-pick-wdice)"

<br>
<br>

## 업보팅 기능

업보팅 기능을 추가하였습니다. 다음번 업데이트에는 좀 더 보완해서 토큰별 보팅 파워를 보여줄 계획입니다. 본문에 사용된 태그를 파악하여 토큰별 보팅 파워와 토큰 수량 정보를 보여주면 매우 편리할 것 같습니다. 참고로 아직 다운 보팅이나 보팅 취소 기능은 없습니다. 

<div class='pull-left'>

|||
|-|-|
|![](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/uow3P330-KakaoTalk_Photo_2019-07-14-19-19-03.jpeg)|![](https://files.steempeak.com/file/steempeak/anpigon/HsnVPtMJ-1px.gif)|
</div><hr>

<br>
<br>

## 활동(Activties) 내역

사용자 메뉴에서 activties 메뉴를 선택하면 Activties 화면으로 이동합니다. 아직 Activtiy 상세 내역 화면을 구현하지 않았습니다. 그래서 Activties 목록 중 하나를 선택하면 브라우저가 실행되면서 스팀잇 사이트로 이동합니다.

<div class='pull-left'>

|||
|-|-|
|![](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/cENP2KyV-KakaoTalk_Photo_2019-07-14-19-18-56.jpeg)|![](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/L2x6Dqf4-KakaoTalk_Photo_2019-07-14-19-18-59.jpeg)|
</div><hr>

<br>
<br>

## 검색

제가 필요하다고 생각하여 검색 기능을 추가하였습니다. 아직 검색 기능이 많이 미흡합니다. 차츰 업그레이드해볼 계획입니다. 가능할지는 잘 모르겠습니다. 스팀잇은 검색 엔진이 없기 때문에 구글 검색에 의존하고 있습니다. 포스팅, 댓글 검색이 가능합니다. 차후 [@사용자](/#) 검색과 [#태그](/#) 검색을 추가할 계획입니다.

<div class='pull-left'>

|||
|-|-|
|![](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/dR7lxInD-KakaoTalk_Image_2019-07-14-19-38-44.jpeg)|![](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/wvxNGNTS-KakaoTalk_Photo_2019-07-14-19-18-51.jpeg)|
</div><hr>

<br>
<br>

댓글, 팔로우, 업보팅해 주시는 모든 분들 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

*** 

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>
