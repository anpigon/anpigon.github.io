---
title: '파이썬 머신러닝 #6 - 스팀잇에서 유사한 게시물 찾기'
tags:
  - kr
  - kr-dev
  - jjangjjangman
  - interesteem
  - 파이썬
  - 머신러닝
  - busy
author: anpigon
date: 2018-09-27 09:24:27
---

안녕하세요. @anpigon입니다.

@nhj12311님의 **["Node & Steem #11 - 글 아카이브 ... 포스팅 분류하기"](https://steemit.com/kr-dev/@nhj12311/node-and-steem-11)** 게시글을 보고 저도 비슷하게 구현해보았습니다. 시리즈 글을 찾아주는 기능은 @nhj12311님이 완벽하게 구현하였더군요. 그래서 저는 @nhj12311님과 다르게 시리즈 글이 아닌 유사도가 높은 게시글을 찾아내는데 초점을 맞추었습니다.

https://i.imgur.com/fkw1K39.png

<br>구현에는 이전에 작성한 ["유사한 게시물 찾기"](https://steemit.com/kr/@anpigon/5)과 조대협님의 ["NMF 알고리즘을 이용한 유사한 문서 검색과 구현"](http://bcho.tistory.com/1216)를 참고하였습니다. 그리고 구현 과정과 결과물을 아래에 간략하게 정리하였습니다
<br>

___


https://imgur.com/M560S0F.png

# 스팀잇 게시글 가져오기

**steem api**를 이용하여 내가 작성한 게시글(posts)을 모두 가져온다. 그리고 가져온 **Post**에서 분석에 필요한 데이터(title, body, author, permlink)만 사용한다.

```python
from steem import Steem 
from steem.blog import Blog

# 게시글(Post)에서 필요한 필드 정의
filter_post = ['title', 'body', 'author', 'permlink']

# 스팀잇 게시글 가져오는 함수
def loadSteem(username):
  print('@％s님 글 가져오는 중...' ％ username)
  b = Blog(username)
  posts = b.all() # 게시글 모두 가져오기

  # 필요한 데이터만 추려서 반환
  return [｛k: v for k, v in p.export().items() if k in filter_post｝ for p in posts]

# 스팀잇에서 글 가져오기
posts = loadSteem('anpigon')
posts # 결과 출력
```
https://imgur.com/ntFCbcO.png
<br>
___

# 형태소 분석
**konlpy.Mecab**를 이용하여 형태소 분석을 한다. 그리고 분석하는데 불필요한 품사는 모두 제거하였다. 품사 코드는 [여기](http://kkma.snu.ac.kr/documents/?doc=postag)에서 참고하였다. 그리고 분석된 텍스트 데이터는 [Pandas](https://pandas.pydata.org)의 **DataFrame** 자료구조를 이용하여 처리하였다.

```python
import pandas as pd
from konlpy.tag import Mecab
pos_tagger = Mecab()

# 분석에 필요한 품사 정의
filter_pos = ['NNG', 'NNP', 'NNB', 'NR', 'NP', 'VV', 'VA', 'VX', 'AX', 'VCP', 'VCN', 'MM', 'MAG', 'MAJ']

# 형태소 분석하는 함수 정의
def morphs(text):
    tokens = pos_tagger.pos(text)

    # 형태소 분석하여 필요한 품사의 단어만 문장으로 구성하여 반환
    return ' '.join([word for word, pos in filter(lambda x: (x[1] in filter_pos), tokens)])

# DataFrame 객체 생성
df = pd.DataFrame(columns=['title', 'body'])

# 가져온 게시글(posts)을 DataFrame에 입력
for i, post in enumerate(posts):
    key = post['author'] + '/' + post['permlink']
    body = morphs(post['body']) # 형태소 분석
    if len(body) > 10:
        value = ｛
            'title': post['title'],
            'body': body,
        ｝
        df.loc[key] = value
```
> Pandas는 데이터 구조 및 데이터 분석 도구를 제공하는 파이썬 라이브러리이다. 그리고 오픈 소스 BSD 라이센스를 가지고 있다. **pandas.DataFrame**의 기능은 [pandas 문서](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.html)를 참고하면 된다.

<br>**DataFrame**의 **head**를 출력하면 아래와 같다.

https://imgur.com/efBJctd.png
<br>
___



# Tfidf 를 이용한 단어의 벡터화 구현
​
**tfidf** 모델을 이용하여 단어를 벡터화한다. sklearn에서 제공하는 **TfidfVectorizer**를 이용하면 쉽게 구현할 수 있다. **TfidfVectorizer** 객체를 생성하고 **fit_transform**을 이용하여 **body**에 담겨있는 텍스트 데이터를 벡터화한다.


```python
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer()
vectors = vectorizer.fit_transform(df['body'].tolist())
print(vectors.shape)
```
<br>
___

# NMF를 이용하여 게시글에서 특성 추출
**NMF**를 이용하여 각 게시글에서 특성을 추출한다. NMF에 넘겨주는 `n_components=10`값은 특성을 10개로 압축하여 추출한다는 의미이다.

```python
from sklearn.decomposition import NMF

vector_array = vectors.toarray()
nmf = NMF(n_components=10)
nmf.fit(vector_array)
features = nmf.transform(vector_array)
```
https://imgur.com/DRaogoa.png
<br>
___

# 피쳐 정규화
**Normalizer**를 이용하여 **features**를 0 ~ 1 로 스케일링을 한다. sklearn에서 제공하는 Normalizer를 이용하면 쉽게 구현할 수 있다.

```python
from sklearn.preprocessing import Normalizer

normalizer = Normalizer()
norm_features = normalizer.fit_transform(features)
```
https://imgur.com/hBNYqyu.png
<br>

`df_features`에 게시글별 특징과 인덱스를 가지고 데이타 프레임을 만들어서 생성한다. 인덱스는 `author/permlink`의 형태이다. 그리고 0 ~ 9 컬럼은 각 게시글의 특징이다.

```python
df_features = pd.DataFrame(norm_features, index=df.index.tolist())
df_features.head()
```
https://imgur.com/fylwzLu.png

<br>
___

# 문서 유사도 계산

이제 기존에 작성한 게시글에서 **<q>파이썬 머신러닝 #4 - 스팀잇 글 감정 분류하기</q>** 글과 유사한 게시글을 찾아보자. `DataFrame.loc` 함수를 이용하면 해당 게시글의 특성 행렬을 가져올 수 있다. 가져온 특성 행렬은 `article`에 저장한다.

```python
article = df_features.loc['anpigon/4']
print(article[:10])
```
https://imgur.com/CMnJzpX.png

<br>`DataFrame.dot` 함수를 이용하면, 한 게시글의 특성 행렬을 전체 게시글의 특성 행렬에 대해서 계산할 수 있다. 전체 게시글에서 각 게시글의 특성 행렬과 `article`의 특성 행렬을 곱한다. 그러면 `article`과 각 게시글에 대한 유사도가 계산된다. 이렇게 계산해서 나온 값이 큰 순으로 정렬해서 `top`에 저장한다. 그리고 유사도가 높은 순으로 게시글의 제목 10개를 출력해보자.

```python
similarities = df_features.dot(article)
top = similarities.nlargest(10)

texts = df.loc[top.index].values
i = 0
for title, body in texts:
    print('=== 유사도 ％.4f: ％s' ％ (top[i], title))
    i += 1
```
https://imgur.com/guV0MyB.png

파이썬 머신러닝 관련 글이 상위에 모두 있다. 그리고 유사도가 90％에 가깝게 나와서 만족한 결과가 나왔다. 

이제 다른 사람이 작성한 게시글로 테스트해보자.
<br>

___

# 테스트 결과

@nhj12311님의 **<q>[개발] Node & Steem #11 - 포스팅 아카이브 기능으로서의 첫 걸음. 포스팅 분류하기.</q>** 게시글과 유사한 게시글을 찾아보자.
https://imgur.com/2y6QUOc.png
결과를 보면 @nhj12311님은 비슷한 글을 많이 작성해서 그런지 대부분의 개발 관련 글은 높은 유사도를 보인다.

마지막으로 @forhappywomen님의 **<q>임·준·출 19화 - 기형아검사?!!!</q>** 게시글도 테스트 해보았다.
https://imgur.com/uK5HEHX.png
**"임·준·출"** 시리즈 글이 상위권에 포진해 있지 않다. 아마도 **"임·준·출"** 시리즈는 매 번 주제가 바뀌어서 그런 것 같다. @nhj12311님 말대로 머신러닝으로 시리즈 글을 묶어내는 건 매우 어려워 보인다.

<br>
___ 


단어를 벡터화해서 벡트 간의 거리 계산으로 유사한 글을 찾는 방법은 내용에 같은 단어가 많으면 유사한 글로 분류될 가능성이 높습니다. 그리고 **Word2Vector**와 **딥러닝**을 이용하면 정확도를 더 높일 수 있다고 합니다. Word2Vector와 딥러닝을 공부하고 난 후에 다시 도전해 볼 생각입니다. 

여기까지 읽어주셔서 감사합니다.
___ 

###### 이전글

* [파이썬 머신러닝 #1 - 스팀잇 형태소 분석하기](https://steemit.com/busy/@anpigon/5s1aam)
* [파이썬 머신러닝 #2 - 스팀잇 형태소 분석해서 단어구름 만들기](https://steemit.com/busy/@anpigon/2)
* [파이썬 머신러닝 #3 - 스팀잇 아이디로 성별  예측하기](https://steemit.com/busy/@anpigon/3)
* [파이썬 머신러닝 #4 - 스팀잇 글 감정 분류하기](https://steemit.com/kr/@anpigon/4)
* [파이썬 머신러닝 #5 - 유사한 게시물 찾기](https://steemit.com/kr/@anpigon/5)

<div><hr>
<div class='pull-left'><a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
<img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a></div><sub>이 저작물은 <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.</sub>
</div>
