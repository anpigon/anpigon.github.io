---
title: "🚀 리액트에서 ESlint + Prettier + Airbnb Style 한방에 셋팅하기"
author: anpigon
date: "2019-05-15T02:16:45Z"
permalink: "/whan/@anpigon/eslint-prettier-airbnb-style"
tags:
  - "whan"
  - "kr"
  - "kr-dev"
  - "busy"
  - "thegivingtree"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
<sup>*Design by &#64;&#105;mrahelk*</sup>
***

안녕하세요. 안피곤입니다.

협업으로 개발할때는 코딩 스타일과 코드 가독성이 매우 중요합니다. 이걸 좀더 편하게 할 수 있는 도구가 있어서 소개합니다. **ESLint**는 자바스크립트 문법을 검사해줍니다. 그리고 **Prettier**는 작성된 코드를 규칙에 따라 이쁘게 정리해줍니다.

제가 주로 사용하는 VSCode 에디터를 기준으로 설명합니다. 비슷한 다른 에디터도 설정 방식이 비슷할 것이라고 생각합니다. 

<br>VSCode를 실행하고 ESLint와 Prettier 익스텐션을 설치합니다.

<br>

# ESLint 설치하기

설치링크: [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory&fname=https％3A％2F％2Fk.kakaocdn.net％2Fdn％2FlG3Rd％2FbtqviHKpeTp％2FLBQprq0GvYtz2guakHfFsk％2Fimg.png)

# Prettier 설치하기

설치링크: [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory&fname=https％3A％2F％2Fk.kakaocdn.net％2Fdn％2FcaG2PE％2FbtqvgGyK72e％2FG5aW6xEkrOcY3rvDXYxbT1％2Fimg.png)

<br>
<br>

# 프로젝트에 적용하기

*복잡한 설정은 가라~!*  이게 바로 리액트의 매력입니다. ㅋ
ESLint와 Prettier의 복잡한 설정을 한방에 할 수 있는 멋진 쉘 스크립트가 있습니다. 개발자는 [Paulo Ramos](https://medium.com/@pauloramos64)입니다.

> 출처: [https://github.com/paulolramos/eslint-prettier-airbnb-react](https://github.com/paulolramos/eslint-prettier-airbnb-react)

<br>

프로젝트 루트 디렉토리에서 다음 명령을 수행합니다.

```
exec 3<&1;bash <&3 <(curl https://raw.githubusercontent.com/paulolramos/eslint-prettier-airbnb-react/master/eslint-prettier-config.sh 2> /dev/null)
```
> 스크립트가 bash 쉘입니다. 그래서 윈도우에서 설정하기 위해서는 [Ubuntu App](https://www.microsoft.com/ko-kr/p/ubuntu/9nblggh4msv6?activetab=pivot:overviewtab)가 필요할 것이라고 생각됩니다.

<br>

위 명령어를 실행하면 아래와 같은 화면이 출력됩니다.

![](https://cdn.steemitimages.com/DQmVSFeN6GZ6DNs3JXzZEMAP9JJH5u7qH3s2PvDwfvW9ktb/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-05-15％2000.37.06.png)

> 저는 패키지 매니저를 **yarn**을 선택하였습니다. 그리고 설정 파일 타입은 **.json**. 한 라인의 길이는 **80**.  후행 콤마 스타일은 **all**를 선택하였습니다. 본인의 코딩 스타일에 맞게 선택하시면 됩니다. **Trailing Comma**는 이해를 돕기 위해 잘 설명되어 있는 블로그를 소개합니다: https://heygyun.tistory.com/49

<br>

설치가 완료되면 `.eslintrc.json` 와 `.prettierrc.json` 파일이 생성됩니다. 그리고 `.prettierrc.json` 파일을 열어보면 다음 내용이 입력되어 있습니다.

```
｛
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all"
｝
```

<br>입력되어 있는 내용은 쉘 스크립트에서 우리가 선택한 옵션입니다.

> -   `printWidth`는 한 라인의 길이를 설정합니다. 가독성을 위한 권장 길이는 80자입니다.
> -   `singleQuote`는 문자열에 `'` 를 사용합니다.
> -   `trailingComma`는 배열 후행에 쉼표가 추가됩니다.

<br>저는 다음 옵션을 추가하였습니다.

```
  "useTabs": false,
  "tabWidth": 2,
  "semi": true,
```

> -   `useTabs`가 false이면 들여쓰기에 탭 대신에 스페이스를 사용합니다.
> -   `tabWidth` 는 들여쓰기 스페이스 공백 갯수입니다.
> -   `semi`는 코드 끝에 세미콜론`;`을 사용합니다.

<br>Prettier에는 더 많은 옵션이 있습니다. 더 자세한 내용은 [Prettier 공식 문서](https://prettier.io/docs/en/options.html) 를 참고하세요.

<br>

이제 F1를 누르고 `Format Documents`를 선택하면 코드가 깔끔해집니다. 단축키는 `Shift` + `Option/Alt` + `F` 입니다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory&fname=https％3A％2F％2Fk.kakaocdn.net％2Fdn％2Flsa0D％2FbtqvidixGs5％2FuZUKdgv8ZycywO1rTpuKQ0％2Fimg.png)

<br>
<br>

# 파일 저장시 자동 적용되게 하기

코드 정리를 자동으로 해놓으면 매우 편리합니다. 아래 설정 과정을 통해 파일 저장할 때 코드가 자동으로 정리되게 해보세요.

Settings에서 **JavaScript Format**를 검색합니다. 자바스크립트 기본 포맷터 기능을 비활성화합니다. 우리는 **Prettier**를 사용하기 때문에 필요가 없습니다.

![](https://cdn.steemitimages.com/DQmcr3NGFMmn9gUYNZgw4gbkC87RwnU2AfvPqF3KQvZyNdP/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-05-15％2000.01.11.png)

Settings에서 **Format On Save**을 검색합니다. Editor: Format On Save를 활성화합니다. 그럼 저장할때 코드를 자동 포멧팅 해줍니다.

![](https://cdn.steemitimages.com/DQme8CM7rxRD2MTsJMyzAckzMCy7WrMHY1EC8tkCSi74ysb/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-05-14％2023.52.56.png)

Settings에서 **Auto Fix On Save**을 검색합니다. Eslint: Auto Fix on Save를 활성화 합니다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory&fname=https％3A％2F％2Fk.kakaocdn.net％2Fdn％2FcSnZUD％2Fbtqvi30MkSa％2FTpep8fA7gLc4Kqt1xPaGD1％2Fimg.png)

`settings.json`에서 보면 다음 코드가 추가되어 있습니다.

```
｛
    "eslint.autoFixOnSave": true,
    "editor.formatOnSave": true,
    "javascript.format.enable": false
｝    
```

<br>

코드를 작성하고 파일을 저장해보세요. 그러면 아래와 같이 코드가 깔끔하게 자동으로 정리됩니다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory&fname=https％3A％2F％2Fk.kakaocdn.net％2Fdn％2FbJLZo3％2FbtqvkzkAPsx％2FJWX8TmYuFZLwNFwZLnXr41％2Fimg.gif)


<br>해피 코딩하세요~!

---

<center>![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)</center>
