---
title: "[React Native] 스팀커넥트(Steemconnect) 로그인 만들기"
author: anpigon
date: "2019-01-27T13:30:18Z"
permalink: "/kr/@anpigon/react-native-steemconnect--1548595799187"
tags:
  - "React Native"
---
![](https://cdn.steemitimages.com/DQmbzdR9nmfLUDsSymgk9b4VPt2v449e2KndYWkFKKohCdw/％E1％84％85％E1％85％B5％E1％84％8B％E1％85％A2％E1％86％A8％E1％84％90％E1％85％B3％20％E1％84％82％E1％85％A6％E1％84％8B％E1％85％B5％E1％84％90％E1％85％B5％E1％84％87％E1％85％B3％20％E1％84％8B％E1％85％B5％20(1).png)

이번에는 리액트네이티브로 스팀커넥트 로그인을 구현합니다. 저는 스팀커넥트를 선호하는 편은 아닙니다. 하지만 편리함 때문에 사용하고 있습니다.

["[React Native] 인스타그램 UI 만들기"](/kr/@anpigon/react-native-ui-1) 시리즈를 이어서 로그인까지 구현해보도록 하겠습니다. 이전에 작성했던 개발환경을 그대로 사용합니다.

# 로그인 화면 만들기

 `./Components/LoginScreen.js` 파일 생성합니다. **LoginScreen** 컴포넌트에는 로그인 버튼을 보여줄 것입니다.

```jsx
import React, ｛ Component ｝ from 'react';
import ｛ StyleSheet, View, Modal ｝ from 'react-native';
import ｛ Icon, Container, Button, Text ｝ from 'native-base'; 

export default class LoginScreen extends Component ｛
  static navigationOptions = ｛
		title: 'Login',
  ｝

  render() ｛
    return (
		<Container style=｛styles.container｝>
			<View style=｛｛justifyContent:'center',alignItems: 'center'｝｝>
				<Button iconLeft primary>
					<Icon name="login" type="AntDesign" />
					<Text>Steemconnect Login</Text>
				</Button>
			</View>
		</Container>
	)
  ｝
｝

const styles = StyleSheet.create(｛
  container: ｛
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
	｝,
｝);
```


<br>그다음 `./App.js` 파일을 수정합니다.


```js
import MainScreen from './Components/MainScreen';
import LoginScreen from './Components/LoginScreen';

const AppStackNavigator = createStackNavigator(｛
  Login: ｛ screen: LoginScreen ｝,
  Main: ｛ screen: MainScreen ｝
｝);

// ... 일부 코드 생략 ...
```

> **LoginScreen** 컴포넌트를 *import* 합니다. 그리고 `AppStackNavigator` 에 **LoginScreen**을 등록합니다. 로그인 체크 여부를 해서 **LoginScreen** 와 **MainScreen**를 분기해야 하지만, 나중에 고민해봅시다.

<br>

여기까지 작업하고 화면을 확인해봅니다. 심플하게 로그인 버튼 하나만 덩그러니 있습니다.

![](https://cdn.steemitimages.com/300x0/https://cdn.steemitimages.com/DQmWxyLLLvfifCW7HGfEYTwtt7yuUfVRk7QS5YKQCQwVuHL/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-01-27％2016.51.54.png)

<br>

# Steemconnect 모달창 만들기

그다음에는 스팀커넥트 로그인 화면을 보여줄 모달창을 구현합니다. 스팀커넥트를 구현하기 위해서 `steemconnect` 라이브러리를 설치합니다.



**Steemconnect 라이브러리 설치**

```bash
$ yarn add steemconnect
```

`steemconnect` 라이브러리 사용 방법은 [공식 문서](https://github.com/steemscript/steemconnect/wiki/OAuth-2#scopes)를 참고하세요.

<br>


`./config.js` 파일을 생성합니다. `config.js`에는 스팀커넥트를 생성하는데 필요한 설정값을 입력합니다.

```

module.exports = ｛
  SC2_APP_ID=스팀커넥트 앱ID
  SC2_CALLBACK_URL=스팀커넥트 콜백URL
｝
```

<br>

그다음 `./steemConnect.js` 파일을 생성합니다. `steemConnect.js` 파일에서는 `steemconnect` 객체를 초기화하여 생성합니다.

```js
import sc2 from 'steemconnect';
import Config from './config';

const api = sc2.Initialize(｛
  app: Config.SC2_APP_ID,
	callbackURL: Config.SC2_CALLBACK_URL,
	scope: ['vote','comment','delete_comment','comment_options','custom_json','claim_reward_balance','offline']
｝);

export default api;
```

> `scope`에는 사용가능한 모든 권한을 다 입력해보았습니다. 사실 *offline* 권한을 얻기 위해서는 `response_type=code` 옵션을 사용해야합니다. 하지만 별도의 요청 서버가 필요하기 때문에 이번에는 사용하지 않았습니다.

<br>


`./Components/SteemConnectModal.js` 파일을 생성합니다.

```jsx
import React, ｛ Component ｝ from 'react';
import ｛  WebView ｝ from 'react-native';
import ｛ Icon, Container, Button, Header, Right ｝ from 'native-base'; 

import steemConnect from '../steemConnect';

class SteemConnectModal extends Component ｛

  // webview 상태 변경 체크
  _onNavigationStateChange = (event) => ｛
    if (event.url.indexOf('?access_token') > -1) ｛
      this.webview.stopLoading();
      try ｛
        const tokens = ｛｝;

        // 콜백 URL에서 accessToken 정보 추출하기
        let params = event.url.split('?')[1];
        params = params.split('&');
        params.forEach(e => ｛
          const [key, val] = e.split('=');
          tokens[key] = val;
        ｝);

        // console.log('tokens:', tokens);
        // 스팀커넥트 인증 성공
        this.props.onSteemconnectSuccess(tokens);
      ｝ catch (error) ｛
        console.log(error);
      ｝
    ｝
  ｝;

  render() ｛
    // 로그인 URL 생성
    const link = steemConnect.getLoginURL();
    // console.log(link);
    
    return (
      <Container style=｛｛ flex: 1 ｝｝>
        <Header>
          <Right>
            <Button icon transparent
              onPress=｛() => ｛
                this.props.handleOnModalClose()
              ｝｝><Icon name='ios-close'/></Button>
          </Right>
        </Header>
        <WebView
          source=｛｛ uri: link ｝｝
          onNavigationStateChange=｛this._onNavigationStateChange｝
          ref=｛ref => ｛ this.webview = ref ｝｝
        />
      </Container>
    );
  ｝
｝

export default SteemConnectModal;
```

> * `_onNavigationStateChange()` 함수는 **WebView** 컴포넌트의 URL 변화를 감지합니다. 그래서 스팀커넥트 콜백URL로 넘어온 토큰값을 가져옵니다.
> * `steemConnect.getLoginURL()` 은 스팀로그인 URL을 생성합니다. `https://steemconnect.com/oauth2/authorize?client_id=앱ID&redirect_uri=콜백URL&scope=vote,comment,delete_comment,comment_options,custom_json,claim_reward_balance,offline` 형태의 URL이 생성됩니다.

<br>

`./Components/LoginScreen.js` 파일을 수정합니다. 이제 로그인 버튼을 누르면 **SteemConnectModal** 컴포넌트가 나타나게 합니다.

```jsx
import SteemConnectModal from './SteemConnectModal';
import steemConnect from '../steemConnect';

export default class LoginScreen extends Component ｛
  static navigationOptions = ｛
		title: 'Login',
	｝
	
  constructor(props) ｛
    super(props);

    this.state = ｛
			modalVisible: false,
			username: null,
		｝
	｝

	// 모달창 닫기
	_handleOnModalClose = () => ｛
		this.setState(｛ modalVisible: false ｝);
	｝

	// 스팀커넥트 성공
  _onSteemconnectSuccess = (tokens) => ｛
		this.setState(｛ modalVisible: false ｝);
		// console.log(tokens);

		// AccessToken 셋팅
		steemConnect.setAccessToken(tokens.access_token);

		// 계정 정보 조회
		steemConnect.me().then((｛ account ｝) => ｛
			const ｛ profile ｝  = JSON.parse(account.json_metadata);
			console.log('profile', profile);
			this.setState(｛ username: profile.name ｝);
		｝);
	｝

  render() ｛
		const ｛ username ｝ = this.state;

    return (
			<Container style=｛styles.container｝>
				<View style=｛｛justifyContent:'center',alignItems: 'center'｝｝>
					｛
						username ? <Text>｛ username ｝님 환영합니다.</Text> :
						<Button 
							onPress=｛() => ｛ 
								this.setState(｛ modalVisible: true ｝) 
							｝｝
							iconLeft primary>
							<Icon name="login" type="AntDesign" />
							<Text>Steemconnect Login</Text>
						</Button>
					｝
				</View>

				｛/** 스팀커넥트 모달창 **/｝
				<Modal
          animationType="slide"
          transparent=｛false｝
          visible=｛this.state.modalVisible｝>
          <SteemConnectModal
            handleOnModalClose=｛this._handleOnModalClose｝
						onSteemconnectSuccess=｛this._onSteemconnectSuccess｝
          />
        </Modal>

			</Container>
		)
  ｝
｝

const styles = StyleSheet.create(｛
  container: ｛
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
	｝,
｝);

// ... 일부 코드 생략 ... 
```

> * 로그인이 되기전에는 로그인 버튼이 보이고, 로그인이 되고 나면 사용자 이름이 보입니다.
> * `_handleOnModalClose()` 함수의 기능은 모달창을 닫습니다.
> * `_onSteemconnectSuccess()` 함수는 스팀커넥트 로그인이 성공하면, `access_token` 을 전달받습니다. 그리고 로그인한 사용자 이름을 출력합니다.

<br>

아래는 완성된 앱 화면입니다.

![](https://cdn.steemitimages.com/DQmVT933ttYQZM6k8cd5iQdNirR6QVCy7oTWB7HkseZFBgC/2019-01-27％2018-55-42.2019-01-27％2018_56_33.gif)



구현된 소스는 [깃허브](https://github.com/anpigon/rn_instagram_clone/tree/12e9fc792a45e5bf8c9f04e0f110fab32abe3adc) 에 업로드 되어있습니다.

여기까지 읽어주셔서 감사합니다.

---

#####  <sub> **Sponsored ( Powered by [dclick](https://www.dclick.io) )** </sub>
[![dclick-imagead](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmSwkE4cySARFCKdemZWVwyk8dxh7HeDNiqwuVmWR3RBXE/Group％205.png)](https://api.dclick.io/v1/c?x=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiYW5waWdvbiIsInMiOiJyZWFjdC1uYXRpdmUtc3RlZW1jb25uZWN0LS0xNTQ4NTk1Nzk5MTg3IiwiYSI6WyJpLTIiXSwidXJsIjoiaHR0cHM6Ly93d3cuZGNsaWNrLmlvIiwiaWF0IjoxNTQ4NTk1Nzk5LCJleHAiOjE4NjM5NTU3OTl9.lWtcJorwTytoUkjK7c0vHr_jUs81lQaQiYqd0atucdE)