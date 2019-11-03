---
title: "[React Native] 리액트 네이티브에 카카오 로그인 구현하기 #2"
author: anpigon
date: "2019-08-17T10:31:06Z"
permalink: "/zan/@anpigon/grar9-react-native-2"
tags:
  - "React Native"
  - "카카오 로그인"
---
![](https://files.steempeak.com/file/steempeak/anpigon/zRw9wME7-E1848CE185A6E18486E185A9E186A820E1848EE185AEE18480E185A1.png)

이전 글 ["[React Native] 리액트 네이티브에 카카오 로그인 구현하기 #1"](/zzan/@anpigon/6np73q-react-native)에서 이어지는 내용입니다.

<br>
___

<br>카카오톡 로그인으로 스팀잇을 사용하기 위해서는 백엔드 서버가 필요합니다. 

<br>

<center>![](https://steemitimages.com/0x200/https://files.steempeak.com/file/steempeak/anpigon/Fw3GT9H9-social.png)</center>

처음에는 서버 비용과 백엔드(back-end) 개발을 최소하기 위해서 **Google Firebase** 서비스만 사용해서 개발하려고 생각을 했습니다. 그리고 **Google Firebase**에서는 다음 서비스를 무료로 제공합니다. 

* **Authentication**: *10k/월*
* **Cloud Firestore:** *총 용량 1GiB, 대역폭 10GiB/월, 쓰기 20K/일, 읽기 50K/일, 삭제 20K/일*
* **Cloud Functions**: *호출 125K/월, GB-초 40K/월, CPU-초 40K/월, 발신 네트워킹는 구글 서비스만 가능*
* **Cloud Messaging (FCM)**: *무료*
* **Storage**: *총 용량 5GB, 다운로드 크기 1GB/일, 업로드 작업 20K/일, 다운로드 작업 50K/일*
* 기타 등등

그리고 [\[Firebase 사이트\]](https://firebase.google.com/pricing/)에서 더 많은 무료 서비스를 확인 할 수 있습니다.

<br>

하지만  무료 버전의 **Cloud Functions**에서는 구글 서비스만 연동 가능합니다. 그래서 외부 서비스인 카카오톡 API 서비스나 스팀 API를 연동해서 서비스하는 것이 불가능합니다.ㅠ 사실 유료 서비스를 이용하면 가능합니다. 하지만 우리는 가난한 개발자이므로 무료 서비스를 최대한 활용해서 서비스를 만들어보겠습니다. ㅎㅎ

<br>
<br>

***

<br>
<br>

Firebase와 함께 GCP 무료 서비스도 사용하기로 결정 했습니다. 이제는 Firebase와  GCP는 같은 서비스라고 봐도 무방합니다.  ~~그리고 GCP에서 제공하는 서비스가 Firebase보다 훨씬 많습니다. Firebase에는 사용자 인증과 Push 서비스가 있습니다.~~

<center>![](https://steemitimages.com/0x200/https://files.steempeak.com/file/steempeak/anpigon/wZ8wVqUg-99A5D4405B78FDBB33.png)</center>
<br>

GCP에 대해서 매우 잘 설명한 글이 있습니다. 아래 이정운님이 작성한 글을 읽어보세요.
***
* [\[GCP\]가난한 개발자를 위한 GCP free tier 활용 방법 1/2](https://medium.com/@jwlee98/gcp-％EA％B0％80％EB％82％9C％ED％95％9C-％EA％B0％9C％EB％B0％9C％EC％9E％90％EB％A5％BC-％EC％9C％84％ED％95％9C-gcp-free-tier-％ED％99％9C％EC％9A％A9-％EB％B0％A9％EB％B2％95-1-2-3022348e1103)
* [[GCP]가난한 개발자를 위한 GCP free tier 활용 방법 2/2](https://medium.com/@jwlee98/gcp-％EA％B0％80％EB％82％9C％ED％95％9C-％EA％B0％9C％EB％B0％9C％EC％9E％90％EB％A5％BC-％EC％9C％84％ED％95％9C-gcp-free-tier-％ED％99％9C％EC％9A％A9-％EB％B0％A9％EB％B2％95-2-2-50bdc290ea0d)
***

<br>GCP는 Firebase보다 훨씬 더 많은 서비스를 제공합니다. 그리고 GCP도 당연히 무료 서비스들을 제공합니다. 구글은 매우 관대합니다. 하지만 아래 서비스를 사용하면 구글 서비스에 완전 종속된 앱이 되어버립니다.

![](https://files.steempeak.com/file/steempeak/anpigon/SfgFlKcG-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-172017.45.07.png)
![](https://files.steempeak.com/file/steempeak/anpigon/RRowUaxF-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-172017.48.04.png)
![](https://files.steempeak.com/file/steempeak/anpigon/4d3wY7xx-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-172017.46.28.png)

출처: https://cloud.google.com/free/docs/gcp-free-tier#always-free

<br><br>

***

<br><br>

# Firebase Authentication 사용하기

Firebase Authentication 에는 다음 인증 방식을 제공합니다. 대부분의 인증이 있는데 카카오톡 인증이 없는 것이 많이 아쉽습니다.

![스크린샷 20190817 18.25.12.png](https://files.steempeak.com/file/steempeak/anpigon/HnaNqIiq-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-172018.25.12.png)

<br><br>저는 다음과 같은 방법으로 카카오톡 인증을 구현해 볼까 합니다. 참고로 카카오톡은 클라이언트 인증과 서버 인증이 연동이 안되고 따로 동작합니다. 만약 서버에서 카카오톡 인증을 처리하게 되면, 모바일앱에서는 웹뷰에서 로그인 하는 형태로 구현됩니다. 이런 인증방식은 제가 싫어합니다.ㅋ 그래서 모바일 SDK를 사용하여 카카오톡앱 연동하여 간편하게 인증하고, 발급 받은 액세스 토큰을 서버에서 다시 검증하여 사용자 등록 및 인증을 처리하고 있습니다. 덕분에 시퀀스 다이어그램이 매우 복잡해졌습니다. ㅠ

___
![시퀀스 다이어그램](https://files.steempeak.com/file/steempeak/anpigon/p1oHZKBo-KakaoTalk20Login.png)
___

<br>무료 버전의 **Cloud Functions**에서 외부 API 연동이 안되기 때문에 어쩔 수 없이 **GAE(Google App Engine)**를 사용했습니다. 그래서 카카오톡 API나 Steem API 처럼 외부 연동이 필요한 부분은 **GAE**에서 처리합니다. 그리고 사용자 인증 및 관리는 **Firebase Authentication**에서 모두 관리됩니다. 덕분에 사용자 가입 및 인증은 제가 따로 더 구현할 것이 없습니다. 그리고 서비스를 이용하는데 필요한 사용자 추가 데이터는 **Firestore**에 저장합니다. 그리고 외부 연동이 필요 없는 단순한 함수는 **Cloud Functions**를 사용할 생각입니다. 무료 제공 임계치를 넘으면 비용이 발생하기 때문에, 무료 서비스를 골고루 사용할 생각입니다. 

<br>
<br>

## 서버에서 Firease Admin SDK 사용하기

서버에서 Firebase 인증(Auth)과 Firestore를 사용하기 위해서 다음 절차를 진행합니다. **Firebase Console** 설정 페이지에서 `[새 비공개 키 생성]`을 눌러 키를 생성합니다. 그럼 **json** 파일이 다운로드 됩니다. **json** 파일은 한 번만 다운로드 가능하기 때문에 분실하면 다시 생성하여 다운로드해야 합니다. 그리고 해당 **json** 파일은 반드시 서버에서만 사용해야합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/45mVqBMg-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-172018.53.50.png)

<br>위에서 다운로드 받은 **json 파일**을 사용하여 `firebaseAdmin`를 초기화 합니다. 이제 서버에서는 **firebase**의 **auth**와 **firestore**를 사용할 수 있습니다. *(**Firebase Admin SDK**에 대한 자세한 설명은 [공식 사이트](https://firebase.google.com/docs/admin/setup?authuser=0)를 참고하세요.)*

![](https://files.steempeak.com/file/steempeak/anpigon/Kyd2OPsa-code.png)



<br>백엔드 API 서버는 **Apollo GraphQL**를 사용하여 구현했습니다. **Apollo GraphQL**를 사용하면 백엔드나 클라이언트를 좀 더 빠르고 쉽게 개발할 수 있습니다. 게다가 API Console 페이지까지 자동으로 생성해줍니다. **Apollo GraphQL**를 사용해서 개발하면 시간을 많이 절약할 수 있습니다.

![](https://files.steempeak.com/file/steempeak/anpigon/bJOVKhw6-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-172019.03.39.png)

지금은 API 서버에 **"사용자 등록(registerUser)"**과 **"글 조회(getPosts)"** 기능만 구현되어 있습니다. 

(내용이 너무 길어지는 것 같아서 다음 글에서 이어서 작성하겠습니다.)

<br>
<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='https://steemit.com/@anpigon'>@anpigon</a></code></h5></center>
