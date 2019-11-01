---
title: "[React Native] Steem 모바일 지갑앱 만들기 #2"
author: anpigon
date: "2019-04-25T15:46:57Z"
permalink: "/whan/@anpigon/react-native-steem-2"
tags:
  - "whan"
  - "kr"
  - "kr-dev"
  - "busy"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<sup>*Design by &#64;&#105;mrahelk*</sup>

안녕하세요. 안피곤입니다.

Steem 모바일 지갑앱 2번째 포스팅입니다. 지갑 개발에 필요한 기능을 하나씩 학습하면서 구현하고 있습니다. 그리고 그 개발 과정을 기록하고 있습니다.


---
> **시리즈글**
▪︎ [\[React Native\] Steem 모바일 지갑앱 만들기 #1](/kr/@anpigon/react-native-steem-1)
---

<br><center>*</center><br>

## 개발환경 

기분 좋게 [**expo**](https://expo.io/)로 Steem 모바일 지갑 개발을 시작했었습니다. 그러나 expo에서는 키 생성 및 암복호화 라이브러리를 사용할 수가 없었습니다. react-native에서는 standard node module를 모두 지원하지 않습니다. 가장 필요한 crypto와 buffer 라이브러리가 포함되어 있지 않네요.

저는 개발하기 편한 expo 환경을 유지하고 싶었습니다. 그래서 expo-kit을 eject하여 해결해보려고 했습니다. 결국은 삽질만 하다가 포기하고 react-native-cli로 프로젝트 환경으로 다시 구성하였습니다. ㅠㅠ
> 참고로 리액트 네이티브에서는 프로젝트를 시작하는 2가지 방법(expo-cli와 react-native-cli)을 가이드하고 있습니다. 
https://facebook.github.io/react-native/docs/getting-started

<br><center>*</center><br>

## 데이터 안전하게 저장하기
[**react-native-keychain**](https://github.com/oblador/react-native-keychain)를 사용하면 **Keychain**<sub>iOS</sub>/**Keystore**<sub>Android</sub>에 Access 할 수 있습니다. 모바일앱에서 매우 중요한 데이터는 Keychain/Keystore에서 생성된 키를 사용하여 암호화하여 저장합니다. 지갑앱에서는 사용자 PIN 6자리와 지갑키를 secure storage에 저장하고 있습니다.
> Android KeyStore 시스템에서는 암호화 키를 컨테이너에 저장하므로 기기에서 키를 추출해내기가 매우 어렵습니다. 자세한 내용은 [Android Developers 문서](https://developer.android.com/training/articles/keystore?hl=ko)를 읽어보세요.


<br>

`secure-key-store.js` 파일을 아래와 같이 구현하여 사용합니다.
```
import * as Keychain from 'react-native-keychain';

// 데이터 저장
const setItem = async (key, value) => ｛
  await Keychain.setInternetCredentials(
    key,
    key,
    value
  )
｝

// 데이터 조회
const getItem = async (key) => ｛
  const result = await Keychain.getInternetCredentials(key);
  return result.password;
｝

export default ｛
  setItem,
  getItem
｝
```

<br><center>*</center><br>

## 구현 내용

앱을 최초 실행하면 **username**과 **active key**(*또는 마스터키*)와 사용자 PIN 6자리를 등록합니다. 그리고 계정(account) 등록이 완료되면 메인화면으로 이동하여 내 지갑 정보를 가져옵니다. 회원가입은 [steempeople](https://www.steempeople.com/) 페이지로 링크를 연결하였습니다.

<br>지금까지 구현한 화면입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/VbEmvmcy-2019-04-252017-40-45.2019-04-252017_44_22.gif)


<br>여기까지 읽어주셔서 감사합니다.

<br>

***

<center>
### WHAN DEV TEAM
[\[출범식\] WDT(WHAN DEV TEAM) 공식 활동 개시](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team)
[![](https://steemitimages.com/320x0/https://cdn.steemitimages.com/DQmbo4bis7WgjdVYdXR9VbzWdzh2aCXw2JFVKfruYNCNV4G/wdt.png)](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team)


![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)
</center>

