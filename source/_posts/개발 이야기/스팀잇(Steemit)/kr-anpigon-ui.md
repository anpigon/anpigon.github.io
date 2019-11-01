---
title: 크롬 브라우저에서 스팀잇 UI를 바꿔보자.
tags:
  
  
  
  
  
author: anpigon
date: 2018-08-17 15:05:21
---

안녕하세요. @anpigon입니다.

스팀잇은 UI 디자인이나 기능에서 불편한 점이 있습니다. 그래서 @armandocat님이 만든 [Steemit More Info](https://steemit.com/steemdev/@armandocat/steemit-more-info-1-4-chrome-extension-firefox-extension)([한글 소개자료](https://steemit.com/kr/@dev1by0/steemit-more-info-1-3-extension))와 @kyunga님, @yjiq150님, @bramd님이 만든 [Steemit.com Enhancer](https://steemit.com/kr/@easysteemit/easysteemit-steemit-com-enhancer)을 사용합니다. 둘 다 크롬브라우저에서 작동하는 확장 프로그램입니다.

두 프로그램을 사용하면 부족한 기능은 어느 정도 커버 됩니다. 하지만 스팀잇의 UI 디자인은 여전히 성에 차지 않습니다. 그래서 [User JavaScript and CSS](https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?utm_source=chrome-ntp-icon)을 사용하여 스팀잇 UI를 결정하는 CSS를 수정하였습니다. 아래에서 적용된  화면의 스샷을 볼 수 있습니다.



### 피드 화면

![](https://imgur.com/eBSv0q9.png)



### 포스트 화면

![](https://imgur.com/pHJIIeS.png)



### 기타 수정된 요소들

나눔고딕 폰트를 적용하고 줄 간격을 조정하여 가독성을 높였습니다. 아래에서 적용 전과 적용 후 화면을 비교해보세요.

|적용 전|![](https://imgur.com/u9IGh7f.png) |
|---|---|
|적용 후 |![](https://imgur.com/r3lDjmJ.png)|


인용문(Blockquote) 스타일은 아래와 같이 변경됩니다.

___

![](https://imgur.com/5zBgC4w.png)

___

이미지(img) 스타일은 흰색 테두리와 우측하단에 그림자가 들어가고 가운데 정렬됩니다.

___

![](https://imgur.com/08gUNye.png)

___

그리고 상단바 우측에 보팅파워와 보팅금액이 표시됩니다.

___

![](https://imgur.com/94VrtuB.png)

___


<br>
___


# 적용 방법

적용하기 위해서는 크롬 브라우저에 **User JavaScript and CSS** 확장 프로그램을 설치해야합니다. 아래 경로를 통해 설치합니다.

https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?utm_source=chrome-ntp-icon

![](https://imgur.com/ykwCaJC.png)

설치가 완료되면 앱을 실행하여 다음과 같이 수정된 CSS 를 적용합니다.
![](https://imgur.com/KtN9S4l.png)

___

아래 코드는 **JS영역(왼쪽)**에 복사&붙여넣기 하세요. 보팅파워와 보팅금액을 표시하는 로직입니다.


```js
(()=>｛const username=document.querySelector('header li.Header__userpic > span')
if(username)｛function f(a,b,p)｛p=｛method:'POST',headers:｛'Content-Type':'application/json'｝,body:JSON.stringify(｛jsonrpc:"2.0",method:"call",params:["database_api",a,b?[b]:[]]｝)｝;return fetch('//api.steemit.com',p).then(r=>r.json()).then(d=>d.result)｝
function i(a)｛return parseFloat((a||'0').split(' ')[0])｝
function v(t,e)｛return i(e.total_vesting_fund_steem)*(i(t)/i(e.total_vesting_shares))｝
const id='ap_'+String(Math.round(Math.random()*new Date().getTime()));(function load()｛Promise.all([f('get_reward_fund','post'),f('get_dynamic_global_properties'),f('get_current_median_history_price'),f('get_accounts',[username.title])]).then(r=>｛const[a,g,c,[d]]=r;const es=((new Date()-new Date(d.last_vote_time+"Z"))/1e3);const vp=Math.round(Math.min(d.voting_power+(1e4*es/432000),1e4));const totalVestingSteem=v(d.vesting_shares,g)+v(d.delegated_vesting_shares,g)+v(d.received_vesting_shares,g)
const rate=parseInt((vp+49)/50)*100
const vv=(totalVestingSteem/(i(g.total_vesting_fund_steem)/i(g.total_vesting_shares))*rate*(i(a.reward_balance)/i(a.recent_claims))*(i(c.base)/i(c.quote)));let span=document.getElementById(id)
if(!span)｛const header=document.querySelector('header .Header__buttons');span=document.createElement('span');span.id=id;span.style.color='rgba(0,0,0,.65)';span.style.border='1px solid #eee';span.style.margin='1rem';span.style.padding='0 10px';header.insertBefore(span,header.childNodes[0])｝
span.innerHTML=`<small>· 보팅파워: $｛vp/100｝％<br>· 보팅금액: \$$｛vv.toFixed(3)｝</small>`;window.setTimeout(function()｛load()｝,1000)｝)｝)()｝｝)()
```

<br>
___

아래 코드는 **CSS영역(오른쪽)**에 복사&붙여넣기 하세요. 


```css
@import url('//fonts.googleapis.com/css?family=Nanum+Gothic:400,700,800');

/* 폰트 변경 */
body,h1,h2,h3,h4,h5,h6,
.Markdown,
.Markdown h1, .Markdown h2, .Markdown h3, .Markdown h4, .Markdown h5, .Markdown h6, 
.ReplyEditor__body.rte h1, .ReplyEditor__body.rte h2, .ReplyEditor__body.rte h3, .ReplyEditor__body.rte h4, .ReplyEditor__body.rte h5, .ReplyEditor__body.rte h6,
.PostFull__header > h1 /* 포스트 제목 */
｛
  font-family: "Nanum Gothic", "Source Sans Pro" !important;
  font-smoothing: antialiased;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
｝

/* 줄간격 조정 */
.Markdown p, .ReplyEditor__body.rte p ｛
  line-height: 180％ !important; 
｝

/* 인용문(Blockquote) */
.Markdown blockquote ｛
  border-left: 0 !important;
  padding-left: 35px;
｝
.Markdown blockquote:before ｛
  content: "\201C";
  font-size: 3em;
  font-family: Georgia;
  color: #bcbcbc;
  float: left;
  margin: -15px 0 0 -35px;
｝

/* 이미지 꾸미기 */
.Markdown img ｛
  margin: 0 auto;
  display: -webkit-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 1rem;
  border: solid 4px #fefefe;
  border-radius: 3px;
  line-height: 0;
  max-width: calc(100％ - 10px);
｝

/* UI 변경 */
.theme-light, .theme-light .Post ｛
  background-color: hsla(0, 0％, 95％, .97) !important;
｝
.theme-light .PostFull ｛
  position: relative;
  background-color: #fff;
  border: 0;
  border-radius: 4px;
  background-clip: padding-box;
  -webkit-box-shadow: 0 4px 12px rgba(0,0,0,.15);
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  padding: 32px!important;
  overflow-x: inherit;
｝
.theme-light .c-sidebar__module, .theme-light .articles__summary ｛
  position: relative;
  border: 1px solid #dddfe2;
  border-radius: 3px;
  margin-bottom: 10px;
｝
.theme-light .articles__summary:hover ｛
   background-color: #f5f8fa;
｝
.theme-light .articles ｛
  border: initial !important;
  box-shadow: initial !important;
  background-color: initial !important;
｝
.theme-light .articles:hover ｛
  box-shadow: initial !important;
｝
.articles ｛
   padding: 0.5em 0 !important;
｝
@media only screen and (min-width: 75em) ｛
  .PostsIndex.row ｛
    width: 1190px !important;
  ｝
  .PostsIndex.row.layout-list ｛
    width: 1600px !important;
  ｝
｝
.PostFull__reply a:first-child ｛
  display: inline-flex;
  max-width: 30px;
  overflow: hidden;
  white-space: nowrap;
｝
.articles__hr ｛
  display: none !important;
｝
@media print, screen and (min-width: 64em) ｛
  .PostFull__footer.row .large-5 ｛
    max-width: 46.66667％ !important;
    flex: 0 0 46.66667％ !important;
  ｝
  .PostFull__footer.row .large-5:first-child ｛
    max-width: 36.66667％ !important;
    flex: 0 0 36.66667％ !important;
  ｝
  .articles__feature-img-container ｛
  	max-height: 200px;
    overflow: hidden;
    display: block;
    vertical-align: middle;
  ｝
  .articles__feature-img-container > img ｛
  	width: 100％;
  ｝
｝
@media only screen and (min-width: 47.5em) ｛
  .theme-light .layout-list .articles__summary, 
  .theme-light .layout-compressed .articles__summary ｛
    padding: .5rem 1rem;
    border-bottom: initial !important;
  ｝
｝
```

복사&붙여넣기를 다 하셨으면 **저장 버튼**을 눌러 저장합니다.

아래 화면에서 보면 브라우저 툴바에서 프로그램이 실행 중인 것을 확인 할 수 있습니다. 그리고 on/off 버튼으로 프로그램 중지도 가능합니다.

![](https://imgur.com/Nzy6wEv.png)


<br>

___

# 나눔 고딕 외 다른 폰트 적용방법


다른 폰트를 사용하고 싶으면 구글 폰트 사이트에서 찾아볼 수 있습니다. **[fonts.google.com](https://fonts.google.com/?subset=korean)**에 접속하면 나눔 고딕, 나눔 명조 등 공개된 무료 웹폰트 들이 있습니다.

![](https://imgur.com/Dfrjg2a.png)

원하는 폰트를 선택하면 아래와 같이 CSS 경로와 적용방법을 알 수 있습니다.

![](https://imgur.com/MeVwMEw.png)


CSS에 능숙하다면 스팀잇을 더 멋진 UI로 바꿔보시기 바랍니다. 



여기까지 읽어주셔서 감사합니다.
