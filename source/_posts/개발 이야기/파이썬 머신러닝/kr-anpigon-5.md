---
title: '파이썬 머신러닝 #5 - 유사한 게시물 찾기'
tags:
  - kr
  - kr-dev
  - jjangjjangman
  - busy
  - interesteem
author: anpigon
date: 2018-09-20 13:17:45
---

https://imgur.com/PGtotCd.png

안녕하세요. @anpigon 입니다.

이번에는 유사한 게시물을 찾아내는 방법을 공부하였습니다. 게시물을 벡터로 계산하고, 벡터 간의 거리를 구하는 방법으로 유사도를 분석합니다. 이 기술을 이용하면 인터레스팀 서비스처럼 관련 글을 찾아낼 수도 있습니다. 저는 이 기술을 사용해서 불펌러(어뷰징 계정)들을 찾아내고 싶네요.<br><br>

<div class='pull-left'>https://steemitimages.com/100x0/https://imgur.com/qp9KfVj.png
<br></div>

이번 예제는 "Building Machine Learning Systems with Python - Second Edition" 서적을 참고하였습니다. 
이 책의 54 페이지에 있는 내용입니다.

<br><br><hr><br>

# scikit-learn

**[scikit-learn](http://scikit-learn.org/stable/install.html)**는 데이터 마이닝 및 데이터 분석을 위한 파이썬 라이브러리이다. NumPy, SciPy 및 matplotlib를 기반으로 제작되었다. 그리고 상업적으로 사용 가능한 오픈 소스(BSD) 라이센스를 가지고 있다.



**scikit-learn** 사용 환경은 다음과 같다. 아쉽게도 최신 버전인 파이썬3.7에서는 동작하지 않는다.
```
Python (>= 2.7 or >= 3.3),
NumPy (>= 1.8.2),
SciPy (>= 0.13.3).
```

###### 설치하기

```
pip install -U scikit-learn
```
<br><hr><br>


# 카운트 벡터 생성하기

게시물에 등장하는 단어를 세어 하나의 카운트 벡터로 생성한다. 그리고 해당 컨텐츠와 다른 컨텐츠 사이의 벡터 거리를 계산하여 컨텐츠 사이의 유사도를 파악한다. 하지만 우리는 단어를 세고 그 카운트를 벡터로 나타내는 코드를 작성할 필요가 없다. 그냥 SciKit의 "countVectorizer" 함수를 사용하면 된다.

**scikit-learn**에서 텍스트를 벡터화할 수 있는 `CountVectorizer` 함수를 **import**한다.

```
from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer(min_df=1)
```

<br>`CountVectorizer`의 매개변수를 간단하게 설명하면, `min_df`의 값은 해당 값보다 낮은 빈도수의 단어는 모두 삭제된다. `max_df`도 비슷한 방식으로 작동한다. 아래와 같이 `vectorizer`를 출력하면 **SciKit**이 제공하는 다른 매개 변수와 기본값을 볼 수 있다.

![Imgur](https://i.imgur.com/JMFjvLj.png)


<br>


다음 데이터 세트를 사용하여 벡터간 거리를 계산해보자.
```
posts = [
  "이 글은 머신러닝에 관한 글이다. 사실은 재미없는 내용을 포함하고 있다.",
  "이미징 데이터베이스는 저장 기능을 제공한다.",
  "대부분의 이미징 데이터베이스는  이미지를 영구적으로 저장한다.",
  "이미징 데이터베이스는 데이터를 저장한다.",
  "이미징 데이터베이스는 데이터를 저장한다. 이미징 데이터베이스는 데이터를 저장한다. 이미징 데이터베이스는 데이터를 저장한다.",
]
```

<br>`fit_transform()` 함수를 사용하여 벡터화 작업을 수행한다. 결과를 확인해보면, 19개 단어로 구성된 5개의 게시물이 벡터화되었다.

```
X_train = vectorizer.fit_transform(posts) 
num_sample, num_features = X_train.shape
print("#sample: ％d, #fearutes: ％d" ％ (num_sample, num_features))
```
![](https://imgur.com/85HQA58.png)



<br>**feature_names**을 출력해보자. **vectorizer**가 19개의 단어를 감지했다는 것을 확인할 수 있다. 그러나 **"글은"**과 **"글이다"** 처럼 동일한 단어가 따로 구분되어 잡힌게 찜찜하지만 일단은 그대로 진행해본다.

```
print(vectorizer.get_feature_names())
```
![](https://imgur.com/M67WJQF.png)


<br>이제 새로운 게시물이 주어졌을때 해당 게시물이 어느 게시물과 거리가 가까운지 살펴보자. 거리가 가까운 게시물이 가장 유사한 게시물이라고 보면 된다.

새 게시물을 벡터화하고 카운터 벡터를 생성하자.

```
new_post = "이미징 데이터베이스는"
new_post_vec = vectorizer.transform([new_post])
```
<br>

> 책 내용에 따르면 'transform' 함수에 의해 반환되는 카운트 벡터는 희소(sparse)하다는 것에 주의해야 한다. 이것은 각 벡터가 각 단어에 대한 카운트 값을 가지고 있지 않기 때문에 대부분은 0에 가까운 값을 가진다는 것을 의미한다. 대신, 더 효율적인 메모리 구현체인 'coo_matrix'를 사용한다. 예를 들어 새 게시물에는 실제로 두가지 요소만 포함하고 있다.

<sup>사실 저는 이 내용을 이해하지 못했습니다. 영어를 제대로 번역한게 맞는지도 모르겠어요. 이 부분에 대해서는 쉽게 설명하지 못해서 죄송합니다.ㅠ</sup>

<br>벡터화된 새 게시물의 `new_post_vec`를 출력해보자.

```
print(new_post_vec)
```
![](https://imgur.com/Riv5tc4.png)
출력 결과를 설명하면 새로운 게시물의 벡터가 7번째와 12번째에 위치하고 있다는 의미이다.

<br>`toarry()` 멤버를 통해 전체 `ndarray`를 출력해보자.

```
print(new_post_vec.toarray())
```

![](https://imgur.com/H6ro4IE.png)

하지만 책이 설명하는 것과 동일한 결과가 나오지 않았다. 아마도 한글은 형태소 분석을 해야 원하는 결과가 나올 것 같다.

<br>형태소 분석기를 사용하여 형태소를 분석하자. 그리고 형태소 분석된 게시물을 다시 벡터화를 해보자.

```
from konlpy.tag import Mecab
pos_tagger = Mecab()

posts_tokens = [' '.join(pos_tagger.morphs(sentence)) for sentence in posts]
posts_tokens
```

![](https://imgur.com/oeamK0D.png)

<br>형태소 분석된 게시물을 벡터화한다.
```
X_train = vectorizer.fit_transform(posts_tokens) 
```

<br><br>그리고 새로운 게시물도 형태소 분석을 한다.

```
new_post = "이미징 데이터베이스는 저장한다."
new_post_tokens = ' '.join(pos_tagger.morphs(new_post))
new_post_tokens
```
![](https://imgur.com/TAOh81u.png)

<br>새로운 게시물을 벡터화하고 `new_post_vec`를 출력해본다.

```
new_post_vec = vectorizer.transform([new_post_tokens])
print(new_post_vec)
```
![](https://imgur.com/vkCLY7h.png)

<br>`ndarray`도 출력해본다. 새로운 게시물의 벡터가 5번째, 11번째, 14번째, 17번째에 위치한다는 예상했던 결과가 나왔다.
```
print(new_post_vec.toarray())
```

![](https://imgur.com/qHZZo3N.png)

<br><hr><br>

# 벡터 사이의 거리 구하기

이제 새로운 게시물(new_post_vec)과 기존 게시물(posts)들 각각에 대해 거리를 계산해보자. 두 벡터 사이의 유클리드 거리를 계산하여 유사성을 측정한다.

우선 거리를 구하는 `dist_raw()` 함수 정의한다. `np.linalg.norm()` 함수를 사용하면 최단 거리를 계산할 수 있다.
```
import numpy as np
def dist_raw(v1, v2):
  delta = v1 - v2
  return np.linalg.norm(delta.toarray())
```

<br>`dist_raw()` 함수를 사용하여 이전 게시물과 기존 게시물의 거리를 계산하여 출력한다. 그리고 유사도가 가장 높은 게시물을 찾아보자.

```
import sys
best_dist = sys.maxsize
best_doc = None
best_i = None
 
for i, post in enumerate(posts):
    post_vec = X_train.getrow(i)
    d = dist_raw(post_vec, new_post_vec)
    print("=== Post ％i with dist = ％.2f: ％s" ％ (i, d, post))
    if d < best_dist:
        best_dist = d
        best_i = i
 
print("Best post is ％i with dist=％.2f" ％ (best_i, best_dist))
```

![](https://imgur.com/ay2v4r1.png)

3번 게시물이 새로운 게시물과 거리가 가장 가깝다는 결과가 나왔다. 그러나 3번, 4번 게시물을 보면 이상한 점이 있다. 4번 게시물은 3번 게시물을 복사&붙여넣기 한 것이다. 따라서 3번 게시물처럼 4번 게시물도 새로운 게시물과도 유사하다는 결과가 나와야 한다.

<br>해당 벡터의 feature를 출력해보면 그 이유를 알 수 있다.

![](https://imgur.com/39LOZnD.png)


이를 교정하기 위해서는 카운트 벡터를 정규화해야한다. 위에서 정의한 거리 구하는 함수 `dist_raw()`를 수정함으로써 문제를 간단히 해결할 수 있다.

<br>

# 카운터 벡터 정규화하기


원시 벡터(raw vectors)가 아닌 정규화된 벡터 거리를 계산하기 위한 함수 `dist_norm()`를 정의한다. 이 함수는 각 벡터의 norm을 나눈 후에 거리를 계산한다.

```
def dist_norm(v1, v2):
    v1_normalized = v1/np.linalg.norm(v1)
    v2_normalized = v2/np.linalg.norm(v2)
    delta = v1_normalized - v2_normalized
    return np.linalg.norm(delta)
```

<br>이 함수를 사용하여 유사도를 측정한 결과를 출력해보자.

```
=== Post 0 with dist = 3.32: 이 글은 머신러닝에 관한 글이다. 사실은 재미없는 내용을 포함하고 있다.
=== Post 1 with dist = 1.41: 이미징 데이터베이스는 저장 기능을 제공한다.
=== Post 2 with dist = 2.00: 대부분의 이미징 데이터베이스는  이미지를 영구적으로 저장한다.
=== Post 3 with dist = 1.00: 이미징 데이터베이스는 데이터를 저장한다.
=== Post 4 with dist = 1.00: 이미징 데이터베이스는 데이터를 저장한다. 이미징 데이터베이스는 데이터를 저장한다. 이미징 데이터베이스는 데이터를 저장한다.
Best post is 3 with dist=1.00
```

<br>이제 원하는 결과가 나왔다. 3번 게시물과 4번 게시물도 동일한 결과가 나왔다.

<br>여기까지 읽어주셔서 감사합니다.

___ 

###### 이전글

* [파이썬으로 스팀잇 형태소 분석하기 #1](https://steemit.com/busy/@anpigon/5s1aam)
* [파이썬으로 스팀잇 형태소 분석하기 #2 - 단어구름 만들기](https://steemit.com/busy/@anpigon/2)
* [파이썬 머신러닝 #3 - 스팀잇 아이디로 성별  예측하기](https://steemit.com/busy/@anpigon/3)
* [파이썬 머신러닝 #4 - 스팀잇 글 감정 분류하기](https://steempeak.com/kr/@anpigon/4)