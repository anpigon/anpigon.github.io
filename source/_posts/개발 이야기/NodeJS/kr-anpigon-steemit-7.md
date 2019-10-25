---
title: ' 스팀잇(Steemit)기반 앱 만들기 #7 - 사용자 프로필 패널 구현하기'
tags:
  - kr
  - kr-dev
  - busy
  - jjangjjangman
  - kr-newbie
author: anpigon
date: 2018-08-19 20:10:33
---

<div class='text-center'>

![스팀잇 웹앱 만들기](https://steemitimages.com/0x200/https://imgur.com/ET3mAqF.png)

</div>

안녕하세요. @anpigon입니다.

이 포스팅은 제가 스팀잇과 프론트엔드 기술을 공부면서 앱을 구현하는 과정을 정리한 글입니다. 그래서 설명이 많이 부족할 수 있습니다. 궁금한 사항은 댓글로 문의하시면, 최대한 답변해드리도록 노력하겠습니다. 

이번에는 사용자 프로필을 보여주는 패널을 구현하였습니다. 아래 화면을 보시면 왼쪽 상단에 사용자 프로필을 보여주는 영역이 추가되었습니다.

![스크린샷](https://imgur.com/prGsCPx.png)

<sup>구현된 앱은 [steemlog.github.io](https://steemlog.github.io/)에서 확인 할 수 있습니다.</sup>

___

# 사용자 정보 패널 구현하기

이번에 구현할 파일 구조는 아래와 같다.

```
src
├── components
│   ├── panels # 패널 컴포넌트들
│   │   └── UserProfilePanel.vue # 사용자 프로필 패널
│   └── ...
└── store
    ├── ...
    └── modules
        ├── account # 계정을 관리
        ├── global.js # 글로벌 속성 관리
        └── ...
```

<br>
___





### UserProfilePanel.vue 파일  생성하기

사용자 프로필을 보여주는 영역은 별도의 컴포넌트로 구현한다. 아래와 같이 **components/panels/UserProfilePanel.vue** 파일을 생성한다. 

```html
<template>
  <v-card>
    <v-card-media>
      <img src='https://steemitimages.com/0x100/https://steemitimages.com/DQmbbsXGpDwSwwxoUXurjFUvxcm2vFVYpVJG53ZNKPVmUDR/0b1e69ca63199afcb690ecf29ad6bcb9.jpg'>
    </v-card-media>
    <v-avatar size="64">
      <img src='https://steemitimages.com/u/anpigon/avatar'>
      </v-avatar>
    <v-card-title class='pt-0'>
      <div class='username'>
        <span>안피곤</span>
        <span>(45)</span>
        <div>@anpigon</div>
      </div>
      <div>수면의 과학</div>
    </v-card-title>
    <v-card-text class='pt-0'>
      <div><v-icon small>power</v-icon> 보팅 파워: 70％</div>
      <div><v-icon label small>attach_money</v-icon> 보팅 금액: $0.001</div>
    </v-card-text>
  </v-card>
</template>
<script>
  export default ｛
    name: 'UserProfilePanel'
  ｝
</script>
<style scoped>
.v-avatar ｛
  margin: -120px 0px 0px 15px;
｝
.v-avatar img ｛
  border: 2px solid #fff
｝
.username ｛
  position: absolute;
  top: 26px;
  left: 95px;
  color: white;
  line-height: 160％;
  font-weight:bold;
  text-shadow: 0 0 4px rgba(0,0,0,.8);
｝
.username > span:first-child ｛
  font-size: 32px;
｝
</style>
```

그리고 **store/modules/auth.js**를 수정한다. 아래와 같이 로그인 여부를 조회하는 **isLogin**를 `getters`에 추가한다. **isLogin**은 `state.username`에 값이 있으면 **true**를 없으면 **false**를 반환한다.

```js
const getters = ｛
  // 로그인 여부 조회
  isLogin: state => ｛
    // username 값이 있으면 로그인 상태이다.
    return !!
  ｝
｝
```

이제 Main 화면에서 사용자 정보를 보여주기 위해 **Main.vue**를 수정한다. 아래와 같이 **computed 속성**을 사용하여 로그인 상태일때만 사용자 프로필 컴포넌트를 불러와서 보여주도록 한다. **computed**는 계산된 속성이라고 한다. 그래서 값이 변경되면 다시 계산된 값을 반환해준다.

```js
export default ｛
  // ...
  computed: ｛
    UserProfilePanel () ｛
      if (this.$store.getters['auth/isLogin']) ｛
        return () => import('@/components/panels/UserProfilePanel')
      ｝ else ｛
        return ''
      ｝
    ｝
  ｝,
  // ...
｝
```

그러고 나서 **Main.vue**의 `<template>` 에 `<component :is='UserProfilePanel'></component>` 코드를 삽입한다. 

```html
<template>
  <v-container fill-height grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md3>
        
        <component :is='UserProfilePanel'></component>
        
      </v-flex>
      <v-flex xs12 md9>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">         
```

우리는 `computed` 속성을 사용하여 로그인한 상태인 경우에만 **UserProfilePanel 컴포넌트**를 임포트하여 사용하고 있다. 그래서 **UserProfilePanel 컴포넌트**를 사용하기 위해서는 `<component>`의 `is`옵션을 사용하여 컴포넌트를 렌더링해야 에러없이 해당 컴포넌트를 보여줄 수 있다.



여기까지 구현된 화면이다.

<div class='text-center'>

![](http://steemitimages.com/500x0/https://imgur.com/hOuYnXR.png)

</div>

<br>
___




## 사용자 정보 저장소 구현하기

이제 사용자 정보를 관리할 **account** 저장소를 구현한다. 아래와 같이 **store/modules/account.js** 파일을 생성한다.

```js
const state = ｛
  name: '',
  profileImage: '',
  coverImage: '',
  about: '',
  reputation: 0,
  postCount: 0,
  lastVoteTime: 0,
  votingPower: 0,
  vestingShares: 0,
  delegatedVestingShares: 0,
  receivedVestingShares: 0
｝
```

그리고 사용자 정보를 저장소의 상태(state)에 커밋(commit)할 수 있는 **setAccount** 변이(mutations)을 구현한다. 액션에서 가져온 사용자 정보를 상태에 저장할 때 사용 할 것이다.

```js
const mutations = ｛
  // ...
  setAccount (state, account) ｛
    // state에 account 정보 저장
    for (const key in account) ｛
      state[key] = account[key]
    ｝
  ｝
｝
```

스팀잇 네트워크에서 사용자 정보를 가져오는 **loadAccount** 액션을 구현한다. 
```js
import steem from 'steem'

const actions = ｛
  // ...
  async loadAccount (｛ commit, state ｝) ｛

    // 스팀잇 네트워크에서 사용자 정보 조회
    const [ account ] = await steem.api.getAccountsAsync([state.username])

    // 메타 정보 파싱
    const ｛ profile ｝ = JSON.parse(account.json_metadata) 

    const data = ｛
      name: profile.name, // 이름
      coverImage: profile.cover_image, // 커버 이미지
      profileImage: profile.profile_image, // 프로필 이미지
      about: profile.about, // 자기 소개
      reputation: steem.formatter.reputation(account.reputation), // 명성도
      postCount: account.post_count, // 포스트 갯수
      lastVoteTime: account.last_vote_time, // 마지막 보팅 시간
      votingPower: account.voting_power, // 남은 보팅 파워
      vestingShares: parseFloat(account.vesting_shares.split(' ')[0]), // 스팀 파워(VEST)
      delegatedVestingShares: parseFloat(account.delegated_vesting_shares.split(' ')[0]),
      receivedVestingShares: parseFloat(account.received_vesting_shares.split(' ')[0])
    ｝

    // setAccount 뮤테이션 커밋
    commit('setAccount', data)
  ｝
｝
```
<br>
___


## 글로벌 프로퍼티 저장소 구현하기

스팀파워와 보팅금액을 계산하는데 글로벌 프로퍼티값이 필요하다. 그래서 글로벌 프로퍼티값을 관리할 **global** 저장소를 구현한다. 아래와 같이 **store/modules/global.js** 파일을 생성한다. 

```js
import steem from 'steem'

const state = ｛
  totalVestingFundSteem: 0,
  totalVestingShares: 0,
  rewardBalance: 0,
  recentClaims: 0,
  price: 0
｝

const getters = ｛
｝

const actions = ｛
  loadGlobalProperties (｛ commit ｝) ｛
    Promise.all([
      steem.api.getDynamicGlobalPropertiesAsync(),
      steem.api.getRewardFundAsync('post'),
      steem.api.getCurrentMedianHistoryPriceAsync()
    ]).then(function ([ global, rewardFund, price ]) ｛
      const base = parseFloat(price.base.split(' ')[0])
      const quote = parseFloat(price.quote.split(' ')[0])
      commit('setGlobalProperties', ｛
        totalVestingFundSteem: parseFloat(global.total_vesting_fund_steem.split(' ')[0]),
        totalVestingShares: parseFloat(global.total_vesting_shares.split(' ')[0]),
        rewardBalance: parseFloat(rewardFund.reward_balance.split(' ')[0]),
        recentClaims: rewardFund.recent_claims,
        price: (base / quote)
      ｝)
    ｝)
  ｝
｝

const mutations = ｛
  setGlobalProperties (state, global) ｛
    for (const key in global) ｛
      state[key] = global[key]
    ｝
  ｝
｝

export default ｛
  namespaced: true,
  state,
  getters,
  actions,
  mutations
｝
```
<br>
___

## store/index.js 수정

앞서 구현한 **account.js**와 **global.js**를 루트 저장소에 추가한다.


```js
import global from './modules/global'
import account from './modules/account'

export default new Vuex.Store(｛
  modules: ｛
    global,
    account,
    // ...
  ｝
｝)
```


<br>
___


### UserProfilePanel.vue 수정

스팃잇 네트워크에서 가져온 실제 사용자 정보를 보여주기 위해서 **UserProfilePanel.vue 컴포넌트**를 수정한다. `computed`에 **global 저장소**와 **account 저장소**의 `state`를 추가한다.

```js
export default ｛
  computed: ｛
    ...mapState('auth', ['username']), // this.$store.state.auth.username
    ...mapState(｛
      global: state => state.global // 글로벌 프로퍼티
    ｝),
    ...mapState(｛
      account: state => state.account // 사용자 정보
    ｝)
  ｝
｝
```

vestingShares를 스팀파워로 변환하는 `formatterVestingSteem()` 함수를 구현한다.

```js
methods: ｛
  formatterVestingSteem (vestingShares) ｛
    return this.global.totalVestingFundSteem * (vestingShares / this.global.totalVestingShares)
  ｝
｝
```

computed에 아래와 같이 계산된 속성을 추가한다.

```js
computed: ｛
  // 스팀파워
  vestingSteem () ｛
    return this.formatterVestingSteem(this.account.vestingShares)
  ｝,
  // 위임한 스팀파워
  delegatedVestingSteem () ｛
    return this.formatterVestingSteem(this.account.delegatedVestingShares)
  ｝,
  // 임대받은 스팀파워
  receivedVestingSteem () ｛
    return this.formatterVestingSteem(this.account.receivedVestingShares)
  ｝,
  // 총 스팀파워
  totalSteemPower () ｛
    return this.vestingSteem + this.delegatedVestingSteem + this.receivedVestingSteem
  ｝,
  // 보팅파워
  votePower () ｛
    const elapsedSeconds = (new Date() - new Date(this.account.lastVoteTime + 'Z')) / 1000 // 마지막 보팅 후 경과 시간
    const regeneratedPower = (10000 * elapsedSeconds) / (60 * 60 * 24 * 5) // 재생된 보팅파워
    const currentPower = Math.round(Math.min(this.account.votingPower + regeneratedPower, 10000)) // 현재 보팅파워
    return (currentPower / 100) || 0
  ｝,
  // 남은 보팅파워 재생시간
  remainHours () ｛
    return (10000 - this.votePower) * (5 * 60 * 60 * 24) / (60 * 60 * 10000)
  ｝,
  // 보팅 금액
  upvoteValue () ｛
    const rate = parseInt((this.votePower * 100 + 49) / 50) * 100
    const upvoteValue = (this.totalSteemPower / (this.global.totalVestingFundSteem / this.global.totalVestingShares) * rate * (this.global.rewardBalance / this.global.recentClaims)) * this.global.price
    return upvoteValue || 0
  ｝
｝
```

`created()` 함수를 사용하여 **UserProfilePanel.vue 컴포넌트**가 생성되었을때 사용자 정보와 글로벌 프로퍼티값을 가져오게하자. 아래와 같이 global 저장소와 account 저장소의 액션을 호출한다.

```js
import ｛ mapState ｝ from 'vuex'

export default ｛
  // 컴포넌트 생성될떄
  created () ｛
    // 글로벌 프로퍼티 가져오기
    this.$store.dispatch('global/loadGlobalProperties')
    // 사용자 프로필 가져오기
    this.$store.dispatch('account/loadAccount', this.username)
  ｝
｝

```

아래는 이번에 구현된 컴포넌트 구조와 컴포넌트에 포함된 속성 및 데이터이다.


![컴포넌트 구조](https://imgur.com/2Bve7VK.png)

<br>

___

<br>

하다보니 코드가 많이 복잡해졌네요.

여기까지 읽어주셔서 감사합니다.




> 전체 소스 내용은 [github](https://github.com/anpigon/steemit-app)에서 볼 수 있습니다. 그리고 구현된 앱은 [steemlog.github.io](https://steemlog.github.io/)에서 확인 할 수 있습니다.

------

###### 이전글

- [스팀잇(Steemit)기반 앱 만들기 #1 - 시작하기](https://steemit.com/kr/@anpigon/steemit-1-10f53977c621e)
- [스팀잇(Steemit)기반 앱 만들기 #2 - 최근글 가져오기](https://steemit.com/kr/@anpigon/steemit-2)
- [스팀잇(Steemit)기반 앱 만들기 #3 - 무한 스크롤 구현하기](https://steemit.com/kr/@anpigon/steemit-3)
- [스팀잇(Steemit)기반 앱 만들기 #4 - 상세화면 구현하기](https://steemit.com/kr/@anpigon/steemit-4)
- [스팀잇(Steemit)기반 앱 만들기 #5 - 댓글 보여주기](https://steemit.com/kr/@anpigon/steemit-5)
- [스팀잇(Steemit)기반 앱 만들기 #6 - 로그인 기능](https://steemit.com/kr/@anpigon/steemit-6)
