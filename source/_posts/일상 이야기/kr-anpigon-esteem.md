---
title: '스팀잇 모바일앱 이야기 : eSteem을 수정해볼까?'
tags:
  
  
  
  
  
author: anpigon
date: 2018-09-28 20:16:36
---

안녕하세요. @anpigon입니다.

저는 주로 모바일에서 스팀잇을 합니다. 하지만 스팀잇은 공식 모바일앱이 없습니다. 공식 모바일앱을 개발할 계획도 없어 보입니다. 그래서 저는 [Partiko](https://partiko.app/)와 [eSteem](https://esteem.app/) 모바일앱을 많이 사용합니다. 

Partiko는 네이티브앱이라서 속도가 빠릅니다. 하지만 기능면에서 많이 부족합니다. 예를 들면, Partiko 앱은 본문 내용을 제대로 표현해 내지 못합니다. 그리고 eSteem은 기능이 많지만 하이브리드 앱이라서 속도가 느립니다. 그리고 간간이 버그도 보입니다. 하지만 저는 **북마크 기능**과 **저자 즐겨찾기** 기능이 있는 **eSteem**을 가장 많이 사용합니다.

앱을 사용하지 않고 모바일 브라우저에서 [steemit.com](https://steemit.com), [steempeak.com](https://steempeak.com), [busy.org](https://busy.org)에 접속하면 스팀잇을 할 수 있지만, 많이 불편합니다. 참, Busy.org는 PWA로 설치하면 조금 쓸만합니다.

혹시 제가 모르고 있는 쓸만한 스팀잇 모바일앱이 있나요?


<br>
___
# eSteem 오픈소스 이야기
eSteem은 MIT 라이선스의 오픈소스입니다. 누구나 소스를 다운로드해 소스 내용을 볼 수 있습니다.

* GitHub: https://github.com/esteemapp/esteem

https://imgur.com/kvyLspJ.png

eSteem은 한참 동안 업데이트가 없었습니다. eSteem 깃허브를 보면 마지막 소스 커밋이 6개월 전입니다.

https://imgur.com/6m2M2Qd.png

제 생각에는 아마도 eSteem팀은 데스크탑 버전을 개발하는라 바쁜것 같습니다. 깃허브에서 활동(activity) 그래프를 보면 esteem-surfer에 비해 esteem은 최근 활동 기록이 전혀 없습니다. 참고로 esteem-surfer은 esteem의 PC버전입니다.

https://imgur.com/QsyXIHf.png



**eSteem Surfer** 대해서는 @kimjaeh9님의 [<q>Busy말고 eSteem Surfer를 사용해보자!!</q>](https://steemit.com/kr/@kimjaeh9/busy-esteem-surfer) 글에 설명이 잘되어 있습니다.
<br>

___
# eSteem 오픈소스 작업(?) 이야기

깃허브에서 eSteem 소스를 내려받아 약간 수정했습니다. 본문 글꼴을 노토산스체로 바꾸고 약간의 한글 번역을 수정 및 추가하였습니다. 그리고 보팅 정보 페이지를 아래와 같이 수정하였습니다.

| https://imgur.com/aDL2v29.png | https://imgur.com/fR4tqZG.png |
|-|-|
그리고 글목록에서 보이던 no-image(고래 이미지?)와 베네피셔리에 eSteem이 설정되어 있는 코드를 삭제하였습니다. 

앱으로 빌드하는 방법을 몰라서 브라우저에서 접속할 수 있게 github.io에 업로드하였습니다. 하지만, 버그가 많아서 사용할만한 수준은 못됩니다.
* 접속 URL: https://anpigon.github.io/esteem/ 

<br>만약 eSteem앱을 사용한다면 로그인은 다음 방법을 권장합니다. 고급 설정을 켜고 포스팅키 또는 액티브키로 로그인하시기 바랍니다. 그러나 댓글 또는 보팅만 할 거면 액티브키는 입력할 필요가 없습니다.

| https://imgur.com/0acTf12.png | https://imgur.com/kSXUzMc.png  |
|-|-|

<br>

|주의|**마스터키와 메인 패스워드는 노출되지 않게 조심**하기시 바랍니다.|
|-|-|

<br>
여기까지 읽어주셔서 감사합니다.


<div><hr>
<div class='pull-left'><a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
<img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a></div><sub>이 저작물은 <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.</sub>
</div>


