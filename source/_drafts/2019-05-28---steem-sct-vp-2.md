---
title: "STEEM/SCT 보팅파워(VP) 안드로이드 위젯 #2 - 앱 업데이트 이야기"
author: anpigon
date: "2019-05-28T08:00:21Z"
permalink: "/kr/@anpigon/steem-sct-vp-2"
tags:
  - "kr"
  - "kr-dev"
  - "jjm"
  - "thegivingtree"
  - "sct"
---
![](https://cdn.steemitimages.com/640x0/https://files.steempeak.com/file/steempeak/anpigon/KG7rYy6a-E18490E185A6E186A8E18489E185B3E18490E185B320E1848CE185A1E18485E185B5E18491E185ADE18489E185B5E1848CE185A1.png)
***

안녕하세요. 안피곤입니다.

이전 글 ["STEEM/SCT 보팅파워(VP) 안드로이드 위젯 #1"](https://steemit.com/sct/@anpigon/steem-sct-vp-1)에서 안드로이드용 **STEEM&SCOT 보팅파워 위젯앱**을 소개를 하였습니다. 반나절만에 급하게 개발한거라 앱디자인 퀄리티는 그렇다 치더라도 위젯 새로고침 버그가 있었습니다. ㅠ

<br><center>*</center><br>

## 나는 왜 리액트 네이티브로 위젯을 개발할 수 있다고 생각했을까?
위젯앱은 리액트 네이티브에서 제공하는 [Headless JS](https://facebook.github.io/react-native/docs/headless-js-android)를 사용하여 개발했습니다.  **Headless JS**는 백그라운드에서 JavaScript를 실행할 수 있게 해줍니다. 리액트 네이티브는 역시 짱입니다.ㅋ

위젯 작동 방식은 대략 이렇습니다. 위젯의 새로고침 버튼을 터치하면, 위젯 프로바이더(`AppWidgetProvider`)가 헤드리스JS서비스(`HeadlessJsTaskService`)를 호출합니다. 그리고 `HeadlessJsTaskService`에서는 React Native에 있는 JavaScript를 실행합니다. 그리고 그 JavaScript는 비동기 통신 후 다시 `ReactContextBaseJavaModule` 모듈을 호출하여 Java 코드에 값을 전달합니다. 이렇게 설명하고 보니 굉장히 비효율적인 구조네요.

그리고 Android O 버전(API 26)에는 한가지 문제점이 있습니다. `AppWidgetProvider`에서 `HeadlessJsTaskService` 서비스 호출이 안 됩니다. `Context.startService(serviceIntent)`로 서비스를 호출하면 오류가 발생합니다. 해결 방법은 `targetSdkVersion`의 버전을 낮추면 된다고 하네요. 하지만 개발자의 알량한 자존심이 허락하지 않습니다. 
> 안드로이드 O에서는 앱이 백그라운드에 진입하게 되면 몇분 뒤 동작 중인 백그라운드 서비스는 자동으로 중지되며 onDestroy()가 호출됩니다. 더하여 백그라운드 상태에서 서비스를 구동하기 위한 startService()의 호출은 IllegalStateException이 발생하며 허용되지 않습니다.
\- 출처: https://medium.com/til-kotlin-ko/android-o％EC％97％90％EC％84％9C％EC％9D％98-％EB％B0％B1％EA％B7％B8％EB％9D％BC％EC％9A％B4％EB％93％9C-％EC％B2％98％EB％A6％AC％EB％A5％BC-％EC％9C％84％ED％95％9C-jobintentservice-250af2f7783c

<br>그래서 `Context.startForegroundService(serviceIntent)`를 사용해서 서비스를 호출했습니다. 하지만 startForegroundService를 사용하여 서비스를 호출하면, Android O에서는 상태바에 Notification 알람이 발생합니다. 위젯을 새로 고칠 때마다 알람이 발생하니 보기에 좋지 않네요. 게다가 백그라운드에서 실행되는 Javascript는 가끔 네트워크 통신 응답이 없을 때가 있습니다. Javascript에서는 connection timeout 컨트롤하기가 매우 까다롭습니다.

결국 안드로이드 Java 코드로 위젯을 다시 구현하였습니다. 앱 실행 화면은 리액트 네이티브로 그대로 사용하고, 위젯만 안드로이드 Java로 구현하였습니다. 위젯 화면 갱신을 위해 안드로이드 버전 26.1.0에 추가된 [**JobIntentService**](https://developer.android.com/reference/android/support/v4/app/JobIntentService)를 사용하여 구현하였습니다. 

<br><center>*</center><br>

## 개발 과정

**JobIntentService**를 사용하여 백그라운드 작업을 처리하는 방법은 다음과 같습니다.

`AndroidManifest.xml` 에 서비스를 추가합니다.
```
<service android:name=".UpdateService"
        android:permission="android.permission.BIND_JOB_SERVICE"
        android:enabled="true"
        android:exported="true" />
```

<br>
`UpdateService`은 다음과 같이 구현합니다.

```
public class UpdateService extends JobIntentService ｛
    static final int JOB_ID = 1000;

    static void enqueueWork(Context context, Intent work) ｛
        enqueueWork(context, UpdateService.class, JOB_ID, work);
    ｝

    @Override
    protected void onHandleWork(Intent intent) ｛
        String username = intent.getStringExtra("username");
        int[] appWidgetIds = intent.getIntArrayExtra("appWidgetIds");
        new SteemAsyncTask(this, appWidgetIds).execute(username);
    ｝
｝
```

<br>
`WidgetProvider`에서는 새로고침 브로드캐스트가 발생하면 `UpdateService`를 실행합니다.
```
public class WidgetProvider extends AppWidgetProvider ｛
  
  // (...)

  @Override
  public void onReceive(final Context context, final Intent intent) ｛

    // (...)

    if (Constant.ACTION_REFRESH.equals(intent.getAction())) ｛

      // AsyncLocalStorage 에서 username 가져오기
      ReactDatabaseSupplier rdbs = ReactDatabaseSupplier.getInstance(context);
      SQLiteDatabase db = rdbs.get();
      String username = AsyncLocalStorageUtil.getItemImpl(db, "username");
      rdbs.closeDatabase();

      if(username!=null && !username.isEmpty()) ｛
        Intent intent = new Intent();
        intent.putExtra("username", username);
        intent.putExtra("appWidgetIds", appWidgetIds);
        UpdateService.enqueueWork(context, intent); // 서비스 실행
      ｝
  ｝
   
｝
```

<br>

참고로 리액트 네이티브의 AsyncLocalStorage에 저장한 데이터를 자바 코드에서 사용하려면, 다음과 같이 가져올 수 있습니다.

```
ReactDatabaseSupplier rdbs = ReactDatabaseSupplier.getInstance(context);
SQLiteDatabase db = rdbs.get();
String username = AsyncLocalStorageUtil.getItemImpl(db, "username");
rdbs.closeDatabase();
```

<br><center>*</center><br>

**앱을 수정하여 다시 배포**하였습니다. 변경 사항은 아래와 같습니다.

![](https://files.steempeak.com/file/steempeak/anpigon/7750Gb2H-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-05-2820E1848BE185A9E18492E185AE204.48.19.png)

> * 구글 스토어 바로가기: https://play.google.com/store/apps/details?id=com.steem_widget

___


<br>


![](https://files.steempeak.com/file/steempeak/anpigon/CUeygx1f-E18489E185B3E1848FE185B3E18485E185B5E186ABE18489E185A3E186BA202019-05-2820E1848BE185A9E18492E185AE204.51.03.png)

<br>현재까지 10분이 앱을 설치해주셨습니다.  앱을 설치하신 모든 분들에게 항상 행운이 깃들길 빕니다. 부적이라고 생각하고 앱을 사용했으면 좋겠습니다. 감사합니다.

앱 관련 피드백은 댓글로 부탁드립니다.

해피 코딩하세요~!

***

<center>![](https://steemitimages.com/400x0/https://cdn.steemitimages.com/DQmQmWhMN6zNrLmKJRKhvSScEgWZmpb8zCeE2Gray1krbv6/BC054B6E-6F73-46D0-88E4-C88EB8167037.jpeg)</center>