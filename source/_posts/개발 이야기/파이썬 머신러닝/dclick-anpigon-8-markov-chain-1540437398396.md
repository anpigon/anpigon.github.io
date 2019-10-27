---
title: '파이썬 머신러닝 #8 - 마르코프 체인(Markov Chain) : 문장 생성하기'
tags:
  - kr
  - kr-dev
  - 파이썬
  - 머신러닝
author: anpigon
date: 2018-10-25 12:16:39
---


![](https://files.steempeak.com/file/steempeak/anpigon/eIARaaOs-EBA788EBA5B4ECBD94ED948420ECB2B4EC9DB8.png)

[마르코프 체인](https://en.wikipedia.org/wiki/Markov_chain)은 챗봇 답변과 같은 문장생성에 많이 사용됩니다. 더 나아가 딥러닝을 이용하면 셰익스피어 소설을 쓴다거나 소스코드도 만들어 낼 수 있습니다. RNN을 사용하여 셰익스피어나 리눅스 소스 코드를 생성하는 내용은 아래 [앤드류 응](https://ko.coursera.org/instructor/andrewng) 교수님 블로그에서  볼 수 있습니다.  RNN/LSTM에 관한 내용입니다.
* ["The Unreasonable Effectiveness of Recurrent Neural Networks" by Andrej Karpathy](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)

<br>그리고 코세라에 앤드류 응 교수님의 [머신러닝 무료 강의](https://ko.coursera.org/lecture/machine-learning/welcome-to-machine-learning-zcAuT)도 있으니 관심있으신 분은 한번 들어보세요. 한글 자막 지원됩니다. 참고로 [김성훈 교수님의 무료 강의](https://hunkim.github.io/ml/)도 있습니다.

<br><hr><br>

# 머신러닝으로 문장 생성하기

<br>마르코프 텍스트 생성기(Markov Text Generator)를 파이썬으로 구현한 오픈 소스가 있어서 사용해보았다. 소스 코드는 깃허브에서 다운로드 받으면 된다.
- [https://github.com/codebox/markov-text](https://github.com/codebox/markov-text)

<br><br>


# 학습할 글 가져오기

<br>테스트를 위해 [이전 글](https://steemit.com/dclick/@anpigon/-textrank-summariser-1540351206980)에서 사용한 원사마님의 글을 다시 사용했다. 그래서 이전 소스를 재활용한다.

```
from newspaper import Article

url = 'https://steemit.com/dclick/@wonsama/-181023--1540308198584'
news = Article(url, language='ko')
news.download()
news.parse()
text = news.text
```
> 만약 `newspaper` 모듈 설치 중에 *"python setup.py egg_info" failed with error code 1 in /tmp/pip-build-BqMhb7/matplotlib/"* 에러가 나면 [여기](https://github.com/facebook/prophet/issues/418)를 참고하자. 
알려준대로 `pip install --upgrade setuptools`를 실행하니 해결되었다.


<br>dclick 광고 내용은 학습할 필요가 없기 때문에, 글 본문 하단에 dclick 광고 내용이 있으면 아래와 같이 날려준다. 

```
sponsored = text.find('\nSponsored ( Powered by dclick )')
if sponsored > 0:
    text = text[:sponsored]
```

<br>단순하게 문장과 어절 단위로만 학습한다. 꼬꼬마(kkma) 형태소 분석기를 이용하여 문장 단위를 구분한다.

```
from konlpy.tag import Kkma
tagger = Kkma()

# 문장 단위로 구분
text = '\n'.join(tagger.sentences(text))
```
> 형태소 단위로 학습했더니 말이 안 되는 문장이 생성되는 경우가 많았다. 학습 데이터를 많이 확보하면 굳이 형태소 분석까지는 할 필요가 없다고 생각한다.

<br><hr><br>

# 학습하기

<br>`depth`는 다음 단어를 선택하는 데 이전 단어 중 몇 개를 사용할지 결정하는 값이다.(최소값은 2). 값이 클수록 생성된 문장은 원본 텍스트에 나타나는 문장과 유사하다. 하지만 특정 값을 넘으면 생성된 문장이 원본에 나타나는 문장과 같아진다.

```
from db import Db
from gen import Generator
from parse import Parser
from sql import Sql
from rnd import Rnd
import sys
import sqlite3
import codecs

SENTENCE_SEPARATOR = '\n' # 문장 구분 코드
WORD_SEPARATOR = ' '      # 어절 구분 코드

# 학습하기
def train(text, name = 'steemit', depth = 2):
    db = Db(sqlite3.connect(name + '.db'), Sql())
    db.setup(depth);
    Parser(name, db, SENTENCE_SEPARATOR, WORD_SEPARATOR).parse(text)
    
train(text)
```

<br><br>

# 문장 생성하기

<br>학습한 데이터가 적어서 대부분 비슷한 문장이 생성된다. 학습 데이터가 많아지면 더 다양한 문장을 생성할 수 있을 것이다.

```
# 문장 생성하기
def generate(name = 'steemit', count = 5):
    db = Db(sqlite3.connect(name + '.db'), Sql())
    generator = Generator(name, db, Rnd())
    result = []
    for i in range(0, count):
        result.append(generator.generate(WORD_SEPARATOR))
    return result
        
generate()
```

![Screenshot 26.png](https://files.steempeak.com/file/steempeak/anpigon/vYg5wJVh-Screenshot2026.png)

<br>
<div class='text-center'>

<hr><q>나의 <code>원사마봇</code>은 오늘 <b>잠충</b>이라는 단어를 배웠습니다.</q><hr>

</div>

<br>여기까지 읽어주셔서 감사합니다.

<br>그리고 여러모로 도움을 주신 원사마님께도 감사드립니다.


<br>

![](https://files.steempeak.com/file/steempeak/anpigon/otMhz1ZG-divider-2461548_1280-cutout.png)

**이전글**

*** 

- [파이썬 머신러닝 #1 - 스팀잇 형태소 분석하기](https://steemit.com/busy/@anpigon/5s1aam)
- [파이썬 머신러닝 #2 - 스팀잇 형태소 분석해서 단어구름 만들기](https://steemit.com/busy/@anpigon/2)
- [파이썬 머신러닝 #3 - 스팀잇 아이디로 성별  예측하기](https://steemit.com/busy/@anpigon/3)
- [파이썬 머신러닝 #4 - 스팀잇 글 감정 분류하기](https://steemit.com/kr/@anpigon/4)
- [파이썬 머신러닝 #5 - 유사한 게시물 찾기](https://steemit.com/kr/@anpigon/5)
- [파이썬 머신러닝 #6 - 스팀잇에서 유사한 게시물 찾기](https://steemit.com/kr/@anpigon/6)
- [파이썬 머신러닝 #7 - 문서 요약하기(TextRank Summariser)](https://steemit.com/dclick/@anpigon/-textrank-summariser-1540351206980)

***

![](https://files.steempeak.com/file/steempeak/anpigon/otMhz1ZG-divider-2461548_1280-cutout.png)




***
#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
##### [구매욕을 자극하는 달달한 도넛](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiItOC1tYXJrb3YtY2hhaW4tLTE1NDA0MzczOTgzOTYiLCJhIjpbMjExXSwidXJsIjoiaHR0cHM6Ly9zdGVlbWl0LmNvbS90YXN0ZWVtL0Bub2lzeXNreS90YXN0ZWVtLWFhZGQ4YyIsImlhdCI6MTU0MDQzNzM5OCwiZXhwIjoxODU1Nzk3Mzk4fQ.ZiYJLFjiqI7d-v0domrRCyJCOBOsY_k88e3wt849BnU)
<sup>「 달콤한 수제 도넛 파는 곳 」 | 성신여대 모모도넛 | 안녕하세요 @noisysky입니다....</sup>
<br><center>![logo](https://steemitimages.com/200x100/https://cdn.steemitimages.com/DQmbjkrc5UT4GgZXygAnS3mLrboAy7Y8gr7R7guB8HG3f5n/logopad500.png)<br><br>이 글은 스팀 기반 광고 플랫폼<br>[dclick](https://www.dclick.io) 에 의해 작성 되었습니다.</center>