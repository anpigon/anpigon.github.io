---
title: "[React Native] 카카오 책 검색 API 사용하기"
author: anpigon
date: "2019-04-09T17:48:18Z"
permalink: "/kr/@anpigon/react-native-api"
tags:
  - "React Native"
  - "국내 도서 검색 OPEN API"
---
안녕하세요. 안피곤입니다.

이전 글 "[국내 도서 검색 OPEN API 비교](/kr/@anpigon/open-api)"에서 책 검색 OPEN API를 조사했습니다. 그러나 제가 원하는 데이터를 모두 제공하는 API는 찾지 못했습니다. 그나마 Daum 책 검색 API가 가장 괜찮은 것 같습니다. 아니 이제는 Kakao 책 검색 API라고 해야하죠. 

저는 당연히 온라인 서점에서 책 검색 OPEN API 서비스를 제공할 것이라고 생각했습니다. 그런데 교보문서, 영풍문고에서 OPEN API 서비스는 찾아 볼 수가 없네요. 알라딘과 인터파크에서 OPEN API 서비스를 하고 있지만, 지금은 관리하지 않는 것 같아요.

국내 온라인 서점에서 운영하는 OPEN API 서비스 관리가 안 되는 점이 매우 안타깝습니다. 사실 국가기관인 한국정보화진흥원에서 운영하는 https://www.data.go.kr 운영도 부실하긴 마찬가지입니다.

 국내 OPEN API 외에 [Google Books APIs](https://developers.google.com/books/docs/v1/using)와 [ISBNdb](https://isbndb.com/apidocs) 사이트의 API 문서도 살펴보긴 했었습니다. 하지만 한글을 지원하면서 [The Movie DB](https://developers.themoviedb.org/3) 만큼의 데이터를 제공하는 책 검색 OPEN API는 없는 것 같습니다. ㅠㅠ 

다음은 Kakao에서 제공하는 책 검색 API를 이용하여 구현한 코드입니다. 전체 코드를 공개하기에는 코드량이 너무 많아서 핵심 코드만 공개하였습니다.

&nbsp;
<center><br>* * *</br></center>
&nbsp;

## 책 검색 OPEN API 조회하기

카카오에서 제공하는 [책 검색 API](https://developers.kakao.com/docs/restapi/search#％EC％B1％85-％EA％B2％80％EC％83％89)를 이용하여 아래와 같이 구현하였습니다. 그리고 네트워크 통신 라이브러리는 `axios`를 사용했습니다.

```
import axios from 'axios';
import ｛ parseDateString ｝ from '../utils/formatter';
import ｛ DAUM_API_URL, DAUM_API_KEY ｝ from '../config.js';

const client = axios.create(｛
  baseURL: `$｛DAUM_API_URL｝`,
  method: 'post',
  headers: ｛
    'Content-Type': 'application/json; charset=utf-8',
    'Host': 'dapi.kakao.com',
    'Authorization': `KakaoAK $｛DAUM_API_KEY｝`,
  ｝,
  timeout: 10000 // 타임아웃 10초
｝);

/**
 * 
 * @param ｛*｝ query 검색을 원하는 질의어
 * @param ｛*｝ size 한 페이지에 보여질 문서의 개수(1-50 사이)
 * @param ｛*｝ page 결과 페이지 번호(1-100 사이)
 * @param ｛*｝ sort 결과 문서 정렬 방식(accuracy:정확도순, latest:최신순)
 * @param ｛*｝ target 검색 필드 제한(title:제목, isbn:ISBN, publisher:출판사, person:인명)
 */
export const searchBook = (query = '', page = '1', size = 10, sort = 'sim', target = '') => ｛
  const params = ｛
    query,
    size,
    page,
    sort,
    target
  ｝;
  return client.get('/v3/search/book', ｛
      params
    ｝)
    .then((｛
      status,
      statusText,
      data
    ｝) => ｛
      if (status === 200) ｛
        const ｛
          meta: ｛
            is_end, // 현재 페이지가 마지막 페이지인지 여부(false이면 다음 페이지를 요청할 수 있음)
            pageable_count, // 검색 결과로 제공 가능한 문서수
            total_count, // 전체 검색된 문서수
          ｝,
          documents
        ｝ = data;

        const result = ｛
          isEnd: is_end,
          pageableCount: pageable_count,
          totalCount: total_count,
          items: (documents && documents.length) ? documents
            .filter((｛
              thumbnail
            ｝) => !!thumbnail) // 표지 이미지 없는 책은 제외
            .map((｛
              title, // 도서 제목
              contents, // 도서 소개
              url, // 도서 상세 URL
              isbn, // 국제 표준 도서번호(ISBN10 ISBN13)
              datetime, // 도서 출판날짜(ISO 8601)
              authors, // 도서 저자 리스트
              publisher, // 도서 출판사
              translators, // 도서 번역자 리스트
              price, // 도서 정가
              sale_price, // 도서 판매가
              thumbnail, // 도서 표지 썸네일 URL(120x174)
              status // 도서 판매 상태 정보(정상, 품절, 절판)
            ｝, index) => ｛
              return ｛
                id: String(((page - 1) * size) + index),
                title: title,
                contents,
                url,
                isbn: isbn ? isbn.split(' ') : [],
                authors: typeof(authors) === 'string' ? [authors] : authors,
                translators: typeof(translators) === 'string' ? [translators] : translators,
                pubdate: parseDateString(datetime),
                publisher,
                thumbnail,
              ｝
            ｝) : []
        ｝
        return result;
      ｝ else ｛
        throw new Error(`$｛status｝:$｛statusText｝`);
      ｝
    ｝)
｝
```

&nbsp;

## 결과 화면

구현된 모바일앱 화면입니다. 유시민 작가님의 책을 검색해보겠습니다.

![](https://user-images.githubusercontent.com/3969643/55816772-0f9bc200-5b2e-11e9-9049-8b214c0211d3.gif)

> 목록은 FlatList를 사용했는데 스크롤 항목이 많아지니깐, VirtualizedList Scroll performance 문제가 조금 있네요. 좀 더 공부하면서 해결해봐야겠습니다.
<sub>참고: https://github.com/facebook/react-native/issues/13413</sub>

<br>

여기까지 읽어주셔서 감사합니다.