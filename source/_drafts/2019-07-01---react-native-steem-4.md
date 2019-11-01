---
title: "[React Native] Steem 모바일 지갑앱 만들기 #4"
author: anpigon
date: "2019-07-01T04:02:36Z"
permalink: "/sct/@anpigon/react-native-steem-4"
tags:
  - "sct"
  - "kr"
  - "kr-dev"
  - "zzan"
  - "thegivingtree"
  - "busy"
  - "jjm"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
***

안녕하세요. 안피곤입니다.

Steem 모바일 지갑앱 만들기 4번째 포스팅입니다. 이번에는 스팀 + 스팀엔진 토큰의 마켓 가격을 계산하여 총 자산 금액을 보여주는 기능을 추가하였습니다. **Total Assets** 에 표시된 금액이 제가 보유하고 있는 총 자산의 USD 금액입니다.

|![](https://files.steempeak.com/file/steempeak/anpigon/NPlJ4SZZ-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-07-0120E1848BE185A9E1848CE185A5E186AB2011.37.14.png)|![](https://files.steempeak.com/file/steempeak/anpigon/jRf9ZiMk-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-07-0120E1848BE185A9E1848CE185A5E186AB2011.37.21.png)|
|-|-|

> 참고로 지갑앱은 Whan팀 내에서만 테스트하고 있습니다. 그리고 아직 송금 기능이 없어서, 저는 개인적으로 잔액 확인 용도로만 사용하고 있습니다.

<br>

***

###### 시리즈글
▪︎ [\[React Native\] Steem 모바일 지갑앱 만들기 #1](/kr/@anpigon/react-native-steem-1)
▪︎ [\[React Native\] Steem 모바일 지갑앱 만들기 #2](/kr/@anpigon/react-native-steem-2)
▪︎ [\[React Native\] Steem 모바일 지갑앱 만들기 #3](/kr/@anpigon/react-native-steem-3)

***

<br>
<br>

<center>![](https://cdn.steemitimages.com/300x0/https://ipfs.busy.org/ipfs/QmUKxtLW5JEnqaaAnwiLc9kFK1BqpcMGoFKTF7JLKcvJqy)</center>

<br>
<br>


#### 스팀과 스팀달러 마켓 가격을 확인할 수 있는 무료 API

바로 전 포스팅에서 스팀과 스팀달러 마켓 가격을 코인마켓캡 API에서 가져오게 구현했습니다. 하지만 코인마켓캡의 API는 무료 사용량이 제한되어 있습니다. 그래서 개발하고 테스트하다 보면  하루 사용량을 금방 다 써버립니다. ㅠㅠ  검색해보니 무료 API가 있어서 갈아탔습니다. ㅋ

`https://postpromoter.net/api/prices`를 요청하면 다음과 같은 결과를 받을 수 있습니다.
```
｛
	"sbd_price":0.9654108693894001,
	"steem_price":0.3639348516,
	"se_token_prices":｛
		"PAL":0.39,
		"SCT":1.51203,
		"DEC":0.00267,
		"AAA":0.00315
	｝
｝
```

<br>

그리고 다음은 구현된 코드 내용입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/PozYwfdx-code.png)

>  HTTP 통신에는 `axios` 라이브러리를 사용했습니다. 기본 모듈인 `fetch`를 사용하는게 성능이 더 좋지만, 저는 범용성을 위해서 `axios`를 많이 사용합니다.


<br>
<br>

#### 스팀엔진 토큰 마켓 가격 가져오기

 [**sscjs**](https://github.com/harpagon210/sscjs) 라이브러리를 사용하여 스팀엔진 토큰 마켓 가격을 가져옵니다. 다음과 같은 결과를 받을 수 있습니다.

```
[
  ｛
    "symbol": "SCT",
    "volume": "3974.81155503",
    "volumeExpiration": 1562034918,
    "lastPrice": "1.52099",
    "lowestAsk": "1.52100",
    "highestBid": "1.52099",
    "lastDayPrice": "1.51106",
    "lastDayPriceExpiration": 1561993083,
    "priceChangeSteem": "0.00993000",
    "priceChangePercent": "0.66％",
    "$loki": 206
  ｝,
  // ...
]
```

<br>

그리고 다음은 구현된 코드 내용입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/5zlEijUo-code2.png)
> 잔액이 0 이상인 토큰 마켓 가격만 가져오기 위해서 `$or` 조건을 사용하였습니다. 몽고 DB 쿼리문을 그대로 사용할 수 있는 것 같습니다. 예를 들어 내가 가지고 있는 토큰만 조회하고 싶다면, `"query":｛$or:[｛symbol:"SCT"｝,｛symbol:"AAA"｝]｝` 형태로 조회합니다.

<br>

그리고 스팀엔진 마켓의 `lastPrice` 가격으로 USD 가격을 계산하였습니다.

```
token.price = token.totalBalance * marketPrice.lastPrice * steemPrice;
```

<br>
<br>

댓글, 팔로우, 업보팅해 주시는 모든 분들 감사합니다. 

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>
