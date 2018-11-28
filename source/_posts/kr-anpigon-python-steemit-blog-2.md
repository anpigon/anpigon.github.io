---
title: '나만의 스팀잇 블로그 만들기 #2 - 글 목록'
tags:
  - kr
  - kr-dev
  - jjangjjangman
  - interesteem
  - busy
author: anpigon
date: 2018-10-02 21:34:54
---

안녕하세요. @anpigon입니다.

**<q>나만의 스팀잇 블로그 만들기</q>** 두 번째 강좌입니다. 이 시리즈는 개발 지식이 전혀 없는 분들도 쉽게 따라 할 수 있습니다.

___
###### 이전 글
* [나만의 스팀잇 블로그 만들기 #1](https://steemit.com/kr/@anpigon/python-steemit-blog-1)
___


https://imgur.com/T86bXj7.png

<hr><br>

# blog url 추가하기

<br>내 블로그 주소(예: anpigon.pythonanywhere.com)로 접속하면 첫 페이지에 나의 스팀잇 글 목록이 보이게 만들어 보자.

pythonanywhere에 접속하여 **Files** 페이지로 이동한다. 그리고 `web/web` 디렉토리로 이동한다. 만약  사용자명이 **anpigon**이고 프로젝트명이 **web**이면 전체 디렉토리 경로는  `/home/anpigon/web/web/` 가 된다. 디렉토리를 정확하게 잘 찾아들어갔다면 아래와 같은 화면을 볼 수 있다.

![web디렉토리이동](https://imgur.com/5FKs9YN.png)

`urls.py` 파일을 클릭하여 편집화면으로 이동한다. 그리고 코드 내용을 아래와 같이 수정한다.

```python
from django.urls import path, include

urlpatterns = [
    path('', include('blog.urls'))
]
```

여기서 `path('', include('blog.urls'))` 코드는 URL로 접속하는 모든 요청을 `blog.urls` 에서 처리하겠다는 의미이다. 

실제 편집화면의 스크린 캡처을 바로 아래에 넣었다.
![urls.py 수정](https://imgur.com/mXvweuU.png)
편집화면 상단에 있는 새로고침 버튼 ![새로고침 버튼](https://steemitimages.com/25x0/https://imgur.com/vlRj45E.png)을 클릭하면 수정된 내용이 서버에 바로 반영된다. 

**Save** 버튼을 클릭하여 저장한다. 그리고 새로고침 버튼을 클릭해보자. 그리고 블로그 주소(예: anpigon.pythonanywhere.com)로 접속하면 아래와 같은 화면을 볼 수 있다. 

![](https://imgur.com/0xyk2mN.png)

이렇게 화면에 오류 내용이 보이는 것이 정상이다. 왜냐하면 아직 `blog`를 구현하지 않았기 때문이다. 


<br>이제 본격 블로그를 개발해보자.

<br><hr><br>

# 블로그 글 목록 URL 생성하기

<br>방금 수정한 `urls.py` 파일이 있는 디렉토리에서 상위 디렉토리로 이동한다. 그리고 `blog` 디렉토리를 생성한다. `blog`가 생성된 전체 경로는 `/home/anpigon/web/blog` 이다. 아래 화면을 참고하여 생성된 디렉토리 경로를 확인하자. 

![blog디렉토리생성](https://imgur.com/FMwyUtD.png)

`blog/` 디렉토리에 들어가서 `urls.py` 파일을 신규 생성한다.

![blog/urls.py파일생성](https://imgur.com/HwwTZhL.png)

생성된 `blog/urls.py` 파일을 클릭하여 편집화면으로 이동한다. 편집창에 아래 코드를 입력하고 저장한다.

```python
from django.urls import re_path
from . import views

urlpatterns = [
    re_path('^$', views.post_list, name='post_list')
]
```

`re_path('^$', views.post_list, name='post_list')` 코드를 설명하면 `^$` URL에 글 목록을 보여줄 뷰(View) `views.post_list`를 맵핑하였다. 여기서 정규식 `^$`은 **아무 문자열이 없을 경우**라는 의미이다. 아직은 정규식에 대해서 공부할 필요가 없다. 마지막으로 `name='post_list'`은 URL을 식별하기 위해 붙인 이름이다. 

이 부분이 잘 이해가 안 되면 그냥 넘어가도 된다. 시간이 지난 뒤에 나중에 다시 보면 이해가 될 것이다.

<br><hr><br>

# 블로그 글 목록 View 생성하기

<br>여기서부터는 난이도가 조금 올라간다. 하지만 걱정할 필요가 없다. 천천히 따라하면 쉽게 할 수 있다. 참고로 이 글에서는 **steemit**에서 제공하는 파이썬 sdk를 사용하지 않았다.

방금 `blog/urls.py` 파일을 생성한 디렉토리에서 `views.py` 파일을 신규 생성한다. 그리고 `views.py` 파일을 클릭하여 편집화면으로 이동한다. 그리고 아래 설명서를 보면서 코드를 천천히 입력해보자. 코드 양을 보고 겁낼 필요가 없다. 

우선 글 목록 뷰에 필요한 파이썬 모듈들을 임포트(import) 한다.

```python
from django.shortcuts import render # 장고 View 렌더러 모듈
from datetime import datetime       # 날짜시간 모듈
import markdown	                    # 마크다운 HTML 변환 모듈
import requests                     # 서버 API 요청 모듈
import json                         # json 파싱 모듈
```
해당 모듈에 대한 설명은 간략하게 주석(#)을 달아놓았다.

<br>마크다운 문서를 HTML로 변환하기 위한 모듈인 `Markdown`객체를 생성하여 `md` 변수에 담는다. 나는 마크다운 문서가 HTML로 잘 변환되길 바라면서 확장 기능 두개를 같이 포함하여 `Markdown`객체를 생성하였다.

```python
md = markdown.Markdown([
  'markdown.extensions.extra', 
  'markdown.extensions.codehilite'
])
```

여기서 사용한 Markdown의 확장 기능을 설명하면, `'markdown.extensions.extra'`는 마크다운의 확장 문법을 파싱하는데 도움을 준다. 그리고 `'markdown.extensions.codehilite'` 는 **Syntax highlighting**를 적용하는데 매우 유용하다. **Syntax highlighting**가 궁금하신 분은 https://highlightjs.org를 방문해보면 무슨 뜻인지 이해될 것이다.

<br>다음 라인에는 `parse_time` 함수를 구현한다. `parse_time` 함수는 **날짜 텍스트**를 파싱하는데 사용할 것이다. 참고로 파이썬에서 **`def`**로 시작하면 무조건 함수라고 보면 된다.

```python
def parse_time(date):
    return datetime.strptime(date, '％Y-％m-％dT％H:％M:％S')
```

<br>
스팀잇 API서버에서 글을 가져오기 위해 `URL`과 `USERNAME`를 변수를 정의하자. **`USERNAME`** 변수에는 본인의 스팀잇 아이디를 입력한다. 하지만 제 블로그를 만들어 주실 분은 **‘anpigon’**을 그대로 입력해도 좋다.

```
URL = 'https://api.steemit.com' # 스팀잇 API URL 주소
USERNAME = 'anpigon'            # 본인의 스팀잇 아이디
```

<br>
이제 제일 중요한 메인 함수인 `post_list` 함수를 구현한다. `post_list` 함수는 **내 스팀잇 글을 가져와서 화면에 출력**할 것이다. 아래 코드 내용을 복사&붙여넣기 한다.

```python
# 스팀잇 글 목록 가져오기
def post_list(request, limit=20):
  
    # 스팀잇 API 요청하여 글을 가져온다.
    data = '''｛
        "jsonrpc": "2.0",
        "method": "follow_api.get_blog",
        "params": ｛"account": "％s", "start_entry_id": ％i, "limit": ％i｝,
        "id": 1
    ｝''' ％ (USERNAME, 0, limit)
    response = requests.post(URL, data=data)

    # 스팀잇 글 목록을 담을 변수
    posts = [] 
    
    # 응답이 성공이라면 다음 로직을 진행한다.
    if response.status_code == 200: 
        # JSON 텍스트를 파싱한다.
        data = json.loads(response.text) 
				
        # 파싱한 JSON 데이터에서 blog 정보를 꺼내온다.
        blogs = data['result']['blog']
        
        # 반복문을 돌면서 필요한 정보를 받아오자.
        for blog in blogs: 
            blog = blog['comment']

            # 마크다운을 HTML로 변환
            html = md.convert(blog['body']) 
            post = ｛
                'title': blog['title'],       # 제목
                'author': blog['author'],     # 작성자
                'permlink': blog['permlink'], # 고유식별ID
                'created': parse_time(blog['created']), # 작성일
                'body': html[:200],    # 본문내용 200글자로 자르기
            ｝
            posts.append(post)
    
    # 템플릿에 데이터 전달
    return render(request, 'blog/post_list.html', ｛'posts': posts｝)
```

위 코드 내용을 설명하면 `post_list` 함수는 스팀잇 API 서버에서 게시글을 가져와 화면에 출력한다. 한 번에 가져와서 보여줄 글 수는 `limit=20`으로 설정했다. `md.convert()` 함수는 마크다운으로 작성된 텍스트를 HTML로 변환해준다. 그리고 목록 페이지에는 본문의 전체 내용이 필요 없기 때문에 `html[:200]`를 사용하여 본문 내용을 200 글자로 잘랐다. 마지막으로 작성일은 앞에서 구현한 `parse_time` 함수를 이용하여 날짜로 변환하였다. 참고로 위 코드 내용을 이해하지 못해서 괜찮다.



<br><hr><br>



# 디자인 템플릿 적용하기

<br>디자인 템플릿 파일을 사용하기 위해서는 템플릿 파일 경로를 설정해야 한다. `web/web/settings.py` 파일을 찾아서 편집한다. 57번 라인의 **DIRS**에 `os.path.join(BASE_DIR, 'templates')`를 추가한다. 아래 화면을 참고하자.

![settings.py파일수정](https://imgur.com/5VkeTN7.png)

이렇게 설정하면 이제 템플릿 파일이 위치한 경로는 `/home/anpigon/web/templates`가 된다.


<br>`web/` 디렉토리에 `templates/blog` 디렉토리를 생성한다. `templates/blog` 디렉토리에 디자인 템플릿 html 파일을 생성할 것이다.

![templates/blog디렉토리생성](https://imgur.com/7OYNkOG.png)



<br>
## 기본 템플릿 html 생성

기본 템플릿은 모든 페이지에 확장되어 사용되는 템플릿이다. 앞으로 구현할 글 목록 페이지와 글 상세 페이지는 기본 템플릿을 베이스로 사용한다.  

 `web/templates/blog` 디렉토리에 `base.html` 파일을 생성한다. 그리고 `base.html` 파일에 아래 내용을 복사&붙여넣기 한다. 아래 코드는 **Clean Blog** 템플릿 파일을 장고에서 사용할 수 있게 수정하였다.

```html
｛％ load static ％｝
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Clean Blog - Start Bootstrap Theme</title>
    <link href="｛％ static 'vendor/bootstrap/css/bootstrap.min.css' ％｝" rel="stylesheet">
    <link href="｛％ static 'vendor/fontawesome-free/css/all.min.css' ％｝" rel="stylesheet" type="text/css">
    <link href='//fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href="｛％ static 'css/clean-blog.min.css' ％｝" rel="stylesheet">
  </head>
  <body>

    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="/">Start Bootstrap</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Sample Post</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    ｛％ block content ％｝
    ｛％ endblock ％｝

    <hr>

    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <ul class="list-inline text-center">
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-circle fa-stack-2x"></i>
                    <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
            <p class="copyright text-muted">Copyright &copy; Your Website 2018</p>
          </div>
        </div>
      </div>
    </footer>
    <script src="｛％ static 'vendor/jquery/jquery.min.js' ％｝"></script>
    <script src="｛％ static 'vendor/bootstrap/js/bootstrap.bundle.min.js' ％｝"></script>
    <script src="｛％ static 'js/clean-blog.min.js' ％｝"></script>
  </body>
</html>
```

위 내용 중에서 중간쯤을 살펴보면 `｛％ block content ％｝ ｛％ endblock ％｝` 코드가 있다. 이 `｛％ block ％｝` 영역은 `base.html`을 확장하여 다른 템플릿에 사용할 수 있게 구멍을 뚫어 놓은 거라고 보면 된다. 참고로 `｛％ ％｝`은 장고에서 사용할 수 있는 템플릿 태그라고 한다.


<br>
## 블로그 글 목록 템플릿 html 생성

이제 실제로 글 목록을 보여줄 템플릿 html를 만들자. 템플릿 디렉토리 `templates/blog`에 `post_list.html` 파일을 신규 생성한다. 그리고 `post_list.html` 파일에 아래 내용을 복사&붙여넣기 한다.

```html
｛％ extends 'blog/base.html' ％｝

｛％ load static ％｝

｛％ block content ％｝
<header class="masthead" style="background-image: url(｛％ static 'img/home-bg.jpg' ％｝)">
  <div class="overlay"></div>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="site-heading">
          <h1>Clean Blog</h1>
          <span class="subheading">A Blog Theme by Start Bootstrap</span>
        </div>
      </div>
    </div>
  </div>
</header>

<div class="container">
  <div class="row">
    <div class="col-lg-8 col-md-10 mx-auto">

      ｛％ for post in posts ％｝
          <div class="post-preview">
            <a href="#">
              <h2 class="post-title">
                ｛｛ post.title ｝｝
              </h2>
              <h3 class="post-subtitle">
                ｛｛ post.body|striptags|truncatechars:50 ｝｝
              </h3>
            </a>
            <p class="post-meta">Posted by
              <a href="#">｛｛ post.author ｝｝</a>
              on ｛｛ post.created ｝｝</p>
          </div>
          <hr>
      ｛％ endfor ％｝

      <div class="clearfix">
        <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
      </div>
    </div>
  </div>
</div>
｛％ endblock ％｝
```
위 코드에서 `｛％ extends 'blog/base.html' ％｝` 는 `blog/base.html` 템플릿을 확장해서 사용하겠다는 선언이다. 그리고 `｛％ block content ％｝`와 `｛％ endblock ％｝` 사이에 있는 코드 내용이 위에서 설명한 기본 템플릿에 뚫어놓은 구멍인 `｛％ block content ％｝ ｛％ endblock ％｝` 영역에 들어갈 것이다.

그리고 `｛｛ post.body|striptags|truncatechars:50 ｝｝`코드에서 사용한 `striptags` 필터는 HTML태그를 제거해준다. 그리고 `truncatechars` 필터는 문자열을 원하는 길이(50)로 잘라낸 다음 끝에 **…** 을 붙여준다.

<br>내용이 너무 길어져서 이번 시간은 여기까지~~~

<br><hr><br>

이제 내 블로그 주소로 들어가면 아래와 비슷한 화면을 볼 수 있다.

http://anpigon.pythonanywhere.com

![](https://imgur.com/ok0EMcb.png)

여기까지 성공하셨다면 축하합니다.

![](https://media.giphy.com/media/1PMVNNKVIL8Ig/giphy.gif)

___

`kr-dev`에 개발 관련 글을 올리는 뉴비분들은 제가 보팅해드립니다. 저에게 보팅을 약 2000번 정도 받으면 원활한 활동에 필요하다는 100SP를 모을 수 있을 거예요. 그렇게 되려면 글을 2000개는 쓰셔야겠네요.🙊

여기까지 읽어주셔서 감사합니다.
<br>

___


<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />이 저작물은 <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.





