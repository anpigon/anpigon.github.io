---
title: '나만의 스팀잇 블로그 만들기 #1'
tags:
  - kr
  - kr-dev
  - jjangjjangman
  - interesteem
  - kr-newbie
author: anpigon
date: 2018-10-01 21:48:12
---

안녕하세요. @anpigon입니다.

이번에는 장고(Django)를 사용하여 **<q>나만의 스팀잇 블로그 만들기</q>**를 진행해 볼까 합니다. 장고는 파이썬 웹 어플래케이션 프레임워크입니다. 이번 포스트를 작성하기 위해서 [장고 걸스 튜토리얼](https://tutorial.djangogirls.org/ko/)을 보고 공부하였습니다. 

이 시리즈는 개발 지식이 전혀 없는 분들도 쉽게 따라 할 수 있도록 진행할게요. 그리고 **Pythonanywhere**에서 개발과 배포를 모두 진행하기 때문에 Pythonanywhere 회원가입이 필요합니다.

<br>그럼 이제 시작합니다~!

<hr>

https://imgur.com/T86bXj7.png

<hr><br>

# Pythonanywhere 회원가입 하기

<br>**Pythonanywhere**를 이용하면 파이썬으로 만든 웹사이트를 무료로 호스팅 할 수 있다. 단, 무료로 계속 사용하려면 3개월마다 로그인하여 연장 신청을 해야 한다. 

![pythonanywhere](https://files.steempeak.com/file/steempeak/anpigon/xDNjUFfH-2018-10-0100.19.24.png)

* **사이트 주소** : [www.pythonanywhere.com](https://www.pythonanywhere.com)

pythonanywhere에 들어가서 회원가입부터 하자. 메인 페이지 상단에 있는 ***Pricing & signup*** 를 클릭하면 회원가입 페이지로 이동한다.

![Create a Beginner account](https://files.steempeak.com/file/steempeak/anpigon/xOqwHkUE-2018-10-0100.49.16.png)

무료 계정인 **Beginner**을 사용하기 위해서 ***Create a Beginner account*** 를 선택한다.

그리고 회원 가입할 때 입력하는 **username**은 나중에 블로그 주소의 일부가 된다. 예를 들어 username이 anpigon이면 블로그 주소는 `anpigon.pythonanywhere.com` 이 된다. 아래 화면에서 Username에는 주소에 포함하고 싶은 이름을 입력한다.

![회원가입화면](https://imgur.com/whIFI0c.png)

<br><hr><br>

# Web 생성하기

<br>상단메뉴에서 ***Web*** 을 클릭하여 Web 생성 페이지로 이동한다. 그리고 페이지 왼쪽에 보이는 ***Add a new web app*** 을 클릭한다. 아래 화면에서 **Project Name**에 입력하는 값은 앱 디렉토리의 경로가 된다. 예를 들어 **username**이 *anpigon*이고 **project name**이 *web*이면 디렉토리 경로는 `/home/anpigon/web/`이 된다.

![Project Name](https://files.steempeak.com/file/steempeak/anpigon/OT4vOsZU-2018-10-0100.23.58.png)

다음 화면에서 파이썬 버전 **Python 3.7 (Django 2.1)**을 선택한다.

![Python Version](https://files.steempeak.com/file/steempeak/anpigon/lOVlIB0n-2018-10-0100.23.44.png)

그리고 웹 프레임워크는 **Django**를 선택한다.

![Web Framework](https://files.steempeak.com/file/steempeak/anpigon/hpiqah6t-2018-10-0100.23.34.png)

web 생성이 완료되면 아래 화면이 나타난다. 화면에 보이는 URL 주소를 클릭해보자.

![생성 완료](https://files.steempeak.com/file/steempeak/anpigon/dWrIPt70-2018-10-0100.29.12.png)

브라우저에 아래 화면이 보인다면 web 생성에 성공한 것이다.

![화면](https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/anpigon/fTXDC2Lt-2018-10-0101.00.45.png)

<br><hr><br>

# 블로그 디자인 테마 업로드하기

<br>여기서는 초보자가 다루기 쉬운 [부트스트랩(bootstrap) UI 프레임워크](http://bootstrapk.com/)를 사용하였다. 부트스트랩은 무료이며 부트스트랩 기반으로 제공되는 무료 테마가 많이 있다. 

우리는 [startbootstrap](https://startbootstrap.com/template-categories/blogs/)에서 제공하는 **Clean Blog 테마**를 사용할 것이다. 우선 Clean Blog 테마 파일을 다운로드한다.


![startbootstrap](https://steemitimages.com/0x0/https://files.steempeak.com/file/steempeak/anpigon/L9i3gbMB-2018-10-0100.32.28.png)


다시 pythonanywhere로 돌아와서 **Files** 페이지로 이동하자. 그리고 방금 다운로드 받은 파일 `startbootstrap-clean-blog-gh-pages.zip`을 업로드 한다. 업로드 경로는 `/home/anpigon/web/static`이다. 

참고로 디렉토리 경로는 사용자마다 다르므로, 자신이 생성한 앱 디렉토리를 확인하고 업로드해야한다.

![파일업로드](https://files.steempeak.com/file/steempeak/anpigon/NTmIa0nt-2018-10-0101.21.32.png)

업로드된 zip 파일의 압축을 풀기 위해 **Console** 페이지로 이동한다. 그리고 **Start a new console**에 보이는 **Bash**를 클릭하자.

![콘솔창 생성](https://files.steempeak.com/file/steempeak/anpigon/w4Dk6HeV-2018-10-0101.22.04.png)

그리고 나면 아래와 같은 콘솔창(console)의 검은 화면이 보일 것이다.

![콘솔창](https://files.steempeak.com/file/steempeak/anpigon/dDL5i8G2-2018-10-0101.22.32.png)

압축을 풀기 위해 콘솔창에 아래 명령어를 입력한다. 여기서는 프로젝트명이 web이라서 `cd web/static`를 입력하였다.

```bash
$ cd web/static
$ unzip startbootstrap-clean-blog-gh-pages.zip
$ mv startbootstrap-clean-blog-gh-pages/* ./
$ rm -r startbootstrap-clean-blog-gh-pages*
```

<br>압축을 풀고 나서 다시 **Files 페이지**로 가보면 zip 파일의 압축이 풀려있는 것을 확인 할 수 있다.

![](https://files.steempeak.com/file/steempeak/anpigon/NOOMUVxV-2018-10-0101.35.54.png)

업로드한 테마를 확인하기 위해서 브라우저에 아래 URL을 입력해보자. 접속 URL은 사용자마다 다르므로, 본인의 URL로 접속하길 바란다.

* **URL**: http://anpigon.pythonanywhere.com/static/index.html

<br>아래와 같은 화면이 보인다면 성공이다.

![](https://files.steempeak.com/file/steempeak/anpigon/7mHwZnHT-2018-10-0101.37.22.png)

<br><hr><br>

다음 시간에는 나의 스팀잇 글 목록을 보여주는 페이지를 개발할 예정입니다. 반응이 좋으면 빠른 시일내에 다음 강좌를 올리도록 하겠습니다.

그리고 `kr-dev`에 개발 관련 글을 올리는 뉴비분들은 제가 꾸준히 보팅해드리도록 하겠습니다. 저에게 보팅을 약 2000번 정도 받으면 원활한 활동에 필요하다는 100SP를 모을 수 있을 거에요.ㅋ

여기까지 읽어주셔서 감사합니다.
<br>

___


<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />이 저작물은 <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스</a>에 따라 이용할 수 있습니다.