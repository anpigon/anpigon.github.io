---
title: "[Steem Project #2] 댓글 자동 답변봇"
author: anpigon
date: "2018-09-21T06:37:45Z"
permalink: "/kr/@anpigon/steem-project-2"
tags:
  - "steemit"
  - "스팀잇"
  - "자동화"
  - "챗봇"
---
![](https://i.imgur.com/tYAm1Lc.jpg)

안녕하세요. @anpigon 입니다.

추석 연휴 기간 동안 스팀잇을 대신 관리해주는 봇이 있으면 좋겠다는 생각을 했습니다. 그래서 "댓글에 자동으로 답변해주는 봇이 있으면 어떨까?" 하는 생각에 만들어 보았습니다. 우선 댓글 자동 답변 봇을 구현하기 전에 챗봇에 대해서 짧게 이야기하고 시작하겠습니다.

<br><hr><br>

# 챗봇(Chat Bot)

챗봇을 크게 두 종류로 구분하면 데이터를 직접 입력하여 구현하는 지도학습 방식과 스스로 학습하는 비지도학습 방식이 있다. 지도학습에는 대표적으로 심심이와 뱅킹 4대 챗봇(KB 리브똑똑, 신한 쏠 챗봇, 우리 위비톡, KEB 하나톡)이 있다. 그리고 비지도학습에는 대표적으로 2016년 큰이슈가 되었던 마이크로소프트의 [테이](https://namu.wiki/w/％ED％85％8C％EC％9D％B4(％EC％9D％B8％EA％B3％B5％EC％A7％80％EB％8A％A5))와 현재는 일본 마이크로소프트에서 개발한 [린나](https://www.rinna.jp)가 있다. 그리고 구현 방식에 따라서 더 세분화할 수도 있다. 최근 트렌드는  규칙 기반(Rule-base)과 딥러닝을 혼용하는 하이브리드방식을 많이 사용하는 것 같다.

우리는 챗봇 엔진을 직접 구현할 필요가 없다. 인공지능으로 유명한 기업에서 챗봇을 쉽게 개발할 수 있는 플랫폼을 서비스하고 있기 때문이다. 게다가 무료 서비스도 제공하고 있다. 대표적으로 타로챗봇으로 유명해진 [Chatfuel](https://chatfuel.com/)과 구글의 [Dialogflow](https://dialogflow.com/),  IBM의 [왓슨 컨버세이션](https://watson-conversation.ng.bluemix.net/), 아마존의 [알렉사](https://aws.amazon.com/ko/lex/),  LG CNS의 [단비](https://danbee.ai/) 등등이 있다.

<br>

챗봇에 대해서 더 이야기하고 싶지만, 주제를 너무 벗어나는 것 같아서 아래 2가지 용어만 간단하게 설명하고 넘어가자.

- **인텐트(Intent)**: 사용자가 말하는 의도를 파악하고, 그에 알맞는 응답을 한다.

- **엔티티(Entity)**: 사용자가 입력한 문장에서 구성 요소를 식별한다.

<br>

이 글에서는 구글의 **Dialogflow** 플랫폼을 사용하여 간단한 챗봇을 만드는 방법을 설명한다. **Dialogflow**은 구글 계정을 가지고 있으면 회원가입 없이 바로 사용할 수 있다.

- **Dialogflow Console**: https://console.dialogflow.com

<br><hr><br>


### Dialogflow에서 봇 생성하기

메뉴에서 **Create new agent**를 선택한다. 그리고 봇 이름(Agent name)을 입력한다. 기본 언어(Default Language)에서 원하는 언어를 선택한다. **CREAET** 버튼을 누르고 잠시 기다리면 봇 생성이 완료된다.

![](https://imgur.com/e04Xmwn.png)

<br>

### 인텐트 등록하기

봇을 생성하고 인텐트(Intents) 메뉴에 들어가면 기본적으로 2개의 인텐트가 샘플로 등록되어있다. **Default Fallback Intent**는 사용자의 의도 분석에 실패한 경우 해당 인텐트에 정의된 응답을 반환한다. 그리고 **Default Welcome Intent**에 들어가보면 <q>안녕</q>, <q>반가워</q> 처럼 인삿말이 정의되어있다. 인텐트를 추가하고 싶으면 **CREATE INTENT** 버튼을 누르면 된다.

![](https://imgur.com/9s0si1E.png)





> 저도 **Dialogflow**는 익숙하지 않아서 쉽게 설명하기가 어렵습니다. **Dialogflow**의 자세한 사용방법은 https://dialogflow.com/docs/ 문서를 참고하시기 바랍니다.



<br><hr><br>



# 스팀잇 댓글 자동 응답봇 구현하기

이제 자바스크립트로 댓글 자동 응답봇을 구현해보자.

<br>

### Dialogflow API 연동하기


API연동에 필요한 **Client Access Token** 키는 Agent 설정 페이지에서 확인 할 수 있다.

![](https://i.imgur.com/gA0Iojt.png)

<br>아래와 같이 `dialogflow()` 함수를 구현한다.

```js
const axios = require('axios');

function dialogflow(id, text) ｛
    const url = 'https://api.dialogflow.com/v1/query?v=20150910';
    const clientAccessToken = 'dialogflow 액세스키는 여기에';
    const headers = ｛
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer $｛clientAccessToken｝`
    ｝
    const query = ｛
        'sessionId' : id,
        'query' : text,
        'lang': 'ko'
    ｝
    return axios.post(url, query, ｛ headers: headers ｝).then((｛ data ｝) => ｛
      if(data.status.code === 200) ｛
        return data.result.fulfillment.speech;
      ｝
      throw new Error(data);
    ｝);
｝ 
```

<br>`dialogflow()`함수에 **'안녕'**을 입력하여 테스트 해보자. 그럼 Welcome 인텐트에 정의되어 있는 응답을 출력하는 것을 확인 할 수 있다.

```
dialogflow('anpigon', '안녕').then(r => console.log(r))
// 안녕!
```

<br>

# 댓글 모니터링 하기

**steemjs**는 오퍼레이션을 모니터링 할 수 있는 `streamOperations()` 함수를 제공하고 있다. **streamOperations** 함수는 발생하는 모든 오퍼레이션을 모니터링한다. 그 오퍼레이션 중에서 `opcode`가 **comment**이고 `title`가 빈 값이 면 댓글이라고 보면된다. 

그러나 발생하는 댓글 중에서 내가 작성한 글(`parent_author === username`)에 등록된 댓글만 확인하도록 한다. 명심해야 할 것은 자동응답봇이 댓글달고 자기가 등록한 댓글에 또 댓글달고 또 댓글.. 댓글… 이런 꼴을 보지 않으려면 `author !== username` 조건을 반드시 넣어줘야 한다.

```js
steem.api.streamOperations((err, [opcode, op]) => ｛
  if(!err && opcode === 'comment' && op.title === '') ｛
    const ｛ parent_author, parent_permlink, author, permlink, body｝ = op;    
    if(parent_author === username && author !== username) ｛
      console.log(`댓글: $｛body｝ by @$｛author｝`);    
    ｝      
  ｝    
｝);
```

<br>

# 최종 소스

자바스크립트로 구현된 최종 코드는 다음과 같다. 참고로 아래 코드는 이전에 설명했던 [Dory앱](https://play.google.com/store/apps/details?id=io.tempage.dorynode)에서도 동작합니다.


###### 자동 응답봇 최종 소스

```js
const steem = require('steem');
const axios = require('axios');

const username = process.env.username
const wif = process.env.wif

// dialogflow
function dialogflow(id, text) ｛
    const url = 'https://api.dialogflow.com/v1/query?v=20150910';
    const ClientAccessToken = 'dialogflow 액세스키는 여기에';
    const headers = ｛
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer $｛ClientAccessToken｝`
    ｝
    const query = ｛
        'sessionId' : id,
        'query' : text,
        'lang': 'ko'
    ｝
    return axios.post(url, query, ｛ headers: headers ｝).then((｛ data ｝) => ｛
      if(data.status.code === 200) ｛
        return data.result.fulfillment.speech;
      ｝
      throw new Error(data);
    ｝);
｝    

// 댓글 등록
function reply(author,  permlink, body) ｛
  const title = '';
  const jsonMetadata = ｛ "tags": ["kr"] ｝;
  const commentPermlink = steem.formatter.commentPermlink(author, permlink);
  return steem.broadcast.commentAsync(wif, author,  permlink, username, commentPermlink, title, body, jsonMetadata); 
｝

// 봇 실행
steem.api.streamOperations((err, [opcode, op]) => ｛
  if(!err && opcode === 'comment' && op.title === '') ｛
    const ｛ parent_author, parent_permlink, author, permlink, body｝ = op;    
    if(parent_author === username && author !== username) ｛
      console.log(`댓글: $｛body｝ by @$｛author｝`);

      dialogflow(author, body.slice(0, 256).replace(/\n/g, ' '))
      .then(botsay => ｛
        reply(author, permlink, `**[자동 응답]**\n $｛botsay｝`)
        .then(() => ｛
          console.log(`└─ 답변: $｛botsay｝`);
        ｝);
      ｝);        
    ｝      
  ｝    
｝);
```

<br>

저는 가끔 제 스팀잇 활동 습관을 AI가 학습하여, 자동으로 보팅하고, 댓글 달아주는 봇을 상상해봅니다.

<br>여기까지 읽어주셔서 감사합니다.

---
###### 관련글
- [Steem Project #0 - 뉴비분들을 위한 보팅 계산기(소숫점 3자리)](https://steemit.com/kr/@anpigon/6gxjap)
- [Steem Project #1 - 스팀잇 펫 연구소(펫이 보팅 해드려요)](https://steemit.com/busy/@anpigon/steem-project-1)
- [안드로이드폰에서 보상 받기 자동화하기](https://steemit.com/busy/@anpigon/2eez4w)
