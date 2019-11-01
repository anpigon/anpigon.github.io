---
title: "STEEM/SCT 보팅파워(VP) 안드로이드 위젯 #1"
author: anpigon
date: "2019-05-26T15:04:27Z"
permalink: "/sct/@anpigon/steem-sct-vp-1"
tags:
  - "sct"
  - "kr"
  - "kr-dev"
  - "busy"
  - "thegivingtree"
---
![](https://cdn.steemitimages.com/640x0/https://files.steempeak.com/file/steempeak/anpigon/KG7rYy6a-E18490E185A6E186A8E18489E185B3E18490E185B320E1848CE185A1E18485E185B5E18491E185ADE18489E185B5E1848CE185A1.png)
***

안녕하세요. 안피곤입니다.

스팀코인판에 올리는 2번째 글입니다. 요즘 #sct와 더불어 #kr-dev에도 많은 글이 올라오니 기분이 좋습니다. 예전의 스팀잇 전성기로 돌아가는 것 같습니다. ㅎㅎ

 blockchainstudio님이 최초로 SCOT 보팅파워 뷰어를 만들었습니다.  그리고 트윈짱님이 데스크탑 위젯을 만드셨습니다.  

---
**관련글:**
* blockchainstudio님의 글: [*"STEEM SCOT Voting Power Viewer / SCOT 보팅파워 뷰어"*](/kr/@blockchainstudio/steem-scot-voting-power-viewer)
* twinbraid님의 글: [*"SCT 보팅파워 바탕화면 위젯"*](/sct/@twinbraid/sct)
---

<br>그다음 개발되어야 할 앱은 크롬 익스텐션 또는 안드로이드/iOS 위젯일 것 같습니다. 크롬 익스텐션은 happyberrysboy님이 곧 개발하실 것 같아서, 저는 먼저 안드로이드 위젯을 개발했습니다. 사실 안드로이드 위젯은 @nps0132님과 @talkit님의 댓글에서 아이디어를 얻었습니다. 두분께 감사합니다. ㅋ

![](https://cdn.steemitimages.com/500x0/https://files.steempeak.com/file/steempeak/anpigon/PcjbS6kr-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-05-262023.28.14.png)
---

![](https://cdn.steemitimages.com/300x0/https://cdn.steemitimages.com/p/3V3rr4S3jU4ADxgtADsNyz5GG3gWgrUF5iHeyX5qAtn5iLMKepBARBVCQLc3r4So4w3eTCG9ajLEtVmNkX1jASAaajQ2LzB9633eorFeEySFEvJMYkiFSMGVwkyAUwxRtDGoLRxiGPpBwEo3woseUZc38UKdYZA35ViTXLHWTFuHkb9cBNLh9iQYa1Wwd3C8ADQXELAmTMs1FBouWmkK2Z8BXbLx372TfRyyWFmJse8N3SZfN4RZfvtn15cvDxNQ1PeMovTNiRgcTHfkmirnC252wWheNi3ZWn5XiDjs8Y585?format=match&mode=fit)

<br>
<center>*</center>
<br>

# 앱개발

이 앱은 리액트 네이티브(React Native)로 개발하였습니다. 그리고 [react-native-android-widget-poc](https://github.com/netbeast/react-native-android-widget-poc) 오픈 소스를 사용하였습니다.

리액트 네이티브에서는 위젯 기능을 제공하지 않습니다. 그래서 안드로이드 Java 코드를 구현해야합니다. 그래서 이번에는 expo를 사용할 수가 없네요.ㅠㅠ expo 툴을 사용하여 리액트 네이티브를 개발할때는 정말 편리합니다. 하지만 요즘은 리액트 네이비브 앱을 expo로 개발하면서 expo의 한계를 정말 많이 느낍니다.

안드로이드 위젯을 개발하기 위해서, [안드로이드 공식 문서](https://developer.android.com/guide/topics/appwidgets)도 참고 하였습니다. 그런데 한글 문서는 없네요. ㅠ 안드로이드 개발 경험이 부족하여 버그가 있을 수  있습니다.(사실 있습니다.ㅠ) 안드로이드 위젯은 화면 View 컨트롤하기가 까다롭네요.

&nbsp;

# 앱소개
사용 방법은 매우 간단합니다. 앱을 실행하고 USERNAME를 입력합니다.
![](https://cdn.steemitimages.com/250x0/https://files.steempeak.com/file/steempeak/anpigon/p6q37YoB-Screenshot_20190526-232058_Steem20Widget.jpg)

<br>그 다음 바탕화면에 위젯을 추가합니다.
![](https://cdn.steemitimages.com/250x0/https://files.steempeak.com/file/steempeak/anpigon/z73RVKUQ-Screenshot_20190526-194740_One20UI20Home.jpg)

<br>위젯이 추가된 화면입니다.
![](https://cdn.steemitimages.com/250x0/https://files.steempeak.com/file/steempeak/anpigon/kK466Xy9-Screenshot_20190526-194820_One20UI20Home.jpg)

<br>구글 스토어에서 지금 바로 설치 가능합니다.

[![](https://files.steempeak.com/file/steempeak/anpigon/lA3fOfzx-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-05-262023.16.54.png)](https://play.google.com/store/apps/details?id=com.steem_widget&rdid=com.steem_widget&pli=1)
https://play.google.com/store/apps/details?id=com.steem_widget&rdid=com.steem_widget&pli=1

> 참고로 위젯에서 새로 고침 버튼 눌러도 새로 고침이 안되는 버그가 있습니다. 그때는 앱을 실행해서 SAVE 버튼을 눌러주세요. 안드로이드 위젯 라이프 사이클에 대한 이해가 부족하여 버그를 수정 못 하고 있습니다. ㅠㅠ 하지만, 금방 수정해서 재배포 할 계획입니다. ㅋ

<br>해피 코딩하세요~!

***

<center>![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)</center>