---
title: 레드마인(Redmine) svn 저장소 등록시 404 오류가 발생할때
tags:
  - redmine
  - svn
  
  
author: anpigon
date: 2018-03-08 14:43:42
---

레드마인에서 SVN 저장소 연결 정보를 입력하고 저장소 페이지를 가보면 404 오류가 계속 뜨는 경우, 
에러로그를 살펴보면 아래와 같이 `No close tag for /lists/list` 오류가 나타난다.
```
No close tag for /lists/list
Line: 4
Position: 100
Last 80 unconsumed characters:

Output was:
 <?xml version="1.0" encoding="UTF-8"?>
<lists>
<list
   path="https://XXXXXXXX/svn/XX">
  Rendered common/error.html.erb within layouts/base (0.4ms)
```
이런 경우 레드마인 계정에서 아래와 같이 명령어를 실행한다.
```
$ svn list --xml 'https://svn.server.address/reponame'@HEAD
```

<br>
아래와 같이 인증서 처리 여부를 확인하는 메세지가 나타난다.
```
<?xml version="1.0" encoding="UTF-8"?>
<lists>
<list
   path="https://XXXXXXXX/svn/XX">
Error validating server certificate for 'https://XXXXXXXX:443':
 - The certificate is not issued by a trusted authority. Use the
   fingerprint to validate the certificate manually!
 - The certificate hostname does not match.
Certificate information:
 - Hostname: xxxx
 - Valid: from Mon, 18 Mar 2013 02:22:40 GMT until Thu, 16 Mar 2023 02:22:40 GMT
 - Issuer: xxxx
 - Fingerprint: bd:75:a1:f0:a7:34:15:42:47:b2:27:d0:b4:ca:4f:7a:e4:0b:2a:73
(R)eject, accept (t)emporarily or accept (p)ermanently?
```
P 를 눌러 인증처리 후 저장 여부에서 yes(필요시) 까지 눌러 한번 리스팅이 완료되면 레드마인에서는 올바르게 실행된다.

svn 연결이 잘되는지 다시 한번 확인한다.
```
$ svn info https://svn.server.address/reponame
```

<br>
만약, 레드마인 계정이 www-data 와 같이 로그인 할 수 없는 계정이라면
아래와 같이 레드마인이 접근가능한 폴더에 svn 인증정보를 복사한다.
```
sudo -u www-data svn list --xml 'https://svn.server.address/reponame'@HEAD
```
(You may have to add "www-data ALL=(ALL) NOPASSWD:ALL" to /etc/sudoers)

```
$ sudo cp ~/.subversion /usr/share/redmine/.subversion/

$ sudo chown -R www-data:www-data /usr/share/redmine/.subversion/
```

<br>
마지막으로 레드마인의 소스를 약간 수정한다.

수정파일 : `/usr/share/redmine/lib/redmine/scm/adapters/subversion_adapter.rb`

 #수정전
```ruby
       def credentials_string
          str = ''
          str << " --username #｛shell_quote(@login)｝" unless @login.blank?
          str << " --password #｛shell_quote(@password)｝" unless @login.blank? || @password.blank?
          str << " --no-auth-cache --non-interactive"
          str
        end
```
<br>
#수정후
```ruby
       def credentials_string
          str = ''
          str << " --username #｛shell_quote(@login)｝" unless @login.blank?
          str << " --password #｛shell_quote(@password)｝" unless @login.blank? || @password.blank?
          str << " --trust-server-cert-failures=unknown-ca --no-auth-cache --non-interactive --config-dir /usr/share/redmine/.subversion/ "
          str
       end
```

<br>
레드마인을 리스타트 한다.
```
$ sudo service apache2 restart
```

<br>
가이드를 마칩니다.