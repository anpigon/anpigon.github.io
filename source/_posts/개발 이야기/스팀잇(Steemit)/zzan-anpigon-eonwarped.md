---
title: '[코딩/개발] 깃허브에서 eonwarped에게 코드 리뷰 받은 이야기'
tags:
  - zzan
  - liv
  - palnet
  - neoxian
  - sct
  - sct-freeboard
  - kr-dev
  - busy
  - jjm
  - kr
author: anpigon
date: 2019-08-06 23:23:33
---

![](https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)

***

안녕하세요. 안피곤입니다.

**["본문 하단에 작가의 최근 글 보기 기능 구현"](https://steemit.com/zzan/@anpigon/4kwmuf)** 글에서 밝혔지만, 작가의 최신 글 10개를 본문 하단에 출력하는 기능을 개발하여 깃허브에 PR을 하였습니다. 그리고 작성한 코드에 대해서 [eonwarped]()에게 코드 리뷰를 받았습니다. "네가 구현한 코드가 기존 패턴을 위배한다. Reducer를 사용하는게 좋다." 라는 내용인 것 같습니다. 그리고 내가 Reducer를 잘 모르니 도와달라고 했습니다. 그랬더니 매우 친절하게 알려주네요. 쪼금 감동했습니다.

![eonwarped 코드 리뷰](https://files.steempeak.com/file/steempeak/anpigon/133nZpqJ-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-0620E1848BE185A9E18492E185AE2010.35.21.png)

<br>
<br>

다른 개발자에게는 쉬울 수도 있겠지만, 저는 니트러스 소스코드가 매우 복잡하고 어렵다고 생각합니다. 게다가 니트러스는 서버에서 데이터를 가져오는 비동기 작업에 **Redux-Saga**를 사용하고 있습니다. **Redux-Saga**는 학습 곡선에 매우 높습니다. 이해하는 것도 잘 사용하는 것도 어렵습니다.  그래서 저는 **Redux-Saga** *vs* **Redux-Thunk** 기술을 고민하다가 상대적으로 학습하기 쉬운 **Redux-Thunk**를 선택했습니다. 지금도 **Redux-Thunk**를 계속 사용하고 있었습니다.

이번 기회에 [eonwarped]()가 가르쳐준 데로 **Redux-Saga**를 사용해봤습니다. 그동안 **React** 경험이 쌓여서 그런지 예전보다 금방 익숙해졌습니다. 그리고 **Redux-Thunk**에서 처리하기 힘든 예외 처리가 쉽게 가능해 보입니다. **Redux-Thunk**에서는 세세한 에러를 잡아내서 처리하기가 어렵습니다. 그리고 **Redux-Thunk**는 참고할 수 있는 레퍼런스가 **Redux-Saga** 보다 상대적으로 적습니다. 깃허브에서 검색해보면 대부분 샘플 코드가 **Redux-Saga**로 구현되어 있는 것을 알 수 있습니다.

<br>
<br>

![](https://files.steempeak.com/file/steempeak/anpigon/UEds0hDU-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-0620E1848BE185A9E18492E185AE2011.16.09.png)

<br>

저는 기술 선택의 기로에서 항상 고민합니다. Node를 막 학습하기 시작했을 때, **Vue** *vs* **React** *vs* **Angular**에서 고민했습니다. 그리고 학습하기 쉬운 **Vue**를 선택했습니다. 그런데 그 당시 **Vue**는 구현에 필요한 자료를 찾을 때 레퍼런스가 거의 없었습니다. 강의 자료나 레퍼런스는 **React**가 훨씬 많은 것을 알았습니다. 결국에는 **React**로 갈아탔습니다. 그리고 모바일 앱 개발에 필요한 기술, **Native Script** *vs* **React Native** *vs* **Flutter**에서도 고민했습니다. 결국 다 경험해보고 **React Native**를 선택했습니다. 지금은 어떤 기술이 학습하기 쉬운지? 어떤 프레임워크 속도가 더 빠른지?를 고민할 필요가 없다고 생각합니다. 이제는 개발자들이 가장 많이 사용하는 기술을 선택할 것입니다.

이제 **Redux-Saga** 동영상 강의가 있는지 찾아보고 공부를 해야겠습니다. 저는 동영상 강의를 보고 학습하는 게 가장 편하네요. ㅋ 참고로 제 코딩 실력은 유튜버에서 코딩 고수에게 배운 것입니다. 저는 강의를 보고 따라할 뿐입니다.

여기까지 읽어주셔서 감사합니다.

<br>
<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>
