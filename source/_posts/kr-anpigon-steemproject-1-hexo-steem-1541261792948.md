---
title: 'Steem Project 소개 #1 - Hexo Steem 개인 블로그 만들기'
tags:
  - kr
  - kr-dev
  - steemit
  - hexo
  - project
  - busy
author: anpigon
date: 2018-11-04 01:16:33
---

안녕하세요. @anpigon 입니다.

@jisoooh0202님이 작성하신 ["List of All Steem Based Projects / 스팀의 모든 프로젝트 리스트"](https://steemit.com/steem/@jisoooh0202/list-of-all-steem-based-projects-kr-en)에는 스팀잇 프로젝트가 모두 정리되어있습니다. 스팀잇 프로젝트를 살펴보다가 마음에 드는 것이 있어서 소개합니다. 예전에 @jisoooh0202님의 *“스팀 블록체인 위의 프로젝트 소개“* 시리즈 글을 즐겨 봤었는데, 지금은 연재를 중단하신 것 같습니다. ㅋ

<br><hr><center><h1>**Hexo Steem** 프로젝트를 소개합니다.</h1></center><hr><br>

**Hexo Steem**은 Hexo 블로그의 애드온으로 Hexo 기반으로 생성된 블로그에 스팀잇의 글을 자동으로 게시 할 수 있습니다. **Hexo Steem** 만드신 **skzap님의 블로그**에 접속해보고는 바로 완전 마음에 들었습니다. 

* skzap님의 블로그: https://skzap.github.io/

![스크린샷 20181104 00.18.30.png](https://files.steempeak.com/file/steempeak/anpigon/ef2A2xTS-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-11-042000.18.30.png)

<br>**Hexo Steem** 프로젝트는 아래와 같이 steemprojects 페이지에 소개되어 있습니다. 

* https://steemprojects.com/projects/p/hexo-steem/

![1](https://cdn.steemitimages.com/DQmaEMiVea21haLEpr1CdfL8BaZDAZ89pFErm8FMChBHjP4/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202018-11-02％2000.53.10.png)

<br><center><b>* * *</b></center><br>

# Hexo란?

---

**Hexo**는 마크다운(Markdown) 문서를 page로 변환하여 **개인 블로그**를 만들어 주는 **Node.JS** 프레임워크다. 

Hexo를 이용하면 개인 블로그를 [Github Pages](https://pages.github.com)나 [heroku](https://www.heroku.com), [firebase](https://firebase.google.com/) 등 무료 서버에서 쉽게 운영할 수 있다. 그중에서 **Github**는 트래픽 무제한 무료이기 때문에 개인 블로그 서버로 많이 사용되고 있다. 그리고 Hexo와 비슷한 프레임워크로는 [지킬(jekyll)](https://jekyllrb-ko.github.io/)도 있다. 하지만 jekyll은 개발언어가 루비(Ruby)라서 루비를 모르면 다루기가 어렵다.

참고로, Hexo를 사용하기 위해서는 기본적으로 [Node.js](https://nodejs.org/ko/) 와 [git](https://git-scm.com/) 이 설치되어 있어야 한다. 설치가 안 되어 있다면 각 홈페이지를 참고하여 설치하길 바란다.

* Hexo 홈페이지: [https://hexo.io](https://hexo.io/ko/)
* Node.js 홈페이지: [https://nodejs.org](https://nodejs.org/ko/)
* git 홈페이지: [https://git-scm.com](https://git-scm.com/)

<br><center>─</center><br>

# Hexo 설치 및 초기화

---

우선 Hexo 빌드 도구를 설치하고 `blog` 폴더를 생성한다. `blog` 폴더에 개인 블로그를 생성할 것이다.

```bash
$ npm install -g hexo-cli
$ hexo init blog
$ cd blog
$ npm install
```

> 각 OS별 자세한 설치 방법은 [hexo 홈페이지](https://hexo.io/ko/docs/index.html)를 참고하세요.

<br>blog 폴더를 열어보면 아래와 같은 폴더 구조가 생성되어 있다.

```
blog 
 ├── _config.yml
 ├── package.json
 ├── scaffolds
 ├── source
 |   ├── _drafts
 |   └── _posts
 └── themes
     └── landscape
```

여기서 `_config.yml` 파일은 블로그 설정 파일이다. 이 글에서는 `_config.yml`의 기본적인 설정만 설명한다.

> _config.yml 설정에 대한 자세한 설명은 [Hexo configuration 문서](https://hexo.io/ko/docs/configuration.html)를 참고하세요.

<br><center>─</center><br>

# hexo-steem 모듈 설치

---

그다음에는 [hexo-steem](https://www.npmjs.com/package/hexo-steem) 모듈을 설치한다. npm에서 제공하고 있는 hexo-steem 모듈은 2년전 버전으로 더이상 업데이트가 없다. 사용해보니 문제가 있어 모듈을 직접 수정하였다. 아래와 같이 github url에서 수정된 hexo-steem 모듈을 설치한다. 지금도 보이지 않는 몇 가지 문제가 있다. 시간이 나면 추후에 수정할 생각이다.

```bash
$ npm install --save git+https://github.com/anpigon/hexo-steem.git
```

<blockquote><sup>[hexo-steem 수정 내용]<br>
- steemjs 모듈을 `^0.3.31` 에서 `^0.7.2`로 업그레이드<br>
- 마크다운 변환 중 발생하는 jade 프레임워크 예약어(|％｛｝) 관련 오류 처리</sup></blockquote>

<br>그리고 `_config.yml`  설정 파일을 열어 `steem_users` 를 추가한다. `steem_users`에는 자신의 스팀잇 아이디를 입력한다. 스팀잇 아이디는 아래와 같이 여러개 입력 가능하다. 이런식으로 여러 아이디를 하나의 블로그로 운영할수 있을것 같다.

```
steem_users:
  - anpigon
  - anpigon2
  - anpigon3
```

<br><center>─</center><br>

# Hexo 테마 바꾸기

---

hexo는 기본적으로 *landscape* 테마가 설치 되어 있다. 테마를 변경하고 싶으면 아래 사이트에서 원하는 테마를 다운로드 받아 설치하면 된다.

* Hexo Theme: https://hexo.io/themes/

![hexo.io/themes](https://cdn.steemitimages.com/DQmYyhCYdSUmgvPmKHtUqsYmRBg9tJcKrA8qkofi6Yy7Z1g/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202018-11-02％2001.04.14.png)

<br>나는 skzap님이 사용한 *maupassant* 테마를 설치하였다. [maupassant 사이트](https://github.com/tufu9441/maupassant-hexo)에서 제공하는 설치 방법은 아래와 같다.

```bash
$ git clone https://github.com/tufu9441/maupassant-hexo.git themes/maupassant
$ npm install hexo-renderer-pug --save
$ npm install hexo-renderer-sass --save
```

<br>
설치가 완료되면 `_config.yml`에서  `theme`을 *maupassant*로 수정한다.

```
## Themes: https://hexo.io/themes/
theme: maupassant
```

> 참고로 [이전글](https://steemit.com/kr/@anpigon/python-steemit-blog-1)에서 소개했던 [CleanBlog](https://github.com/klugjo/hexo-theme-clean-blog)도 많이 사용하는 무료 테마 중 하나이다.

<br><center>─</center><br>

# Hexo 블로그를 로컬에서 실행하기

---

아래 명령어를 실행하면 로컬에서 블로그 확인이 가능하다. 

```bash
$ hexo server
```

<br>서버가 구동되면 http://localhost:4000 에 접속하여 블로그를 확인할 수 있다. 로컬에서 테스트해보고 github에 배포하는 것을 추천한다.

<br><center>─</center><br>

# Github에 블로그 배포하기

---

**Github Pages** 서비스를 이용하면 GitHub에 개인 블로그를 생성할 수 있다. GitHub에서 리포지터리(repository)를 생성할때, Repository name에 `username.github.com`를 입력한다. 그럼 https://username.github.com에 page가 만들어지게 된다. 자세히 설명하면 내용이 길어지므로 page 생성방법은 [Github Pages 홈페이지](https://pages.github.com/)를 참고한다.

<br>

#### hexo-deployer-git 플러그인 설치

hexo 블로그를 github에 배포할 수 있는 플러그인을 설치한다.

```bash
$ npm install hexo-deployer-git --save
```

<br>

#### github 배포 설정하기

`_config.yml` 파일을 열어 `deploy`에 본인의 **github url**을 입력한다.

```properties
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: https://github.com/anpigon/anpigon.github.io.git 
  branch: master
```

<br>

#### hexo 페이지를 빌드하여 github에 배포하기

아래 명령어를 입력하여 블로그를 github에 배포한다.

```bash
$ hexo clean
$ hexo generate
$ hexo deploy
```

* `hexo clean`: 캐시 파일(db.json)과 생성된 파일(public)을 삭제한다.
* `hexo generate`: 정적 파일(html, css, js)을 생성한다.
* `hexo deploy`: 블로그를 배포(deploy) 한다.

<br>

또는, 아래 명령 옵션으로 **generate**와 **deploy**를 동시에 실행할 수도 있다.

```bash
$ hexo deploy --g
```

> 참고로 github에 배포하고 반영되는데 1~3분 정도의 시간이 소요된다.

<br><center>─</center><br>

# about 페이지 생성하기

---

블로그를 생성하고 보니 about 페이지가 없다. 그래서 아래와 같이 about 페이지를 생성하였다.

```bash
$ hexo new page about
```

<br>위의 명령어를 실행하고 나면 `sources/about/index.md` 파일이 생성된다. 해당 파일의 내용은 각자 수정하기 바란다. 
> 참고로 블로그에 RSS 기능도 빠져있는데 이 기능을 구현하려면 연구를 해봐야 할 것 같다.

<br><center>─</center><br>

아래는 Hexo Steem로 생성한 개인 블로그입니다.

* 안피곤 블로그: [https://anpigon.github.io/blog](https://anpigon.github.io/blog/)

![https://anpigon.github.io/blog](https://files.steempeak.com/file/steempeak/anpigon/9nzmfJio-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202018-11-042001.03.45.png)



<br>여기까지 읽어주셔서 감사합니다.
<br>


---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
[![dclick-imagead](https://s3.ap-northeast-2.amazonaws.com/dclick/image/dclick/1540980285836.jpg)](https://kr-used.github.io/)