---
title: "[React] React Apollo Hooks 사용하기"
author: anpigon
date: "2019-05-13T15:05:30Z"
permalink: "/whan/@anpigon/react-react-apollo-hooks"
tags:
  - "whan"
  - "kr"
  - "kr-dev"
  - "busy"
  - "thegivingtree"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<sup>*Design by &#64;&#105;mrahelk*</sup>
***

안녕하세요. 안피곤입니다.

Hooks는 리액트 v16.8에 도입되었습니다. Hooks를 사용하면 함수형 컴포넌트에서도 상태관리와 다양한 작업들을 할 수 있습니다. 이번에는 React에서 Apollo Hooks 를 사용하는 방법을 안내합니다.

&nbsp;

<br><center>*</center><br>

&nbsp;

## 설치하기
```
npm install react-apollo-hooks

# or

yarn add react-apollo-hooks
```
> 참고: https://github.com/trojanowski/react-apollo-hooks

&nbsp;

## react-apollo-hooks 사용하기

`react-apollo-hooks`를 사용하기 위해 다음과 같이 작성 합니다. 루트 컴포넌트를 `<ApolloProvider>` 로 감쌉니다. 그리고 ApolloProvider의 `client`에 ApolloClient를 전달합니다.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import ｛ ApolloProvider ｝ from 'react-apollo-hooks';

// Create Apollo client
const client = = new ApolloClient(｛
	uri: process.env.REACT_APP_GRAPHQL_URL,
｝);

const App = () => (
  <ApolloProvider client=｛client｝>
  	<MyRootComponent />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

> 참고로 리액트에서는 `.env` 파일을 사용할때, 반드시 Key에 `REACT_APP_` 를 붙여야 합니다. 이걸 몰라서 고생했습니다. 그리고 ApolloClient에 대해 자세한 내용은 [apollo-client](https://github.com/apollographql/apollo-client)를 참고하세요.

&nbsp;

그다음 `apollo-boost`를 사용하여 GraphQL을 작성합니다.

```jsx
import ｛ gql ｝ from "apollo-boost";

const GET_POSTS = gql`
  query GetPosts(
		$tags: [String!]!
	) ｛
		getPosts(
			tags: $tags
		) ｛
			post_id
      title
		｝
｝`;
```

&nbsp;

## useQuery

useQuery를 사용하면 아래와 같이 작성합니다.

```jsx
const MainPage = (props) => ｛
  const ｛ data, error, loading ｝ = useQuery(GET_POSTS, ｛
    variables: ｛
      tags: ['kr-dev'],
    ｝
  ｝);
	
  if (loading) ｛
    return <div>Loading...</div>;
  ｝;
  
  if (error) ｛
    return <div>Error! ｛error.message｝</div>;
  ｝;

  return (
    <ul>
      ｛
      	data.getPosts.map(post => (
      	  <li key=｛post.post_id｝>｛post.title｝</li>
      	))
      ｝
    </ul>
  );
｝
```

&nbsp;

## useApolloClient

useApolloClient를 사용하면 아래와 같이 작성합니다.

```jsx
const MainPage = (props) => ｛
	
  // ApolloClient
  const client = useApolloClient();
	
  // posts Data
  const [posts, setPosts] = useState([]);
	
  // getPosts
  const _getPosts = async (｛ tags ｝) => ｛
    const ｛ data ｝ = await client.query(｛
      query: GET_POSTS,
      variables: ｛
        tags,
      ｝
    ｝);
    setPosts(data.getPosts);
  ｝

  return (
    <>
   <button onClick=｛() => ｛
          _getPosts(｛ tags: ['kr-dev'] ｝)
        ｝｝>GetPosts</Button>
      <ul>
      ｛
        posts.map(post => (
          <li key=｛post.post_id｝>｛post.title｝</li>
        ))
      ｝
      </ul>
    </>
  );
｝;

export default MainPage;
```

&nbsp;

<br><center>*</center><br>

&nbsp;

**React + GraphQL + React Apollo Hooks**를 사용하여 아래와 같은 사이트를 만들고 있습니다. 일단 컨셉만 잡아보았습니다.

[![](https://cdn.steemitimages.com/DQmfS8dzQgRekWMnnKi4uqJDmctpTzViC3VuS8ZtaC8ZsX7/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-05-13％20％E1％84％8B％E1％85％A9％E1％84％92％E1％85％AE％201.17.31.png)](https://anpigon.github.io/steemit-community/)




<br>해피 코딩하세요~!

***

<center>![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)</center>
