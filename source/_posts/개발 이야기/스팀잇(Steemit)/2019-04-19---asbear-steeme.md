---
title: "asbear님의 steeme 소스를 포크하여 수정"
author: anpigon
date: "2019-04-19T09:10:45Z"
permalink: "/kr/@anpigon/asbear-steeme"
tags:
---
![](https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<sup>*Design by &#64;&#105;mrahelk*</sup>

<hr>

안녕하세요. 안피곤입니다.

&#64;&#119;onsama님이 예전에 작성했던 글을 다시 찾아보려고, &#64;&#97;sbear님의 [steeme](https://ianpark.github.io/steeme/)에  오랜만에 접속했습니다. 저는 작성했던 스팀잇 글을 전체적으로 파악하거나 검색 할 때, [steeme](https://ianpark.github.io/steeme/)의 **Posting history** 기능을 매우 유용하게 사용하고 있습니다. 그런데 조회도 안되고 오류가 발생하네요.

<br><br>

확인해보니 리스팀을 가져오는 함수에서 오류가 발생하고 있었습니다. 그래서 `getRebloggedByAsync` 함수를 오버라이딩(Overriding)  했습니다.

```
steem.api.getRebloggedByAsync = (author, permlink) => ｛
    return fetch('https://api.steemit.com', ｛
        method: 'post',
        body: JSON.stringify(｛jsonrpc:"2.0",method:"follow_api.get_reblogged_by",params:｛author,permlink｝,id:1｝)
    ｝).then(r => r.json()).then((｛result｝) => result)
｝
```
> 이것 외에도 API 규격이 조금 바뀐게 있네요.

<br><br><br>

결국 steeme를 수정하기위해 Github를 포크(Fork)했습니다.

https://anpigon.github.io/steeme/
![](https://files.steempeak.com/file/steempeak/anpigon/S6GoAdrp-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-1920E1848BE185A9E18492E185AE202.12.35.png)


<br>예전에 활동 하셨던 능력자 분들이 스팀잇에 다시 돌아왔으면 좋겠습니다.

<br>여기까지 읽어주셔서 감사합니다.

***

<center>
### WHAN DEV TEAM
[\[출범식\] WDT(WHAN DEV TEAM) 공식 활동 개시](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team)
[![](https://steemitimages.com/320x0/https://cdn.steemitimages.com/DQmbo4bis7WgjdVYdXR9VbzWdzh2aCXw2JFVKfruYNCNV4G/wdt.png)](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team)


![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)
</center>
