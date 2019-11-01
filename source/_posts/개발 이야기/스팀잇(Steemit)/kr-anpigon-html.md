---
title: 스팀잇에서 사용 가능한 HTML태그와 속성을 알아보자.
tags:
  
  
  
  
  
author: anpigon
date: 2018-08-23 00:08:45
---

안녕하세요. @anpigon입니다.

스팀잇은 허용한 HTML 태그와 속성만 입력할 수 있도록 되어있습니다. 그래서 스팀잇 소스를 분석하여 사용 가능한 HTML 태그와 속성을 파악하여 정리하였습니다. 

___

스팀잇에서 사용가능한 HTML 태그는 아래와 같다. 아래에 포함되지 않은 HTML 태그는 사용할 수 없다.

```
<div>, <iframe>, <a>, <p>, <br>, <img>, <hr>
<ul>, <li>, <ol>
<h1>, <h2>, <h3>, <h4>, <h5>, <h6>
<blockquote>, <pre>, <code>, <center>
<table>, <thead>, <tbody>, <tr>, <th>, <td>
<strike>, <sup>, <sub>, <em>, <strong>, <del>, <b>, <i>, <q>
```
<br>
HTML태그에 허용되는 속성(Attribute)은 다음과 같다. 속성을 사용할 수 있는  태그만 표시하였다.

| 태그 | 속성 | 설명 |
|-|-|-|
| `<iframe>` | `src` | `src`에 사용 가능한 도메인<br/><sub>ㆍ`https://w.soundcloud.com/player/?url=…`<br/>ㆍ`https://player.vimeo.com/video/28530912…`<br/>ㆍ`https://www.youtube.com/embed/yUjlBfmkO6…`</sub> |
| `<div>` | `class` |`class`에 사용 가능한 스타일 <br /><sub>`pull-right`, `pull-left`, `text-justify`, `text-rtl`, `text-center`, `text-right`, `videoWrapper`, `phishy`</sub><br /><sub>※ div.class 스타일에 대해서는 아래에서 다시 설명하겠다.</sub>|
| `<td>` | `style` |`style`에 사용 가능한 스타일 <br /> <sub>`text-align:right`</sub>|
| `<img>` | `src`, `alt` ||
| `<a>` | `href` |`href`에 사용 가능한 스킴(Scheme)<br /><sub>`http://`, `https://`, `steem://`</sub>|


<br>

___

# 각 태그에 대한 설명

각 HTML 태그에 대한 간략한 설명과 예제를 살펴보자.


## `<strike>`, `<del>` 태그

`<strike>`는 취소선, `<del>`은 삭제선을 의미한다. 그러나 HTML 렌더링 결과는 동일하다. 마크다운은 `~~`를 사용한다.

```
<strike>취소선</strike>
<del>삭제선</del>
~~마크다운 표현식~~
```

![](https://imgur.com/Wpq7WMK.png)

___

## `<sup>`, `<sub>` 태그

`<sup>`는 윗첨자(super subscript), `<sub>`은 아랫첨자(subscript)를 의미한다. 스팀잇에서 작은 글자를 표현할때 많이 사용한다. 

```
윗첨자<sup>윗첨자</sup>
아랫첨자<sub>아랫첨자</sub>
```

![](https://imgur.com/Bj7hvIu.png)

___

## `<i>`, `<em>` 태그

`<i>`는 Italic를 뜻하며 *이탤릭체 또는 기울임체*라고 한다. `<em>`은 Emphasize를 뜻한다. 그러나 HTML 렌더링 결과는 동일하다. 마크다운은 `*` 또는 `_`를 사용한다.

```
<i>Italic</i>
<em>Emphasize</em>
*마크다운 표현식*
_마크다운 표현식_
```

![](https://imgur.com/SV2Ss3L.png)

___

## `<strong>`, `<b>` 태그

`<strong>`, `<b>` 는 글자를 강조할때 사용한다. 마크다운은 `**` 또는, `__`를 사용한다.

```
<strong>Strong</strong>
<b>Bold</b>
**마크다운 표현식**
__마크다운 표현식__
```

![](https://imgur.com/2G9CKcY.png)

___

## `<q>`, `<blockquote>` 태그

`<q>`는 짧은 인용문, `<blockquote>`는 긴 인용문에 사용한다. 마크다운은 긴 인용문에 `>`를 사용한다.

```
<q>짧은 인용문</q>
<blockquote>
추구할 수 있는 용기가 있다면 우리의 모든 꿈은 이뤄질 수 있다. <br>
– 월트 디즈니
</blockquote>

> 마크다운 표현식에서는 인용문을 이렇게 사용한다.
\- 안피곤
```

![](https://imgur.com/j20z2mj.png)
___

## `<iframe>` 태그

`<iframe>`은 동영상을 삽입할 때 사용한다. 하지만, 현재는 **[Soundcloud](https://soundcloud.com)**, **[vimeo](https://vimeo.com/ko/)**, **[Youtube](https://www.youtube.com)**에 업로드한 동영상만 사용 가능하다. 아래와 같은 embed 코드는 동영상 제공 사이트에서 가져올 수 있다.

```
<iframe src="https://w.soundcloud.com/player/?url=…"></iframe>
<iframe src="https://player.vimeo.com/video/28530912…"></iframe>
<iframe src="https://www.youtube.com/embed/egGkViMDVF…"></iframe>
```

>  참고로 **Youtube**와 **vimeo**는 URL만 입력하면 `<iframe>`으로 자동 변환된다. 

___

## `<img>` 태그

이미지를 삽입할 때 사용한다. 마크다운으로 표현하면 `![대체텍스트](이미지주소)`이다.

```
<img src="https://imgur.com/a2cMI4Q.png" alt="대체텍스트">
```
>  이미지도 URL만 입력하면 `<img>`로 자동 변환된다. 단, `"https://imgur.com/a2cMI4Q.png"` 와 같이 URL이 `jpg, jpeg, gif, png, svg, ico, tif, tiff` 로 끝나는 경우에만 자동 변환된다.

___

# `<div>` 태그의 `class` 스타일


`<div>`에 사용가능한  스타일에 대해서 차례대로 살펴보자.



## pull-right

div를 오른쪽으로 float한다.

```
<div class='pull-right'>
오른쪽에 출력
</div>
```
![](https://imgur.com/M6vNxZ3.png)

<hr>

## pull-left


div를 왼쪽으로 float한다.

```
<div class='pull-left'>
왼쪽에 출력
</div>
```
![](https://imgur.com/NBaTluy.png)

<hr>

## text-justify

텍스트를 양쪽 정렬한다.

```
<div class='text-justify'>
텍스트 양쪽 정렬
</div>
```
![](https://imgur.com/a57ILkB.png)

<hr>

## text-center


텍스트를 가운데 정렬한다. `<center>`와 동일하다.

```
<div class='text-center'>
텍스트 가운데 정렬
</div>
```


![](https://imgur.com/w41GGZB.png)

<hr>

## text-right


텍스트를 오른쪽 정렬한다.

```
<div class='text-right'>
텍스트 오른쪽 정렬
</div>
```

![](https://imgur.com/XoutMMq.png)

>  <sup>결과만 봤을때는 text-right와 pull-right와 동일하다고 생각 할 수 있다. 하지만, 두 스타일의 용도와 정렬 방식은 다르다. text-right는 `<div>` 내부 항목들을 오른쪽으로 정렬한다. 그리고  pull-right는 `<div>` 영역을 오른쪽에 출력한다.</sup>

<hr>

## text-rtl

글자 방향을 오른쪽에서 왼쪽으로 표시한다. 특수문자가 왼쪽으로 표시되는 것 말고는 text-right와 차이가 거의 없어 보인다.

```
<div class='text-rtl'>
글자 방향을 오른쪽에서 왼쪽으로...
</div>
```
![](https://imgur.com/VocbxDx.png)

<hr>

## phishy

phishy는 글자색을 빨간색으로 표시해준다.

```
<div class='phishy'>
  빨간색
</div>
```

![](https://imgur.com/lNxJBas.png)

#  응용해보기

위의 스타일을 응용하면 아래와 같은 표현도 가능하다. 이렇게 까지 사용할 일은 없다고 생각되지만, 재미를 위해서 만들어 보았다.

```html
<div class='pull-left'>
  문장에서 가운데 글자를
</div>
<div class='pull-left'>
  <div class='phishy'>
    빨간색
  </div>
</div>
<div class='pull-left'>
  으로 강조하고 싶다.
</div>
```

![](https://imgur.com/eb2QVK7.png)


또는,

```html
<div class='pull-left'>
  <sup><table>
  <tr><th>1 단계</th></tr>
  <tr><td>눈을 감는다</td></tr>
  </table></sup>
</div>
<div class='pull-left'>&#10132;</div>
<div class='pull-left'>
  <sup><table>
  <tr><th>2 단계</th></tr>
  <tr><td>잡념을 없앤다</td></tr>
  </table></sup>
</div>
<div class='pull-left'>&#10132;</div>
<div class='pull-left'>
  <sup><table>
  <tr><th>3단계</th></tr>
  <tr><td>잠을 잔다</td></tr>
  </table></sup>
</div>
<div class='pull-right'>
  <sup><table>
  <tr><th>마지막 단계</th></tr>
  <tr><td>꿈을 꾼다</td></tr>
  </table></sup>
</div>
```

![](https://imgur.com/keDs0AE.png)


여기까지 읽어주셔서 감사합니다.