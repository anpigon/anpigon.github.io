# Blog
anpigon's Blog

# Hexo 설치 및 초기화

```bash
$ npm install hexo-cli -g
$ hexo init 폴더명
$ cd 폴더명
$ npm install
```

# Hexo 블로그를 Local에서 구동

```bash
$ hexo server
```

# 새 글 작성

```bash
hexo new "글 제목"
```

## 글 최상단에 위치 해야 하는 항목
```
---
title: 글 제목
date: 2018-01-01 11:31:36
tags: ["태그"]
cover: post 커버 이미지
subtitle: "글 부제목"
---
```

# Github에 배포

먼저 hexo-deployer-git을 설치합니다.

```
$ npm install hexo-deployer-git --save
```

배포
```
hexo clean
hexo deploy -g
```
