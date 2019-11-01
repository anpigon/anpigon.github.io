---
title: '나만의 스팀잇 블로그 만들기 #3 - 페이징 구현'
tags:
  
  
  
  
  
author: anpigon
date: 2018-10-03 23:16:36
---

안녕하세요. @anpigon입니다.

**<q>나만의 스팀잇 블로그 만들기</q>** 세 번째 강좌입니다. 이 시리즈는 개발 지식이 전혀 없는 분들도 쉽게 따라 할 수 있습니다.

그리고 사용한 소스는 GitHub 저장소에 올려놓았습니다. 

* [https://github.com/anpigon/steemit-django-blog](https://github.com/anpigon/steemit-django-blog/)


___
###### 이전 글
* [나만의 스팀잇 블로그 만들기 #1](https://steemit.com/kr/@anpigon/python-steemit-blog-1)
* [나만의 스팀잇 블로그 만들기 #2](https://steemit.com/kr/@anpigon/python-steemit-blog-2)
___


https://imgur.com/T86bXj7.png

<hr><br>

# 글 목록 페이징 구현하기

<br>이번에는 다음 페이지의 글을 가져오는 페이징을 구현할 것이다. 다음 페이지를 위한 버튼은 블로그 목록 페이지 맨 하단에 있다. 못 찾는 분들이 계실까봐 아래 화면에서 붉은 박스로 표시하였다.

![](https://imgur.com/uEWroKd.png)

<br>

## 글 목록에서 다음 페이지 버튼 수정하기

위 화면에 보이는 **"OLDER POSTS"** 버튼을 수정할 것이다. `templates/blog/post_list.html` 파일을 열어서 아래와 같이 수정한다.

```html
<div class="clearfix">
  ｛％ if next ％｝
  	<a class="btn btn-primary float-right" href="?next=｛｛ next ｝｝">Older Posts &rarr;</a>
  ｛％ endif ％｝
</div>
```
`｛％ if next ％｝ ｛％ endif ％｝` 를 사용하여 다음 페이지의 글이 있을 때만 버튼이 보이도록 하였다. 그리고 `href="?next=｛｛ next ｝｝"` 가 다음 페이지로 이동하게 해주는 핵심 코드이다. 이제 버튼을 클릭하면 **url**을 통해 `next` 값을 서버에 넘겨줄 것이다.

코드의 어디 부분을 수정하는지 잘 모르겠으면 아래 화면을 참고하자.

![](https://imgur.com/vfD4B4E.png)


<br>

## 페이징 처리 구현하기

방금 수정한 버튼이 동작하게 하려면 페이징 처리를 구현해야 한다. `web/blog/`  디렉토리에서 `views.py` 파일을 찾아 클릭하여 편집화면으로 이동한다.

![](https://imgur.com/ic9SzKg.png)

페이징을 구현하려면 `def post_list()` 함수를 수정해야 한다. 다음 설명을 잘 읽고 수정해보자. 어려울 것 같지만 막상 해보면 전혀 어렵지 않다.

<br>우리는 **OLDER POSTS** 버튼을 클릭했을 때 url을 통해 `next` 값을 넘겨주도록 수정하였다. 이제 넘어온 url에서 `next` 값을 조회해 보자. `request.GET.get()`를 함수를 사용하면 `next` 값을 조회할 수 있다. 

```python
def post_list(request, limit=20):
  
    # request url에서 next 파라미터값을 가져온다.
    start_entry_id = int(request.GET.get('next', '0'))
```

<br>
다음은 스팀잇 API 서버에서 글을 가져오는 코드를 수정한다. 이전에 `(USERNAME, 0, limit)` 로 넘겨주던 인자값을 `(USERNAME, start_entry_id, limit + 1)`로 수정하였다. 추가 설명하면, `start_entry_id` 인자값을 추가하고 `limit`를 +1를 하였다. `limit + 1`를 한 이유는 마지막 데이터에서 다음 페이지의 `entry_id`를 가져오기 위해서이다.

```python
    # 스팀잇에서 게시글 가져오기
    data = '''｛
        "jsonrpc": "2.0",
        "method": "follow_api.get_blog",
        "params": ｛"account": "％s", "start_entry_id": ％i, "limit": ％i｝,
        "id": 1
    ｝''' ％ (USERNAME, start_entry_id, limit + 1)
    response = requests.post(URL, data=data)
```

<br>
그리고 `for blog in blogs:` 코드 바로 아래에 `entry_id` 값을 조회하는 코드를 추가한다. `entry_id` 값은 다음 페이지를 조회하기 위한 `next` 값으로 사용된다.

```python
        for blog in blogs:
            entry_id = blog['entry_id']
            blog = blog['comment']
```

<br>
가져온 글의 수가 `limit`보다 작으면 `entry_id` 값을 0으로 초기화한다. 가져온 글의 수가 `limit`보다 작다는 것은 다음 페이지에서 가져올 수 있는 글이 없다는 의미이다.

```python
    if len(posts) < limit:
        entry_id = 0
```

<br>
마지막으로 `posts`를 `limit` 길이로 자른다. 왜냐하면 `posts`의 마지막 데이터는 페이징 처리를 위해 `entry_id` 값을 읽어오기 위한 데이터라서 필요 없기 때문이다. 그리고 템플릿 html 으로 전달하는 인자값에 `'next': entry_id` 를 추가한다.

```python
    posts = posts[:limit]
    return render(request, 'blog/post_list.html', ｛'posts': posts, 'next': entry_id ｝)
```

<br>
아래에 `post_list` 함수의 전체 코드를 첨부하였으니 참고하자.


```python
def post_list(request, limit=20):

    start_entry_id = int(request.GET.get('next', '0'))

    data = '''｛
        "jsonrpc": "2.0",
        "method": "follow_api.get_blog",
        "params": ｛"account": "％s", "start_entry_id": ％i, "limit": ％i｝,
        "id": 1
    ｝''' ％ (USERNAME, start_entry_id, limit + 1)
    response = requests.post(URL, data=data)

    posts = [] # 게시글 목록
    if response.status_code == 200: # 응답이 성공이라면
        data = json.loads(response.text) # JSON 파싱

        blogs = data['result']['blog']
        for blog in blogs: # 리스트에서 필요한 데이터만 가져오기
            entry_id = blog['entry_id']
            blog = blog['comment']
            html = md.convert(blog['body']) 
            post = ｛
                'title': blog['title'],
                'author': blog['author'],
                'permlink': blog['permlink'],
                'created': parse_time(blog['created']),
                'body': html[:200], # 길이 200으로 자르기
            ｝
            posts.append(post)

    if len(posts) < limit:
        entry_id = 0
    posts = posts[:limit]

    return render(request, 'blog/post_list.html', ｛'posts': posts, 'next': entry_id ｝)
```

<br>


___

이번 시리즈는 구현하는 시간보다 스팀잇에 글 쓰는 시간이 더 오래 걸리는 것 같네요. ㅎㅎ 따라 하다가 모르는 부분이 있으면 댓글에 질문 남겨주세요. 그리고 `kr-dev` 태그에 개발관련 글을 올리면 제가 보팅해드립니다.

여기까지 읽어주셔서 감사합니다.

https://media.giphy.com/media/h5AHEcNMhn7u8/giphy.gif
<sup>스팀잇에는 **밥 로스** 아저씨를 아는 분들이 많이 있을까요?</sup>

___


<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />이 저작물은 <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.





