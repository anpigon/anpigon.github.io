---
title: '[React Native] Redux-Saga 학습하기 #1'
tags:
  
  
  
  
  
  
  
  
  
  
author: anpigon
date: 2019-08-08 10:48:24
---


![](https://files.steempeak.com/file/steempeak/anpigon/TzysIBST-E1848CE185A6E18486E185A9E186A820E1848BE185A5E186B9E18482E185B3E186AB20E18483E185B5E1848CE185A1E1848BE185B5E186AB203.png)

***
<br>안녕하세요. 안피곤입니다.

**React**를 공부하면서 그동안 미뤄왔던 **Redux-Saga** 학습을 시작했습니다. 사실 저는 **React**와 **Redux**도 어렵습니다. 그런데 여기에 **Redux-Saga**까지 더 해지니 더 어렵습니다. 지금도 **Redux-Saga** 코드를 보고 있으면 머리가 멍해집니다.  `effect`, `channel`, `task`, `blocking`, `non-blocking`, `watcher`, `worker` 등 용어들도 무척 생소합니다. 이 어려운 걸 공부해야 하는지 가끔 의문도 듭니다.

**Redux-Saga**는 **Redux** 미들웨어고 Redux 액션에 의해서 실행되고 취소됩니다. 그리고 ES6 Generator 형태의 비동기 함수를 사용합니다. 참고로 Generator 함수는 이렇게 생겼습니다. `function* asyncFunc(obj) { yield; }`. Generator 함수를 사용하면 ES8의 `async/await` 와 비슷합니다.

<br><br>

그리고 **Redux-Saga**의 Flow는 다음과 같습니다.

![](https://cdn-media-1.freecodecamp.org/images/1*y-qgopNVlYcVrXgM84iPfA.jpeg)
</sup>출처: https://www.freecodecamp.org/news/login-using-react-redux-redux-saga-86b26c8180e/</sup>

<br>사용자가 액션을 수행하면, **Redux-saga**가 받아서 처리합니다. 그리고 그 결과값을 **Reducer Store**에 전달합니다. **Store**는 전달 받은 값을 **State** 저장하고, **Provider**를 통해 컴포넌트 UI를 업데이트 합니다. 

<br>
<center>* * *</center>
<br>

사실 저는 **Redux-saga**가 복잡하고 이해하기가 어려웠습니다. 그래서 사용하지 않으려고 했어요. **Redux-saga** 보다 배우기 쉬운 **react-trunk**를 사용하고 있었습니다. 하지만 구글 검색을 하면 React 앱 개발에 대부분 Redux-saga를 추천하고 있습니다. 그리고 Redux 보다 배우기 쉽고 사용이 편한 Mobx도 추천하고 있습니다. 하지만 Mobx는 아직은  Redux 보다 레퍼런스가 많이 없습니다. 그래서 Redux를 마스터 하고 나서 Mobx를 학습할 생각입니다. 그때는 Mobx 강의 자료나 레퍼런스가 많이 생겨있길 바랍니다. ㅋ

그리고 가능하다면 지금 개발하고 있는 완댑에 **Redux-Saga**를 적용할 계획입니다. react-trunk로 예외처리 하기 힘든 비동기 통신 부분을 Redux-Saga를 사용하면 좀더 쉽게 처리할 수 있을 것으로 생각됩니다. 예를 들어 사용자가 지갑화면에서 잔액조회를 요청하고 서버에서 응답을 받기 전에 다른 화면으로 이동하는 경우, 저는 이것에 대한 예외 처리가 아직 부족합니다. 이때 FC가 가끔 발생합니다. ㅠㅠ

하지만 요즘 soct-api 상태가 좋지 않아서 완댑 개발에 흥미를 완전 잃었습니다. scot-bot이 많이 아픈것 같습니다. soct-api 서버가 안정화 될 때까지 기다려야겠습니다. 지금은 다시 초연으로 돌아가 Steem 기반의 모바일앱을 개발하고 싶네요.

<br>
<center>* * *</center>
<br>

Redux Saga를 학습하기 위해 적당한 샘플 앱을 깃허브에서 검색해봤습니다. 저의 경우에는 실제 앱을 개발하면서 이론 공부를 병행합니다. 본업에서도 이런 방식으로 개발을 하다보니 그냥 습관이 되었습니다. 실제 SI 프로젝트에서도 개발 업무를 수행 중에 학습이 필요한 기술이 있으면 그때그때 실시간으로 자료를 찾아서 공부하면서 개발합니다.

SI 프로젝트에서 개발하시는 개발자분들은 아시겠지만, 프로젝트마다 개발 환경, 개발 언어, 플랫폼이 다 다릅니다. 그리고 가끔은 듣보잡 프레임워크를 사용하여 개발하기도 합니다. 게다가 일부 프로젝트에서는 백엔드/프런트엔드 개발자의 구분이 없습니다. 그래서 SI 개발을 오래 하다 보면 기술 스펙트럼이 많이 넓어지는 장점이 있지만, 기술에 대한 깊이가 부족합니다. 제가 그런 경우입니다. 그래서 저는 제 스스로 개발자라기보다는 저를 코더라고 생각합니다.

개인적으로 React는 마스터 하고 싶습니다. React만 학습하면 웹, 앱, 모바일 모두 개발할 수 있습니다. Vue나 Flutter도 있지만, 유튜브에는 React가 강의 자료가 더 많아서 저는 React를 공부합니다. 하지만 저의 학습 속도가 새로운 기술이 나오는 속도를 못따라 가고 있습니다. 그러나 부지런히 쫓아가면 어느정도 높은 레벨에 올라갈 수 있을 것이라고 생각합니다. 지금도 저는 코딩 고수를 꿈꿉니다. 고수님들 많이 도와주세요. ㅎㅎ

<br><br>

그리고 만약 여러분이 리액트를 시작하게 된다면 읽어 볼만한 글을 소개합니다.
> - ['리액트(ReactJS) 개발자가 걷게 되는 길'](https://repo.yona.io/doortts/blog/post/297)
> <sup>바로 리액트 하는 사람들이 걷게 되는 모종의 공통 코스가 있다는거다. 간략히 적어보면 이렇다. 리액트를 배운다 -> 예제를 봤더니 괜찮다. 신기하다. 그리고 할 수 있을것 같다! -> 리덕스(Redux)가 있다는 걸 봤다. 읽어보니 이거이거~ 왠지 안쓰면 안될것 같은 느낌이 든다. 리덕스를 배운다. -> 한동안 미친듯이 헷갈려 하기 시작한다 (Action/ActionCreator, state, props, setState,getState, store, reducer) 이건 아쉽지만 Redux 만든 dan abramov의 예제도 여기에 한몫한다...</sup>

<br>
<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>

<br>