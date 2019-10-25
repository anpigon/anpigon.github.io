---
title: '모바일 앱 개발 : Flutter 시작하기 #3 - First Flutter App (2)'
tags:
  - dclick
  - kr
  - kr-dev
  - busy
  - interesteem
author: anpigon
date: 2018-10-16 00:16:57
---

![](https://imgur.com/zPHGPmb.png)

<br>안녕하세요. @anpigon 입니다.

이전 글 ["모바일 앱 개발 : Flutter 시작하기 #2 "](https://steemit.com/dclick/@anpigon/flutter-2-write-your-first-flutter-app-part-1)에서 이어지는 내용입니다. [Flutter 튜토리얼 파트1](https://codelabs.developers.google.com/codelabs/first-flutter-app-pt1/#0)의 5~7번까지의 과정을 따라하면서 정리하였습니다. 이번에는 Stateful 위젯과 무한 스크롤 ListView를 구현하는 방법을 학습합니다.

![](https://imgur.com/wjJNx6U.png?t=1)

원문을 보고 싶으면 아래 링크를 클릭하세요.
https://codelabs.developers.google.com/codelabs/first-flutter-app-pt1/#0

<br><hr><br>

# State*ful* 위젯 추가하기

이번 단계에서 우리는 state*ful* 위젯인 RandomWords를 추가할 것이다. 이 RandomWords는 State 클래스인 RandomWordsState를 생성한다. 그 다음에는 RandomWords를 MyApp State*less* 위젯의 child로 사용할 것이다.

State*less* 위젯은 immutable이다. 그래서 State*less* 위젯의 모든 속성값은 변경할 수 없다. 참고로 앞에서 우리는 **MyApp 클래스**를 State*less* 위젯을 확장하여 구현하였다.

하지만 State*ful* 위젯은 유지되는 동안 *변경될 수 있는 상태*를 유지한다. Stateful 위젯을 구현하기 위해서는 최소 2개의 클래스가 필요하다. [State 클래스](https://docs.flutter.io/flutter/widgets/State-class.html)와 *State 클래스의 인스턴스를 생성하는* [StatefulWidget ](https://docs.flutter.io/flutter/widgets/StatefulWidget-class.html)[클래스](https://docs.flutter.io/flutter/widgets/State-class.html)이다 . StatefulWidget 클래스는 그 자체로 immutable이지만, State 클래스는 위젯이 유지되는 동안 없어지지 않는다. 

Stateless와 Stateful 위젯은 텍스트 설명만 보고는 이해하기가 어렵다. 하지만 앞으로도 계속 있을 튜토리얼을 따라서 구현하다 보면 저절로 이해가 될 것이다.

<br>우선 간단한 State 클래스를 먼저 만들어보자. 외부 파일로 생성해도 되지만 우리는 [**main.dart**](https://gist.githubusercontent.com/Sfshaza/d7f13ddd8888556232476be8578efe40/raw/8c6c97b34b97645415de66dc944824993c26cfa5/main.dart) 파일에 입력한다. main.dart 파일 맨 아래에 RandomWordsState 클래스를 추가하자.

```dart
class RandomWordsState extends State<RandomWords> ｛
  // TODO Add build method
｝
```

`State<RandomWords>`는 RandomWords와 같이 사용할 수 있도록 구현된 일반적인 State 클래스를 사용하고 있음을 나타낸다. 대부분 앱의 로직과 상태(state)는 여기에 위치하며, RandomWords 위젯의 상태를 유지한다. RandomWordsState 클래스는 사용자가 스크롤할 때 무한히 생성되는 단어들을 저장한다.

<br>이제 State*ful* 위젯인 RandomWords 클래스를 main.dart에 추가하자. 참고로 RandomWords는 RandomWordsState를 생성하는 것 외에는 사용되지 않는다.

```dart
class RandomWords extends StatefulWidget ｛
  @override
  RandomWordsState createState() => new RandomWordsState();
｝
```
State 클래스를 추가하고 나면 *안드로이드 스튜디오*는 클래스에 빌드 메서드(build method)가 누락되어 있다고 알려줄 것이다. 이 메시지는 무시해도 된다.

<br>그다음에는 영어단어를 생성하는 코드를 MyApp 클래스에서 RandomWordsState로 이동하자. 아래와 같이 RandomWordsState에 영어단어를 생성하는 `build` 메서드를 추가한다.

```dart
class RandomWordsState extends State<RandomWords> ｛
  @override                                  // Add from this line ... 
  Widget build(BuildContext context) ｛
    final WordPair wordPair = new WordPair.random();
    return new Text(wordPair.asPascalCase);
  ｝                                          // ... to this line.
｝
```

<br>그리고 MyApp 클래스에서는 영어단어를 생성하는 코드를 제거한다.

```dart
class MyApp extends StatelessWidget ｛
  @override
  Widget build(BuildContext context) ｛
    final WordPair wordPair = new WordPair.random();  // Delete this line.

    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          //child: new Text(wordPair.asPascalCase), // Change this line to... 
          child: new RandomWords(),                 // ... this line.
        ),
      ),
    );
  ｝
｝
```

<br>코드를 수정하고 나면 앱이 자동으로 새로 고침(Hot reload)이 된다. 만약 자동 새로 고침이 되지 않는다면 앱을 중지하고 다시 시작해보자.

<br><hr><br>

# 무한 스크롤 ListView 만들기

RandomWordsState 클래스를 확장하여 무한 스크롤되는 단어 목록을 생성해보자. 사용자가 스크롤링하면 ListView 위젯에 표시된 단어 목록이 무한으로 증가할 것이다. ListView의 `builder` 팩토리 생성자를 사용하면 목록 뷰를 필요할 때에 지연 생성 할 수 있다.

단어 목록을 저장할 `_suggestions` 변수를 RandomWordsState 클래스에 추가한다 . 그리고 글꼴을 크게 만드는 텍스트 스타일  `_biggerFont`도 추가한다.

```
class RandomWordsState extends State<RandomWords> ｛
  // Add the next two lines.
  final List<WordPair> _suggestions = <WordPair>[];
  final TextStyle _biggerFont = const TextStyle(fontSize: 18.0); 
  ...
｝
```
Dart에서는 변수 앞에 밑줄(_)을 붙이면 privacy이 적용된다.

<br>그다음에는 `_buildSuggestions()` 메서드를 RandomWordsState 클래스에 추가한다 . 이 메서드는 단어 목록을 표시하는 ListView를 빌드할 것이다.

ListView 클래스는 builder 속성으로 팩토리 빌더 및 콜백 함수인 `itemBuilder`를 제공한다. 이 함수에는 두 개의 매개 변수  *BuildContext*와 *row iterator*가 전달된다. *iterator*는 0부터 시작하여 함수가 호출 될 때마다 매번 증가한다. 이 모델이 무한 스크롤을 가능하게 한다.

아래와 같이 RandomWordsState 클래스에 `_buildSuggestions` 함수를 추가한다.

```dart
  Widget _buildSuggestions() ｛
    return new ListView.builder(
      padding: const EdgeInsets.all(16.0),
      
      // itemBuilder 콜백은 생성된 단어마다 한 번씩 호출되고 각 단어를 ListTile row에 배치한다.
      // 짝수 행의 경우 이 함수는 단어에 대한 ListTile row를 추가한다.
      itemBuilder: (BuildContext _context, int i) ｛
      
        // 홀수 행의 경우 구분선(Divider) 위젯을 추가한다.
        if (i.isOdd) ｛
          return new Divider();
        ｝

        // 코드 "i ~/ 2"는 i를 2로 나눈 몫을 반환한다.
        // 예를 들면, 1, 2, 3, 4, 5는 0, 1, 1, 2, 2이 된다.
        // Divider 위젯을 제외한 ListView의 실제 단어 수를 계산하기 위함이다.
        final int index = i ~/ 2;
        
        // 사용 가능한 단어 목록이 끝나면 ...
        if (index >= _suggestions.length) ｛
          // ... 단어 10개를 더 생성하고 단어 목록에 추가.
          _suggestions.addAll(generateWordPairs().take(10));
        ｝
        return _buildRow(_suggestions[index]);
      ｝
    );
  ｝
```

 `_buildSuggestions` 함수는 단어마다 한 번씩  `_buildRow` 함수를 호출한다. 


<br>RandomWordsState에 `_buildRow` 함수를 추가하자.

```
  Widget _buildRow(WordPair pair) ｛
    return new ListTile(
      title: new Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
    );
  ｝
```

<br>이제 RandomWordsState의 `_buildSuggestions()` 함수를 호출하도록 수정한다.

```
  @override
  Widget build(BuildContext context) ｛
    //final wordPair = new WordPair.random(); // Delete these... 
    //return new Text(wordPair.asPascalCase); // ... two lines.

    return new Scaffold (                   // Add from here... 
      appBar: new AppBar(
        title: new Text('Startup Name Generator'),
      ),
      body: _buildSuggestions(),
    );                                      // ... to here.
  ｝
```
여기서 [`Scaffold`](https://docs.flutter.io/flutter/material/Scaffold-class.html)는 기본 머티리얼 디자인의 시각적 레이아웃을 구현한다.



<br>마지막으로 MyApp의 `title`과 `build()` 함수를 수정하자. 아래와 같이 RandomWords 위젯의 `home` 부분을 `new RandomWords()`로 수정한다.

```
  @override
  Widget build(BuildContext context) ｛
    return new MaterialApp(
      title: 'Startup Name Generator',
      home: new RandomWords(),
    );
  ｝
```

<br>앱이 새로 고침이 되고 나면 아래 화면과 같이 무한 스크롤이 작동할 것이다.


<div class='text-center'>

![](https://imgur.com/l0fGLJO.gif)
</div>

<br>만약 앱이 제대로 작동하지 않는다면 [lib/main.dart](https://gist.githubusercontent.com/Sfshaza/d6f9460a04d3a429eb6ac0b0f07da564/raw/6c4c0b476fd5d584fe0704314703653eff8eca2d/main.dart) 코드를 참고하세요.


여기까지 읽어주셔서 감사합니다.

<br>

![divider2461548_1280cutout.png](https://files.steempeak.com/file/steempeak/anpigon/otMhz1ZG-divider-2461548_1280-cutout.png)



**이전 글**
<hr>

- [모바일 앱 개발 : Flutter 시작하기 #1 - Get started](https://steemit.com/dclick/@anpigon/-flutter--1538895504796)
- [모바일 앱 개발 : Flutter 시작하기 #2 - First Flutter App (1)](https://steemit.com/kr/@anpigon/flutter-2-write-your-first-flutter-app-part-1)
<hr>

![divider2461548_1280cutout.png](https://files.steempeak.com/file/steempeak/anpigon/otMhz1ZG-divider-2461548_1280-cutout.png)
***
#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [구글 코리아, 페이스북 국내 매출을 사장이 모른다?](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiItZmx1dHRlci0zLXdyaXRlLXlvdXItZmlyc3QtZmx1dHRlci1hcHAtcGFydC0xMi0xNTM5NjE2NjE0OTYxIiwiYSI6WzY3XSwidXJsIjoiaHR0cHM6Ly9zdGVlbWl0LmNvbS9rci9AdHJhZGluZ2lkZWFzLzRucXdiNSIsImlhdCI6MTUzOTYxNjYxNCwiZXhwIjoxODU0OTc2NjE0fQ.cvGcrOm1IIX9JXTiWgfCAYOjwfv6qViCiWvMyK2gTRY)
<sup>오늘 국감장에 나온 구글코리아 존리 대표가 국감장에 출석해서 국내 매출 정보를 알려줄 수 없다...</sup>
<br><center>![logo](https://steemitimages.com/200x100/https://cdn.steemitimages.com/DQmbjkrc5UT4GgZXygAnS3mLrboAy7Y8gr7R7guB8HG3f5n/logopad500.png)<br><br>이 글은 스팀 기반 광고 플랫폼<br>[dclick](https://www.dclick.io) 에 의해 작성 되었습니다.</center>