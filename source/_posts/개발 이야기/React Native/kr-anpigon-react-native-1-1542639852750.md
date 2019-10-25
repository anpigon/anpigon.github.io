---
title: '[React Native #1] 리액트 네이티브 시작하기'
tags:
  - kr
  - kr-dev
  - jjangjjangman
  - dclick
  - busy
author: anpigon
date: 2018-11-20 00:04:15
---

![](https://ipfs.busy.org/ipfs/QmfCR8zUQ5Pj9BzK13TJQVZMTxoQWN7MT3ppYkkbsAKSdr)


# 리액트 네이티브란?
리액트 네이티브(React Native)는 iOS와 안드로이드 앱 개발을 위한 라이브러리이다. 자바스크립트로 구현된 기존의 모바일앱들은 웹뷰를 이용한 하이브리드 방식이었다. 하지만 리액트 네이티브는 자바스크립트로 개발하지만, 화면 인터페이스는 네이티브 위젯으로 컴파일하여 빌드된다. 리액트 네이티브는 네이티브 UI를 사용하여 빠른 사용자 경험을 제공한다.

<br><br>

# CRNA 설치

[CRNA(create-react-native-app)](https://github.com/react-community/create-react-native-app)는 기존의 **React Native CLI** 보다 리액트 네이티브 앱개발을 더 쉽고 빠르게 시작할 수 있게 해준다. 그리고 CRNA를 사용하면 Xcode 또는 Android Studio가 필요없다. Linux 또는 Windows에서도 iOS 앱을 개발할 수 있다.

아래 명령어로 CRNA를 설치한다.


```bash
$ npm install -g create-react-native-app
```
> CRNA는 node v4,6,7,8에서만 작동한다. 참고로 나는 [**Node version management `n`**](https://github.com/tj/n)를 사용하여 **node v8.12.0**를 추가 설치하였다.

<br><br>

# 프로젝트 생성하기

CRNA를 사용하여 **weather_app** 앱을 생성한다.

```bash
$ create-react-native-app weather_app
```
<br>위 명령을 실행하고 템플릿 선택을 하면 필요한 모듈을 다운로드하기 시작한다. 그리고 조금 기다리면 아래와 같이 프로젝트가 생성된다.
![](https://files.steempeak.com/file/steempeak/anpigon/V3XmrHir-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-11-192023.20.10.png)

<br><br>

# 실행하기

Xcode 또는 Android Studio를 설치하지 않고 테스트 하려면 디바이스에 **Expo** 앱을 설치해야한다. [Expo앱 다운로드 페이지](https://expo.io/tools#client)에서 Expo앱을 설치한다.

방금 생성한 weather_app 프로젝트를 실행한다.
```bash
$ cd weather_app
$ expo start
```

<br>빌드 과정이 끝나면 콘솔창에 아래와 같이 QR코드가 출력된다.
![](https://files.steempeak.com/file/steempeak/anpigon/uZ6XTXdr-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-11-192023.27.18.png)


디바이스에서 Expo앱을 실행하여 **Scan QR Code** 버튼를 선택한다. 그리고 콘솔창에 보이는 QR코드를 촬영한다.

![](https://steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/IXyzlPqU-Screenshot_20181119-233056_Expo.jpg)

<br>그럼 아래와 같이 샘플앱이 실행되어 보여진다.

![](https://steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/y2Z1YNKs-Screenshot_20181119-233304_Expo.jpg)

<br>코드를 수정하면 `Hot Reloding`에 의해 수정한 내용이 바로 반영된다. 그리고 디바이스를 손에 쥐고 쉐키쉐키 흔들면, 아래와 같이 팝업 메뉴가 나타난다. 팝업 메뉴를 이용하면 앱 접체를 reload하거나, 원격 JS디버깅 또는 Hot Reloding 모드를 끌수도 있다.

![](https://steemitimages.com/300x0/https://files.steempeak.com/file/steempeak/anpigon/ot12bw4k-Screenshot_20181119-234842_Expo.jpg)

<br>마지막으로 브라우저에서  `http://localhost:19003` 를 접속하면, 디바이스 정보와 로그를 확인할 수 있다.

![2xVmzkbNCvpwvhvVoK8gkHgcKPXJ1N568gZVfaWe2uFzySBuYc1CBf9GzmExec6bMEXMABBSV1GRXE6YtCKpSPHX5mUaYBam72aNaSdPoRVEWuNGF4ZqxGyVhJjsfi8xeN64y29VL5mY854HQnQ92wZGQgT9Mdk9JpCM4L2Vf7W2DXg8cL2FRDj2RtokyqmunVYNErB8.png](https://ipfs.busy.org/ipfs/Qmaz4J3TzZ5n7FHkVVP2hLU6tBQSv3nxELRi6cCntKNh93)


> 참고: https://jongmin92.github.io/2017/07/20/ReactNative/create-react-native-app/

<br>
___

<br>

오랜만에 리액트 네이티브 문서를 봤더니 엄청난 발전이 있어서 놀랐습니다. 그리고 개발하기가 정말 쉽고 편해졌습니다. Xcode 또는 Android Studio를 설치하지 않고도 개발할 수 있는게 정말 놀랍네요. 그리고 간단한 코드나 화면은 개발툴 없이 [snack](https://snack.expo.io/)을 이용하면 쉽게 테스트 가능합니다.

사실 저는 개인적으로 구글의 플러터가 더 마음에 들지만, 개발속도(도구)/레퍼런스(오픈소스, 커뮤니티)/개발언어(JS) 등으로 인해 리액트 네이티브를 도저히 버릴 수가 없네요.

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [HBR 블록체인의 진실과 미래를 읽다.](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtMS0tMTU0MjYzOTg1Mjc1MCIsImEiOlsidC03MzMiXSwidXJsIjoiaHR0cHM6Ly9zdGVlbWl0LmNvbS9rci9AYm9vc3R5b3UvaGJyIiwiaWF0IjoxNTQyNjM5ODUyLCJleHAiOjE4NTc5OTk4NTJ9.17VLIClGU_HY3wWxUS9xiQR4tRy1qHOy4dKadSVF-1E)
<sup>안녕하세요. 부추입니다. 최근에 리디셀렉트를 구독하게 되었는데요. 거기에서 하버드비지니스리뷰 ...</sup>
</center>