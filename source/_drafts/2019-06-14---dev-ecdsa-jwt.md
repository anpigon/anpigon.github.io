---
title: "[DEV] ECDSA 서명으로 JWT 토큰 생성 및 검증하기"
author: anpigon
date: "2019-06-14T01:40:03Z"
permalink: "/sct/@anpigon/dev-ecdsa-jwt"
tags:
  - "sct"
  - "kr"
  - "kr-dev"
  - "jjm"
  - "busy"
---
![](https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmXtBYt3kXFAhrVjuGUGa5TQrgUZ2nL8npNsg67WYqZQ57/11A557AA-ADD4-484C-AD9E-FCD37D09C38B.jpeg)
***

안녕하세요. 안피곤입니다.

ECDSA는 암호화폐에 가장 많이 사용되는 암호화 알고리즘입니다. 그리고 RSA 보다 성능이 더 좋다고 알려져 있습니다. 그리고 JWT(JSON Web Token)은 보안 및 인증에 가장 많이 사용되고 있습니다. 이 2개를 가지고 토큰을 생성하고 인증 하는 방법을 구현합니다.

보통은 JWT 생성에 SHA 해시 알고리즘을 사용하는 HMAC을 사용합니다. 이것은 단방향 암호화 방식입니다. 하지만 ECDSA를 사용하면  비대칭키를 사용하기 때문에 부인 방지 및 메세지 인증을 처리 할수 있습니다. 참고로 부인은 여러분이 생각하는 그 부인은 아닙니다.


<br>
<center>* * *</center>
<br>

구현을 위해선는 아래 두 라이브러리가 필요합니다.

```js
const jwt = require("jsonwebtoken");
const ECDSA = require('ecdsa-secp256r1');
```
>**참고:** 
https://www.npmjs.com/package/jsonwebtoken
https://www.npmjs.com/package/ecdsa-secp256r1

<br>

# ECDSA 키 생성

```js
const privateKey = ECDSA.generateKey()
 
privateKey.toJWK()
/*
｛ kty: 'EC',
  crv: 'P-256',
  x: '4YdUIhIDncVu5tScgjxthiXOO_el11FWb56gR3qnhVQ',
  y: 'UyEvWOJbMZa9PtggGeRC9iQcAzOZZsyXpFE1qaF6jFk',
  d: 'TYVI2fW-nHSPGCx0MhWasg2Ggiyl1E_Kq4D1A5LmkxU' ｝
*/
 
privateKey.asPublic().toJWK()
/*
｛ kty: 'EC',
  crv: 'P-256',
  x: '4YdUIhIDncVu5tScgjxthiXOO_el11FWb56gR3qnhVQ',
  y: 'UyEvWOJbMZa9PtggGeRC9iQcAzOZZsyXpFE1qaF6jFk' ｝
*/
 
privateKey.toPEM()
/*
-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgTYVI2fW+nHSPGCx0
MhWasg2Ggiyl1E/Kq4D1A5LmkxWhRANCAAThh1QiEgOdxW7m1JyCPG2GJc4796XX
UVZvnqBHeqeFVFMhL1jiWzGWvT7YIBnkQvYkHAMzmWbMl6RRNamheoxZ
-----END PRIVATE KEY-----
*/
 
privateKey.asPublic().toPEM()
/*
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE4YdUIhIDncVu5tScgjxthiXOO/el
11FWb56gR3qnhVRTIS9Y4lsxlr0+2CAZ5EL2JBwDM5lmzJekUTWpoXqMWQ==
-----END PUBLIC KEY-----
*/
 
privateKey.toCompressedPublicKey()
/*
A+GHVCISA53FbubUnII8bYYlzjv3pddRVm+eoEd6p4VU
*/
```

<br>

# ECDSA 서명 하기

```js
const message = ｛ text: 'hello' ｝
privateKey.sign(JSON.stringify(message))
/*
lY3Lf9xDtcsqom5IKu+ZyikxeYHlEuxnPfme4lMxp76NMkIm5BiLxVjbqBSo4itfT/LEuBCzMXl11cB0w/X8dA==
*/
```

<br>

# ECDSA 서명 검증

```js
const key = 'A+GHVCISA53FbubUnII8bYYlzjv3pddRVm+eoEd6p4VU'
const publicKey = ECDSA.fromCompressedPublicKey(key) // or ECDSA.fromJWK
const message = ｛ text: 'hello' ｝
const signature = 'lY3Lf9xDtcsqom5IKu+ZyikxeYHlEuxnPfme4lMxp76NMkIm5BiLxVjbqBSo4itfT/LEuBCzMXl11cB0w/X8dA=='
 
publicKey.verify(JSON.stringify(message), signature)
/*
true
*/
```

<br>
<center>* * *</center>
<br>

# JWT 토큰 생성하기

`ES256`는 P-256 곡선과 SHA-256 해시 알고리즘을 사용하는 ECDSA입니다. 다른 알고리즘은 [여기 문서](https://www.npmjs.com/package/jsonwebtoken#algorithms-supported)를 참고하세요.

```js
const privateKey = fs.readFileSync('private.key'); // or privateKey.toPEM();
const payload = ｛ accessKey: 'hello' ｝;
const jwtToken = jwt.sign(payload, privatekey, ｛ algorithm: 'ES256' ｝);
```

<br>

# JWT 토큰 검증하기

```js
const publicKey = publicKey.toPEM();
const result = jwt.verify(jwtToken, publicKey, ｛ algorithm: 'ES256' ｝);
```

<br>
# JWT 토큰 복호화하기

jwt 토큰 복호화 하여 내용을 확인합니다.

```js
const decodedToken = jwt.decode(jwtToken, ｛ algorithm: 'HS256' ｝);
```

<br>


<br>해피 코딩하세요~!

***

<center>![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)</center>