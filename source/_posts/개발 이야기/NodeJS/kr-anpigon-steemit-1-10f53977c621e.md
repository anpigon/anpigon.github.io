---
title: '스팀잇(Steemit)기반 앱 만들기 #1'
tags:
  
  
  
  
  
author: anpigon
date: 2018-07-30 23:08:09
---

스터디 목적으로 스팀잇 기반 서비스 앱을 자바스크립트(JS)로 구현해보려고 합니다. 그리고 모든 개발 과정들을 일지 쓰듯이 스팀잇에 남겨보려고 합니다.

구현하기 위해서는 HTML과 자바스크립트에 대한 기본적인 지식이 필요합니다. 그리고 다음 준비물이 필요합니다.

- NodeJS
- Visual Studio Code
- vuetifyjs
- vue.js
- steem-js

___

# <개발환경 구성하기>

<br>
### NodeJS 설치 : 개발SDK
___

저는 JAVA가 편하지만, 요즘 대세인 노드(Node)JS를 사용하여 구현합니다.

노드JS 홈페이지에 접속하여 **8.11.3 LTS**를 설치합니다.
> - 다운로드: https://nodejs.org/ko/


<br>
### Visual Studio Code 설치 : 개발도구
___
개발도구는 본인이 편한 것 아무거나 사용해도 상관없습니다. 저는 이클립스가 편하지만 대세에 따라 Visual Studio Code를 설치하였습니다.
> - 다운로드: https://code.visualstudio.com/

Visual Studio Code(VSC)를 실행한 화면은 아래와 같습니다. 이후부터는 VSC 라고 명칭하겠습니다.

![Visual Studio Code](https://i.imgur.com/ayeBwE5r.png)


<br>
### Vuejs 설치 : JS프레임워크
___

자바스크립트 프레임워크에는 Angular, React.js, Vue.js 등 종류가 많아서 몇일을 고민했습니다. 하지만 대세에 따라 Vue.js를 설치합니다. 참고로 학습하는데 Vue.js가 가장 쉬웠습니다.

그리고 Vue.js 에서 제공해주는 `vue-cli`를 사용하여 개발환경을 구성합니다.  `vue-cli`를  사용하면 복잡한 개발환경을 쉽게 구축할 수 있습니다. 차후 모바일도 할 것이라서 이왕 할거 개발환경을 pwa로 구성하기로 결정하였습니다. 

> 참고로 pwa는 **프로그레시브 웹앱(Progressive Web App)**로 자세한 내용은 아래 링크로 대신합니다.
> - [여러분의 첫 Progressive Web App - Google Developers](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/?hl=ko)

<br>
VSC에서 통합 터미널<small>*(메뉴 > 보기 > 통합 터미널)*</small>을 열어줍니다. 그리고 아래와 같이 명령어를 입력하여 `vue-cli`를 설치하고 `pwa`개발환경을 구성합니다. [[참고\]](https://github.com/vuejs-templates/pwa)

```bash
$ npm install -g vue-cli
$ vue init pwa my-project
$ cd my-project
$ npm install
$ npm run dev
```
아래는 설치중인 터미널 화면입니다.

![통합 터미널](https://i.imgur.com/ZadtqA1r.png)

설치가 모두 끝나고 나서 터미널에서 `npm run dev` 명령어를 실행하면, 브라우저에 아래 화면이 짠하고 나타납니다. 이 화면을 보았을때 감동이었습니다. 하지만 이제 시작입니다.

![실행화면](https://steemitimages.com/300x0/https://i.imgur.com/RY2oeYb.png)

<br>
### Vuetify.js 설치 : UI프레임워크
___

UI프레임워크 종류가 많으니 마음에 드는 프레임워크를 선택하면 됩니다. 저는 [vuetifyjs](https://vuetifyjs.com/ko/)와 [vuematerial](https://vuematerial.io/) 중에서 고민하였습니다. 하지만 대세에 따라 Vuetifyjs를 선택하였습니다. Vuetifyjs가 한글 메뉴얼이 매우 잘 되어있습니다.

 터미널에서 아래와 같이 설치합니다.

```bash
$ npm install vuetify --save
```

Vuetify가 설치되었다면, VSC 파일탐색기에서  `/src/main.js` 파일을 열어서 수정합니다. `main.js` 파일에 Vuetify를 임포트(import)하고 Vue에게 Vuetify를 사용하도록 지시해야합니다.

`main.js` 파일을 아래와 같이 수정합니다.

```js
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify' // vuetify 임포트(import)
import 'vuetify/dist/vuetify.min.css' // Vuetify.css 임포트(import)

Vue.use(Vuetify) // Vuetify를 사용하도록 지시
Vue.config.productionTip = false

new Vue(｛
  el: '#app',
  router,
  template: '<App/>',
  components: ｛ App ｝
｝)
```

머티리얼 디자인 아이콘을 표시하기 위해 `index.html` 파일 `<head>`부분에 아래 태그를 추가합니다.

```html
<head>
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
</head>
```

마지막으로 `/src/App.vue` 파일을 열어서 아래와 같이 수정합니다. 아래 소스는 [[http://github.com/vuetifyjs\]](https://github.com/vuetifyjs/vuetifyjs.com/tree/master/src/examples/layouts)에서 가져왔습니다.

```html
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>
            <v-tooltip left>
              <v-btn slot="activator" :href="source" icon large target="_blank">
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/rJdVMq" target="_blank">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default ｛
    data: () => (｛
      drawer: null
    ｝),
    props: ｛
      source: String
    ｝
  ｝
</script>
```
다시 터미널에서 `npm run dev` 명령어를 실행하면 아래와 같은 화면이 나타납니다.

![실행화면](https://i.imgur.com/ndl9J1A.png)

위 화면을 보기까지 많은 시행착오를 겪었지만 이 글에는 기술하지 않았습니다. 띄어쓰기나 빈문자열, 따옴표 등등 사소한 것에 에러를 뿜어대서 많이 당황스러웠네요.

여기까지 읽어주셔서 감사합니다.