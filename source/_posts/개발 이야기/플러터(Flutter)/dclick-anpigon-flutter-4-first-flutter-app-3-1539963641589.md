---
title: '모바일 앱 개발 : Flutter 시작하기 #4 - First Flutter App (3)'
tags:
  
  
  
  
  - flutter
  - 플러터
author: anpigon
date: 2018-10-20 00:40:42
---

https://steemitimages.com/0x0/https://imgur.com/zPHGPmb.png

안녕하세요. @anpigon 입니다.

이전 글 ["모바일 앱 개발 : Flutter 시작하기 #3"](https://steemit.com/dclick/@anpigon/-flutter-3-write-your-first-flutter-app-part-12-1539616614961)에서 이어집니다. [Flutter 튜토리얼 파트2](https://codelabs.developers.google.com/codelabs/first-flutter-app-pt2/#0)의 1~5번까지의 과정을 따라하면서 학습하였습니다. 이번에는 하트 아이콘을 추가하고 단어를 즐겨찾기에 추가/제거하는 기능을 구현합니다.

![Screenshot 1.png](https://files.steempeak.com/file/steempeak/anpigon/zj0dcEIi-Screenshot201.png)



이번에 구현한 완성된 앱의 동작 화면입니다.

![Oct202018 002152.gif](https://files.steempeak.com/file/steempeak/anpigon/AGjLeysd-Oct-20-20182000-21-52.gif)


<br><hr><br>

# 목록에 하트 아이콘 추가하기

<br>목록의 각 행에 하트 아이콘을 추가한다. 그리고 하트 아이콘을 누르면 즐겨찾기에 저장한다.

RandomWordsState 클래스에 `_saved` Set을 추가한다. `_saved` 에는 사용자가 선택한 단어를 저장할 것이다. 참고로 Set에는 중복된 값이 허용되지 않는다.

```dart
class RandomWordsState extends State<RandomWords> ｛
  final List<WordPair> _suggestions = <WordPair>[];
  final Set<WordPair> _saved = new Set<WordPair>(); // 추가된 코드
  final TextStyle _biggerFont = const TextStyle(fontSize: 18.0);
  ...
｝
```

<br>`_buildRow()` 함수에 `alreadySaved` 변수를 추가한다. alreadySaved는 해당 단어가 즐겨찾기에 추가되어 있는지 여부를 확인한다.

```dart
Widget _buildRow(WordPair pair) ｛
  final bool alreadySaved = _saved.contains(pair); // 추가된 코드
  ...
｝
```

<br>이제 [ListTile](https://docs.flutter.io/flutter/material/ListTile-class.html) 객체에 하트 아이콘을 추가하여 즐겨찾기 기능을 구현해보자. 하트 아이콘은 ListTile의 [trailing](https://docs.flutter.io/flutter/material/ListTile/trailing.html) 속성을 사용하여 추가한다. trailing 속성은 일반적으로 제목 뒤에 아이콘 위젯을 표시 할때 사용된다. RandomWordsState 클래스의 `_buildRow()` 함수를 아래와 같이 수정한다. 

```dart
Widget _buildRow(WordPair pair) ｛
  final bool alreadySaved = _saved.contains(pair);
  return new ListTile(
    title: new Text(
      pair.asPascalCase,
      style: _biggerFont,
    ),
    trailing: new Icon(   // 여기서부터 추가된 코드 ... 
      alreadySaved ? Icons.favorite : Icons.favorite_border,
      color: alreadySaved ? Colors.red : null,
    ),                    // ... 여기까지
  );
｝
```

<br>안드로이드 스튜디오는 왼쪽 패널에서 아이콘 모양과 색상을 바로 확인할 수 있다.
![스크린샷 20181019 23.58.18.png](https://files.steempeak.com/file/steempeak/anpigon/xh0cuwbI-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-10-192023.58.18.png)

<br>이제 앱을 새로고침하면 목록에 하트 아이콘이 보인다.

|아이폰|안드로이드|
|-|-|
|![스크린샷 20181020 00.13.27.png](https://files.steempeak.com/file/steempeak/anpigon/unrQp4FT-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-10-202000.13.27.png)|![스크린샷 20181019 23.34.05.png](https://files.steempeak.com/file/steempeak/anpigon/u46fmY84-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-10-192023.34.05.png)|

<br><hr><br>

# 즐겨찾기에 단어 저장하기

<br>이번에는 목록에서 단어를 선택하면 즐겨찾기에 추가되도록 구현해보자. 이미 단어가 즐겨찾기에 추가된 경우에는 즐겨찾기에서 제거되도록 한다. 그리고 state가 변경되었음을 프레임워크에 알려주기 위해 `setState()` 함수를 호출하였다. 참고로 `setState()` 함수를 호출하면 State 객체의 **build()** 함수 호출이 트리거되어 UI가 업데이트된다.

아래와 같이 `_buildRow` 함수에 [onTap](https://docs.flutter.io/flutter/material/ListTile/onTap.html) 속성을 추가한다.

```dart
Widget _buildRow(WordPair pair) ｛
  final alreadySaved = _saved.contains(pair);
  return new ListTile(
    title: new Text(
      pair.asPascalCase,
      style: _biggerFont,
    ),
    trailing: new Icon(
      alreadySaved ? Icons.favorite : Icons.favorite_border,
      color: alreadySaved ? Colors.red : null,
    ),
    onTap: () ｛      // 여기서부터 추가된 코드 ...
      setState(() ｛
        if (alreadySaved) ｛
          _saved.remove(pair);
        ｝ else ｛ 
          _saved.add(pair); 
        ｝ 
      ｝);
    ｝,               // ... 여기까지
  );
｝ 
```

<br>앱을 새로고침한다. 이제 원하는 단어를 선택하면 즐겨찾기에 추가 할 수 있다. 

|아이폰|안드로이드|
|-|-|
|![스크린샷 20181020 00.16.35.png](https://files.steempeak.com/file/steempeak/anpigon/6LSDF1X3-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-10-202000.16.35.png)|![스크린샷 20181020 00.10.46.png](https://files.steempeak.com/file/steempeak/anpigon/vnnpoTVN-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-10-202000.10.46.png)|

<br>만약 앱이 제대로 작동하지 않는다면 [lib/main.dart](https://gist.githubusercontent.com/Sfshaza/1194384995296493b4675379e0022227/raw/7f274e35045042b3fe93fea464dddc170d14558f/main.dart) 코드를 참고하세요.

여기까지 읽어주셔서 감사합니다.

https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/anpigon/otMhz1ZG-divider-2461548_1280-cutout.png

###### 이전 글

---

- [모바일 앱 개발 : Flutter 시작하기 #1 - Get started](https://steemit.com/dclick/@anpigon/-flutter--1538895504796)
- [모바일 앱 개발 : Flutter 시작하기 #2 - First Flutter App (1)](https://steemit.com/kr/@anpigon/flutter-2-write-your-first-flutter-app-part-1)
- [모바일 앱 개발 : Flutter 시작하기 #3 - First Flutter App (2)](https://steemit.com/dclick/@anpigon/-flutter-3-write-your-first-flutter-app-part-12-1539616614961)
---

https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/anpigon/otMhz1ZG-divider-2461548_1280-cutout.png
