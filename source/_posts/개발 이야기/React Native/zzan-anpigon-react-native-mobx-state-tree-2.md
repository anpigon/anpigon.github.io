---
title: '[React Native] MobX State Tree 학습하기 #2'
tags:
  - zzan
  - kr-dev
  - liv
  - palnet
  - neoxian
  - sct
  - sct-freeboard
  - react-native
  - busy
  - jjm
author: anpigon
date: 2019-08-12 22:25:48
---

https://img.youtube.com/vi/snBvYS6eC2E/mqdefault.jpg

이전글 [**"\[React Native\] MobX State Tree 학습하기 #1"**](/zzan/@anpigon/react-native-mobx-state-tree-1) 에서 이어지는 내용입니다.

___

본 포스팅은 아래 강의를 보면서 정리한 노트입니다.
https://www.youtube.com/watch?v=snBvYS6eC2E
___

<br><br>

# BookStore에 초기 데이터 등록하기

`BookStore.js` 파일을 수정합니다. `books` 배열에 다음과 같이 Book 정보를 입력합니다. 이제 **BookStore**는 book 데이터 하나를 가지고 생성됩니다.

```js
const BookStore = types
  .model('Books', {
    books: types.array(Book),
  })
  .create({
    books: [
      // book 정보 등록
      {
        title: 'Ready Player One',
        author: 'Ernest Cline',
        read: true,
      },
    ],
  });
```

<br>

이제 앱을 실행하고 **Console** 에서 값을 확인해봅니다. `Target`의 첫번째 항목을 살펴보면, `value`에 우리가 입력한 Book 데이터가 보입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/BXbsbUny-1.png)

***

<br>
<br>

# BookStore에 addBook  액션(action) 추가하기

다시 `BookStore.js` 파일을 수정합니다. 그리고 actions에 `addBook` 함수를 추가합니다. actions에는 store에서만 호출할 수 있는 private 함수를 생성 할 수 있습니다.  이제 **BookStore**의 `addBook` 함수를 호출하면 `books` 배열에 새로운 book 객체가 추가됩니다.

```js
const BookStore = types
  .model('Books', {
    books: types.array(Book),
  })
  // actions 추가
  .actions(self => ({
    addBook(book) {
      self.books.push(book);
    },
  }))
  .create({
    books: [
      {
        title: 'Ready Player One',
        author: 'Ernest Cline',
        read: true,
      },
    ], // 초기 값
  });
```

<br>
<br>

# 입력 화면 만들기

`App.js` 파일을 수정합니다. 그리고 **react-native**에서  `StyleSheet`, `SafeAreaView`, `TextInput`, `Text`, `Button` 컴포넌트를 **import** 합니다.

```js
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  Button
} from 'react-native';
```

<br>그리고 `initialState` 값을 설정합니다. **initialState**는 `title`와 `author` 속성을 가집니다.

```js
const initialState = { title: '', author: '' };
```

<br>그다음 `state`를 생성합니다.  `state`의 기본값으로는 `initialState` 를 입력합니다.  그리고 `onChangeText` 함수와 `addBook` 함수를 생성합니다.

```js
class App extends React.Component {

  state = initialState;

  // TextInput 입력 이벤트 함수
  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  // book 추가하기 함수
  addBook = () => {
    BookStore.addBook(this.state);
    this.setState(initialState);
  };

  ...
```

<br>그 다음 화면 UI에 적용할 **StyleSheet**를 정의합니다. `<TextInput>` 컴포넌트의 높이는 50, 배경색은 회색 그리고 위아래 여백으로 10을 주었습니다.

```js
const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10,
  },
});
```

<br>그리고 화면에 보여줄 입력 박스(TextInput) 2개와 버튼을 입력합니다. 첫번째 TextInput는 제목(title)를 입력받습니다. 두번째 TextInput는 저자(author)를 입력받습니다.

```js
class App extends React.Component {
  ...
  render() {
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          value={this.state.title}
          onChangeText={value => this.onChangeText('title', value)}
        />
        <TextInput
          style={styles.input}
          value={this.state.author}
          onChangeText={value => this.onChangeText('author', value)}
        />
        <Button title="Add Book" onPress={this.addBook} />
      </SafeAreaView>
    );
};
```

<br>
<br>

# MobX observer 클래스 등록하기

**mobx-react**에서 `observer`를 **import**합니다. 그리고 대상 클래스 바로 위에 어노테이션 `@observer`를 입력합니다.

```js
import { observer } from 'mobx-react';

@observer
class App extends React.Component {

...
```

<br>

그리고 다음은 지금까지 구현한 전체 소스코드입니다.

![carbon.png](https://files.steempeak.com/file/steempeak/anpigon/68pMhQTV-carbon.png)

<br>

아래는 결과 화면입니다. 제목과 저자를 입력하고 Add Book를 누르면 아래에 추가된 정보가 표시됩니다.

|||
|-|-|
|![](https://steemitimages.com/740x0/https://files.steempeak.com/file/steempeak/anpigon/D6iI217Y-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-08-1120E1848BE185A9E18492E185AE206.53.13.png)|![](https://files.steempeak.com/file/steempeak/anpigon/EuSXwg0u-2019-08-112022-19-47.2019-08-112022_21_27.gif)|
***

<br>

 `댓글`, `팔로우`, `좋아요` 해 주시는 모든 분께 감사합니다.

항상 행복한 하루 보내시길 바랍니다.

***

<center><img src='https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg'><h5>vote, reblog, follow <code><a href='/@anpigon'>@anpigon</a></code></h5></center>

<br>