---
title: '[React Native] 리액트 네이티브에 카카오 로그인 구현하기 #1'
tags:
  
  
  
  
  
  
  
  
  
  
author: anpigon
date: 2019-08-10 19:20:51
---

![](https://files.steempeak.com/file/steempeak/anpigon/zRw9wME7-E1848CE185A6E18486E185A9E186A820E1848EE185AEE18480E185A1.png)

안녕하세요. 안피곤입니다.

카카오톡 로그인으로 스팀잇을 사용할 수 있다면 "일반 사용자가 쉽게 접근할 수 있지 않을까?" 생각했습니다. 카카오톡 로그인을 시작으로 가능하면 구글, 페이스북, 트위터 로그인도 구현하고 싶어요.

카카오톡 로그인 API는 공식적으로 리액트 네이티브를 지원하지 않습니다. 그래서 사용하려면 안드로이드 또는 iOS 코드를 조금 수정해야합니다. 저는 안드로이드 앱만 개발할 생각이라서 안드로이드만 살펴봤습니다.

<br>

***

안드로이드 설정 방법은 카카오 공식 가이드 문서를 참고하였습니다.
https://developers.kakao.com/docs/android/getting-started#gradle-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95

그리고 리액트 네이티브 모듈은 react-native-kakao-logins를 사용했습니다.
https://github.com/react-native-seoul/react-native-kakao-logins

***

<br>

# react-native-kakao-logins 모듈 설치하기

`npm install`로 모듈을 설치하고 `react-native link`를 실행합니다.

```
$ npm install react-native-kakao-logins --save
$ react-native link react-native-kakao-logins
```

<br>


# 안드로이드 Gradle 환경 설정하기

`android/build.gradle` 파일에 다음 내용을 추가합니다.

```
subprojects {
    repositories {
        mavenCentral()
        maven { url 'http://devrepo.kakao.com:8088/nexus/content/groups/public/' }
    }
}
```

<br>


혹시 프로가드를 사용한다면 `android/app/proguard-rules.pro` 에 다음 내용도 추가합니다.
```
-keep class com.kakao.** { *; }
-keepattributes Signature
-keepclassmembers class * {
  public static <fields>;
  public *;
}
-dontwarn android.support.v4.**,org.slf4j.**,com.google.android.gms.**
```

<br>

# 앱 설정하기

`android/app/src/main/res/values/kakao_strings.xml` 파일을 생성하고 아래 내용 입력합니다. 앱생성시 발급된 네이티브 앱키를 `kakao_app_key` 이름으로 정의하고 등록합니다.

```
<resources>
    <string name="kakao_app_key">AAAAAAAAAAAAAAAAAAAAAA</string>
</resources>
```
> 앱키 값은 개발자 웹사이트에서 제공하는 대쉬보드의 설정 > 일반 > 앱 키 > 네이티브 앱 키 메뉴를 통해 확인 가능합니다.

<br>

마지막으로 `android/app/src/main/AndroidManifest.xml` 파일을 수정합니다.
 `allowBackup`을 `true`로 설정합니다. 그리고 `<meta-data>`에 `com.kakao.sdk.AppKey`를 등록합니다.

```
<application
  android:name=".MainApplication"
  android:label="@string/app_name"
  android:icon="@mipmap/ic_launcher"
  android:roundIcon="@mipmap/ic_launcher_round"
  android:allowBackup="true"
  android:theme="@style/AppTheme">
     
  <! --  com.kakao.sdk.AppKey 이름으로 앱키를 등록 -->
  <meta-data
    android:name="com.kakao.sdk.AppKey"
    android:value="@string/kakao_app_key" />

  <activity
      …
```

<br>
<br>

# 로그인 화면 개발하기

`src/screens/login.js` 파일을 수정합니다.

```
import RNKakaoLogins from 'react-native-kakao-logins';

…

class LoginScreen extends Component {

    …

    // 카카오 로그인 하기
    kakaoLogin = () => {
        RNKakaoLogins.login((err, result) => {
          if (err) {
            Alert.alert('error', err.toString());
            return;
          }/Users/anpigon/ReactNative/steewitter/src/screens/login.example.js
          Alert.alert('result', JSON.stringify(result));
        });
      };

      render() {
         return (

             …

            <Button
                block
                style={{ backgroundColor: '#F7E314' }}
                onPress={() => this.kakaoLogin()}>
                <Text style={{ color: '#3C1E1E', fontWeight: 'bold' }}>
                  카카오 로그인
                </Text>
              </Button>
```

<br>

카카오 로그인 버튼을 누르면, 카카오톡 앱과 연동하여 인증 후 액세스 토큰을 가져옵니다. 그리고 카카오톡 API 가이드 문서에는 액세스 토큰과 관련하여 이렇게 나와있습니다.
> access_token은 발급 받은 후 12시간-24시간(정책에 따라 변동 가능)동안 유효합니다.  안드로이드의 경우에는 sdk내에서 토큰이 만료되면 알아서 필요한 시점에 갱신을 해주고 있습니다. 

<br>

# 구현 결과

![](https://files.steempeak.com/file/steempeak/anpigon/WxZ9wIAy-20190809_220444.2019-08-092022_11_04.gif)

<br>

원래 처음 로그인시 아래와 같이 사용자 동의 화면이 나타납니다. 그런데 위 예제 화면에서는 제가 이미 동의해서 바로 로그인 되네요. ㅋ

![](https://developers.kakao.com/assets/images/android/a_006.png)

<br>다음 번에는 사용자 관리를 위한 서버를 개발할 생각입니다. 그리고 사용자 인증에는 google firebase auth를 사용할 것입니다.

<br>
<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>

<br>
