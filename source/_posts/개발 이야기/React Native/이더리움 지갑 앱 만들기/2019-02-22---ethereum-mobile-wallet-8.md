---
title: "이더리움 모바일 지갑(Ethereum Mobile Wallet) 만들기 #8 - 배포하기"
author: anpigon
date: "2019-02-22T01:56:00Z"
permalink: "/kr/@anpigon/ethereum-mobile-wallet-8"
tags:
  - "React Native"
  - "이더리움"
---
![](https://cdn.steemitimages.com/DQmTBYPHABLZoXJMWL9msssEoTsXz9LvVaK7dT49uXXGQi7/galaxy-2.png)

이제 정말 마지막 강좌입니다. 

이번 시간에는 구글 플레이 스토어에 우리가 만든 앱을 배포해봅니다. 우선은 안드로이드앱 배포 만 설명합니다.

**Google Play 스토어**에 앱을 등록하기 위해서는 서명된 APK를 만들어야 합니다. 앱 서명에 대한 자세한 내용은 [\<안드로이드 개발자 가이드 : 앱 서명\>](https://developer.android.com/studio/publish/app-signing)를 참고하세요. 한글로 자세하게 설명되어 있습니다. 그리고 아래 내용은 [\<리액트 네이티브 Generating Signed APK\>](https://facebook.github.io/react-native/docs/signed-apk-android) 문서를 참고하여 작성하였습니다.

<center><br>* * *<br></center>

## 안드로이드 앱 아이콘 만들기

저는 앱 아이콘을 아래 사이트를 이용하여, 간단하게 만들었습니다.

https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

![](https://cdn.steemitimages.com/DQmYmP55LyyjYoeFBSQ4Rvh8y2aoRoNM7357f7K6d3eRyo6/screenshot.png)

생성된 아이콘을 다운로드 합니다. 그리고 `android/app/src/main/res` 폴더에 각 사이즈별 아이콘을 복사합니다.

- mipmap-hdpi
- mipmap-mdpi
- mipmap-xhdpi
- mipmap-xxhdpi
- mipmap-xxxhdpi

&nbsp;

## 서명 키 생성하기

`keytool`를 사용하여 서명키를 생성합니다.

>  - 윈도우 사용자는 `C:\Program Files\Java\jdkx.x.x_x\bin` 경로에 `keytool`이 있습니다. 
> - 맥OS 사용자는 `/usr/libexec/java_home` 명령어를 실행하면, JDK가 설치된 경로를 알 수 있습니다. `/Library/Java/JavaVirtualMachines/jdkx.x.x_x.jdk/Contents/Home`


```bash
$ keytool -genkey -v -keystore ethereum-wallet.keystore -alias ethereum-wallet -keyalg RSA -keysize 2048 -validity 10000
```

위 명령을 실행하면 콘솔창에 비밀번호와 이름, 지역 등을 입력하라는 메시지가 표시됩니다. 값을 모두 입력한 다음 **"예"**(or yes)를 입력합니다. 그러고 나면 `ethereum-wallet.keystore` 파일이 생성됩니다 .

방금 생성한 keystore에는 10000일 동안 유효한 키가 들어 있습니다. **keystore password, key password, alias**은 나중에 앱에 서명할 때 사용하므로 꼭 메모해 놓으시기 바랍니다. 그리고 keystore파일이 **절대 git에 업로드되어 공개되지 않도록 조심**하세요.

&nbsp;

## gradle 설정하기

1. `ethereum-wallet.keystore` 파일을 `android/app` 폴더에 복사합니다.
2. `~/.gradle/gradle.properties` 또는 `android/gradle.properties` 파일을 열어서 다음과 같이 추가합니다.

```properties
MYAPP_RELEASE_STORE_FILE=ethereum-wallet.keystore
MYAPP_RELEASE_KEY_ALIAS=ethereum-wallet
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```
> - *******에는 keystore 암호화와 alias 암호를 정확하게 입력합니다.

&nbsp;

## 앱의 gradle config에 서명 설정하기

프로젝트 폴더의 `android/app/build.gradle`파일에 `signingConfig` 설정을 추가합니다.

```gradle
...
android ｛
    ...
    defaultConfig ｛ ... ｝
    signingConfigs ｛
        release ｛
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) ｛
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            ｝
        ｝
    ｝
    buildTypes ｛
        release ｛
            ...
            signingConfig signingConfigs.release
        ｝
    ｝
｝
...
```

&nbsp;

### 안드로이드 APK 생성하기

터미널에서 아래 명령을 실행합니다.

```sh
$ cd android
$ ./gradlew assembleRelease
```

> - 생성된 APK는 `android/app/build/outputs/apk/release/app-release.apk`에서 찾을 수 있습니다.

&nbsp;

> *만약, 아래와 같은 메세지가 출력된다면...*
> ```bash
> FAILURE: Build failed with an exception.
> 
> * What went wrong:
> A problem occurred configuring project ':app'.
> > SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.
> ```
>
> `android/local.properties` 파일을 생성하고, `sdk.dir=/Users/｛YOUR_USER_NAME｝/Library/Android/sdk`를 입력합니다.
>
> 또는, `~/.bash_profile` 에 `export ANDROID_HOME=｛YOUR_PATH｝`를 설정할 수도 있습니다.

&nbsp;

### 앱의 출시 빌드 테스트하기

release된 APK를 Play 스토어에 업로드하기 전에 테스트해야 합니다. 다음을 명령을 사용하면 장치에 release된 APK를 설치할 수 있습니다. 먼저 이미 설치된 앱을 제거해야 합니다.

```sh
$ react-native run-android --variant=release
```

&nbsp;

### ABI로 APK를 분할하여 파일 크기를 줄이기

기본적으로 생성된 APK에는 x86와 ARMv7a CPU 아키텍처 용 네이티브 코드가 모두 들어있습니다. 이렇게 하면 대부분의 Android 기기에서 실행되는 APK를 쉽게 배포할 수 있습니다. 그러나 이렇게 하면 어떤 장치에는 사용되지 않는 코드가 있으므로 불필요하게 큰 APK가 만들어질 수 있다는 단점이 있습니다.

`android/app/build.gradle`에서 `enableSeparateBuildPerCPUArchitecture`를 **true**로 변경합니다. 그럼 각 CPU에 대한 APK를 만들 수 있습니다.

```
def enableSeparateBuildPerCPUArchitecture = true
```
&nbsp;

이 두 파일을 [Google Play](https://developer.android.com/google/play/publishing/multiple-apks.html) 및 [Amazon AppStore](https://developer.amazon.com/docs/app-submission/getting-started-with-device-targeting.html) 처럼 기기 타겟팅을 지원하는 마켓에 업로드 하면, 사용자는 자동으로 필요한 APK를 다운로드합니다. 단일 앱에 대해 여러 개의 APK를 지원하지 않는 [ APKFiles](https://www.apkfiles.com/) 과 같은 마켓에 업로드하려는 경우, 다음 줄도 변경하여 두 CPU의 바이너리가 모두 들어있는 범용 APK로 만들어야 합니다.

```diff
universalApk true  // If true, also generate a universal APK
```

&nbsp;

### Proguard를 활성화하여 APK 크기 줄이기 (선택 사항)

Proguard는 APK의 크기를 약간 줄일 수 있는 도구입니다. 앱에서 사용하지 않는 React Native Java 바이트 코드(및 종속성)의 일부를 제거합니다.

Proguard를 활성화하려면  `android/app/build.gradle` 파일에서 다음을 수정합니다.

```gradle
/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
```
> ***중요** : Proguard를 사용하도록 설정한 경우에는 앱을 철저히 테스트해야합니다. Proguard는 종종 각 네이티브 라이브러리에 특정한 설정을 필요로합니다. `android/app/proguard-rules.pro`* 파일을 참조하세요.

&nbsp;




## 구글 플레이 스토어에 앱 등록하기
구글 플레이 스토어에 등록하는 방법은 간략하게 설명하겠습니다. 자세하게 모두 설명하려니 내용이 너무 많아지네요. ㅠㅠ

아래 사이트에 접속하여 안드로이드 개발자 등록을 먼저 해야 합니다. 
https://play.google.com/apps/publish/?hl=ko

이미 개발자 등록이 되어있다는 가정하에 설명합니다.

1. 애플리케이션 만들기 버튼을 선택합니다. 앱 제목을 입력하고 **만들기** 버튼을 선택합니다.
![](https://files.steempeak.com/file/steempeak/anpigon/cVgclSDO-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-02-222010.17.55.png)

2. 스토어 등록정보를 입력합니다. `*` 표시되어 있는 입력항목은 반드시 모두 입력해야 합니다.
![](https://cdn.steemitimages.com/DQmWkr6oVmMffM2waYsc1yG6ghp8nEaqd5weKZtikmk6EVN/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-20％2013.08.07.png)
그리고 스크린샷, 고해상도 아이콘, 그래픽 이미지를 모두 등록합니다. 
![](https://cdn.steemitimages.com/DQmVUX23qtbs1pZEHpRszvtwf1pQX1SWCfgJbKXJSj3mKX8/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-21％2010.45.53.png)

3. 스토어 등록정보, 콘텐츠 등록, 가격 및 배포 메뉴의 모든 정보를 입력합니다. 모든 정보를 입력해야 앱 출시가 가능합니다.

4. 마지막으로 앱 버전 메뉴를 선택하고, 서명된 APK를 업로드합니다.
![](https://files.steempeak.com/file/steempeak/anpigon/qGpJjrRW-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-02-222010.22.44.png)
그리고 **저장**을 누르고 **검토**를 선택합니다.
![](https://files.steempeak.com/file/steempeak/anpigon/lCE5sw9z-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-02-222010.25.52.png)

5. 배포가 완료되면 대시보드에서 내 앱을 확인할 수 있습니다. **GOOGLE PLAY에서 보기** 버튼을 누르면 구글 마켓으로 이동합니다.
![](https://files.steempeak.com/file/steempeak/anpigon/rbqhR6BA-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-02-222010.27.06.png)

<center><br>* * *<br></center>

구글 마켓에 정상적으로 배포가 되었습니다.
![](https://user-images.githubusercontent.com/43256291/53139368-c965c000-35cc-11e9-8695-cff963e95e5d.png)
- 구글마켓: https://play.google.com/store/apps/details?id=com.rn_ethereum_wallet
- 깃허브: https://github.com/anpigon/rn_ethereum_wallet

&nbsp;

**이더리움 지갑앱**이 리액트 네이티브로 개발하여 마켓에 배포까지 한 첫 **모바일 앱**이 되었네요. 

리액트 네이티브로 모바일앱을 개발하고 나서 느낀 점입니다. 
앱 실행 속도, 화면 전환 속도, APK최적화(용량) 부분에서는 자바 언어로 개발한 안드로이드 앱보다는 만족감이 조금 떨어졌습니다. 하지만 리액트 네이티브가 개발(코딩) 속도, 앱 디버깅, 테스트 등에서는 정말 많은 이점이 있었습니다. 단순한 앱은 리액트 네이티브로 금방 개발할 수 있을 것 같습니다. 그리고 웬만한 필요한 기능들이 리액트 네이티브 모듈로 구현되어 깃허브에 공개되어 있네요. 

> 참고로, 곧 출시될 **삼성 갤럭시10**에는 비트코인, 이더리움 암호화폐 지갑이 포함되었다고 합니다.
> - 관련 기사: https://blockinpress.com/archives/13873

&nbsp;

여기까지 읽어주셔서 감사합니다.