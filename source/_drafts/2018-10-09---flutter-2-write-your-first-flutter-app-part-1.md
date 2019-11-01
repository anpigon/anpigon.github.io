---
title: "[Flutter] 모바일 앱 개발 : Flutter 시작하기 #2 - First Flutter App (1)"
author: anpigon
date: "2018-10-08T16:40:54Z"
permalink: "/kr/@anpigon/flutter-2-write-your-first-flutter-app-part-1"
tags:
  - "kr"
  - "kr-dev"
  - "flutter"
  - "busy"
---
![](https://imgur.com/zPHGPmb.png)

<br>안녕하세요. @anpigon 입니다.

이전 글 ["모바일 앱 개발 : Flutter 시작하기"](https://steemit.com/dclick/@anpigon/-flutter--1538895504796)에서 이어지는 내용입니다. 이번에는 [Flutter 튜토리얼 파트1](https://codelabs.developers.google.com/codelabs/first-flutter-app-pt1/#0)의 1~4번까지의 과정을 따라하면서 정리하였습니다.

![Screenshot.png](https://files.steempeak.com/file/steempeak/anpigon/9pC0WxLR-Screenshot.png)

원문을 보고 싶으면 아래 링크를 클릭하세요.
https://codelabs.developers.google.com/codelabs/first-flutter-app-pt1/#0

<br>아래 발췌한 글은 Flutter 튜토리얼의 첫 문단에 있는 글입니다. 간단하게 말하면 배우기 쉽다는 말입니다. 아랫글을 읽고 나면 Flutter를 학습하는 것에 대한 부담감이 많이 줄어듭니다. 부담감 -99.99％가 되어 결과적으로 학습에 대한 부담감은 0.01％가 됩니다. 쉽게 말하면, 키보드와 마우스만 다룰 줄 알면 누구나 배울 수 있습니다.

> 이것은 첫 번째 Flutter앱 만드는 방법을 안내합니다. 객체 지향 및 기본 프로그래밍 개념에 익숙하지 않아도 완료 할 수 있습니다. 다트(Dart) 또는 모바일 프로그래밍에 대한 경험은 필요하지 않습니다.

<br>![grandmotherg](https://files.steempeak.com/file/steempeak/anpigon/uf33o5Rx-grandmother-1822564_640.jpg)
위 사진은 제가 할머니께 **Flutter앱** 만드는 방법을 설명하고 있는 장면입니다.

<br><hr><br>

이번 파트1에서는 우리는 다음을 학습하게 됩니다.

- iOS와 Android에서 자연스럽게 보이는 Flutter 앱을 작성하는 방법.
- Flutter 앱의 기본 구조.
- 외부 패키지를 사용하여 기능을 확장하는 방법.
- 더 빠른 개발을 위한 **Hot Reload** 사용 방법.
- Stateful 위젯을 구현하는 방법.
- 무한 스크롤(infinite scrolling)과 지연된 로딩 ListView를 만드는 방법.

<br><hr><br>

# Create the starter Flutter app

<br>안드로이드 스튜디오에서 New Flutter Project를 생성합니다. Project Name에는 **startup_namer**를 입력합니다.

![new Flutter App](https://files.steempeak.com/file/steempeak/anpigon/bb9gpALR-2018-10-0823.43.14.png)

New Flutter Application이 생성되면 아래와 같이 코드를 편집할 수 있는 화면이 나타납니다.

![2](https://files.steempeak.com/file/steempeak/anpigon/LEEAykcz-2018-10-0823.49.51.png)

`lib/main.dart`의 내용을 모두 지우고 아래 코드를 복사&붙여넣기 합니다.

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget ｛
  @override
  Widget build(BuildContext context) ｛
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: const Text('Welcome to Flutter'),
        ),
        body: const Center(
          child: const Text('Hello World'),
        ),
      ),
    );
  ｝
｝
```

<br>한 줄 함수에는 화살표(=>) 함수(fat arrow notatio)를 사용합니다. 메인 함수도 화살표 함수가 사용되었습니다. 이 앱은 StatelessWidget 위젯을 확장하여 앱자체를 위젯으로 만들었습니다. 그리고 Material 라이브러리에서 제공하는 Scaffold 위젯은 기본 appBar, title, body property를 제공합니다. 위 예제의 body에는 Text 위젯을 포함하고 있는 Center 위젯으로 구성되어 있습니다. Center 위젯은 하위 위젯을 가운데 정렬하는 기능을 가지고 있습니다. 

<br><hr><br>

# Use an external package

<br>이번에는 [english_words](https://pub.dartlang.org/packages/english_words) 오픈 소스 패키지를 사용해 봅니다. **english_words** 패키지에는 가장 많이 사용되는 영단어와 유용한 유틸리티가 포함되어 있습니다. 필요한 오픈 소스 패키지는 [pub.dartlang.org](https://pub.dartlang.org/flutter/)에서 찾아볼 수 있습니다.

Flutter의 assets은 pubspec 파일에서 관리합니다. **pubspec.yaml** 파일을 열고 `english_words : ^ 3.1.0`을 dependencies 목록에 추가합니다.

```
dependencies:
  flutter:
    sdk: flutter

  cupertino_icons: ^0.1.0
  english_words: ^3.1.0   # add this line
```

<br>pubspec 파일을 열고 있는 편집창에서 **Packages get** 링크를 클릭합니다. 그러면 패키지를 내려받아 가져오는 것을 콘솔창에서 확인할 수 있습니다.

![Packages get](https://files.steempeak.com/file/steempeak/anpigon/xPTT4o0L-2018-10-0900.30.48.png)

`lib/main.dart` 파일을 열고 새로운 패키지 **english_words**를 임포트(import) 합니다.

```dart
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';  // Add this line.
```

<br>참고로 편집창에서 글자가 회색으로 보이는 것은 임포트된 해당 패키지가 사용되지 않았음을 나타냅니다. 

그 다음에는 **english_words** 패키지를 사용하여 영단어 텍스트를 생성합니다. 변경된 전체 코드는 아래와 같습니다.

```dart
import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget ｛
  @override
  Widget build(BuildContext context) ｛
    final wordPair = new WordPair.random(); // Add this line.
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(    // Change "const" to "new".
          //child: const Text('Hello World'),   // Replace this text...
          child: new Text(wordPair.asPascalCase),  // With this text.
        ),
      ),
    );
  ｝
｝
```

<br>Text 위젯이 더 이상 상수(`const`)가 아니기 때문에 Text 위젯을 포함하고 있는 Center 위젯도 `new` 를 사용하여 인스턴스를 생성해야 합니다. 참고로 `wordPair.asPascalCase`은 영단어를 파스칼 표기법으로 표현합니다. 예를 들어, "upper camel case"는 "UpperCamelCase"로 표현됩니다.

이제 run 버튼을 클릭하여 앱을 빌드&실행합니다. 
![run](https://files.steempeak.com/file/steempeak/anpigon/M3ZeHoVc-2018-10-0900.57.31.png)

만약 앱이 이미 실행 중이라면 **hot reload** 버튼만 클릭하면 됩니다. 그럼 변경된 부분이 바로 앱에 반영됩니다.
![hot reload ](https://steemitimages.com/200x0/https://files.steempeak.com/file/steempeak/anpigon/DeEetXes-2018-10-0900.58.57.png)

<br>아래는 실행 결과입니다. 전 안드로이드폰을 사용하고 아이폰은 한번도 사용해보지 않았습니다. 그러나 안드로이드와 아이폰의 차별을 두지 않기 위해 둘다 빌드&실행해 보았습니다.

|안드로이드|아이폰|
|-|-|
|![android](https://steemitimages.com/250x0/https://files.steempeak.com/file/steempeak/anpigon/qCxXooBo-2018-10-0900.48.45.png)|![ios](https://steemitimages.com/320x0/https://files.steempeak.com/file/steempeak/anpigon/d9o3Bs7c-2018-10-0900.52.52.png)|

<br>축하합니다. 안드로이드와 아이폰 둘다 빌드&실행에 성공하였습니다.

<br><hr><br>

재미삼아 실제 제가 작업하고 있는 화면을 캡처 해보았습니다. 좌 아이폰, 우 안드로이드입니다. 그런데 코딩 창이 너무 작아서 불편합니다.ㅠ

![화면](https://files.steempeak.com/file/steempeak/anpigon/2VjNC94y-2018-10-0900.56.24.png)

<br>여기까지 읽어주셔서 감사합니다.

***
#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [DCLICK: An Incentivized Ad platform by Proof of Click - 스팀 기반 애드센스를 소개합니다.](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhbnBpZ29uIiwidXJsIjoiaHR0cHM6Ly9zdGVlbWl0LmNvbS9kY2xpY2svQGRjbGljay9kY2xpY2stYW4taW5jZW50aXZpemVkLWFkLXBsYXRmb3JtLWJ5LXByb29mLW9mLWNsaWNrLSIsImlhdCI6MTUzODg5NTUwNCwiZXhwIjoxODU0MjU1NTA0fQ.dZMmd0dlJAbrN6OASmB8y6bK1fhIcDPo6XCRKPNSGbU)
<sup>안녕하세요 스티미언 여러분. 오늘 여러분께 스팀 블록체인 기반 광고 플랫폼 DCLICK을 소개...</sup>
<br><center>![logo](https://steemitimages.com/200x100/https://cdn.steemitimages.com/DQmbjkrc5UT4GgZXygAnS3mLrboAy7Y8gr7R7guB8HG3f5n/logopad500.png)<br><br>이 글은 스팀 기반 광고 플랫폼<br>[dclick](https://www.dclick.io) 에 의해 작성 되었습니다.</center>