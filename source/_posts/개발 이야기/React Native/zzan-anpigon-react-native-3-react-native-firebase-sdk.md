---
title: '[React Native] 리액트 네이티브에 카카오 로그인 구현하기 #3 : React Native Firebase SDK 사용하기'
tags:
author: anpigon
date: 2019-08-18 18:27:45
---

이전 글 ["[React Native] 리액트 네이티브에 카카오 로그인 구현하기 #2"](/zan/@anpigon/grar9-react-native-2)에서 이어지는 내용입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/zRw9wME7-E1848CE185A6E18486E185A9E186A820E1848EE185AEE18480E185A1.png)

___

<br>
<br>

이번에는 리액트 네이티브에 Firebase SDK를 설정합니다. Firebase에서는 리액트 네이티브를 공식 지원하지 않기 때문에 오픈소스인 React Native Firebase 모듈을 사용합니다.

![React Native Firebase](https://files.steempeak.com/file/steempeak/anpigon/MoBjVrFX-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-182009.46.22.png)
https://rnfirebase.io/
https://github.com/invertase/react-native-firebase

<br>React Native Firebase는 현재 v6.0까지 나와있습니다. 하지만 최신 안정 릴리스(v5.3.x)를 사용하기를 권장합니다. 그리고 처음 시작하는 사용자는 [**React Native Firebase 스타터 키트**](https://rnfirebase.io/docs/v5.x.x/installation/basic-kit)를 사용해서 프로젝트를 생성해도 됩니다. 스타터 키트에는 Firebase 연동에 필요한 모든 설정이 미리 되어 있습니다.

<br>

___

<br>

아래 설치 방법은 [React Native Firebase 가이드 문서](https://rnfirebase.io/docs/v5.x.x/installation/initial-setup)를 보고 진행합니다.

<br>**react-native-firebase 설치하기**

```
yarn add react-native-firebase
```

<br>

그리고 [Firebase 콘솔](https://firebase.google.com/console)에 접속합니다. App Project를 생성하고 `Firebase > 설정(Settings) > 일반 > 내앱` 메뉴로 이동합니다. 그리고 안드로이드앱을 선택합니다.
![firebase_admin.png](https://files.steempeak.com/file/steempeak/anpigon/o4dJQDdT-firebase_admin.png)

<br><br>Android 패키지 이름을 입력합니다. 패키지 이름은 `android/app/build.gradle` 또는 `android/app/src/main/AndroidManifest.xml` 파일에서 확인 가능합니다.
![1](https://files.steempeak.com/file/steempeak/anpigon/Uh6SVNul-scrnli_2019-208-2018-20E1848BE185A9E1848CE185A5E186AB209-25-50.png)

<br><br>그다음 화면에서 `google-service.json` 파일을 다운로드 합니다. 그리고 그 파일을 `android/app/google-services.json` 경로에 복사합니다. 안내 페이지의 설명을 따라서 진행하면 됩니다.

![2](https://files.steempeak.com/file/steempeak/anpigon/Bg96TLgi-scrnli_2019-208-2018-20E1848BE185A9E1848CE185A5E186AB209-26-30.png)

<br><br>그다음 안내 페이지 설명에 따라 소스 코드에 Firebase SDK를 설정합니다.

![3](https://files.steempeak.com/file/steempeak/anpigon/Tv3gdqCp-scrnli_2019-208-2018-20E1848BE185A9E1848CE185A5E186AB209-26-49.png)

<br>다음 파일에 아래 내용을 추가합니다.

`android/build.gradle`
```
buildscript {
  dependencies {
    ...
    // Add this line
    classpath 'com.google.gms:google-services:4.2.0'
  }
}
```
<br>
`android/app/build.gradle`
```
dependencies {
  // Add this line
  implementation 'com.google.firebase:firebase-core:17.0.0'
}
...
// Add to the bottom of the file
apply plugin: 'com.google.gms.google-services'
```

<br><br>

이 화면이 보이면 앱을 빌드하고 실행합니다. 앱이 실행되면 다음 화면으로 자동 이동합니다. 하지만 <U>*이 단계 건너뛰기*</U> 를 선택해도됩니다.

![4](https://files.steempeak.com/file/steempeak/anpigon/OKEDTjt7-scrnli_2019-208-2018-20E1848BE185A9E1848CE185A5E186AB209-29-58.png)

<br><br>설정이 완료하고 나면 콘솔에 Android 앱이 추가된 것을 확인할 수 있습니다. 그리고 `google-service.json` 파일은 언제든지 다시 다운로드 할 수 있습니다.

![5](https://files.steempeak.com/file/steempeak/anpigon/0xWdxaOB-scrnli_2019-208-2018-20E1848BE185A9E1848CE185A5E186AB209-30-32.png)


<br><br>리액트 네이티브에서는 다음과 같이 사용합니다.

```
import firebase from 'react-native-firebase';

//...

    const firebaseAuth = await firebase
             .auth()
             .createUserWithEmailAndPassword(email, secret);
    console.log('firebaseAuth', firebaseAuth);
```


<br><br>

Firebase를 연동하여 모바일앱을 개발해보고 싶은 초보 개발자에게 매우 좋은 튜토리얼이 있습니다. 간단한 TO-DO List를 관리하는 앱입니다. 쉽게 따라서 만들 수 있을 것 같습니다.
* [Getting started with Cloud Firestore on React Native](https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native)

<br>
<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>

<br>


