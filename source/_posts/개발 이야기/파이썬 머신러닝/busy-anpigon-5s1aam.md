---
title: '파이썬으로 스팀잇 형태소 분석하기 #1'
tags:
  
  
  
  
  
author: anpigon
date: 2018-09-11 00:28:06
---

안녕하세요. @anpigon 입니다.


구글 Keynote (Google I/O '18) 발표 영상을 이제서야 봤습니다. 발표 내용은 구글 어시스턴트의 새로운 기능에 관한 내용입니다. 여기서 주목할 기능은 인공지능(AI)이 미용실이나 레스토랑에 전화를 걸어 예약을 해주는 기능입니다.

인공지능이 미용실에 직접 전화를 걸어 대화하면서 예약하는 장면은 소름 돋을 정도였습니다. 사람인지 인공지능인지 구분할 수 없을 정도입니다. 심지어 대화 중간에 망설이는 듯이 "음..."하는 소리까지 냅니다.

아래 유튜브 링크에서 해당 발표 영상을 볼 수 있습니다. 35분부터 해당 내용이 나옵니다. 한글 자막으로 설정하고 보세요.

| <div class='text-center'>[![](https://steemitimages.com/650x0/https://i.imgur.com/xOneO8J.png)](https://goo.gl/WyqKBe)</div> |
|-|
| <sup>(라이센스 관련 내용을 찾지 못하여 영상을 포스트 내용에 포함시키지 않았습니다. 클릭해서 유튜브에서 감상하기실 바랍니다.)</sup> |

이 영상을 보고  인공지능(AI)에 관심이 생겼습니다. 관심있는 기술부터 공부하면서 정리할 예정입니다. 관심 분야가 너무 많아서 큰일이네요.🤯

서론은 여기까지 하고 본론으로 들어가겠습니다.
___

# KoNLPy 모듈 설치

한글 형태소 분석을 위해서는 [Lucy Park(박은정)](https://www.lucypark.kr/)님이 개발한 [KoNLPy](http://konlpy.org/) 모듈이 필수다. 아래는 제26회 한글 및 한국어 정보처리 학술대회 논문집(2014년)에 발표한 요약본이다. 너무 멋진 글이라고 생각하여 발췌하였다.

> 파이썬은 간결한 아름다움을 추구하는 동시에 강력한 스트링 연산이 가능한 언어다. KoNLPy는 그러한 특장점을 살려, 파이썬으로 한국어 정보처리를 할 수 있게 하는 패키지이다. 꼬꼬마, 한나눔, MeCab-ko 등 국내외에서 개발된 여러 형태소 분석기를 포함하고, 자연어처리에 필요한 각종 사전, 말뭉치, 도구 및 다양한 튜토리얼을 포함하여 누구나 손쉽게 한국어 분석을 할 수 있도록 만들었다.

<sup>출처: https://www.lucypark.kr/docs/2014-10-10-hclt.pdf</sup>

우선 파이썬과 자바는 설치가 되어있다고 가정한다. 설치방법에 대한 자세한 내용은 아래 홈페이지를 참고한다. 

http://konlpy.org/ko/latest/install/

```
$ sudo apt-get install g++ openjdk-7-jdk python-dev python3-dev
```

 <br>아래와 같이 `KoNLPy` 를 설치한다.
```
$ pip install konlpy
Collecting konlpy
  Downloading https://files.pythonhosted.org/packages/b1/41/73127de031d710fa6fc640cc4d4d399977e7a96423131fcd180b9f69627c/konlpy-0.4.4-py2.py3-none-any.whl (22.5MB)
    100％ |████████████████████████████████| 22.5MB 25kB/s
Installing collected packages: konlpy
Successfully installed konlpy-0.4.4
```

 <br>환경변수에 JAVA_HOME을 설정한다. 맥OS는 아래와 같이 입력한다.
```
JAVA_HOME=$(/usr/libexec/java_home)
```

 <br>그리고 `Jpype1-py3`를 설치한다.
```
$ pip install Jpype1-py3
```

 <br>그 다음에는 Python에서 아래와 같이 입력한다.
```
$ python
>>> import nltk
>>> nltk.download()
```
 <br>아래와 같이 창이 뜨면 All Package 탭을 선택한 후 stopwords와 punkt를 더블 클릭하여 다운로드 한다.

| <div class='text-center'>![](https://imgur.com/ibGRHoe.png)</div> |
|-|

<br>필요한 모듈 설치가 모두 완료되었다.

# 한글 형태소 분석하기

KoNLPy를 사용하면 꼬꼬마, 한나눔 등의 형태소 분석기를 사용할 수 있다.

[주피터 노트북](https://github.com/jupyter/notebook/blob/master/docs-translations/ko-KR/Installation.md)에서 코드를 작성하면 테스트하기 편리하다. 다음과 같이 주피터 노트북을 설치하고 실행한다.
```
$ pip install jupyter
$ jupyter notebook
```

<br>
## 꼬꼬마 형태소 분석기 사용하기

[꼬꼬마(Kkma) 형태소 분석기](http://kkma.snu.ac.kr/)는 서울대학교 IDS (Intelligent Data Systems) 연구실에서 개발하였다.

꼬꼬마 모듈을 사용하기 위해 import 한다.
```
from konlpy.tag import Kkma
kkma = Kkma()
```

<br>아래와 같이 문장(sentences)분석을 한다. 마침표가 없어도 2개의 문장으로 분석한다.
```
kkma.sentences('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
[이것은 형태소 분석기 입니다', '아버지가방에 들어가신다']`
```

<br>아래와 같이 명사(nouns) 분석도 한다.
```
kkma.nouns('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['이것', '형태소', '분석기', '아버지', '아버지가방', '가방']
```

<br>형태소(pos) 분석을 한다. 한글은 영어와는 다르게 형태의 변화가 많다. 그래서 최소한의 의미 단위인 형태소로 분석한다.
```
kkma.pos('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
[('이것', 'NP'), 
 ('은', 'JX'),
 ('형태소', 'NNG'), 
('분석기', 'NNG'), 
('이', 'VCP'), 
('ㅂ니다', 'EFN'), 
('아버지', 'NNG'), 
('가방', 'NNG'), 
('에', 'JKM'), 
('들어가', 'VV'), 
('시', 'EPH'),
('ㄴ다', 'EFN')]
```

<br>
## 한나눔 형태소 분석기 사용하기

[한나눔(Hannanum) 형태소 분석기](http://semanticweb.kaist.ac.kr/hannanum/index.html) 는 카이스트 SWRC 연구소에서 개발하였다.

```
from konlpy.tag import Hannanum
hannanum = Hannanum()
```

<br>한나눔 명사 분석은 꼬꼬마와는 분석 결과가 다르다.
```
hannanum.nouns('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['이것', '형태소', '분석기', '아버지가방에들어가']
```

<br>한나눔 형태소 분석 결과이다.

```
hannanum.morphs('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['이것', '은', '형태소', '분석기', '일', 'ㅂ니다', '아버지가방에들어가', '이', '시ㄴ다']
```

```
hannanum.pos('이것은 형태소 분석기 입니다 아버지가방에들어가신다'
[('이것', 'N'), 
 ('은', 'J'), 
 ('형태소', 'N'), 
 ('분석기', 'N'), 
 ('일', 'P'), 
 ('ㅂ니다', 'E'), 
 ('아버지가방에들어가', 'N'), 
 ('이', 'J'), 
 ('시ㄴ다', 'E')]
```

<br>
## Open Korean Text 형태소 분석기 사용하기

이전에 트위터에서 만든 형태소 분석기가 [Open Korean Text](https://github.com/open-korean-text/open-korean-text)로 바뀌었다.

```
from konlpy.tag import Okt
okt = Okt()
```

```
okt.nouns('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['것', '형태소', '분석', '기', '아버지', '가방']
```

```
okt.morphs('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['이', '것', '은', '형태소', '분석', '기', '입니', '다', '아버지', '가방', '에', '들어가신', '다']
```

```
okt.pos('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
[('이', 'Determiner'), 
 ('것', 'Noun'), 
 ('은', 'Josa'), 
 ('형태소', 'Noun'), 
 ('분석', 'Noun'), 
 ('기', 'Noun'),
 ('입니', 'Adjective'), 
 ('다', 'Eomi'), 
 ('아버지', 'Noun'), 
 ('가방', 'Noun'), 
 ('에', 'Josa'), 
 ('들어가신', 'Verb'), 
 ('다', 'Eomi')]
```

<br>
## 코모란 형태소 분석기 사용하기

[코모란(Komoran) 형태소 분석기](http://www.shineware.co.kr/products/komoran/)은 Shineware Soft에서 개발하였다.

```
from konlpy.tag import Komoran
komoran = Komoran()
```

```
komoran.nouns('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['형태소', '분석기', '아버지가방에들어가신다']
```

```
komoran.morphs('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['이것', '은', '형태소', '분석기', '이', 'ㅂ니다', '아버지가방에들어가신다']
```

```
komoran.pos('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
[('이것', 'NP'), 
 ('은', 'JX'), 
 ('형태소', 'NNP'), 
 ('분석기', 'NNG'), 
 ('이', 'VV'), 
 ('ㅂ니다', 'EC'), 
 ('아버지가방에들어가신다', 'NNP')]
```

<br>
## 은전한닢 형태소 분석기 사용하기

[은전한닢(Mecab) 형태소 분석기](http://eunjeon.blogspot.com/)는 카카오에 근무중인 유영호, 이용운 개발자님이 개발하였다.

```
from konlpy.tag import Mecab
mecab = Mecab()
```

```
mecab.nouns('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['이것', '형태소', '분석기', '아버지', '방']
```

```
mecab.morphs('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
['이것', '은', '형태소', '분석기', '입니다', '아버지', '가', '방', '에', '들어가', '신다']
```

```
mecab.pos('이것은 형태소 분석기 입니다 아버지가방에들어가신다')
[('이것', 'NP'), 
 ('은', 'JX'), 
 ('형태소', 'NNG'), 
 ('분석기', 'NNG'), 
 ('입니다', 'VCP+EF'), 
 ('아버지', 'NNG'), 
 ('가', 'JKS'), 
 ('방', 'NNG'), 
 ('에', 'JKB'), 
 ('들어가', 'VV'), 
 ('신다', 'EP+EC')]
```

<br>형태소 분석기 5개 중에서 어떤 것을 사용해야 좋을지 선택하기가 어려웠다. 그래서 내가 작성한 스팀잇 글 전체(26개)를 형태소 분석하는데 걸리는 시간을 체크해보았다.  

꼬꼬마는 품사 분석 정확도가 매우 뛰어나지만, 분석 시간이 너무 오래 걸리는 단점이 있다. 빠른 형태소 분석이 필요하면 은전한닢을 사용하는 것이 좋다.

| 구분         | 꼬꼬마 | 오픈한국어 | 코모란 | 한나눔 | 은전한닢 |
| ------------ | ------ | ---------- | ------ | ------ | -------- |
| 소요시간(초) | 30.779 | 7.050      | 5.499  | 9.607  | 1.187    |

![](https://imgur.com/ZI0EbuA.png)

<br>아래는 각 형태소 분석기가 분석하는데 걸리는 시간을 체크하는데 사용한 코드 내용이다.
```
import time
from konlpy.tag import Kkma, Okt, Komoran, Hannanum, Mecab
from steem import Steem 
from steem.blog import Blog

username = 'anpigon'
b = Blog(username)
posts = b.all()
# posts = b.take(10)

texts = []
for post in posts:
  if post.body != "":
    texts.append(post.body.replace('\n', ''))

pos_taggers = [('Kkma', Kkma()), ('Okt', Okt()), ('Komoran', Komoran()), ('Hannanum', Hannanum()), ('Mecab', Mecab())]
for name, tagger in pos_taggers:
  process_time = time.time()
  for text in texts:
    tagger.pos(text)
  process_time = time.time() - process_time
  print('module = ％10s, ％.3f secs' ％ (name, process_time))
```

<br>여기까지 읽어주셔서 감사합니다.

___

* 추가: python steem SDK는 https://github.com/steemit/steem-python 에서 가이드를 보고 설치해주세요.