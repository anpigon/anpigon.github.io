---
title: '이더리움(Ethereum) 공부 #3 - 트랜잭션과 서명'
tags:
  
  
  
  
  
author: anpigon
date: 2018-09-07 09:46:06
---

안녕하세요. @anpigon입니다.

<div class='pull-right'><img src='https://steemitimages.com/150x0/https://images-na.ssl-images-amazon.com/images/I/51eW3hlp3jL._SX379_BO1,204,203,200_.jpg'></div>

**마스터 이더리움(Mastering Ethereum)** 책을 보면서 정리한 글입니다. 아직 전체 내용을 다 보지는 못하였습니다. 하지만 궁금한 사항을 댓글로 문의하면, 최대한 답변해드리도록 노력하겠습니다. 
> 책 전체 내용은 깃허브에서 볼 수 있습니다.
https://github.com/ethereumbook/ethereumbook

___

<br>


자바스크립트에서는 [web3.js](https://github.com/ethereum/web3.js)를 사용하여 이더리움 네트워크와 연동한다. 아래와 같이 설치하여 사용한다.

```bash
$ npm install web3
```

<br>또는, 브라우저에서 동작하는 경우에는 CDN를 사용한다.

```xml
<script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js"></script>
```

# 트랜잭션(Transactions)

**트랜잭션(Transactions)**은 외부 소유 계정(EOA)에서 생성되어 이더리움 블록체인에 기록된 서명된 메시지다. 트랜잭션을 통해서만 이더(ether)를 전송하거나, 이더리움 가상 머신(EVM)에 있는 컨트랙트를 실행 할 수 있다.

## 트랜잭션의 구조

트랜잭션은 다음과 같은 필드로 구성된다.

- **nonce**: EOA에 발급되는 트랜잭션 일련번호.
- **gas price**: 가스 가격
- **gas limit**: 가스의 최대 사용량
- **to**: 수신자 주소
- **value**: 수신자에게 보내는 이더(ether) 개수
- **data**: 가변길이의 바이너리 데이터(payload)
- **v, r, s**: ECDSA 서명 구성 요소


트랜잭션에는 발신자 주소를 의미하는 **from** 필드를 포함하지 않는다. 발신자의 공개키는 ECDSA 서명의 구성요소(v,r,s)에서 계산 할 수 있기 때문이다. 그리고 공개키에서 주소를 계산할 수 있다.
<br>

---

## nonce

**nonce**는 EOA가 생성하여 블록체인에 기록된 트랜잭션 개수이다. nonce는 트랜잭션의 중복 전송을 방지하는데 사용된다.

예를 들면, *10 ether*를 가지고 있는 계정이 있다. 그리고 이 계정에서 *6 ether*를 소비하는 두 개의 `트랜잭션 nonce 1`과 `트랜잭션 nonce 2`에 서명하여 전송한다. 이더리움 노드는 트랜잭션을 수신한 순서가 아닌 **nonce**의 순서로 처리한다. `트랜잭션 nonce 1`이 성공적으로 처리되면 계정의 잔액을 *4 ether*로 줄인다. 그리고 `트랜잭션 nonce 2`는 잔액이 부족하므로 유효하지 않은 것으로 간주한다. 그러나 `트랜잭션 nonce 2`가 먼저 수신되면 노드는 이를 유지하고 `트랜잭션 nonce 1`이 도착할 때 까지 트랜잭션의 유효성을 검사하지 않는다.


아래와 같이 web3를 사용하여 **nonce**를 조회 할 수 있다.

```js
const address = "0x57FC45cc929f84eC95cd6C6903bBcA8d1164d0B3"
web3.eth.getTransactionCount(address, function(error, result) ｛
  console.log(result)
｝)
```

새로운 트랜잭션을 생성할 때, 다음 **nonce**를 조회하여 트랜잭션에 포함해야 한다. 그러나 트랜잭션이 블록체인에 기록(채굴)되기 전까지는 `getTransactionCount()` 함수의 합계에 포함되지 않는다. 그래서 블록체인에 기록되기 전인 pending 상태의 트랜잭션은 프로그램상에서 계산하여 저장하고 있어야 한다.
<br>

---

## gas price

가스(gas)는 이더(ether)와는 별도의 가상 화폐다. 가스는 DDoS 공격이나 악의적으로 자원을 소모하게 하는 트랜잭션을 방지하기 위해 사용된다.

트랜잭션에 포함되는 **gasPrice** 필드는 트랜잭션 생성자가 가스 가격을 설정할 수 있다. 가스 가격은 GWei 단위를 사용한다. 현재 이더리움 네트워크의 가스 정보는 [ethgasstation.info](https://ethgasstation.info/)에서 확인 할 수 있다.

트랜잭션의 가스 가격을 높게 설정하면 블록체인에 더 빨리 기록된다. 설정할 수 있는 최소 가스 가격은 **0**이며, 이것은 수수료가 없는 트랜잭션을 의미한다. 채굴자 입장에서는 보상받을 수 있는 가스비가 높은 순으로 블록체인에 기록하기 때문에, 가스비가 낮은 트랜잭션은 우선순위가 낮을 수밖에 없다.

아래와 같이 web3을 사용하여 이더리움 네트워크 평균 가스 가격을 조회할 수 있다. 이것은 말 그대로 네트워크에서 소비된 가스의 평균 가격이다.

```js
web3.eth.getGasPrice(function(err, res) ｛
  console.log(res.toNumber())
｝)
```

<br>

---

## gas limit

가스와 관련된 두 번째 중요한 값은 **gasLimit**이다. gasLimit는 트랜잭션을 처리하는데 사용할 최대 가스 개수를 설정한다. 단순하게 하나의 EOA에서 다른 EOA로 이더(ether)를 전송하는 트랜잭션에 필요한 가스량은 21,000개로 고정되어 있다. 따라서 이더 전송에 소비되는 수수료를 계산하려면 가스 가격에 21,000를 곱하면 된다.

```js
web3.eth.getGasPrice(function(err, res) ｛
  console.log(res * 21000)
｝)
```

트랜잭션 목적지가 컨트랙트 주소인 경우에는 필요한 가스량을 추정할 수는 있지만 정확하게 계산할 수는 없다. 컨트랙트 호출에 필요한 가스량은 컨트랙트 실행이 완료된 후에 결정된다. 

만약 **gasLimit**를 컨트랙트가 실행하는데 필요한 가스량보다 적게 설정한 경우, 컨트랙트는 실행되지 못하고 가스 비용만 소비하게 된다. 대부분은 **gasLimit**를 초과하여 설정한다. 왜냐하면 컨트랙트가 실행되면 실제로 사용된 가스 비용만 차감하기 때문이다. 그리고 **gasLimit**는 잘못된 컨트랙트 호출로 인해 예상치보다 많은 가스 비용을 사용하는 것을 방지해준다.
<br>

---

## to

**to** 필드는 수신자(도착지) 주소를 의미한다. 수신자 주소는 EOA 또는 컨트랙트 주소이다. 이더리움 네트워크에서는 주소를 검증하지 않는다. 따라서 잘못된 주소로 전송된 이더는 영원히 사용할 수 없게 된다.
<br>

---

## value와 data

트랜잭션에서 가장 중요한 "payload"는 value와 data라는 두 개의 필드에 의해 사용된다. 트랜잭션은 다음과 같이 네 가지 조합이 가능하다. '*value와 data 둘다 사용*', '*value만 사용*', '*data만 사용*', '*value와 data 둘다 없음*'.

value만 있는 트랜잭션은 **송금(payment)** 이다. 그리고 데이터만 있는 트랜잭션은 **컨트랙트 호출(invocation)**이다. value도 data도 없는 트랜잭션은 그냥 가스 낭비다.


## value 전송

**value**을 포함하는 트랜잭션은 **송금(payment)**이라고 보면 된다. EOA 주소 또는 컨트랙트 주소로 **value**를 포함한 트랜잭션을 전송하면 해당 계정의 ether 잔액에 **value**가 추가된다. 하지만, 이 트랜잭션은 EOA 주소와 컨트랙트 주소에서는 다르게 작동한다.

대상 주소(to)가 컨트랙트 주소인 경우에는 EVM이 컨트랙트를 실행하고 트랜잭션의 data에 지정된 함수를 호출하려고 시도한다. 트랜잭션에 data가 없으면 EVM에서 대상 컨트랙트의 *이름없는(fallback)* 함수를 호출한다. 그리고 해당 함수가 송금가능(payable)인 경우에는 다음에 수행할 작업을 결정하기 위해 해당 함수를 실행한다. 송금가능(payable) 함수가 성공적으로 실행완료되면 컨트랙트의 ether 잔액에 송금된 금액을 반영하여 컨트랙트 상태가 업데이트된다.

만약 트랜잭션에 **data**가 포함되어 있으면 이 트랜잭션은 컨트랙트 주소로 처리될 가능성이 크다. 트랜잭션에 포함된 데이터는 EVM에 의해 **함수 호출(function invocation)** 로 해석되고 **data**에 지정된 함수가 호출된다.
<br>

---

## 디지털 서명(ECDSA, Elliptic Curve Digital Signature Algorithm)

이더리움은 디지털 서명에 ECDSA(Elliptic Curve Digital Signature Algorithm) 알고리즘을 사용한다. ECDSA는 타원 곡선 개인/공개키를 기반으로하는 디지털 서명에 사용하는 알고리즘이다. 디지털 서명은 이더 소유를 증명하고 부인 방지하는데 사용된다.

> ECDSA를 더 자세히 알고 싶으면 단계별로 설명해주는 가이드 문서를 참고하세요. http://bit.ly/2r0HhGB

<br>이더리움의 서명된 메세지는 RLP로 인코딩된 트랜잭션 데이터의 Keccak256 해시이다. 코드로 나타내면 다음과 같다.

```
Sig = sign(keccak256(rlp.encode(tx.raw)), privateKey)
```

<br>sign함수는 일반적으로 R과 S값으로 구성된 서명 Sig를 생성한다.

```
Sig = (R, S)
```

<br>이더리움 트랜잭션 서명은 다음 순서로 진핸된다.

1. nonce, gasPrice, gasLimit, to, value, data, v, r, s의 9개 필드를 포함하는 트랜잭션 데이터 구조를 만든다.
2. 트랜잭션을 RLP 인코딩하여 serialize한다.
3. 이 serialize 메시지의 Keccak256 해시를 계산한다.
4. EOA의 개인키로 해시를 ECDSA 서명한다.
5. ECDSA 서명의 계산된 r과 s값을 트랜잭션에 삽입한다.
<br>

---

## raw 트랜잭션 생성하여 서명하기

이더리움 트랜잭션 생성에는 [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx)를 사용한다. 이더리움 트랜잭션을 **생성**하여 **서명**하고 **전송**해 보자

```js
const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

let web3
if (typeof web3 !== 'undefined') ｛
  web3 = new Web3(web3.currentProvider)
｝ else ｛
  // Set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
｝

// EOA 계정 주소
const fromAddress = '0xf6d0B5f612dEecB00345D...'
const toAddress = '0xDf6d0B5d345EecB00f612...'

// 1. nonce 값 조회
web3.eth.getTransactionCount(fromAddress, function(err, nonce) ｛

  // 2. 트랙잭션 데이터 생성
  const txParams = ｛
    nonce: web3.toHex(nonce),
    to: toAddress,
    value: web3.toHex(web3.toWei(0.1, 'ether').toNumber()), // 0.1 이더
    gasPrice: web3.toHex(web3.toWei(1, 'Gwei').toNumber()), // 가스 가격
    gasLimit: web3.toHex(300000), // 가스 최대 사용량
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 3, //네트워크 ID(3=Ropsten Tesetnet) 
  ｝
  const tx = new EthereumTx(txParams)

  // 3. 트랜잭션 서명
  const privateKey = Buffer.from('91c8360c4cb4b5fac45513a7213f31d4e4a7bfcb4630e9fbf074f42a203ac0b9', 'hex')
  tx.sign(privateKey)

  // 4. 트랜잭션 전송하기
  const serializedTx = '0x' + tx.serialize().toString('hex')
  web3.eth.sendRawTransaction(serializedTx, function(err, txId) ｛
    if (!err) ｛
      console.log('txId: ', txId) // 트랜잭션ID값
    ｝
  ｝)
｝)
```

<br> 서명 검증이나 공개키 계산은 ethereumjs-tx를 이용하면 아래와 같이 간단하게 처리할 수 있다.

###### 트랜잭션 서명 검증하기

```js
if (tx.verifySignature()) ｛
  console.log('서명 검증 완료!')
｝
```

###### 서명에서 발신자 주소 계산하기

```js
console.log('발신자 주소: ' + tx.getSenderAddress().toString('hex'))
```

<br>

---

## 단순 반복 공격 방지(EIP-155)

[EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md)은 **"단순 반복 공격 방지(Simple Replay Attack Protection)"**를 위한 제안이다. 서명하기 전 트랜잭션 데이터 내부에 체인ID(chain identifier)를 포함한다 . 이렇게하면 하나의 블록체인(메인넷)에서 생성된 트랜잭션이 다른 블록체인(이더리움 클래식 또는 테스트넷)에서 유효하지 않다. 하나의 네트워크에서 브로드 캐스트되는 트랜잭션을 다른 네트워크에서 반복하여 사용할 수 없기 때문에 "반복 공격 보호(replay attack protection)"라고 한다.


EIP-155가 적용된 서명을 코드로 나타내면 아래와 같다.

###### r, s, v 값 계산하기

```js
const secp256k1 = require('secp256k1')

// EIP 155 chainId - mainnet: 1, ropsten: 3
const chainId = 1
let v = chainId
v -= chainId * 2 + 8

// Keccak256 hash of the RLP-encoded data
const msgHash = keccak(rlp.encode(tx.raw))

// sign a transaction with a given private key
const sig = secp256k1.sign(msgHash, privateKey)
sig.r = sig.signature.slice(0, 32)
sig.s = sig.signature.slice(32, 64)
sig.v = sig.recovery + 27
sig.v += chainId * 2 + 8
```

###### r, s, v 값에서 발신자 공개키 계산하기

```js
const signature = Buffer.concat([setLength(r, 32), setLength(s, 32)], 64)
const recovery = v - 27

const senderPubKey = secp256k1.recover(msgHash, signature, recovery)
const senderPubKey =  secp256k1.publicKeyConvert(senderPubKey, false).slice(1)
```



<br>

ECDSA 서명은 너무 복잡하여 제 수학적 머리로는 이해하기 어려웠습니다. 그래서 서명에 관련된 내용은 설명이 많이 부족합니다. &#128549;



여기까지 읽어주셔서 감사합니다.

---

이전글

- [이더리움(Ethereum) 공부 #1 - 키와 주소](https://steemit.com/@anpigon/ethereum-1)
- [이더리움(Ethereum) 공부 #2 - HD 지갑과 니모닉 코드](https://steemit.com/@anpigon/ethereum-2-hd)
