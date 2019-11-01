---
title: 스캠 봇 계정이 DCLICK 광고를 사용할 수 있을까?
tags:
  
  
  
  - 스팀잇
  - 디클릭
  - 광고
  
author: anpigon
date: 2018-10-23 11:25:36
---

안녕하세요. @anpigon입니다.

스캠으로 보이는 계정 [@sucona](https://steemit.com/dclick/@sucona/wdice--1540183777029)이 `kr-dev`에 글을 올렸습니다. 그런데 글 하단에 dclick광고가 달려있어서 의아했습니다. 과연 스캠 계정이 봇을 이용해서 dclick광고를 달수 있을까 해서 몇 가지 테스트를 해보았습니다. 

DCLICK은 **steemconnect** 방식의 로그인을 사용하고 있으므로,  로그인할 때 포스트 권한을 DCLICK에서 위임하게 됩니다. 그래서 dclick이 글을 등록할 때 사용하는 API를 알아내면 어렵지 않을 것 같습니다.

<br><hr><br>

### DLICK API를 직접 호출하여 글쓰기 시도

**dclick**의 글쓰기 API를 호출하여 포스팅을 시도해보았습니다. `[401] UnAuthorizedError` 오류가 발생합니다. 로그인 상태가 아니므로 권한이 없어서 오류가 발생하였습니다.

![1](https://files.steempeak.com/file/steempeak/anpigon/nqylSj8o-ECA09CEBAAA920EC9786EC9D8C34.png)

<br><hr><br>

### 브라우저 쿠키에 액세스 토큰 가져오기

크롬 브라우저에서 DCLICK을 로그인하여 생성된 쿠키 정보를 확인합니다. 쿠키에 JWT로 보이는 토큰이 보여서 가져왔습니다. 

![1](https://files.steempeak.com/file/steempeak/anpigon/OXM0Ujax-ECA09CEBAAA920EC9786EC9D8C4343222.png) 
> 참고로 로그아웃하니 쿠키정보는 지워졌습니다.

<br><hr><br>

### JWT을 사용하여 DLICK API로 글쓰기 시도

JWT를 이용하여 다시 **dclick**의 글쓰기 API를 호출하여 포스팅을 시도해보았습니다. 결과적으로는 포스팅이 성공하였습니다. 결과적으로 DCLICK에서 발급받은 JWT토큰이 있으면 DCLICK API를 사용해서 포스팅 할수 있습니다.

![3](https://files.steempeak.com/file/steempeak/anpigon/uefZS9h0-ECA09CEBAAA920EC9786EC9D8C4343.png)



<br>참고로 현재 이 글은 위의 방식으로 등록한 글입니다. 등록되고 나서 내용은 수정하였습니다.

그리고 궁금한 사항이 하나 생겼습니다. JWT를 재발급 받으면 기존에 사용하던 JWT는 자동으로 폐기될까요? 이것도 테스트해보고 싶었지만 블로그가 지저분해질 것 같아 테스트는 하지 않았습니다.

<br>여기까지 읽어주셔서 감사합니다.

***
#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [DCLICK: An Incentivized Ad platform by Proof of Click - 스팀 기반 애드센스를 소개합니다.](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJ0ZXN0LTE1NDAyNjE1MzM5MDciLCJhIjpbMV0sInVybCI6Imh0dHBzOi8vc3RlZW1pdC5jb20vZGNsaWNrL0BkY2xpY2svZGNsaWNrLWFuLWluY2VudGl2aXplZC1hZC1wbGF0Zm9ybS1ieS1wcm9vZi1vZi1jbGljay0iLCJpYXQiOjE1NDAyNjE1MzMsImV4cCI6MTg1NTYyMTUzM30.Y-a1jOFNy3T7IMhQ0BIV3Tn5hcuoTcoFj1w4jQmOkl4)
<sup>안녕하세요 스티미언 여러분. 오늘 여러분께 스팀 블록체인 기반 광고 플랫폼 DCLICK을 소개...</sup>
<br><center>![logo](https://steemitimages.com/200x100/https://cdn.steemitimages.com/DQmbjkrc5UT4GgZXygAnS3mLrboAy7Y8gr7R7guB8HG3f5n/logopad500.png)<br><br>이 글은 스팀 기반 광고 플랫폼<br>[dclick](https://www.dclick.io) 에 의해 작성 되었습니다.</center>
