---
title: "@nhj12311님이 만든 steem.apps 댑에 #aaa, #stc 태그를 추가했어요."
author: anpigon
date: "2019-06-25T00:57:36Z"
permalink: "/sct/@anpigon/nhj12311-steem-apps-aaa-stc"
tags:
  - "sct"
  - "kr"
  - "kr-dev"
  - "busy"
  - "jjm"
---
![](https://files.steempeak.com/file/steempeak/anpigon/zUD2oPhk-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2120E1848BE185A9E18492E185AE202.25.56.png)

안녕하세요. 안피곤(@anpigon)입니다.

**steem.apps** 댑은 제가 스팀잇 처음 시작했을 때 가장 많이 이용했던 최애 스팀댑입니다. 바로 @nhj12311님이 만드셨죠. 태그별로 피드(Feed)를 볼 수 있고, 댓글을 바로 확인 할 수 있습니다. 

그리고는 스팀잇에 익숙해지면서 시간이 지나 한 동안 잊고 지냈습니다. 그러다가 갑자기 #태그를 간편하게 조회해서 볼 수 있는 페이지가 필요하고 생각했습니다. steempeak에도 **FAVORITE TOPICS** 기능이 있습니다. 하지만 모바일에서 steempeak 메뉴 사용이 불편하네요.

@nhj12311님의 허락없이 일단 깃허브 소스(https://github.com/nhj7/nhj7.github.io)를 포크(Fork) 하였습니다. 그리고 다음과 같이 #sct와 #aaa를 추가하였습니다. 

![](https://files.steempeak.com/file/steempeak/anpigon/mUzxCKxB-code.png)

<br>

아래는 제 깃헙 페이지에서 서비스되고 있는 페이지입니다. sct와 aaa가 보입니다. ㅋ
> https://anpigon.github.io/steem.apps/

![](https://files.steempeak.com/file/steempeak/anpigon/CH3WExmx-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2120E1848BE185A9E18492E185AE202.44.41.png)

<br>

***

<br>

아래는 두 달전에 만들었던 페이지입니다. 관련 태그를 주제별로 묶어서 보여주는 페이지입니다. 예를 들면, 도서 탭을 누르면 #book, #kr-book, #booksteem 태그를 모아서 보여줍니다.
> https://anpigon.github.io/steemit-community/

![](https://files.steempeak.com/file/steempeak/anpigon/gerTpAlj-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-06-2120E1848BE185A9E18492E185AE202.46.48.png)

최근 니트로 기반의 사이트(SCT, AAA)가 등장하면서 스팀잇에서 활동하는 유저들의 패턴이 많이 바뀌었습니다. 그리고 이 페이지는 사용자가 많지 않을 것 같아서 지금은 개발 중단했습니다. 그리고 지금은 모바일 개발이 더 잼납니다. ㅋ 

<br>

**steemit-community** 라고 명명한 태그를 모아 볼수 있는 페이지의 작동 방식은 대략 이렇습니다.

> 봇(Bot) 데몬이 스팀잇 데이터를 실시간 수집하여 로그에 기록합니다. 그리고 스택에 쌓인 로그 데이터를 파싱하여 필요한 데이터만 정제합니다. 그리고 MonogoDB에 저장합니다. 
외부에서 DB 조회할 수 있는 API 서버는 Google App Engine에 GraphQL를 디플로이(Deploy) 했습니다.
마지막으로 사용자가 브라우저에서 볼 수 있는 웹페이지는 Github Page에서 호스팅됩니다.


<br>여기까지는 모두 무료로 제공되는 서비스(Free Price Plan)를 이용해서 개발했습니다. 하지만 트래픽이 올라가면 비용이 발생할 수도 있습니다. ㅋ

<br>

해피 코딩하세요~!

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>






