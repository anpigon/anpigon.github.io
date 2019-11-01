---
title: "프리즈마(Prisma) 사용하기 #2 : Insert 하기"
author: anpigon
date: "2019-04-27T01:06:42Z"
permalink: "/whan/@anpigon/prisma-2-insert"
tags:
  - "Prisma"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<sup>*Design by &#64;&#105;mrahelk*</sup>

안녕하세요. 안피곤입니다. 

스팀잇 API로 #kr 태그의 글을 가져와서 크롤링하여 저장하는 App을 만들어 보려고 합니다.  사실 기존에 사용하던 방법으로 더 쉽고 빠르게 구현가능합니다. 하지만, 저는 새로운 기술을 학습할때 사이드 프로젝트를 하면서 배우는 것을 선호합니다. 새로운 기술을 배우면서 서비스를 만들어 보는 것은 매우 흥미있는 일입니다. 지금 만드는 앱은 아마도 날짜별/태그별 통계 데이터를 집계하는데 사용할 것입니다.

그리고 주말에는 좀 쉬어야겠습니다. 의자에 너무 오래 앉아있으니 목/허리가 아프네요.
<center>![](https://steemitimages.com/350x0/https://images.velog.io/images/anpigon/profile/a3deb770-1e06-11e9-a113-d1bf3b7c35c8/aef8762dbd50aa9d499f38d51fc1909f.png)</center>

<br><center>*</center><br>

# Post model 추가하기

`datamodel.prisma` 파일을 열어서 다음 `type`을 추가합니다. 최소한의 데이터만 저장하기 위해서 아래와 같이 model을 정의하였습니다.

```
type Post ｛
  id: ID! @id
  post_id: Float! @unique
  author: String!
  author_reputation: Float!
  permlink: String!
  category: String!
  title: String!
  body: String!
  tags: [String!]! @scalarList(strategy: RELATION)
  image: String
  created: Float!
  total_payout_value: Float!
  curator_payout_value: Float!
  pending_payout_value: Float!
｝
```

<br>그다음 수정한 데이터모델(datamodel)을 **deploy**하여 DB에 반영합니다. deploy를 실행하면 서버에 바로 반영됩니다. 매우 편리합니다.ㅋ 

```
$ prisma deploy
```

<br>

그리고 prisma 관리자 페이지에 접속하면, 방금 추가한 Post 테이블이 생성된 것을 확인할 수 있습니다.
![](https://files.steempeak.com/file/steempeak/anpigon/TGM779b5-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-2620E1848BE185A9E18492E185AE2011.32.26.png)

<br>
<br>

## 데이터 Inset 테스트 하기

이제 **Prisma Playground**를 이용하여 데이터를 등록(insert) 해봅니다. 아래와 같이 테스트 데이터를 입력하고 반환되는 id를 확인합니다.

```
mutation ｛
  createPost(data: ｛
    post_id: 3
    author: "anpigon"
    author_reputation: 1
    category: "kr"
    permlink: "kr"
    title: "test"
    body: "test"
    created: 0
    tags: ｛set: ["kr", "kr-dev"]｝
    total_payout_value: 0
    curator_payout_value: 0
    pending_payout_value: 0
  ｝) ｛
    id
  ｝
｝
```
![](https://files.steempeak.com/file/steempeak/anpigon/9APKouIV-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-2720E1848BE185A9E1848CE185A5E186AB2012.49.04.png)
id가 출력된 것을 보니, 데이터가 잘 등록된 것 같습니다. 

<br>
<br>

# Prisma 클라이언트 설치하기

이제 코드를 구현해서 데이터를 insert 해보겠습니다. prisma와 연동하기 위해서는 client 라이브러리가 필요합니다. `prisma-client-lib`를 설치합니다. `prisma-client-lib`에는 Prisma 클라이언트를 실행하는 데 필요한 graphql의 모든 종속 패키지가 포함되어 있습니다. 

**설치하기**
```
$ npm install --save prisma-client-lib
```

<br>그리고 **generate**를 명령어로 클라이언트를 업데이트합니다. generate 명령어를 실행하면 prisma 서버와 동기화하여 연동에 필요한 js가  `./generated` 폴더에 자동 생성됩니다.
```
$ prisma generate
```

<br>
<br>

# ES6(ES2105) 이상의 최신 JS 사용하기

ES6(ES2105) 이상의 JS 문법을 사용하기 위해서 babel을 설치합니다. 설치 방법은 [babel-node 사이트](https://babeljs.io/docs/en/babel-node)를 참고하였습니다.

```
$ npm install --save-dev @babel/cli @babel/core @babel/preset-env
```

<br>
그리고 바벨(babel)을 구성하기 위한 `.babelrc` 파일을 생성합니다.

```
$ touch .babelrc
```

<br>
`.babelrc`에 아래 내용을 입력합니다.

```
｛
  "presets": ["@babel/preset-env"]
｝
```

<br>
`test.js` 를 실행할때는 다음 명령어를 사용합니다.

```
$ npx babel-node test
```

<br>

`index.js` 파일을 아래와 같이 구현합니다. 스팀잇에서 최신글 1개를 가져와서 prisma에 저장하는 로직입니다.
```
import ｛ Client ｝ from 'dsteem';
import dateFormat from 'dateformat';
import ｛ prisma ｝ from './generated/prisma-client';

const client = new Client('https://api.steemit.com');

async function main() ｛
  const opts = ｛
    tag: 'kr',
    limit: 1
  ｝
  const discussions = await client.database.getDiscussions('created', opts);
  for (let i = 0, l = discussions.length; i < l; i++) ｛
    const ｛
      post_id,
      author,
      author_reputation,
      permlink,
      category,
      title,
      body,
      json_metadata,
      created,
      total_payout_value,
      curator_payout_value,
      pending_payout_value
    ｝ = discussions[i];
    const ｛
      tags,
      image: images
    ｝ = JSON.parse(json_metadata);
    const image = images && images.length && images[0] || null;
    try ｛
      const result = await prisma.createPost(｛
        post_id,
        author,
        author_reputation,
        permlink,
        category,
        title,
        body,
        tags: ｛ set: tags ｝,
        image,
        created: parseFloat(dateFormat(new Date(`$｛created｝`), 'yyyymmddHHMMss')),
        total_payout_value: parseFloat(total_payout_value),
        curator_payout_value: parseFloat(curator_payout_value),
        pending_payout_value: parseFloat(pending_payout_value)
      ｝);
      console.log(result.id);
    ｝ catch (error) ｛
      console.error(error);
    ｝
  ｝
｝

main()
  .then(() => ｛
    process.exit(0)
  ｝)
  .catch(e => console.error(e))
```

<br>`index.js`를 실행합니다.
```
$ npx babel-node index
```
![](https://files.steempeak.com/file/steempeak/anpigon/eFduLzln-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-2720E1848BE185A9E1848CE185A5E186AB209.30.38.png)
방금 등록한 post의 id가 출력되었습니다.

<br>
<br>

## prisma 데이터 조회하기

마지막으로 **Prisma Playground**를 이용하여 방금 저장한 데이터를 조회합니다. id를 입력하고 title를 조회해보겠습니다.

```
query ｛
  post(where: ｛
    id: "cjuyrqk7uzsh60b30vyvp7qsj"
  ｝) ｛
    title
  ｝
｝
```
![](https://files.steempeak.com/file/steempeak/anpigon/mQailWxr-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-04-2720E1848BE185A9E1848CE185A5E186AB209.35.30.png)
우리가 등록된 post의 **title**이 조회가 되었습니다.

<br>여기까지 읽어주셔서 감사합니다.

___

<center>![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)</center>