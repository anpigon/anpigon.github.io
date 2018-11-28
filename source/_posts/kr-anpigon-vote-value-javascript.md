---
title: 내 보팅 가치(Vote Value)를 JavaScript로 계산하기
tags:
  - kr
  - kr-dev
  - busy
  - jjangjjangman
  - steemit
author: anpigon
date: 2018-08-02 17:39:45
---

내 보팅 가치를 계산하는 공식이 궁금하여 자료를 찾아보았습니다. 

다행히 @yoonsg님이 계산 공식을 잘 정리해 놓은 글이 있어서 참고하였습니다. 

 - [[스팀잇 이야기] #2. 보팅의 가치는 어떻게 산출될까?](/kr/@yoonsg/ahw8q-2)


<br>
계산 공식을 100％ 이해하기는 어려웠습니다. 자바스크립트로 구현하면서 정리한 내용을 공유합니다.



## Steem-js 라이브러리 사용

계산에 필요한 값들은 모두 [steem-js](https://github.com/steemit/steem-js) 라이브러리를 사용하여 스텔라 네트워크에서 가져왔습니다. 

```html
<html>
  <script src="//cdn.steemjs.com/lib/latest/steem.min.js"></script>
</html>
```



## Reward Fund 가져오기

계산 공식에 의하면, `reward_balance` 와 `recent_claims` 값이 필요합니다. `steem.api.getRewardFundAsync`함수를 사용해서 필요한 값들을 가져옵니다.

```js
// Reward Fund 가져오기
var rewardFund = await steem.api.getRewardFundAsync('post')

// reward balance                                                    
var rewardBalance = rewardFund.reward_balance.split(' ')[0]

// recent claims
var recentClaims = rewardFund.recent_claims
```



## SDB 가격 가져오기

`steem.api.getCurrentMedianHistoryPriceAsync` 함수를 사용해서 `base`와 `quote`값을 가져옵니다. 그리고 quote에 따른 STEEM 가격을 계산합니다.

```js
// Current Median History Price 가져오기
var price = await steem.api.getCurrentMedianHistoryPriceAsync()
var base = price.base.split(' ')[0]
var quote = price.quote.split(' ')[0]

// SBD / STEEM의 가격 비율
var steemPrice = base /quote 
```



## Global Properties 가져오기

`steem.api.getDynamicGlobalPropertiesAsync` 함수를 사용하여 `total_vesting_fund_steem`와  `total_vesting_shares`값을 가져옵니다. 참고로 이 두 값은 조회 할 때마다 계속 바뀝니다.

```js
// Global Properties 가져오기
var global = await steem.api.getDynamicGlobalPropertiesAsync()

// total Vesting Fund Steem
var totalVestingFundSteem = global.total_vesting_fund_steem.split(' ')[0]

// total Vesting Shares
var totalVestingShares = global.total_vesting_shares.split(' ')[0]		 
```



## 계정 정보 가져오기

마지막으로 `steem.api.getAccountsAsync` 함수를 사용하여, 계정 정보를 가져옵니다. `username` 변수의 값은 본인의 ID로 수정해야 합니다. 아래 코드에서는 *‘anpigon’* 이 사용되었습니다.

계정이 보유하고 있는 **스팀파워(steemPower)**와 **보팅파워(votingPower)**를 계산합니다. **보팅가중치(voteWeight)**는 *100％*라고 가정합니다.

```js
// 계정 정보 가져오기
var username = 'anpigon' // 조회할 유저ID
var account = (await steem.api.getAccountsAsync([username]))[0]

// 나의 Steem 계산하기
var vestingSteem = steem.formatter.vestingSteem(account, global)

// 대여받은 Steem 계산하기
var receivedVestingShares = account.received_vesting_shares.split(" ")[0]
var receivedVestingSteem = totalVestingFundSteem * (receivedVestingShares / totalVestingShares)

// 보유한 총 Steem(나의 Steem + 대여받은 Steem)
var steemPower = vestingSteem + receivedVestingSteem

var votingPower = account.voting_power // 현재 보팅 파워
var voteWeight = 1e4 // 보팅 가중치(100％)

console.log(`나의 보팅파워: $｛votingpower/100｝％\n나의 스팀파워: $｛steempower｝ [$｛vestingSteem｝ (+$｛receivedVestingSteem｝)]`) 
```



## 보팅 가치 계산하기

이제 가져온 값들을 공식에 넣어 계산합니다.

```js
// 보팅파워 * 보팅가중치에 따른 비율 계산
var rate = parseInt(votingPower * voteWeight / 1e4)
rate = parseInt((rate + 49) / 50) * 100 // 변환식(?)

// 나의 보팅 가치 계산
var voteValue = steemPower / (totalVestingFundSteem / totalVestingShares) * rate * (rewardBalance / recentClaims) * steemPrice

console.log(`나의 보팅 가치: \$$｛voteValue｝`)
```

현재 저의 보팅 가치 금액은 약 `$0.001` 로 나옵니다.ㅠㅠ



참고로 위의 코드는 모두 크롬 브라우저 콘솔창에서 실행되었습니다.

![img](https://i.imgur.com/p7qCb43.png)

### 마무리

계산 공식에 의하면 보팅 가치를 **$0.01** 를 올리기 위해서는 **약 128 SP** 이 필요합니다. 원화로 계산했을때, 업비트 거래소 현재가 기준으로 **약 16만원**이 필요합니다.

여기까지 읽어주셔서 감사합니다.