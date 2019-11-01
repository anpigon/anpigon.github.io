---
title: '이더리움(Ethereum) 공부 #2 - HD 지갑과 니모닉 코드'
tags:
  
  
  
  
  
author: anpigon
date: 2018-08-28 22:41:27
---

안녕하세요. @anpigon입니다.

<div class='pull-right'><img src='https://steemitimages.com/150x0/https://images-na.ssl-images-amazon.com/images/I/51eW3hlp3jL._SX379_BO1,204,203,200_.jpg'></div>

**마스터 이더리움(Mastering Ethereum)** 책을 보면서 정리한 글입니다. 아직 전체 내용을 다 보지는 못하였습니다. 하지만 궁금한 사항을 댓글로 문의하면, 최대한 답변해드리도록 노력하겠습니다.
> 책 전체 내용은 깃허브에서 볼 수 있습니다.
[https://github.com/ethereumbook/ethereumbook](https://github.com/ethereumbook/ethereumbook/blob/develop/README.md)

<br>

___

<br>
이더리움 지갑에는 이더(ether)나 토큰(token)이 들어있지 않다. 지갑에는 한 쌍의 공개키와 개인키만 있을 뿐이다. 이더나 토큰은 이더리움 블록체인에 기록되어 있다. 지갑의 유형은 크게 비결정적 지갑(Nondeterministic Wallet)과 결정적 지갑(Deterministic Wallets)으로 구분된다. 결정적 지갑 중에서 가장 많이 사용되는 HD 지갑에 대해서 알아본다.

___

#  계층 결정적 지갑(HD Wallets)

결정적 지갑(Deterministic Wallets)은 단일 **시드(seed)**에서 많은 키를 생성하기 위해 개발되었다. 결정적 지갑 중에서 가장 발전된 형태는 계층 결정적 지갑(Hierarchical Deterministic Wallets)이다. 계층 결정적 지갑은 HD 지갑(HD Wallet)이라고도 한다. HD 지갑은 비트코인의 [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)와 [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) 표준에 정의되어 있다. HD 지갑은 트리 구조로 생성된 키를 가지고 있다. 이 트리 구조는 부모키에서 자식키를 만들 수 있고, 그 자식키에서 손자키를 만들 수 있다. 이런 방법으로 키를 무한대로 생성한다. 이렇게 키를 여러 개 생성하여 관리하는 이유는 블록체인의 투명성과 관련된 보안 문제 때문이다. 이와 관련된 문제는 나중에 별도 포스팅으로 설명하겠다.

<center>https://steemitimages.com/400x0/https://imgur.com/hppMB4b.png</center>

<br>
___

## 시드에서 HD 지갑 생성하기

 HD 지갑은 **루트 시드(Root Seed)** 한 개로부터 많은 키와 주소가 생성된다. 따라서 루트 시드만 알고 있으면 수천 또는 수백만 개의 키를 가지고 있는 HD 지갑 전체를 복원할 수 있다. 루트 시드는 니모닉 단어 순서(Mnemonic Word Sequence)를 가장 많이 사용한다.

루트 시드를 HMAC-SHA512 알고리즘 함수를 사용하여 해시한 값에서 마스터 개인키(Mater Private Key)과 마스터 체인코드(Master Chain Code)를 생성한다. 512비트의 해시된 값에서 왼쪽 256비트를 마스터 개인키로 사용하고, 오른쪽 256비트를 체인코드로 사용한다. 그리고 마스터 공개키는 타원곡선 곱셈 함수를 사용하여 마스터 개인키로부터 계산된다.

<center>https://steemitimages.com/500x0/https://imgur.com/Vu0SpXy.png</center>

계층 결정적 지갑은 자식키 유도 함수(*CKD*)를 사용하여 부모키로 부터 자식키를 파생한다. 자식키 생성에는 부모키, 체인코드, 인덱스 번호가 사용된다. 자식키를 생성하기 위해 부모키, 체인코드, 인덱스 번호를 결합하여 HMAC-SHA512로  해시한다. 해시된 값(512비트)을 반으로 나눠 개인키(256비트)와 체인코드(256비트)를 생성한다. 이 방법으로 자식키를 계속 생성할 수 있다.

위에서 보았듯이 체인코드는 자식키를 파생하는데 사용된다. 키와 체인코드를 포함하고 있는 키를 확장키(Extended Key)라고 한다. 대부분의 HD 지갑은 키 생성을 위해 비트코인의 [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) 표준을 사용한다. 그리고 확장 개인키는 **xprv**, 확장 공개키는 **xpub**라는 접두어를 사용하여 식별한다.

___

## 강화된 유도법(Hardened Derivation)으로 자식키 생성

만약 자식 확장 개인키가 유출되는 경우, 자식 확장 개인키가 포함하고 있는 키와 체인코드를 사용하면 다른 자식의 개인키 전부를 알아 낼 수 있다. 이러한 문제에 대응하기 위해 HD지갑은 강화된 유도(Hardened Derivation) 함수를 사용한다. 강화된 유도 함수는 부모 키와 자식 체인코드 관계를 끊어버린다. 이렇게 해서 부모키오 자식키 사이에 **방화벽(firewall)**을 만든다.

___

## HD 지갑 키 식별자(path)

HD 지갑의 키는 명명 규칙인 'path'를 사용하여 식별한다. 그리고 트리의 각 레벨은 슬래시(/) 문자로 구분된다. 마스터 개인키에서 생성된 자식 개인키는 'm'으로 시작하고, 마스터 공개키에서 생성된 자식 공개키는 'M'으로 시작한다. 

예를 들면, 마스터 개인키의 0번째 자식 개인키의 path는 `m/0`이다. 그리고 0번째 자식 공개키의 path는 `M/0`이다. 0번째 자식 개인키의 1번째 손자 개인키는 `m/0/1`이 된다.

___

## BIP-44

비트코인의 [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) 표준은 복잡한 키 생성에 대한 방법을 제공한다. BIP-44는 미리 정의된 5개의 레벨의 path로 구성된다.

```
m / purpose' / coin_type' / account' / change / address_index
```
> 경로에 있는 아포스트로피(') 문자는 BIP-32의 강화된 유도(hardened derivation)가 사용됨을 나타낸다.

- `purpose`는 44'를 사용한다. BIP-44 규격이 사용됨을 의미한다.
- `coin_type`은 가상화폐 코인 유형을 의미한다. 이더리움은 60'을 사용한다. 다른 코인 유형 코드는 [SLIP0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) 표준 문서에서 찾아 볼 수 있다.
- `account`은 회계나 조직 목적을 위해 지갑을 하위 계좌로 세분화할 때 사용한다.
- `change`은 이더리움에서 사용하지 않는다. 비트코인에서 수신 주소(receiving address)와 잔액 주소(change address)를 구분하기 위해 사용한다.
- `address_index`는 주소 번호를 의미한다. 순차적으로 증가한다.

<br>
이제 자바스크립트로 확장 개인키와 자식키를 생성해보자.

```js
var Bitcore = require('bitcore-lib');

// 마스터 확장 개인키 생성
var xPriKey = new Bitcore.HDPrivateKey();

// 단절된 확장 자식 공개키 생성
var xPubKey = xPriKey.deriveChild("m/44'/60'/0'").hdPublicKey;

// 0번째 자식 공개키 생성
var pubKey = xPubKey.deriveChild("m/0/0").publicKey;
console.log(publicKey)
```

실행결과:
https://imgur.com/dOI6JdD.png

<br>

---

# 니모닉 코드 단어(BIP-39)

니모닉 코드 단어(mnemonic code words)는 순서대로 나열된 영어 단어에서 시드(seed)를 만드는 방법이다. 니모닉 코드는 [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) 표준에 정의되어 있다. 니모닉 코드를 사용하면 HD 지갑을 쉽게 복원할 수 있다.  니모닉 코드 단어열은 12 ~ 24 단어로 구성된다 

아래 두 시드를 비교해보면, 니모닉 시드가 쉽게 읽히고 종이에 적어서 백업하기 좋다.

###### 16진수 시드

```
FCCF1AB3329FD5DA3DA9577511F8F137
```

###### 12개의 단어 니모닉 시드

```
wolf juice proud gown wool unfair wall cliff insect more detail hub
```

<br>
자바스크립트를 사용하여 니모닉 시드에서 키를 생성해보자.

우선 **bitcore-mnemonic** 라이브러리를 설치한다.

```js
npm install bitcore-mnemonic --save
```

<br>
아래와 같이 니모닉 단어를 생성하고 니모닉으로 부터 개인키를 생성한다.

```js
var Mnemonic = require('bitcore-mnemonic');

// 니모닉 코드 생성
var code = new Mnemonic(Mnemonic.Words.ENGLISH);
console.log(code.toString());

// 니모닉 코드에서 개인키 생성
var xPriKey = code.toHDPrivateKey();
console.log(xPriKey);
```
실행 결과
https://imgur.com/NMCAnza.png

<br>
이제 앞에서 생성한 니모닉 단어로부터 개인키를 복원해보자.

```js
// 복원용 니모니 단어
var words = "damage clog alert hurt fork purchase iron cotton apple buffalo survey vast";

// 니모닉 단어로 부터 개인키 복원
var xPriKey = Mnemonic(words).toHDPrivateKey();
console.log(xPriKey);
```
실행 결과
https://imgur.com/oQsOIRB.png

> 참고로 [bip39](https://github.com/bitcoinjs/bip39) 라이브러리를 사용하면 한글을 니모닉 단어로 사용 할 수 있다.

<br>

만약 이더리움 지갑을 개발한다면 BIP-32, BIP-39, BIP-43, BIP-44 표준에 따라 니모닉 코드를 시드로 사용하는 HD지갑으로 구현하자.



여기까지 읽어주셔서 감사합니다.

> 지갑과 니모닉을 공부하면서 생소한 용어들이 많이 등장하였습니다. 한글로 어떻게 표기할지 몰라 임의로 번역하거나 영어 발음 그대로 작성한 문장이 많습니다. 이 글을 읽으면서 용어에 대한 일관성이 없어라도 이해 부탁드립니다.

---

이전글

- [이더리움(Ethereum) 공부 #1 - 키와 주소](https://steemit.com/@anpigon/ethereum-1)
