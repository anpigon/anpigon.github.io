---
title: "[React Native] 커스텀 폰트 사용하기"
author: anpigon
date: "2019-02-24T16:38:36Z"
permalink: "/kr/@anpigon/29gyik-react-native"
tags:
  - "React Native"
---
![](https://cdn.steemitimages.com/DQmcD9PEsszAzHQQv6Fs9A6FysbBbKQd67XxBB7BcfeYPhq/％E1％84％89％E1％85％A1％E1％84％8B％E1％85％AD％E1％86％BC％E1％84％8C％E1％85％A1％20％E1％84％80％E1％85％B3％E1％86％AF％E1％84％81％E1％85％A9％E1％86％AF％20％E1％84％89％E1％85％A1％E1％84％8B％E1％85％AD％E1％86％BC％E1％84％92％E1％85％A1％E1％84％80％E1％85％B5％20(1).png)

리액트 네이티브(*React Native*)에서 사용자 글꼴(*Custom Fonts*)를 사용하는 방법입니다. 

> 출처: https://medium.com/react-native-training/react-native-custom-fonts-ccc9aacf9e5e

<center><br>* * *<br></center>

## Assets에 글꼴 파일 복사하기

글꼴(*Fonts*) 파일을 루트에 있는 `assets/fonts` 폴더에 복사합니다.

![](https://cdn.steemitimages.com/250x0/https://cdn.steemitimages.com/DQmQbozjBMPpjddGgmtRvKuKkfrLzT8jxrAyvw1j372q18x/2019-02-2500-9bb4f993-79ea-40cb-874f-c29d3d965576.07.01.png)

## Package.json 수정하기

이제 **React Native**에게 글꼴 파일이 있는 위치를 알려줘야 합니다. `package.json`파일에 **rnpm**을 추가하고 글꼴 파일이 있는 경로를 입력합니다.

```
    "rnpm": ｛
        "assets": [
          "./assets/fonts/"
        ]
      ｝
```

<br>그다음 **React Native**에게 글꼴 파일을 링크하도록 명령을 수행합니다 :

    $ react-native link

<br>이렇게 하면 **Android**의 경우에는 Font 파일이 `android/app/src/main/assets/fonts`에 복사됩니다. 그리고  **iOS**는 `Info.plist` 파일에 글꼴 참조가 추가됩니다. **iOS** 폴더의 `Info.plist` 파일을 열어보면 아래와 같은 내용을 찾아 볼 수 있습니다.

```
    	<key>UIAppFonts</key>
    	<array>
    		<string>vincHand.ttf</string>
    	</array>
```

## React Native Styles

React Native 스타일에 글꼴을 추가하는 방법입니다. 아래와 같이 fontFamily 속성에 글꼴 이름을 입력하면 됩니다.

```
    const styles = StyleSheet.create(｛
      container: ｛
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
      ｝,
      welcome: ｛
        fontFamily: "vincHand", // here
        fontSize: 30,
        textAlign: "center",
        margin: 10
      ｝,
      instructions: ｛
        fontFamily: "vincHand", // here
        fontSize: 20,
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
      ｝
    ｝);
```
&nbsp;

## 스크린샷

|Android|iOS|
|:-:|:-:|
|![Android](https://cdn.steemitimages.com/DQmZmnpZVGdEs7Xj8p7NWtuyw6ahrgex5JG7BRiGZm9N8pZ/Sidesync_capture_2019％E1％84％82％E1％85％A7％E1％86％AB％202％E1％84％8B％E1％85％AF％E1％86％AF％2025％E1％84％8B％E1％85％B5％E1％86％AF％20％E1％84％8B％E1％85％A9％E1％84％8C％E1％85％A5％E1％86％AB％2012％E1％84％89％E1％85％B5％2035％E1％84％87％E1％85％AE％E1％86％AB％2044％E1％84％8E％E1％85％A9％20GMT+9.png)|![](https://cdn.steemitimages.com/DQmYWXraCeVvhM3udmfk4e6CmLzZybQ6gQ95uLMx8gKKNws/Simulator％20Screen％20Shot％20-％20iPhone％20X％20-％202019-02-25％20at％2000.54.10.png)|


## 소스 코드

이 튜토리얼의 소스 코드는 **GitLab**에서 찾을 수 있습니다.
[![](https://cdn.steemitimages.com/DQmeSeeGRVPCC2vxadLJg25GnzqBP3hax8SFRAFqMfWwzmB/Screenshot.png)](https://gitlab.com/applification/react-native-custom-fonts)


<center><br>* * *<br></center>

앱에 폰트를 추가하면 앱 용량이 매우 커지는 단점이 있습니다. 하지만 정말 원하는 폰트가 있다면, 폰트 용량을 줄여서 사용하는 방법이 있습니다. 폰트 용량 줄이는 방법은 아래 블로그에 잘 설명되어 있습니다.
- [한글 웹 폰트 경량화해 사용하기](http://coderifleman.tumblr.com/post/111825720099/％ED％95％9C％EA％B8％80-％EC％9B％B9-％ED％8F％B0％ED％8A％B8-％EA％B2％BD％EB％9F％89％ED％99％94％ED％95％B4-％EC％82％AC％EC％9A％A9％ED％95％98％EA％B8％B0)
- [웹폰트 경량화 - 폰트툴즈의 pyftsubset을 사용한 폰트 서브셋 만들기](https://www.44bits.io/ko/post/optimization_webfont_with_pyftsubnet)

<br>여기까지 읽어주셔서 감사합니다.