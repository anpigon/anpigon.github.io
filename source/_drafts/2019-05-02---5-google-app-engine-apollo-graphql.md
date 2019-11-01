---
title: "🚀5분 안에 Google App Engine에 Apollo GraphQL 서버 구성하기!"
author: anpigon
date: "2019-05-01T17:41:33Z"
permalink: "/whan/@anpigon/5-google-app-engine-apollo-graphql"
tags:
  - "whan"
  - "kr"
  - "kr-dev"
  - "busy"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<sup>*Design by &#64;&#105;mrahelk*</sup>
***
<br>구글 앱 엔진(Google App Engine)은 서버 없이 백엔드 API 서버를 구축하기 좋은 플랫폼입니다. 개발자가 오로지 **앱 개발에만 집중**할 수 있습니다. 웹서버, 로드밸런스, 네트워크 구성 등 몰라도 됩니다. ㅎㅎ  
현재 GAE는 JAVA, PHP, Node.js, Python, C#, .Net, Ruby, Go 등의 언어를 지원합니다. 자세한 내용은 [GAE 사이트](https://cloud.google.com/appengine/)를 참고하세요. 

저는 2014년도에 ["왜 레진코믹스는 구글 앱엔진을 선택했나"](https://www.slideshare.net/curioe_/lezhincomics-google-appengine-30453946) 슬라이드를 보고나서, GAE를 정말 많이 이용했습니다. GAE는 PaaS(Platform as a service) 서비스입니다. 파스(PaaS)말고도 SaaS, IaaS, BaaS 등 다양한 형태의 클라우드 서비스가 존재합니다.

BaaS가 예전에는 ***Backend** as a service*를 의미했습니다. 하지만 이제는 ***Blockchain** as a service*를 의미하는 것 같습니다. 이제는 블록체인도 클라우드 서비스 형태로 사용하는 시대입니다. 아마존은 작년(2018)부터 블록체인 클라우드 서비스를 시작했습니다. 
[- AWS에서의 블록체인: https://aws.amazon.com/ko/blockchain/](https://aws.amazon.com/ko/blockchain/)

그리고 BaaS 하니깐 국내 KTH에서 서비스했던 baas.io가 생각납니다. baas.io도 정말 잘 사용했었습니다. 하지만 정식 오픈도 하기전에 역사의 뒤안길로 사라져서 너무 안타까웠습니다. 참고로 baas.io는 가격이 무척 저렴했습니다. baas.io를 모르시는 분을 위해 관련 기사를 링크합니다. 
[- KTH, 모바일 앱 개발 도우미 서비스 출시: http://www.bloter.net/archives/132383](http://www.bloter.net/archives/132383)



<br><center>*</center><br>


아래의 단계를 따르면  5분 안에 **Apollo GraphQL Server**를 **Google App Engine (GAE)**에서 실행할 수 있습니다. 내용은 ["Apollo GraphQL Server on Google App Engine in under 5 minutes!"](https://medium.com/google-cloud/apollo-graphql-server-on-google-app-engine-in-under-5-minutes-bbd64050e9ff) 블로그를 참고하였습니다. 

<br>


## 프로젝트 생성하기

`apollo-graphql-server` 디렉토리를 만듭니다. 
```
$ mkdir apollo-graphql-server
$ cd apollo-graphql-server
```

<br>아래 명령을 실행하고 `package.json` 파일을 생성합니다.
```
$ npm init
```

<br>아래 명령을 실행하여 필요한 모듈을 설치합니다.
```
$ npm install --save graphql-yoga
```
> **graphql-yoga**를 사용하면 GraphQL Server를 매우 쉽게 구현할 수 있습니다. 자세한 내용은 [graphql-yoga 사이트](https://github.com/prisma/graphql-yoga)에서 확인해주세요.

<br>
<br>

## index.js 만들기

`ndex.js` 파일을 만들고 아래 내용을 입력합니다.

```
const ｛ GraphQLServer ｝ = require('graphql-yoga');

const PORT = process.env.PORT || 8080;

const typeDefs = `
	type Query ｛
		hello: String!
	｝
`;

const resolvers = ｛
	Query: ｛
		hello: () => "Hi"
	｝
｝ 

const server = new GraphQLServer(｛ typeDefs, resolvers ｝);
server.start(｛ port: PORT ｝, () => ｛
	console.log(`Server running on http://localhost:$｛PORT｝`)
｝);
```
>서버는 `process.env.PORT` 변수에서 포트를 지정하도록 합니다. 이것은 GAE 런타임에 의해 설정된 환경 변수입니다. 그리고 `PORT` 값은 GAE 런타임에 의해 **8080**으로 설정됩니다.

<br>
<br>

## package.json 

`package.json` 파일에서 시작 스크립트와 node 및 npm 버전을 지정합니다.
```
"scripts": ｛ 
  "start": "npx babel-node index"
｝
"engines": ｛ 
  "node": "> = 8.16", 
  "npm": "5.x" 
｝
```
<br>
<br>

## app.yaml
GAE에 배포하기 위해서는 `app.yaml` 파일이 필요합니다. `app.yaml` 파일을 만들고 아래 내용을 입력합니다.

```
runtime: nodejs
env: flex
resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10 
automatic_scaling:
  min_num_instances: 1
  max_num_instances: 20
  cool_down_period_sec: 60
  cpu_utilization:
    target_utilization: 0.80
```
> app.yaml 파일 정보는 [공식 문서](https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-your-app-with-app-yaml)를 참고하세요.

<br>
<br>

## 앱 배포하기

아래 명령을 실행하면 앱을 배포하기 시작합니다. 배포가 완료되기까지 1~2분 정도 소요됩니다.

```
gcloud app deploy
```
![](https://files.steempeak.com/file/steempeak/anpigon/8SU1eomQ-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-05-0220E1848BE185A9E1848CE185A5E186AB2012.40.41.png)

<br>
<br>

## 앱 실행하기

아래 명령을 실행하면 기본 브라우저에서 앱 URL로 이동합니다.
```
gcloud app browse
```

<br>`https://[your-project-id].appspot.com`와 같은 URL로 이동하게 됩니다. 그럼 아래와 같이 GraphiQL 인터페이스를 볼 수 있습니다.
![](https://files.steempeak.com/file/steempeak/anpigon/8F3sbJ0V-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-05-0220E1848BE185A9E1848CE185A5E186AB202.06.35.png)



<br>여기까지 읽어주셔서 감사합니다.

***

<center>

![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)
</center>
