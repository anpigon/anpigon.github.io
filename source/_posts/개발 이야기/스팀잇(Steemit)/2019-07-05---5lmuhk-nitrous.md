---
title: "[소스 투고] Nitrous 태그를 색상으로 구분하기"
author: anpigon
date: "2019-07-05T01:48:54Z"
permalink: "/sct/@anpigon/5lmuhk-nitrous"
tags:
  - "Nitrous"
---
![](https://files.steempeak.com/file/steempeak/anpigon/WncO6xUB-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-07-0520E1848BE185A9E1848CE185A5E186AB209.51.13.png)

<br>안녕하세요. 안피곤입니다.

요즘 Nitrous SteemCoinpan 오픈소스에 기여하는 재미에 빠져있습니다. 내가 필요하는 기능을 구현하고 반영되는 것을 보니 무척이나 재미있습니다. 그리고 realmankwon님이나 ayogom처럼 저도 이제부터 **[소스 투고]** 라는 타이틀을 사용할께요. 

이번에 추가한 기능은 Nitrous 태그를 색상으로 구분하고, 마우스 오버시 툴팁 정보를 보여주는 기능을 구현하였습니다. 하지만 아직 Nitrous에 반영 되지는 않았습니다. 반영될 거라고 믿습니다. ㅎㅎ

<br>

# 개발 내용

해당 nitrous의 SCOT 토큰 정보만 가져오는 부분을 수정했습니다. 모든 SCOT 토큰 정보를 가져와서 `scotConfig`에 저장합니다. 아래는 구현 코드의 일부입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/ycXYigUF-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-07-0520E1848BE185A9E1848CE185A5E186AB2010.18.58.png)

<br>그리고 nitrous 태그의 경우에는 bg가 Accent Color가 표시됩니다. 그리고 툴팁 메세지를 작성하여 마우스 오버시 보여줍니다. 아래는 구현 코드의 일부입니다.

||
|-|
|![](https://files.steempeak.com/file/steempeak/anpigon/UF8Ve7Dz-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-07-0520E1848BE185A9E1848CE185A5E186AB2010.25.42.png)|

<br>

댓글, 팔로우, 업보팅해 주시는 모든 분들 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>
