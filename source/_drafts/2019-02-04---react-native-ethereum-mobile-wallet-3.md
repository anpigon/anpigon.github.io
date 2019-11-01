---
title: "[React Native] 이더리움 모바일 지갑(Ethereum Mobile Wallet) 만들기 #3"
author: anpigon
date: "2019-02-04T02:00:21Z"
permalink: "/kr/@anpigon/react-native-ethereum-mobile-wallet-3"
tags:
  - "kr"
  - "kr-dev"
  - "busy"
  - "jjangjjangman"
  - "ethereum"
---
![](https://steemitimages.com/640x0/https://cdn.steemitimages.com/720x0/https://cdn.steemitimages.com/DQmTBYPHABLZoXJMWL9msssEoTsXz9LvVaK7dT49uXXGQi7/galaxy-2.png)



이번에는 니모닉으로 지갑키(PrivateKet)와 지갑주소를 생성합니다. 지갑주소는 공개키(PublicKey)에서 계산됩니다. 

<br><center>* * *</center><br>

# ethereumjs-util 라이브러리 설치

이더리움 주소를 계산하기 위해 아래 라이브러리를 설치합니다.

```bash
$ npm install --save ethereumjs-util
```

&nbsp;

이더리움 지갑키와 주소 계산에 필요한 라이브러리를 import 합니다.

```jsx
import bip32 from 'bip32';
import ethUtil from 'ethereumjs-util';
```

&nbsp;

마지막으로 `CreateWalletScreen.js`를 수정합니다.

```jsx
export default class CreateWalletScreen extends Component ｛

  // (...)

  _createWallet = async () => ｛
    const seed = bip39.mnemonicToSeed(this.state.mnemonic);
    // 마스터 키 생성
    const root = bip32.fromSeed(seed);
    // 이더리움 차일드 개인키 생성
    const xPrivKey = root.derivePath("m/44'/60'/0'/0/0");
    const privKey = xPrivKey.privateKey.toString('hex');
    // 이더리움 주소 생성
    let address = ethUtil.pubToAddress(xPrivKey.publicKey, true).toString('hex');
    // 이더리움 EIP-55 체크섬 주소로 변환
    address = ethUtil.toChecksumAddress(address).toString('hex');
    alert(address);
  ｝

  render() ｛
    return (
      <Container style=｛styles.container｝>
        <View style=｛｛ flex: 1, padding: 10 ｝｝>
          <View style=｛｛ flex: 1 ｝｝>
            ｛/* (...) */｝
          </View>
          <View style=｛｛ flex: 1 ｝｝>
            <Button block primary
              onPress=｛() => this._createWallet()｝>
              <Text>생성하기</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  ｝
｝
```

> 1. 지갑 생성하는 `_createWallet()` 함수를 생성합니다. 그리고 생성하기 버튼의 `onPress` 속성에 `｛() => this._createWallet()｝`를 입력합니다. 이제 생성하기 버튼을 누르면 `_createWallet()` 함수를 호출할 것입니다.
> 2. `_createWallet()` 함수는 니모닉에서 시드(*SEED*) 를 계산합니다.
> 3. 그리고 [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)를 사용하여 시드에서 확장 개인키(*HDPrivateKey*)를 계산합니다.
> 4. 그다음 **HDPrivateKey**에서 이더리움 **PrivateKey**를 계산합니다. 이더리움 **PrivateKey는** [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)에 따라 생성(derivation) 됩니다. 그리고 **derivePath**는 이와 같은 형태입니다.  `m/purpose'/coin_type'/account'/change/address_index` 
>   우리는 HD지갑이 목적이 아니므로 단순하게 `m/44'/60'/0'/0/0`를 사용하여 지갑키를 생성합니다.
> 5. 마지막으로 공개키(PublicKey)에서 주소를 계산합니다. 그리고 [EIP-55](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md) 규칙에 따라 체크섬이 포함된 주소로 변환합니다.

&nbsp;

이제 생성 버튼을 누르면 아래와 같이 지갑 주소가 생성됩니다. 확인하기 쉽게 **Alert** 으로 출력하였습니다.

![](https://cdn.steemitimages.com/300x0/https://cdn.steemitimages.com/DQmNpZzkAyNvbWbU6RtKkgEt4XwbrkvNahB4HhAXoUR8SG7/％E1％84％89％E1％85％B3％E1％84％8F％E1％85％B3％E1％84％85％E1％85％B5％E1％86％AB％E1％84％89％E1％85％A3％E1％86％BA％202019-02-03％2016.11.31.png)

&nbsp;

이더리움 모바일 지갑앱 개발을 하면서, 개발 과정을 정리하여 포스팅까지 하려니 시간이 2~3배 정도 걸리네요.

여기까지 읽어주셔서 감사합니다.



