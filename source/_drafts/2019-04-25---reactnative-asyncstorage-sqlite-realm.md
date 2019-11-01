---
title: "[React Native] 데이터 저장하기 : AsyncStorage와 SQLite, 그리고 Realm"
author: anpigon
date: "2019-04-24T15:05:33Z"
permalink: "/kr/@anpigon/reactnative-asyncstorage-sqlite-realm"
tags:
  - "kr"
  - "kr-dev"
  - "busy"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<sup>*Design by &#64;&#105;mrahelk*</sup>
___

안녕하세요. 안피곤입니다.

리액트 네이티브에서 데이터를 저장하고 사용할 수 있는 방법이 필요합니다. 그래서 **AsyncStorage**와 **SQLite**, 그리고 **Realm**에 대해서 살펴보았습니다. 그리고 각각의 API를 방법을 학습하면서 성능도 비교하였습니다. **AsyncStorage**와 database를 비교할 수는 없지만, 리액트 네이티브에서 **AsyncStorage**도 많이 사용되기 때문에 포함하였습니다.

<br>
<center>* * *</center>
<br>

우선 **Insert**와 **Select**를 각각 테스트를 하기 위해서, 스팀잇 글 100건을 가져오는 함수를 구현합니다. 이 함수를 공통적으로 사용하여 데이터를 저장하도록 하겠습니다.
```
  // 스팀잇 글 100건 가져오기
  _getDiscussionsByBlog() ｛
    return fetch('https://api.steemit.com', ｛
      method: 'post',
      body: JSON.stringify(｛jsonrpc:"2.0",method:"condenser_api.get_discussions_by_blog",params:｛tag:"anpigon",limit:100｝,id:1｝)
    ｝)
    .then(r => r.json())
    .then((｛result｝) => result)
  ｝
```

<br>
<center>* * *</center>
<br>

# AsyncStorage
`AsyncStorage`는 리액트 네이티브를 위한 key-value 형식의 스토리지입니다. `Window.localStorage` 와 매우 유사합니다.

***v0.59***부터는 **react-native**에 포함된 `async-storage`가 ***Deprecated*** 되었습니다. 그래서 `@react-native-community/async-storage` 설치하여 사용하는 것을 권장합니다. 자세한 내용은 [공식 문서](https://facebook.github.io/react-native/docs/asyncstorage)를 참고하세요.

<br>**설치하기**
```
$ npm install --save @react-native-community/async-storage
```

<br>
<br>

### 데이터 100건 저장하기

AsyncStorage에는 String만 저장가능합니다. 따라서 Object를 저장할 수 없습니다. 그래서 JSON Object를 String으로 변환하여 저장합니다.

```
  _insertAll = () => ｛
    this.setState(｛ loading: true ｝, async () => ｛

      // 데이터 100건 가져오기
      const data = await this._getDiscussionsByBlog()
        .then(r => r.map((｛ 
          post_id, 
          permlink, 
          author, 
          title, 
          body 
        ｝) => (｛post_id, permlink, author, title, body｝)));

      const startTime = Date.now(); // 시작 시간
      await AsyncStorage.setItem("DATA", JSON.stringify(data)); // AsyncStorage에 저장
      const elapsedTime = Date.now() - startTime; // 경과 시간

      this.setState(｛ loading: false, elapsedTime ｝);
    ｝)
  ｝
```
> 데이터 100건을 저장하는데 **평균 1.8996초**가 소요되었습니다. 
*10번 테스트하여 평균한 값입니다. 그리고 가장 높은/낮은값은 제외하였습니다.*

<br>
<br>

### 전체 데이터 가져오기

AsyncStorage에서 전체 데이터를 가져옵니다. 그리고 다시 JSON parse하여 JSON Object로 변환하였습니다.

```
  _selectAll = () => ｛
    this.setState(｛ loading: true ｝, async () => ｛

      const startTime = Date.now(); // 시작 시간
      const data = JSON.parse(await AsyncStorage.getItem("DATA"));
      const elapsedTime = Date.now() - startTime; // 경과 시간
      console.log(data);

      this.setState(｛ loading: false, elapsedTime ｝);
    ｝)
  ｝
```
> 데이터 전체를 조회는데 **평균 0.0982**가 소요되었습니다. 

<br>
<br>

### 하나의 데이터 가져오기
AsyncStorage는 한 건을 조회하기 위해서도 모든 데이터를 가져와야 합니다. 그래서 전체 Select와 차이가 없었습니다. 성능을 높이기 위해서는 Array와 각 Item을 따로 저장해서 관리하면 될 것 같습니다.

```
  _selectOne = () => ｛
    this.setState(｛ loading: true ｝, async () => ｛

      const startTime = Date.now(); // 시작 시간
      const data = JSON.parse(await AsyncStorage.getItem("DATA")).filter(r => r.post_id === 67714463);
      const elapsedTime = Date.now() - startTime; // 경과 시간
      console.log(data);

      this.setState(｛ loading: false, elapsedTime ｝);
    ｝)
  ｝  
```
> 데이터를 전체를 가져와서 한 건을 조회하는데 **평균 0.0974**가 소요되었습니다. 


<br>
<center>* * *</center>
<br>


# SQLite
**SQLite**를 사용하기 위해서 `react-native-sqlite-storage`를 설치합니다. 자세한 내용은 [공식 문서](https://github.com/andpor/react-native-sqlite-storage)를 참고하세요.

<br>**설치하기**
```
    $ npm install --save react-native-sqlite-storage
    $ react-native link
```
> SQLite 이슈나 SQL 사용 방법은 다음 사이트를 참고하세요. <br>- [https://github.com/xpbrew/cordova-sqlite-storage](https://github.com/xpbrew/cordova-sqlite-storage)

<br>
<br>

### 데이터베이스 및 테이블 생성하기

`componentDidMount()` 함수에서는 데이터베이스를 오픈합니다. `_createDatabase()` 함수에서 테이블을 생성합니다. 그리고 테스트를 위해서 테이블이 생성되어 있으면 드롭(drop)하고 다시 생성하도록 하였습니다.

```
  // 테이블 생성
  _createDatabase = async () => ｛
    const result = await this.state.db.sqlBatch([
      `DROP TABLE IF EXISTS TB_DISCUSSIONS`,
      `CREATE TABLE IF NOT EXISTS TB_DISCUSSIONS (
        post_id INTEGER PRIMARY KEY, 
        permlink TEXT, 
        author TEXT, 
        title TEXT, 
        body TEXT
      )`
    ]);
  ｝

  // 데이터베이스 오픈
  componentDidMount = async () => ｛
    const db = await SQLite.openDatabase(｛ name: 'testDB' ｝);
    this.setState(｛ 
      loading: false,
      db, 
    ｝, () => this._createDatabase());
  ｝
```

<br>
<br>

### 데이터 100건 Insert 하기

`SQLite.sqlBatch`를 사용하여 데이터 100건을 한번에 insert 합니다.

```
  _insertAll = () => ｛
    this.setState(｛ loading: true ｝, async () => ｛
      const insertSQLs = await this._getDiscussionsByBlog()
        .then(r => r.map((｛ 
          post_id, 
          permlink, 
          author, 
          title, 
          body 
        ｝) => [
          'INSERT INTO TB_DISCUSSIONS VALUES (?1,?2,?3,?4,?5)', 
          [post_id, permlink, author, title, body]
        ]));

      const startTime = Date.now(); // 시작 시간
      const result = await this.state.db.sqlBatch(insertSQLs);
      const elapsedTime = Date.now() - startTime; // 경과 시간

      this.setState(｛ loading: false, elapsedTime ｝);
    ｝)
  ｝
```
> 데이터 100건을 저장하는데 **평균 3.9656초**가 소요되었습니다. 

<br>
<br>

### 데이터 전체 Select 하기

데이터를 모두 select 합니다.

```
  _selectAll() ｛
    this.setState(｛ loading: true ｝, async () => ｛

      const startTime = Date.now(); // 시작 시간
      this.state.db.executeSql('SELECT * FROM TB_DISCUSSIONS', [], 
        (rs) => ｛
          const elapsedTime = Date.now() - startTime; // 경과 시간
          console.log(rs.rows)
          this.setState(｛ loading: false, elapsedTime ｝);
        ｝, 
        (err) => console.log(err)
      );
    ｝)
  ｝
```
> 데이터 전체를 조회하는데 **평균 0.1086**가 소요되었습니다. 

<br>
<br>

### 데이터 한 건 Select 하기

데이터 한 건을 select 합니다.

```
  _selectOne() ｛
    this.setState(｛ loading: true ｝, async () => ｛

      const startTime = Date.now(); // 시작 시간
      this.state.db.executeSql('SELECT * FROM TB_DISCUSSIONS WHERE post_id = (?1)', 
        [67714463], 
        (rs) => ｛
          const elapsedTime = Date.now() - startTime; // 경과 시간
          console.log(rs.rows.item(0));
          this.setState(｛ loading: false, elapsedTime ｝);
        ｝, 
        (err) => console.log(err)
      );
    ｝)
  ｝ 
```
> 데이터 전체를 조회하는데 **평균 0.0072**가 소요되었습니다. 

<br>
<center>* * *</center>
<br>

## Realm
https://realm.io/
Realm 모바일 사용에 최적화된 내장 데이터베이스 라이브러리입니다. 한글 문서화가 굉장히 잘 되어 있는 오픈 소스입니다. 그리고 Realm 홈페이지에 가보면 속도가 엄청 빠르다고 자랑하고 있습니다. 다음 차트는 초당 쿼리수 입니다.
![](//cdn.steemitimages.com/500x0/https://images.contentful.com/emmiduwd41v7/6frzkxhVuwoUAaYWAaO8Uc/fe81278fe1c41c1633c90ece135ece81/reads-chart.png)
*출처: realm.io*

<br>

**설치하기**
```
npm install --save realm
react-native link realm
```

<br>
<br>

### 스키마 생성하기

Realm 데이터 모델을 초기화하기 위해서는 스키마를 정의해야 합니다. SQLite에서 생성한 테이블 구조와 유사한 형태로 스키마를 정의하고 생성하였습니다. 스키마 모델과 관련하여 자세한 내용은 [공식 문서](https://realm.io/kr/docs/javascript/latest/#models)를 참고하세요.

```
  componentWillMount() ｛
    Realm.open(｛
      schema: [｛
        name: 'discussions',
        primaryKey: 'post_id',
        properties: ｛
          post_id: 'int',
          permlink: 'string',
          author: 'string',
          title: 'string',
          body: 'string'
        ｝,
      ｝]
    ｝).then(realm => ｛
      this.setState(｛ 
        loading: false, 
        realm 
      ｝);
    ｝);
  ｝
```

<br>
<br>

### 데이터 100건 Insert 하기

데이터 100건을 insert 합니다.
```
  _insertAll = () => ｛
    this.setState(｛ loading: true ｝, async () => ｛
      const dataArray = await this._getDiscussionsByBlog()
        .then(r => r.map((｛ 
          post_id, 
          permlink, 
          author, 
          title, 
          body 
        ｝) => (｛post_id, permlink, author, title, body｝)));

      const ｛ realm ｝ = this.state;
      const startTime = Date.now(); // 시작 시간

      try ｛
        realm.write(() => ｛
          dataArray.forEach(data => realm.create('discussions', data))
        ｝);
      ｝ catch (err) ｛
        console.log(err);
      ｝

      const elapsedTime = Date.now() - this.state.startTime; // 경과 시간
      this.setState(｛ loading: false, elapsedTime ｝);
    ｝)
  ｝
```
> 데이터 100건을 저장하는데 **평균 2.9978초**가 소요되었습니다. 

<br>
<br>

### 데이터 전체 Select 하기

데이터를 모두 select 합니다.

```
  _selectAll = () => ｛
    this.setState(｛ loading: true ｝, async () => ｛

      let data;
      const startTime = Date.now(); // 시작 시간
      try ｛
        data = this.state.realm.objects('discussions');
      ｝ catch (error) ｛
        console.log(error);
      ｝

      const elapsedTime = Date.now() - this.state.startTime; // 경과 시간
      console.log(Array.from(data));      

      this.setState(｛ loading: false, elapsedTime ｝);
    ｝)
  ｝
```
> 데이터 전체를 조회하는데 **평균 0.79**가 소요되었습니다. 

<br>
<br>

### 데이터 한 건 Select 하기

데이터 한 건을 select 합니다.

```
  _selectOne = () => ｛
    this.setState(｛ loading: true ｝, async () => ｛

      let data;
      const startTime = Date.now(); // 시작 시간

      try ｛
        data = this.state.realm.objects('discussions').filtered('post_id = 67714463');
      ｝ catch (error) ｛
        console.log(error);
      ｝
      
      const elapsedTime = Date.now() - this.state.startTime; // 경과 시간
      console.log(Array.from(data));

      this.setState(｛ loading: false, elapsedTime ｝);
    ｝)
  ｝ 
```
> 데이터 한 건을 조회하는데 **평균 0.0314**가 소요되었습니다. 

<br>
<br>

비교하기 쉽게 테스트 결과를 차트로 그려보았습니다. 세로축은 경과시간(ms)입니다.

![chart 2.png](https://files.steempeak.com/file/steempeak/anpigon/4BCG67ls-chart202.png)
> 100건의 데이터로 테스트한 결과라서 큰 차이는 없습니다. 데이터 저장의 경우 **AsyncStorage**가 가장 성능이 좋습니다. 그다음은 **Realm**입니다. 그리고 전체 데이터를 가져오는 경우에는 **SQLite**, **AsyncStorage** 순으로 성능이 좋습니다. 하지만 한 건의 데이터를 조회하는 경우에는 **SQLite**이 가장 성능이 좋습니다.

<br>
<center>* * *</center>
<br>

realm에서는 rawSQL을 사용할 수 없습니다. realm에서 제공하는 함수형 API로만 쿼리할 수 있습니다. 그래서 realm를 사용하려면 학습 비용이 발생하네요.ㅠㅠ

간단한 데이터를 저장하고 가져오는 기능을 구현하기 위해서는, **AsyncStorage**를 사용하는 것이 **가장 좋은 선택**일 것 같습니다.

그리고 Realm와 SQLite를 더 자세하게 비교한 블로그가 있어 링크를 공유합니다.
> - [https://medium.com/@maryangmin/realm-데이터베이스-제대로-알고-안드로이드에서-사용하기-bac02b8faef7](https://medium.com/@maryangmin/realm-％EB％8D％B0％EC％9D％B4％ED％84％B0％EB％B2％A0％EC％9D％B4％EC％8A％A4-％EC％A0％9C％EB％8C％80％EB％A1％9C-％EC％95％8C％EA％B3％A0-％EC％95％88％EB％93％9C％EB％A1％9C％EC％9D％B4％EB％93％9C％EC％97％90％EC％84％9C-％EC％82％AC％EC％9A％A9％ED％95％98％EA％B8％B0-bac02b8faef7)


<br>
여기까지 읽어주셔서 감사합니다.

***

<center>
### WHAN DEV TEAM
[\[출범식\] WDT(WHAN DEV TEAM) 공식 활동 개시](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team)
[![](https://steemitimages.com/320x0/https://cdn.steemitimages.com/DQmbo4bis7WgjdVYdXR9VbzWdzh2aCXw2JFVKfruYNCNV4G/wdt.png)](https://steemit.com/steemengine/@newbijohn/wdt-whan-dev-team)


![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)
</center>



---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
[![dclick-imagead](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmSwkE4cySARFCKdemZWVwyk8dxh7HeDNiqwuVmWR3RBXE/Group％205.png)](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdG5hdGl2ZS1hc3luY3N0b3JhZ2Utc3FsaXRlLXJlYWxtIiwiYSI6WyJpLTIiXSwidXJsIjoiaHR0cHM6Ly93d3cuZGNsaWNrLmlvIiwiaWF0IjoxNTU2MTE4NDk4LCJleHAiOjE4NzE0Nzg0OTh9.XVfJ4GCZpzo-Z7sBCLYMMfGXqPhy4ZZemqYOuSA8OT8)