---
title: "[머신러닝] 네이버 API를 이용한 얼굴 인식하기 - 닮은 유명인 찾기"
author: anpigon
date: "2018-10-05T07:42:54Z"
permalink: "/kr/@anpigon/openapi-naver-vision-face"
tags:
  - "kr"
  - "kr-dev"
  - "얼굴인식"
  - "머신러닝"
  - "busy"
---
안녕하세요. @anpigon입니다. 

최근에 @codingart님의 [OpenCV를 이용한 얼굴 인식](https://steemit.com/kr/@codingart/6-6-stretch-3-opencv3-3-x-files-face-eye) 시리즈를 읽고나서 얼굴 인식에 관심이 생겼습니다. OpenCV로 얼굴인식 구현하는게 어려워서 인터넷을 찾아봤는데, 네이버에서 얼굴 인식 API를 제공하는 것을 알게 되었습니다. [네이버 Clova Face Recognition API](https://developers.naver.com/products/clova/face/)를 이용해서 얼굴인식 하는 것을 간단하게 만들어 보겠습니다.


![](https://imgur.com/LkmOsmk.png)

우선 네이버에서 **"오픈 API 이용 신청"**을 하여 키를 발급받았습니다. 처리한도가 하루에 1,000건 이네요. 이 정도면 테스트하는데 문제 없을 것 같습니다.

<br><hr><br>


<br>아래는 네이버에서 제공하는 파이썬 구현 예제 소스입니다. 그냥 복사&붙여넣기 했습니다.
```
import os
import sys
import requests
client_id = "YOUR_CLIENT_ID"
client_secret = "YOUR_CLIENT_SECRET"
# url = "https://openapi.naver.com/v1/vision/face" # 얼굴감지
url = "https://openapi.naver.com/v1/vision/celebrity" # 유명인 얼굴인식
files = ｛'image': open('YOUR_FILE_NAME', 'rb')｝
headers = ｛'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret ｝
response = requests.post(url,  files=files, headers=headers)
rescode = response.status_code
if(rescode==200):
    print (response.text)
else:
    print("Error Code:" + rescode)
```

<br>저는 요즘 Node.js 보다 파이썬으로 구현하는게 더 편해졌습니다. 혹시 javascipt로 구현하실 분은 node 샘플 소스를 사용하면 됩니다.


<br><hr><br>


<br>스팀잇을 창조하신 네드형님의 프로필 사진으로 얼굴 인식을 테스트 해보겠습니다.

먼저 스팀잇 서버에서 네드형님 사진을 다운로드 합니다. 다들 아시겠지만 본인의 프로필 사진의 URL은 `https://steemitimages.com/u/사용자이름/avatar` 형태가 됩니다.

```
import urllib.request
from PIL import Image, ImageDraw

file_name =  'ned.jped'
image_url = 'https://steemitimages.com/u/ned/avatar'
urllib.request.urlretrieve(image_url, file_name)
Image.open(file_name)
```

https://imgur.com/afovRv8.png
이제 테스트할 사진이 준비되었습니다. 잘 생겼네요.

<br><hr><br>

네이버 CFR API를 이용하여 얼굴 인식 결과를 받아보겠습니다.

```
files = ｛'image': open(file_name, 'rb')｝
url = "https://openapi.naver.com/v1/vision/face" # 얼굴감지
headers = ｛'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret ｝
response = requests.post(url,  files=files, headers=headers)
rescode = response.status_code
if(rescode==200):
    print (response.text)
```
![](https://imgur.com/RIsbouZ.png)
얼굴 인식 결과가 나왔습니다. 하지만 JSON 형태의 데이터라서 읽기 힘듭니다. 보기 쉽게 출력해보겠습니다.

<br><hr><br>

[CFR API 가이드 문서](https://developers.naver.com/docs/clova/api/CFR/API_Guide.md#APIReference)를 읽어보면 `faces[].roi` 에 감지된 얼굴의 좌표와 크기 정보가 있다고 합니다. 이 데이터를 사용하여 사진에 얼굴 영역을 표시해봅시다.

```
import json

json_data = json.loads(response.text)
x, y, w, h = json_data['faces'][0]['roi'].values()

target_image = Image.open(file_name)
draw = ImageDraw.Draw(target_image)
draw.rectangle(((x,y), (x+w,y+h)), outline="red")
target_image
```

![](https://imgur.com/5npUiz5.png)
감지된 얼굴 영역에 붉은 박스가 표시되었습니다.

<br><hr><br>

마지막으로 성별, 나이, 감정, 얼굴방향을 읽기 쉽게 출력합니다.

```
gender, gen_confidence = json_data['faces'][0]['gender'].values() # 성별
age, age_confidence = json_data['faces'][0]['age'].values() # 나이
emotion, emotion_confidence = json_data['faces'][0]['emotion'].values() # 감정
pose, pose_confidence = json_data['faces'][0]['pose'].values() # 얼굴 방향

result = """
성별: ％s (％s)
나이: ％s (％s)
감정: ％s (％s)
방향: ％s (％s)
""" ％ (
    gender, gen_confidence,
    age, age_confidence,
    emotion, emotion_confidence,
    pose, pose_confidence
)
print(result)
```

![](https://imgur.com/5pjJFva.png)
성별은 남성. 그리고 나이는 25 ~ 29세가 나왔습니다. 네드형님 나이가 이게 맞나요? 앞으로 네드동생이라고 불러야겠네요.ㅋ

<br><hr><br>

하는 김에 네드형님과 닮은 유명인도 찾아보았습니다.
```
files = ｛'image': open(file_name, 'rb')｝
url = "https://openapi.naver.com/v1/vision/celebrity" # 유명인 얼굴인식
headers = ｛'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret ｝
response = requests.post(url,  files=files, headers=headers)
rescode = response.status_code
if(rescode==200):
    print (response.text)
```

![](https://imgur.com/siLnhc5.png)
이동욱과 **42.86％** 일치한다는 결과가 나왔습니다. 이 정도면 이동욱과 형제라고 해도 되겠습니다.

<br><hr><br>

네이버에 샘플 소스가 있어서 금방 구현했네요. ~~그리고 이 포스팅에는 봇을 구현해서 달아볼 생각입니다. 적용되면 알려드릴께요.ㅋ~~

이 포스트에는 @아이디 맨션 또는 이미지를 업로드하면 얼굴인식 결과를 댓글로 달아드립니다. 재미삼아 한번 해보세요~ㅋㅋ

여기까지 읽어주셔서 감사합니다.