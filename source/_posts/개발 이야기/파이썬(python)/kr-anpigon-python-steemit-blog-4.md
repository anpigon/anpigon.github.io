---
title: 'python steemit blog 나만의 스팀잇 블로그 만들기 #4 - 글 상세'
tags:
  - kr
  - kr-dev
  - jjangjjangman
  - interesteem
  - busy
author: anpigon
date: 2018-10-04 22:17:27
---

안녕하세요. @anpigon입니다.

이제 **<q>나만의 스팀잇 블로그 만들기</q>**의 마지막 강좌입니다. 이 시리즈는 개발 지식이 전혀 없는 분들도 쉽게 따라 할 수 있습니다.

이 강좌에서 사용한 소스는 GitHub 저장소에 올려놓았습니다. 
* [https://github.com/anpigon/steemit-django-blog](https://github.com/anpigon/steemit-django-blog/)

<br>
___
###### 이전 글
* [나만의 스팀잇 블로그 만들기 #1](https://steemit.com/kr/@anpigon/python-steemit-blog-1)
* [나만의 스팀잇 블로그 만들기 #2](https://steemit.com/kr/@anpigon/python-steemit-blog-2)
* [나만의 스팀잇 블로그 만들기 #3](https://steemit.com/kr/@anpigon/python-steemit-blog-3)
___


https://imgur.com/T86bXj7.png

<hr><br>


이번 시간에는 글 목록을 클릭했을 때 글 상세 화면으로 이동하도록 구현해보자. 글 상세 화면까지 구현하고 나면 멋짐 블로그가 완성될 것이다.

<br>
# 블로그 글 상세 URL 추가하기

<br>**pythonanywhere**의 **Files** 화면에서 `web/blog/` 디렉토리를 찾아 들어간다. 그리고 `urls.py` 파일을 클릭하여 편집 화면으로 이동해서 아래와 같이 수정한다.
```python
urlpatterns = [
    re_path('^$', views.post_list, name='post_list'),
    # re_path('^@(?P<author>[\w-]+)/(?P<permlink>[\w-]+)/$', views.post_detail, name='post_detail')
    re_path('^@(?P<author>[\._\w-]+)/(?P<permlink>[\._\w-]+)/$', views.post_detail, name='post_detail')
]
```
`@author/permlink` URL에 글 상세를 보여주는 뷰(View) `views.post_detail`를 맵핑하였다. `@author/permlink` URL은 정규식 `'^@(?P<author>[\w-]+)/(?P<permlink>[\w-]+)/$'` 을 사용하여 **author**와 **permlink**은 매개 변수(parameter)으로 받았다. **author**를 매개 변수로 받는 이유는 내 블로그에 리스팀한 글이 포함되어 있어서 일단 추가하였다.

잘 모르겠다면 아래 화면을 참고하자.

![](https://imgur.com/xvNZa3I.png)

<br>이제 글 목록에서 **글 상세 화면**으로 이동할 수 있는 링크를 연결해야 한다. `templates/blog/post_list.html` 템플릿 파일을 열고 `<a href="#">`로 되어 있는 코드를 아래와 같이 수정한다.

```
	<a href="/@｛｛ post.author ｝｝/｛｛ post.permlink ｝｝">
```

<br>수정하는 위치를 잘 모르겠으면 아래 화면을 참고한다.

![Imgur](https://imgur.com/deDatXw.png)

<br><hr><br>

# 블로그 글 상세 View 생성하기

`blog/views.py` 파일을 열고 `post_detail` 함수를 추가한다.

```python
def post_detail(request, author='', permlink=''):
    # 스팀잇에서 게시글 본문 가져오기
    data = '''｛
        "jsonrpc": "2.0",
        "method": "condenser_api.get_content",
        "params": ["％s", "％s"],
        "id": 1
    ｝''' ％(author, permlink)
    response = requests.post(URL, data=data)

    post = ｛｝
    if response.status_code == 200: # 응답이 성공이라면
        data = json.loads(response.text) # JSON 파싱
        post = data['result']
        # post['body'] = md.convert(post['body'])
        replaced = re.sub(r'(^https?://([a-zA-Z0-9][a-zA-Z0-9_-]+([.][a-zA-Z0-9][a-zA-Z0-9_-]+)｛1,2｝(/[a-zA-Z0-9][a-zA-Z0-9_-]*)+)[.](png|PNG|jpg|JPG|jpeg|JPEG|bmp|BMP|gif|GIF))', r'<img src="\1">', post['body'])
        post['body'] = md.convert(replaced)
        post['created'] = parse_time(post['created'])

    return render(request, 'blog/post_detail.html', ｛ 'post': post ｝)
```
> https://steemit.com/kr/@apmmh/re-anpigon-anpigon-re-apmmh-re-anpigon-anpigon-re-glory7-re-apmmh-re-anpigon-anpigon-coding-contest-20181010t070239125z 글을 참고하여 이미지URL을 이미지 태그로 치환하는 정규식을 추가하였습니다.

<br>아래 화면을 참고하자.

![](https://imgur.com/fK31oJg.png)

<br><hr><br>

# 블로그 글 상세 템플릿 html 생성

<br>`templates/blog/` 디렉토리에 `post_detail.html` 파일을 신규 생성한다.

![Imgur](https://i.imgur.com/XsrnKq3.png)

그리고 아래 코드를 복사&붙여넣기 하자.

```
｛％ extends 'blog/base.html' ％｝

｛％ load static ％｝

｛％ block content ％｝
    <header class="masthead" style="background-image: url(｛％ static 'img/post-bg.jpg' ％｝)">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="post-heading">
              <h1>｛｛ post.title ｝｝</h1>
              <span class="meta">Posted by
                <a href="#">｛｛ post.author ｝｝</a>
                ｛｛ post.created ｝｝</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <article>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            ｛％ autoescape off ％｝
                ｛｛ post.body ｝｝
            ｛％ endautoescape ％｝
          </div>
        </div>
      </div>
    </article>
｛％ endblock ％｝
```

<br>마지막으로 본문에 포함된 이미지 크기 조정을 위해 아래 스타일 CSS 코드를 추가하였다. `css.style` 파일을 만들어서 적용해도 되고, `post_detail.html` 파일에 적용해도 된다.

```css
<style>
article img ｛
    max-width: 100％;
｝
</style>
```

<br>여기까지 완료했으면 본인의 블로그에 가서 글 목록을 클릭했을 때 글 상세 화면으로 이동하는지 확인해보자.

<br><hr><br>

# 댓글 서비스(disqus)

<br>나는 스팀잇 사용자가 아닌 사람도 댓글을 쓸 수 있게 하기 위해서 Disqus 위젯을 사용하였다. [Disqus](https://disqus.com/)는 소셜 댓글 서비스이다. 쉽게 설명하면 구글, 페이스북, 트위터 서비스에 가입되어 있으면 회원가입 없이 바로 댓글을 쓸 수 있다. 참고로 한국 서비스 중에는 [라이브리(LiveRe)](https://livere.com/)가 있다.

본문 내용 하단에 Disqus 위젯을 삽입하면 이렇게 보여진다.

![Imgur](https://i.imgur.com/Rh2e90w.jpg)

<br>적용방법은 간단하게 설명하겠다. 우선 https://disqus.com에 회원가입을 한다. 가입이 완료되면 아래 화면에서 보이는 **Disqus Install 버튼**을 클릭한다.

![Imgur](https://i.imgur.com/hnFxoAa.jpg)

<br>사이트 플랫폼 선택 화면에서는 맨 아래로 내리면 "I don't see my platform listed, install manually with Universal Code" 버튼이 보인다. 이 버튼을 클릭한다.

![Imgur](https://i.imgur.com/coRBfM7.jpg)

<br>붉은 박스에 보이는 코드를 복사하여 내 블로그에 삽입하면 된다.

![Imgur](https://i.imgur.com/w8dbdoi.jpg)

<br>참고로 Disqus 삽입 위치는 `post_detail.html` 파일의 이 코드 바로 아래입니다.
```
｛％ autoescape off ％｝
  ｛｛ post.body ｝｝
｛％ endautoescape ％｝
```

<br><hr><br>

여기까지 성공적으로 따라오신 분들 모두 축하드립니다. 

오늘부터 파이썬 웹 개발자가 되셨습니다.

https://media.giphy.com/media/2UpzC3iPenf44/giphy.gif


<br>하다가 막히는 부분이 있으면 댓글에 질문 남겨주세요. 그리고 `kr-dev` 태그에 개발관련 글을 올리면 제가 보팅해드립니다.

여기까지 읽어주셔서 감사합니다.



___

<a href="http://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow noopener" title="This link will take you away from steemit.com"><img src="https://steemitimages.com/0x0/https://i.creativecommons.org/l/by-sa/4.0/88x31.png" alt="크리에이티브 커먼즈 라이선스"></a><br>이 저작물은 <a href="http://creativecommons.org/licenses/by-sa/4.0/" rel="nofollow noopener" title="This link will take you away from steemit.com">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.