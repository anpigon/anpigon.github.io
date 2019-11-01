---
title: '스팀잇(Steemit)기반 앱 만들기 #6 - 로그인 기능'
tags:
  
  
  
  
  
author: anpigon
date: 2018-08-13 00:12:00
---

이번 시간에는 스팀잇 로그인 기능을 구현해봅니다. 현재까지 구현된 전체 소스는 [깃허브](https://github.com/anpigon/steemit-app/tree/login)에서 확인 가능합니다.

저도 공부하면서 구현하는 중이라서 설명이 많이 부족할 수 있습니다. 궁금한 사항은 댓글로 문의하시면, 최대한 답변해드리도록 노력하겠습니다. 


![LOGO](https://imgur.com/CXqysy8.png)

___

이번 시간에는 vuex를 사용하여 로그인 기능을 구현합니다. Vuex의 중심에는 **저장소(store)**가 있습니다. 그리고 **저장소**는 애플리케이션 **상태**를 저장하고 있습니다. Vuex에 대한 자세한 설명은 가이드 문서의 [링크](https://vuex.vuejs.org/kr/)로 대신합니다. 

> 저의 경우에는 Vuex를 이해하는데 어려웠습니다. 그래서 학습하는 데 시간이 많이 소요되었네요. 아직도 Vuex는 여전히 어렵습니다. ㅠㅠ


<br>
그리고 이제부터 앱 구현에 관련된 설명은 평어체를 사용하겠습니다.



## Vuex 설치

Vuex를 사용하기 위해 아래와 같이 설치한다.

```bash
$ npm install vuex --save 
```



## 로그인 기능 구현하기

이번에 구현할 파일 구조는 아래와 같다. 로그인 컴포넌트와 로그인 액션과 인증 정보를 저장할 저장소를 구현하게 될 것이다.

    src
    ├── components
    │   ├── Login.vue # 로그인 컴포넌트
    │   └── ...
    └── store
        ├── index.js # 모듈을 조합하고 저장소를 내보내는 곳 입니다.
        └── modules
            └── auth.js # 로그인/인증 모듈

___



### 로그인 컴포넌트(Login.vue)  생성하기

로그인 화면에서는 **username**와 **password**를 입력받는다. **username**은 스팀잇 아이디를 입력받고, **password**는 포스팅키를 입력받는다. 로그인 화면을 렌더링할 컴포넌트 **components/Login.vue** 파일을 아래와 같이 생성한다.

```html
<template>
  <v-container _fluid fill-height grid-list-md>
     <v-layout>  
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <v-card>
          <v-card-text>
            <v-layout row>
              <v-flex xs10 offset-xs1 md8 offset-md2>
                <v-card flat>
                  <v-card-title>
                    <h1 class="headline">로그인하기</h1>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        prepend-icon="person"
                        autofocus
                        v-model="username"
                        label="Username"
                        :rules="usernameRules"
                        persistent-hint
                        required></v-text-field>             
                      <v-text-field
                        prepend-icon="lock"
                        v-model="password"
                        type="password"
                        label="Password"
                        :rules="passwordRules"
                        persistent-hint
                        hint="로그인에는 항상 포스팅키를 사용하시기를 권장합니다."
                        ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class='pt-0'>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :loading="busy" :disabled="busy" @click.prevent="login">로그인</v-btn>
                  </v-card-actions> 
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
     </v-layout>
  </v-container>
</template>
<script>
import steem from 'steem'

export default ｛
  name: 'login', // 컴포넌트 이름
  data () ｛
    return ｛
      valid: false, // 유효성 체크 플래그값
      username: '', // username
      password: '', // 비밀번호
      usernameRules: [ // username 유효성 검사 로직
        v => !!v || 'Username is required'
      ],
      passwordRules: [ // 비밀번호 유효성 검사 로직
        v => (!v || steem.auth.isWif(v)) || 'Password is invalid'
      ],
      busy: false // 로그인 요청 여부 플래그값
    ｝
  ｝,
  deactivated () ｛
    this.$destroy()
  ｝,
  methods: ｛
    login () ｛
      if (this.$refs.form.validate()) ｛ // 유효성 체크
        // 로그인 로직
      ｝
    ｝
  ｝
｝
</script>
```

> 참고로 **password**는 필수입력값에서 제외하였습니다. 포스팅키가 유출되지 않도록 관리에 유의하시기 바랍니다.



<br>
___

그리고 라우터에 로그인 컴포넌트 경로(path)를 추가한다. 

**router/index.js** 파일을 아래와 같이 수정한다.

```js
import Login from '@/components/Login'

export default new Router(｛
  routes: [
    // ...
    ｛
      path: '/login',
      name: 'Login',
      component: Login
    ｝
  ]
｝)
```

<br>

여기까지 구현하고 앱을 실행하면 아래 화면을 볼 수 있다.

![](https://imgur.com/1JH1ZYY.png)
> 브라우저 주소창에 http://localhost:3000/#/login를 입력하면 볼 수 있다.

<br>
___



### 사용자 로그인과 인증 정보을 관리할 저장소(Store) 구현하기

이제부터 vuex를 사용하여 로그인 액션과 인증 정보를 관리할 저장소(Store)를 구현한다. 아래는 Vuex 가이드 문서에 나온 샘플 예제의 코드 구조를 보고 구현하였다. 실제로 Vuex는 코드 구조를 제한하지 않는다. 

**./store/modules/auth.js** 파일을 아래와 같이 생성한다. 

```js
const state = ｛
  username: '',
  password: ''
｝

const getters = ｛
｝

const actions = ｛
  login (｛ commit ｝, auth) ｛
    commit('login', auth)
  ｝
｝

const mutations = ｛
  login (state, ｛ username, password ｝) ｛
    state.username = username
    state.password = password
  ｝
｝

export default ｛
  namespaced: true,
  state,
  getters,
  actions,
  mutations
｝
```

위의 코드 내용을 간단하게 설명하면 다음과 같다.

- **state:** 애플리케이션의 로그인 상태 정보(username, password)를 포함한다.
- **getters:** 저장소 상태 정보를 계산하여 조회할 필요가 있을때 사용한다.
- **actions:** 로그인 작업을 실행한다.
- **mutations:** 로그인 상태 정보를 저장한다.



## 각 저장소 모듈을 관리할 index.js 파일 생성하기

저장소 모듈을 관리할 **./store/index.js** 파일을 생성한다. 그리고 방금 만든 **auth 저장소 모듈**을 export 한다. 지금은 **auth 모듈** 하나만 존재하지만, 나중에 구현될 모듈들은 모두 여기서 관리될 것이다.

```js
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store(｛
  modules: ｛
    auth
  ｝
｝)
```

그리고 저장소(store)를 컴포넌트 전역에서 사용하기 위해서는 루트 컴포넌트의 모든 자식 컴포넌트에 저장소(store)를 주입해야 한다. 아래와 같이 루트 저장소 `store`를 임포트하고 `new Vue(｛｝)` 객체에 주입한다. 

**main.js** 파일을 아래와 같이 수정한다. 

```js
import store from './store'

new Vue(｛
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: ｛ App ｝
｝)
```

<br>
___



### 로그인 컴포넌트에서 로그인 액션 호출하기

로그인 기능을 구현하기 전에 먼저 **"vuex 액션(action)을 호출하는 방법"**에 대해 간단히 알아보자. 

저장소에 등록된 액션은 다음과 같은 방법으로 호출 할 수 있다. 

가장 간단한 방법은 `this.$store.dispatch('auth/login')`를 사용하여 컴포넌트에서 액션을 디스패치한다.

```js
import ｛ mapActions ｝ from 'vuex'

export default ｛
  // ...
  methods: ｛
    login () ｛
      console.log(this.$store)
      this.$store.dispatch('auth/login')
    ｝
  ｝
｝
```

<br>
또는 `mapActions` 헬퍼를 사용하여 `store.dispatch` 호출에 매핑하여 사용 할 수 있다.

```js
import ｛ mapActions ｝ from 'vuex' // mapActions 헬퍼 임포트

methods: ｛
  // this.login()을 this.$store.dispatch('auth/login')에 매핑
  ...mapActions(｛
    login: 'auth/login' 
  ｝),
    
  // 함수명이 같으면 아래와 같이 생략가능하다.
  // this.login()을 this.$store.dispatch('auth/login')에 매핑
  ...mapActions([
    'auth/login' 
  ]),
    
  // 모듈의 네임스페이스 문자열을 헬퍼의 첫 번째 인수로 전달하여 아래와 같이 단순화 할 수 있다.
  // this.login()을 this.$store.dispatch('auth/login')에 매핑
  ...mapActions('auth', [
    'login' 
  ])
｝
```

<br>
또한 `createNamespacedHelpers`를 사용하여 네임스페이스 헬퍼를 생성할 수 있다. 전달된 네임스페이스 값으로 바인딩된 새로운 컴포넌트 바인딩 헬퍼를 가진 객체를 반환한다.
```js
import ｛ createNamespacedHelpers ｝ from 'vuex'

const ｛ mapActions ｝ = createNamespacedHelpers('auth')

export default ｛
  methods: ｛
    // `auth`에서 찾음
    ...mapActions([
      'login'
    ])
  ｝
｝
```

<br>



이제 위의 방법 중 하나를 사용하여 다음과 같이 로그인 기능을 구현해보자.

사용자가 입력한 **username**이 스팀잇 네트워크에 존재하는지 `steem.api.lookupAccountNamesAsync()` 함수를 사용하여 체크한다. 그리고 auth 저장소의 로그인 액션을 디스패치한다. 모든 작업이 완료되면 `this.$router.go(-1)`를 사용하여  메인 컴포넌트로 이동한다. 

로그인 컴포넌트 **components/Loing.vue**의 수정된 내용은 아래와 같다.

```js
methods: ｛
  login () ｛
    if (this.$refs.form.validate()) ｛ // 유효성 체크
      this.busy = true
      
      // 스팀잇 네트워크에서 username 조회
      steem.api.lookupAccountNamesAsync([this.username])
        .then(usernames => ｛
        if (!usernames || !usernames[0]) return alert(`"$｛this.username｝" 사용자를 찾을 수 없습니다.`)
        
        // 저장소의 로그인 액션 디스패치~
        this.$store.dispatch('auth/login', ｛
          username: this.username,
          password: this.password
        ｝)
        
        // 메인 페이지로 이동
        this.$router.go(-1)
      ｝)
        .finally(() => (this.busy = false))
    ｝
  ｝
｝
```

<br>
___


### 로그인 상태에 따라 상단바 모양 바꾸기

로그인 상태에 따라 로그인 전 상단바와 로그인 후 상단바가  아래와 같이 다르게 보이도록 구현한다.

|로그인 전|로그인 후|
|-|-|
|![](https://imgur.com/9F4JBg8.png)|![](https://imgur.com/6OStOB9.png)|


<br>
아래와 같이 **App.vue 컴포넌트**의 **computed 옵션**에서 **auth 저장소**가 가지고 있는 상태(state)의 **username**를 참조한다.

```js
computed: ｛
  username () ｛
    return this.$store.state.auth.username
  ｝
｝
```

<br>
다른 방법으로는 아래와 같이 **mapState 헬퍼**를 사용할 수 있다.

```js
import ｛ mapState ｝ from 'vuex'

export default ｛
  //...
  computed: ｛
    ...mapState(｛
      username: state => state.auth.username
    ｝)
  ｝
｝
```

<br>
또는 모듈의 네임스페이스 문자열을 헬퍼의 첫 번째 인수로 전달하여 해당 모듈을 컨텍스트로 사용할 수 있다.

```js
...mapState('auth', ｛
  username: state => state.username
｝)
```

<br>
또한 저장소의 속성 이름과 computed에 맵핑된 속성 이름이 같으면 아래와 같이 단순화 할 수 있다.

```js
...mapState('auth', [
  // this.username를 store.state.auth.username에 매핑 합니다.
  'username'
])
```

<br>
`this.$store.state.auth.username` 값이 없으면 상단바에 로그인 버튼을 보여주고,  값이 있으면 상단바에 프로필 이미지를 보여주도록 해보자. 

**App.vue 컴포넌트**의 템플릿을 아래와 같이 수정한다. 

```html
<v-toolbar color="teal accent-4" dark fixed app>
  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  <v-toolbar-title>Steemlog</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items v-if='!username'>
    <v-btn flat small to='/login'>로그인</v-btn>
  </v-toolbar-items>
  <v-btn v-if='username' icon>
    <v-avatar color="white" size='36'>
      <img :src="'https://steemitimages.com/u/' + username + '/avatar'" alt="avatar" onerror="this.src='https://steemitimages.com/u/monawoo/avatar/small'">
    </v-avatar>
  </v-btn>
</v-toolbar>
```
<br>
___



### 세션 스토리지를 사용하여 로그인 유지하기

지금 구현한 앱은 브라우저의 새로고침 버튼을 클릭하면 로그인이 풀리는 문제가 있다. 새로고침을 해도 로그인이 유지되도록 바꿔보자.



**auth 모듈** **state 오브젝트**의 **username**과 **password** 값을 **세션 스토리지(sessionStorage)**에서 가져온다. 그리고 **login 액션**에서는 커밋(commit)이 끝나면 **세션 스토리지**에 **username**과 **password** 값을 저장한다. 

**./store/modules/auth.js** 파일을 아래와 같이 수정한다.


```js
const state = ｛
  username: window.sessionStorage.getItem('username') || '',
  password: window.sessionStorage.getItem('password') || ''
｝

const actions = ｛
  login (｛ commit ｝, auth) ｛
    commit('login', auth)
    window.sessionStorage.setItem('username', auth.username)
    window.sessionStorage.setItem('password', auth.password)
  ｝
｝
```

<br>

세션 스토리지에 저장한 데이터는 브라우저의 세션 스토리지 영역에 저장되어 있다. 크롬 브라우저에서 개발자 도구<sub>(단축키: Ctrl + Shift + i)</sub>의 Application 탭에서 확인 가능하다.

![](https://imgur.com/3JCoevI.png)

> 참고로 로그아웃을 구현하지 않았으므로, 로그아웃을 하려면 세션 스토리지의 데이터를 삭제해야 한다.

<br>
다음 시간에는 사용자 프로필 정보를 가져오는 기능을 구현할 예정입니다.

여기까지 읽어주셔서 감사합니다.

___
> 구현된 앱은  [steemlog.github.io](https://steemlog.github.io)에서 확인 해 볼 수 있습니다.
> 
> 전체 소스 내용은 [github](https://github.com/anpigon/steemit-app)에서 볼 수 있습니다.
> - [https://github.com/anpigon/steemit-app](https://github.com/anpigon/steemit-app)


<br>


###### 이전글
___
- [스팀잇(Steemit)기반 앱 만들기 #1 - 시작하기](https://steemit.com/kr/@anpigon/steemit-1-10f53977c621e)
- [스팀잇(Steemit)기반 앱 만들기 #2 - 최근글 가져오기](https://steemit.com/kr/@anpigon/steemit-2)
- [스팀잇(Steemit)기반 앱 만들기 #3 - 무한 스크롤 구현하기](https://steemit.com/kr/@anpigon/steemit-3)
- [스팀잇(Steemit)기반 앱 만들기 #4 - 상세화면 구현하기](https://steemit.com/kr/@anpigon/steemit-4)
- [스팀잇(Steemit)기반 앱 만들기 #5 - 댓글 보여주기](https://steemit.com/kr/@anpigon/ssteemit-5)

___