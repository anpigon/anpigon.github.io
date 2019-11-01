---
title: "[React Native] Steem 모바일 지갑앱 만들기 #3"
author: anpigon
date: "2019-06-29T02:15:15Z"
permalink: "/sct/@anpigon/react-native-steem-3"
tags:
  - "React Native"
  - "Steem"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
***

안녕하세요. 안피곤입니다.

Steem 모바일 지갑앱 만들기 3번째 포스팅입니다. 이 시리즈의 2번째 포스팅 올린 게 벌써 2달 전이네요. ㅎㅎ 시간이 참 빨리 흘러간다고 느껴집니다. 

간만에 지갑에 기능을 업데이트 했습니다. 참고로 지갑앱은 Whan팀 내에서만 테스트하고 있습니다. 그리고 아직 송금 기능이 없어서, 저는 개인적으로 잔액 확인 용도로만 사용하고 있어요.

<br>

***

###### 시리즈글
▪︎ [\[React Native\] Steem 모바일 지갑앱 만들기 #1](/kr/@anpigon/react-native-steem-1)
▪︎ [\[React Native\] Steem 모바일 지갑앱 만들기 #2](/kr/@anpigon/react-native-steem-2)

***

<br>
<br>

<center>![](https://cdn.steemitimages.com/300x0/https://ipfs.busy.org/ipfs/QmUKxtLW5JEnqaaAnwiLc9kFK1BqpcMGoFKTF7JLKcvJqy)</center>

<br>
<br>

## 개발 내용

지갑 목록 화면에서 스팀, 스팀달러, 스팀파워, 그리고 스팀엔진 토큰 잔액을 보여줍니다. 그리고 부기님(gfriend96) 요청으로 **보유 코인만 보기 옵션**을 추가했습니다. STEEM과 SBD 가격은 코인마켓캡 API를 이용하였습니다. 새로고침(Refresh)은 끌어당김(Pull Down)으로 동작합니다.

![](https://steemitimages.com/360x0/https://files.steempeak.com/file/steempeak/anpigon/HVE57Qrl-Screenshot_20190629-004457_WhanWallet.jpg)

<br>
<br>

## 스팀/스달 가격 보여주기 - 코인마켓 캡

> https://coinmarketcap.com/api/

코인마켓캡 API를 사용하기 위해서, 코인마켓캡 개발자 콘솔에서 API 키를 발급받았습니다. 그런데 예전에는 티커 API가 완전 무료였는데, 이번에는 호출 횟수 제한이 생겼습니다. ㅠ 

![](https://files.steempeak.com/file/steempeak/anpigon/nXCw3nZp-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2920E1848BE185A9E1848CE185A5E186AB2010.22.49.png)
> API는 하루에 최대 333번 호출할 수 있고, 한 달에 최대 10,000까지 호출 가능합니다. 테스트하면서 다 사용해버릴 것 같습니다. ㅜ

<br>

앱을 서비스해서 제대로 사용하려면 비용을 지불해야 할 것 같습니다. 아래는 코인마켓캡 API 사용 등급에 따른 가격표입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/MKKRe54s-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2920E1848BE185A9E1848CE185A5E186AB2010.51.42.png)

하지만 코인마켓캡 API 가격표를 보면 저렴하지 않습니다. 한달에 $29를 지불하더라도 하루 호출 횟수가 1,300건입니다. 가난한 개발자는 티커 API 서버를 따로 만들어서 운영해야할 것 같습니다. 아니면 코인마켓캡 API를 캐시하고 캐시된 데이터를 제공하는 서비스를 만들어도 좋을 것 같습니다. 

> 제 계획은 [Stellarterm Ticker API](https://api.stellarterm.com/v1/ticker.json) 처럼 1분마다 깃헙 페이지에 `ticker.json` 파일을 생성해서 서비스할 생각입니다.

<br>
<br>

## 코인마켓캡 API 구현 코드

아래는 코인마켓캡 API를 이용하여 최근 마켓 가격을 가져오는 코드입니다. 인자값 `id`에서 `1230`가 STEEM이고 `1312`는 SBD입니다. 참고로 `slug=steem,sbd`나 `symbol=STEEM,SBD` 로 가격을 가져오는 방법도 있습니다.

![](https://files.steempeak.com/file/steempeak/anpigon/NbbCRnNc-code2.png)

<br>
<br>

### 완성 화면

지금까지 완성된 앱 동작 화면입니다.

![20190629 100923.20190629 10_11_48.gif](https://files.steempeak.com/file/steempeak/anpigon/yu01JcGK-2019-06-292010-09-23.2019-06-292010_11_48.gif)


<br>

댓글, 팔로우, 업보팅해 주시는 모든 분들 감사합니다. 

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>
