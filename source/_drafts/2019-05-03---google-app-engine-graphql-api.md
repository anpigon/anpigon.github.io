---
title: "Google App Engine + GraphQL으로 스팀잇 API 서버 만들기"
author: anpigon
date: "2019-05-03T06:11:06Z"
permalink: "/whan/@anpigon/google-app-engine-graphql-api"
tags:
  - "whan"
  - "kr"
  - "kr-dev"
  - "busy"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<sup>*Design by &#64;&#105;mrahelk*</sup>
***

안녕하세요. 안피곤입니다.

바로 이전글 [⌈🚀5분 안에 Google App Engine에 Apollo GraphQL 서버 구성하기!⌋](/whan/@anpigon/5-google-app-engine-apollo-graphql)에서 GAE에 GraphQL 서버를 구성했습니다.

이제 이 API 서버를 이용하여 `태그별 피드 검색`, `저자 명성도 순`, `댓글 순`, `보상금액 순`, `보팅 순` 등의 데이터를 조회할 용도로 사용할 것입니다.

사실 API 서버를 Prisma로 구성하고 싶었습니다. 그런데 Prisma는 기능이 아직 많이 부족하다고 생각합니다. 제가 원하는 서비스를 구현하기에 매우 힘들었습니다.😥 결국 MongoDB를 사용하였습니다. 혹시라도 Prisma에 관심있으면 [⌈프리즈마(Prisma) 사용하기⌋](/whan/@anpigon/prisma-3) 시리즈 글을 읽어주세요~!

<br><center>*</center><br>

**MongoDB** + **GraphQL** + **Google App Engine** 조합으로 API 서버를 구성하였습니다. 그리고 MongoDB는 [mlab.com](https://mlab.com/home) 서비스를 이용하고 있습니다. DB 무료 제공 용량이 500MB라서 아껴서 써야 할 것 같습니다. 10만 건의 데이터를 저장했더니, 벌써 50％를 사용해버렸습니다. ㅠㅠ

그리고 코드를 전부 공개하기는 좀 그렇고, 일부 핵심 코드만 공개합니다. 앞으로 댓글 순, 보팅 순, 보상금액 순, 저자 명성도 순으로 조회하는 기능을 추가할 예정입니다.

<br>

`index.js`
```
import Storage from './storage'

const typeDefs = `
  type Query ｛
    getPosts(
      tags: [String]
    ): [Post!]!
  ｝
`;

const resolvers = ｛
  Query: ｛
    getPosts: async (_, args, ｛ storage ｝) => ｛
      const ｛ tags ｝ = args;
      return await storage.getPosts(tags);
    ｝
  ｝
｝

const storage = new Storage();

const server = new GraphQLServer(｛ 
	schema, 
	context: (｛ request ｝) => (｛ 
		request, 
		storage
	｝)
｝);
server.express.use(logger('dev'));
server.start(｛ port: PORT ｝, () => ｛
	console.log(`Server running on http://localhost:$｛PORT｝`)
｝);
```

<br>

`storage.js`
```
import ｛ MongoClient ｝ from 'mongodb';

const collections = ｛
  POSTS: 'posts',
｝

export default class Storage ｛
  constructor() ｛
    MongoClient.connect(process.env.MONGO_URI, ｛ useNewUrlParser: true ｝)
    .then(client => ｛
      this.db = client.db();
    ｝);
  ｝

  getPosts(tags=["kr"], limit=10) ｛
    return this.db.collection(collections.POSTS)
      .find(｛
        $or: tags.map(tags => (｛ tags ｝))
      ｝, ｛ 
        limit 
      ｝)
      .sort(｛ post_id: -1 ｝)
      .toArray();
  ｝
｝
```
> 태그(tag)를 `or` 조건으로 검색합니다. 만약, `["kr-book", "booksteem"]`으로 검색한다면, 두 태그 중 하나라도 포함된 피드를 모두 조회합니다.

<br>
<br>

아래는 구글 앱 엔진에서 실행한 화면입니다.

![](https://files.steempeak.com/file/steempeak/anpigon/X85eQ4Bn-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-05-0320E1848BE185A9E18492E185AE202.41.27.png)

이제 #bootsteem과 #kr-boot 태그에 올라온 피드를 조회하여, 최신순으로 받아 볼 수 있습니다. 이제 GraphQL 서버와 크롤링 데몬, 그리고 Front-End 페이지까지 개발완료되면 완성된 앱을 볼 수 있을 것 같습니다.

<br>해피 코딩하세요~!

***

<center>

![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)
</center>


---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
[![dclick-imagead](https://s3.ap-northeast-2.amazonaws.com/dclick/image/dclick/1552477485946.png)](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJnb29nbGUtYXBwLWVuZ2luZS1ncmFwaHFsLWFwaSIsImEiOlsiaS0xOTUiXSwidXJsIjoiaHR0cHM6Ly93d3cuZGNsaWNrLmlvL21vbmV0aXplIiwiaWF0IjoxNTU3MjgwNTY1LCJleHAiOjE4NzI2NDA1NjV9.itZ28XyFAfgme9mcFNBZOgXWHY5Bzd6ljajYQ21-HhM)