---
title: "[React Native] Steem 모바일 지갑앱 만들기 #1"
author: anpigon
date: "2019-04-13T14:16:36Z"
permalink: "/kr/@anpigon/react-native-steem-1"
tags:
  - "React Native"
  - "Steem"
---
![](http://image.yes24.com/momo/TopCate03/MidCate04/233950.jpg)
> 옛날에 이런 책이 있었습니다. 스팀잇에는 이 책을 기억하는 분들이 많을 것 같습니다.
저는 리액트를 공부한지 일주일이 훨씬 넘었는데 잘 할 수 있을까요? ㅋ

<br>

안녕하세요. 안피곤입니다.

**WDT(WHAN DEV TEAM)**에 합류해서 올리는 첫 글이네요. **WDT**가 뭔지 잘 모르는 분들은, 뉴비존님이 작성한 ["\[출범식\] WDT(WHAN DEV TEAM) 공식 활동 개시"](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team) 글을 읽어보세요. 

이제 저는 WDT 팀원의 조언과 피드백을 거의 실시간으로 받을 수 있기 때문에, 코딩 실력 향상에 정말 많은 도움이 될 것 같습니다. 그리고 WDT 도움을 받아 스팀(Steem) 모바일 지갑앱 개발을 하려고 합니다. 

저는 리액트 네이티브(React Native)를 공부하고 있었으므로, 모바일앱을 리액트 네이티브로 개발할 것 같습니다. 그리고 개발 과정을 스팀잇에 기록하려고 합니다. 스팀잇분들과 의견을 나누면서 개발하고 싶습니다. 많은 관심과 조언 부탁드립니다.

<br><br><br><center>* * *</center><br><br><br>

# Expo 사용하기

저는 [Expo](https://expo.io/)를 사용해서 리액트 네이티브를 개발하고 있습니다. Expo 장점은 "[리액트 네이티브로 무비앱을 만들어서 스토어에 올렸어요!](https://steemit.com/kr/@anpigon/3radqh)" 글에서 한번 설명했습니다. 추가로 좋은점을 하나 더 알려드리면 앱 서명 키를 내가 관리할 필요가 없습니다. Expo에서 관리하도록 선택할 수 있습니다. 저는 앱 서명 키를 잃어버린 적이 많아서 큰 장점이라고 생각합니다.

그리고 Expo는 이렇게 개인 페이지도 제공 해줍니다. 개인 페이지에는 공개한 앱이 노출됩니다. 아래 보이는 앱들은 제가 동영상 강좌를 학습하면서 만든 샘플앱입니다. 그런데 어느 천사분께서 하트를 하나 눌러 주고 가셨네요.

https://expo.io/@markan
![](https://files.steempeak.com/file/steempeak/anpigon/EjDmlAVk-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-1220E1848BE185A9E18492E185AE201.18.51.png)

<br>

### Expo CLI 설치하기

**expo**를 사용하기 위해서는 `expo-cli`가 설치되어 있어야 합니다.

```
npm install expo-cli --global
```

<br>

### .gitignore 파일 생성하기

저는 `.gitignore` 파일을 생성할 때 아래 사이트를 사용합니다.

[https://www.gitignore.io/](https://www.gitignore.io/)

![](https://files.steempeak.com/file/steempeak/anpigon/tRBxgKRZ-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-1220E1848BE185A9E18492E185AE201.16.15.png)

키워드를 입력하고 `생성` 버튼을 눌러서 파일을 다운받으면 됩니다. 아니면 아래 명령어로 다운로드하면 간편합니다.

```
curl -o .gitignore https://www.gitignore.io/api/node,reactnative
```

<br><br><br><center>* * *</center><br><br><br>


# 프로젝트 생성하기

expo 명령어로 프로젝트를 생성합니다.

```
expo init whan-wallet
```

![](https://files.steempeak.com/file/steempeak/anpigon/omXP4MB4-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-1220E1848BE185A9E18492E185AE201.36.53.png)

<br>

# 프로젝트 실행하기

생성한 프로젝트를 실행하면, 기본적으로 포함되어 있는 코드가 빌드되어 앱이 실행됩니다. 그리고 터미널 창에 QR 코드가 출력됩니다. QR 코드를 촬영하면 스마트폰으로 앱을 확인할 수 있습니다.

```
cd whan-wallet
npm start
```

![](https://files.steempeak.com/file/steempeak/anpigon/PPCbQttp-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-1220E1848BE185A9E18492E185AE201.49.14.png)

<br>

스마트폰으로 앱을 확인하기 위해서는 **expo client** 앱이 설치되어 있어야 합니다. **expo client** 앱은 구글 스토어와 애플 스토어에서 설치 가능합니다.

[https://expo.io/tools#client](https://expo.io/tools#client)

![](https://files.steempeak.com/file/steempeak/anpigon/ycZGXxTm-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-1320E1848BE185A9E18492E185AE2010.26.32.png)

> **expo client** 앱에서 확인하기 위해서는 **USB 연결** *또는* **PC와 같은 네트워크의 Wi-Fi에 연결**되어 있어야합니다.

<br>

**expo client** 앱에서 QR코드를 촬영하면, 아래 화면과 같이 샘플앱이 보입니다.  

![](https://cdn.steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/M69FLHsi-Screenshot_20190412-135348_Expo.jpg)

<br>그리고 폰을 좌우로 흔들면 아래 화면처럼 개발 메뉴가 짠~!하고 나타납니다. 저는**Remote Debugging**와 **Hot Reloading** 기능을 자주 사용합니다.

![](https://cdn.steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/is3E1Vjl-Screenshot_20190412-135353_Expo.jpg)
*Fin.*
___

<br>저는 많은 분이 코딩에 흥미를 느꼈으면 좋겠습니다. 그리고 #kr-dev에 더 많은 글이 올라왔으면 좋겠습니다. 

#kr-dev에 올라오는 대부분의 개발글에는 보팅하고 있습니다. 참고로 제 스팀파워가 작아서 보상금액이 많지는 않습니다. 대신 정성을 다해서 보팅하고 있어요. ㅋ

여기까지 읽어주셔서 감사합니다.

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [장애인의 주홍글씨 BeMinor를 여러분의 가치로 만들어 주십시오.](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtc3RlZW0tMSIsImEiOlsidC0xNzgzIl0sInVybCI6Imh0dHA6Ly90aGViZW1pbm9yLmNvbS94ZS9zcG9uc29yIiwiaWF0IjoxNTU1MTY1MTc2LCJleHAiOjE4NzA1MjUxNzZ9.TJuuCnFTxKU5Os-1wo4ga_2QgOPs8AE37FUJDu5M7BU)
<sup>1,000인의 마이너는 비마이너의 경제적 자립을 지원합니다.</sup>
