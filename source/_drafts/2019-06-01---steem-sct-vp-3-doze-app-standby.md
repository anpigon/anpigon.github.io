---
title: "STEEM/SCT 보팅파워(VP) 안드로이드 위젯 #3 - Doze와 앱 대기(App Standby) 이야기"
author: anpigon
date: "2019-06-01T07:22:18Z"
permalink: "/sct/@anpigon/steem-sct-vp-3-doze-app-standby"
tags:
  - "sct"
  - "kr"
  - "kr-dev"
  - "busy"
  - "thegivingtree"
---
![](https://files.steempeak.com/file/steempeak/anpigon/Tag0yss8-image.png)

안녕하세요. 안피곤입니다.

사실 스팀 위젯에 기능을 업데이트를 할 계획은 없었습니다. 그런데 막상 구현하고 보니 욕심이 계속 생깁니다. 앱에 버그도 있고 기능도 거의 없는게 계속 마음에 걸리네요. 

그리고 위젯 UI 디자인은 포기했습니다. 해상도, OS 버전, 시스템 폰트 크기와 글꼴에 영향을 많이 받습니다. 안드로이드 UI 개발은 경험이 없어서 매우 어렵습니다. ㅠㅠ

이번에 @griend96님이 제안하신 기능을 넣었습니다. 바탕화면에 위젯을 여러개 설치할 수 있습니다. 부 계정을 여러개 가지고 있는 스팀잇 사용자에게는 유용할 것 같습니다.

<br>

***사용 예시***
![](https://cdn.steemitimages.com/250x0/https://files.steempeak.com/file/steempeak/anpigon/kodrdzTA-Screenshot_20190601-101605_One20UI20Home.jpg)

> 저는 **완(WHAN)팀** 멤버들을 바탕화면 위젯에 추가하여 모니터링(?) 하고 있습니다. 이제 **완팀**에 @griend96도 합류하셔서 이제 6명이 되었습니다. 축하해주세요. ㅋ

<br>
<br>

## 사용방법

사용 방법은 매우 간단합니다. 아래 순서만 지키면 누구나 쉽게 바탕화면에 위젯을 추가할 수 있습니다. 저는 매우 직관적이고 간단한 사용방법을 구현하기 위해서 항상 노력합니다.

|1. 바탕화면에 위젯을 추가한다.|2. 스팀잇 아이디를 입력하고 확인을 누른다.
|-|-|
|![](https://cdn.steemitimages.com/250x0/https://files.steempeak.com/file/steempeak/anpigon/atXUHDQq-Screenshot_20190601-101738_One20UI20Home.jpg)|![](https://cdn.steemitimages.com/250x0/https://files.steempeak.com/file/steempeak/anpigon/ElGpvgWp-Screenshot_20190601-101805_Steem20Widget.jpg)|

<br>
<br>

## Doze 모드와 앱 대기(App Standby) 모드 이야기
Android 6.0 마시멜로(API 레벨 23)부터 [Doze 모드](https://developer.android.com/training/monitoring-device-state/doze-standby?hl=ko)라는 게 존재합니다. 앱이 Doze 모드나 앱 대기 모드(App Standby)에 들어가게 되면 네트워크 엑세스, Wake Lock, SyncAdapter, JobScheduler, AlarmManager이 작동하지 않게됩니다. 

**"이 이유 때문에 위젯앱 설치하고 하루가 지나면 업데이트가 되지 않았던 것입니다."**

하지만 충전 중일때는 두 모드에서 빠져나옵니다. 해당 모드는 배터리를 아낄수 있어서 사용자에게는 매우 좋습니다. 하지만 개발자에겐 헬입니다. ㅠㅠ

그리고 삼성 갤럭시폰에는 스마트매니저(Smart Manager) 라는 녀석도 있습니다. 스마트 매니저는 장기간 사용하지 않는 앱을 강제로 잠재워 버립니다. *자장~ 자장~* ㅋ 

![](https://cdn.steemitimages.com/250x0/https://files.steempeak.com/file/steempeak/anpigon/P5mfKs9t-dog-1639528_640.jpg)

결국 저는 Doze, App Standby, Smart Manager에 항복했습니다. 해당 모드에서 빠져나가는 것은 코드 레벨에서 처리할 수 없다고 판단내렸습니다.

Background Service를 버리고 Foreground Service로 개발하였습니다. Foreground Service는 해당 모드 영향을 안받는다고 합니다. 대신 서비스 동작시 상태바에 노티 알람 발생합니다.

![](https://files.steempeak.com/file/steempeak/anpigon/0J6WGmza-Screenshot_20190601-101622_One20UI20Home.jpg)
> 위 화면에서 보는 거와 같이 서비스가 동작 중일때는 상태바에 아이콘이 표시됩니다. 만약 노티에 아이콘이 오랫동안 보인다면 사용자가 강제로 종료시킬 수 있습니다.

<br>
<br>

<center>*</center>

<br>
<br>

## 노티 알람 발생시 진동과 소리를 없애기

<br>노티 알람 발생시 진동과 소리를 없애려면 아래와 같이 설정하세요.
```
NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "SteemWidget Service Channel", NotificationManager.IMPORTANCE_LOW);
((NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE)).createNotificationChannel(channel);
NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID);
builder.setSmallIcon(R.mipmap.ic_launcher);
builder.setVibrate(null);
builder.setSound(null);
startForeground(1, builder.build());
```
> [Stack Overflow](https://stackoverflow.com/)에서는 `builder.setVibrate(null)` 와 `builder.setSound(null)` 적용하면 된다고 했습니다. 그런데 적용해도 진동과 소리가 발생합니다. 저는 채널에 `NotificationManager.IMPORTANCE_LOW`를 설정하니 진동과 소리가 나지 않습니다.

<br>
<br>

## 보팅 파워 계산 로직

안드로이드 Java 코드에서 보팅 파워는 다음과 같이 계산합니다. ISO 날짜 파싱을 위해서 `SimpleDateFormat`를 사용하였습니다.

```
private static final long VP_REGENERATION_SECS_STEEM = 432000;

    public static String calculateVotingPower(String lastVoteTime, int votingPower) ｛
        try ｛
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
            Date d = df.parse(lastVoteTime+"+00:00");
            double elapsed = (new Date().getTime() - d.getTime()) / 1000;
            double vp = votingPower + (10000.0 * elapsed) / VP_REGENERATION_SECS_STEEM;
            vp = Math.min(Math.floor(vp) / 100, 100);
            return String.valueOf(vp);
        ｝ catch(Exception ex) ｛
             Log.e(TAG,"", ex);
        ｝
        return "0";
    ｝
```

>  날짜 계산에 [Joda Time](https://www.joda.org/joda-time/) 라이브러리를 사용하고 싶었습니다. 하지만 React Native에서 릴리즈 빌드시 오류가 발생합니다. ㅠㅠ Low Level에서 오류가 발생하는 것 같아서 원인을 찾다가 포기했습니다.

<br><hr>

* **구글 스토어 다운로드 링크:** https://play.google.com/store/apps/details?id=com.steem_widget

<hr><br>

리액트 네이티브 기반으로 스팀 위젯 앱 개발을 시작했습니다. 그런데 구현하다보니 여러가지 문제(?)로 위젯 기능을 안드로이드 Java로 다시 구현했습니다. 요 몇일동안 구글 문서보면서 Android 공부하느라 기능 업데이트가 늦어졌습니다. 그리고 피드백은 댓글로 남겨주세요.

위젯 기능을 제외하고는 다른 기능은 리액트 네이티브로 구현하면서 조금씩 업데이트 해보려고 합니다. ㅋ 참고로 저는 본업은 백엔드 개발자입니다. 프론트엔드와 모바일 개발은 취미로  하고 있습니다. 취미로 하는 개발이 더 재미있습니다.

<br>

마지막으로 안드로이드 위젯 개발하면서 참고했던 블로그 자료를 모두 공유합니다. 

오늘도 해피 코딩하세요~!

<br>

---

###### 관련 자료

* **Doze 및 앱 대기 모드 최적화 | Android Developers:** https://developer.android.com/training/monitoring-device-state/doze-standby?hl=ko
* **백그라운드 실행 제한 | Android Developers:** https://developer.android.com/training/monitoring-device-state/doze-standby?hl=ko
* **Android 8.0 동작 변경 사항 | Android Developers:** https://developer.android.com/about/versions/oreo/android-8.0-changes?hl=ko
* **Android O에서의 백그라운드 처리를 위한 JobIntentService:** https://medium.com/til-kotlin-ko/android-o％EC％97％90％EC％84％9C％EC％9D％98-％EB％B0％B1％EA％B7％B8％EB％9D％BC％EC％9A％B4％EB％93％9C-％EC％B2％98％EB％A6％AC％EB％A5％BC-％EC％9C％84％ED％95％9C-jobintentservice-250af2f7783c
* **Doze 모드에서 서비스 실행 방법:** https://hashedin.com/blog/save-your-android-service-from-doze-mode/
* **Android 오레오(API 26)에서 백그라운드 서비스 유지하는 방법**: https://android.jlelse.eu/keep-those-background-services-working-when-targeting-android-oreo-sdk-26-cbf6cc2bdb7f
* **[Android] 배터리 최적화 대응하기: 도즈(Doze)와 어플 대기모드(App Standby)**: https://m.blog.naver.com/PostView.nhn?blogId=nife0719&logNo=221029613969&categoryNo=26&proxyReferer=http％3A％2F％2Fwebs.co.kr％2Findex.php％3Fdocument_srl％3D3312655
* **Google Developers Korea Blog: 안드로이드 6.0 마시멜로 무엇을 테스트 할까요?** https://developers-kr.googleblog.com/2015/08/testyourapponandroid60.html
* **adb로 안드로이드 배터리 상태 모킹(Mocking) 하기**: https://www.intellectsoft.net/blog/android-shell-part-1-mocking-battery-status/

---