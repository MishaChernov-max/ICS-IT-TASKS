---
title: Авторизация SSO
---

#### При `AUTH_METHOD` = `azure`

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[310] %}

   Описание

*  {% colwidth=[203] %}

   Пример значения

---

*  {% colwidth=[183] %}

   `TOKEN_URL`

*  {% colwidth=[289] %}

   Урл до эндпоинта для получения токена.

*  {% colwidth=[295] %}

   `https://login.microsoftonline.com/HohLpGvI-uPW8-vyyn-QBH1-88fuprQzzpu3/oauth2/v2.0/authorize`.

---

*  {% colwidth=[183] %}

   `API_URL`

*  {% colwidth=[289] %}

   Урл до эндпоинта получения информации по api.

*  {% colwidth=[295] %}

   `https://login.microsoftonline.com/HohLpGvI-uPW8-vyyn-QBH1-88fuprQzzpu3/oauth2/v2.0/authorize`

---

*  {% colwidth=[183] %}

   `CLIENT_ID`

*  {% colwidth=[289] %}

   Идентификатор приложения в azure

*  {% colwidth=[295] %}

   `0FYSAWm1A-1x4k-e14H-0LHe-gf6qwElcYuz`.

---

*  {% colwidth=[183] %}

   `CLIENT_SECRET`

*  {% colwidth=[289] %}

   Секрет приложения в azure

*  {% colwidth=[295] %}

   `rY3yh*suIebMk^k0KGoi3azsIBP&FY@odQsgFVdc`.

{% /table %}

#### При `AUTH_METHOD` = `adfs`

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[310] %}

   Описание

*  {% colwidth=[203] %}

   Пример значения

---

*  {% colwidth=[183] %}

   `ADFS_CERT`

*  {% colwidth=[291] %}

   Сертификат, используемый для аутентификации в ADFS

*  {% colwidth=[290] %}

   

---

*  {% colwidth=[183] %}

   `ADFS_ENTRYPOINT`

*  {% colwidth=[291] %}

   Точка входа для аутентификации

*  {% colwidth=[290] %}

   Наример: `https://adfs.gram.ax/adfs/ls/`.

---

*  {% colwidth=[183] %}

   `ADFS_ISSUER`

*  {% colwidth=[291] %}

   Идентификатор ADFS

*  {% colwidth=[290] %}

   `https://adfs.gram.ax/`.

---

*  {% colwidth=[183] %}

   `ADFS_CALLBACK_URL`

*  {% colwidth=[291] %}

   URL для обратного вызова после успешной аутентификации

*  {% colwidth=[290] %}

   `https://app.gram.ax/auth/cb`.

{% /table %}

#### При `AUTH_METHOD` = `keycloak`.

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[310] %}

   Описание

*  {% colwidth=[203] %}

   Пример значения

---

*  {% colwidth=[183] %}

   `KEYCLOAK_SERVER_URL`

*  {% colwidth=[291] %}

   URL сервера Keycloak

*  {% colwidth=[287] %}

   `https://keycloak.gram.ax/auth/`.

---

*  {% colwidth=[183] %}

   `KEYCLOAK_REALM`

*  {% colwidth=[291] %}

   Имя Realm в Keycloak

*  {% colwidth=[287] %}

   `gramax`.

---

*  {% colwidth=[183] %}

   `KEYCLOAK_CLIENT_ID`

*  {% colwidth=[291] %}

   Идентификатор клиента Keycloak

*  {% colwidth=[287] %}

   

---

*  {% colwidth=[183] %}

   `KEYCLOAK_USE_ACCESS_TOKEN_INFO`

*  {% colwidth=[291] %}

   Необходимо ли брать информацию о пользователе из `access_token`

*  {% colwidth=[287] %}

   `KEYCLOAK_USE_ACCESS_TOKEN_INFO=true`

{% /table %}

#### При `AUTH_METHOD` = `openid`

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[310] %}

   Описание

*  {% colwidth=[203] %}

   Пример значения

---

*  {% colwidth=[183] %}

   `OPEN_ID_SERVER_URL`

*  {% colwidth=[291] %}

   URL сервера OpenID

*  {% colwidth=[285] %}

   `https://keycloak.gram.ax/auth/`.

---

*  {% colwidth=[183] %}

   `OPEN_ID_REALM`

*  {% colwidth=[291] %}

   Имя Realm в OpenID

*  {% colwidth=[285] %}

   `gramax`.

---

*  {% colwidth=[183] %}

   `OPEN_ID_CLIENT_ID`

*  {% colwidth=[291] %}

   Идентификатор клиента OpenID

*  {% colwidth=[285] %}

   

---

*  {% colwidth=[183] %}

   `OPEN_ID_CLIENT_SECRET`

*  {% colwidth=[291] %}

   Секрет клиента OpenID.

*  {% colwidth=[285] %}

   

{% /table %}

#### При `AUTH_METHOD` = `ldap`

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[310] %}

   Описание

*  {% colwidth=[203] %}

   Пример значения

---

*  {% colwidth=[183] %}

   `LDAP_URL`

*  {% colwidth=[292] %}

   URL LDAP-сервера.

*  {% colwidth=[287] %}

   `ldap://ldap.example.com:389` или `ldaps://ldap.example.com:636`.

---

*  {% colwidth=[183] %}

   `LDAP_ADMIN_DN`

*  {% colwidth=[292] %}

   DN административного пользователя с правами поиска в каталоге.

*  {% colwidth=[287] %}

   `gramax@gramax.ru`

---

*  {% colwidth=[183] %}

   `LDAP_ADMIN_PASSWORD`

*  {% colwidth=[292] %}

   пароль административного пользователя, указанного в `LDAP_ADMIN_DN`.

*  {% colwidth=[287] %}

   `secretAdminPass`.

---

*  {% colwidth=[183] %}

   `LDAP_USER_SEARCH_BASE`

*  {% colwidth=[292] %}

   DN базовой точки поиска пользователей.

*  {% colwidth=[287] %}

   `ou=users,dc=example,dc=com`.

---

*  {% colwidth=[183] %}

   `LDAP_USERNAME_ATTRIBUTE`

*  {% colwidth=[292] %}

   Атрибут пользователя.

*  {% colwidth=[287] %}

   Например, `samaccountname`, `cn`, `mail`. По нему будет поиск пользователя,  `samaccountname`.

---

*  {% colwidth=[183] %}

   `LDAP_USER_DN`

*  {% colwidth=[292] %}

   DN конкретного пользователя, если известен напрямую.

*  {% colwidth=[287] %}

   `OU=Enabled,OU=GRAMAX-USERS,DC=gramax,DC=local`.

---

*  {% colwidth=[183] %}

   `LDAP_GROUP_SEARCH_BASE`

*  {% colwidth=[292] %}

   DN базовой точки поиска групп. Если указан, после аутентификации будет выполнен поиск групп.

*  {% colwidth=[287] %}

   `ou=groups,dc=example,dc=com`.

---

*  {% colwidth=[183] %}

   `LDAP_GROUP_CLASS`

*  {% colwidth=[292] %}

   Класс объекта групповой записи (например, `groupOfNames`, `groupOfUniqueNames`).

*  {% colwidth=[287] %}

   `groupOfNames`.

---

*  {% colwidth=[183] %}

   `LDAP_GROUP_MEMBER_ATTRIBUTE`

*  {% colwidth=[292] %}

   Имя атрибута в записи группы, содержащего членов группы.

*  {% colwidth=[287] %}

   `member`

---

*  {% colwidth=[183] %}

   `LDAP_GROUP_MEMBER_USER_ATTRIBUTE`

*  {% colwidth=[292] %}

   Атрибут в записи пользователя, который сопоставляется с `LDAP_GROUP_MEMBER_ATTRIBUTE`.

*  {% colwidth=[287] %}

   `dn`.

---

*  {% colwidth=[183] %}

   `LDAP_ATTRIBUTES`

*  {% colwidth=[292] %}

   Список атрибутов пользователя (через запятую), которые нужно возвращать при поиске. Если не указано, возвращаются все.

*  {% colwidth=[287] %}

   `cn,sn,mail`.

{% /table %}

#### При `AUTH_METHOD` = `kerberos`

| Переменная                   | Описание                                                                                                             | Пример значения                           |
|------------------------------|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| `KERBEROS_REALM`             | Kerberos realm (домен Active Directory). **Должен быть в UPPERCASE**                                                 | `COMPANY.LOCAL`                           |
| `KERBEROS_SERVICE_PRINCIPAL` | Service Principal Name (SPN) для веб-сервиса. Формат: `HTTP/hostname@REALM`. Hostname в lowercase, realm в UPPERCASE | `HTTP/gramax.company.local@COMPANY.LOCAL` |
| `KERBEROS_KEYTAB_PATH`       | Путь к keytab файлу на сервере (абсолютный или относительный). Файл содержит ключи для расшифровки Kerberos tickets  | `/opt/gramax/config/gramax.keytab`        |
| `KRB5_KTNAME`                | Environment variable для Kerberos библиотеки. Формат: `FILE:/путь/к/keytab`                                          | `FILE:/opt/gramax/config/gramax.keytab`   |

-  `KERBEROS_REALM` должен точно совпадать с доменом Active Directory в UPPERCASE

-  `KERBEROS_SERVICE_PRINCIPAL` должен совпадать с SPN, зарегистрированным в Active Directory

-  Путь в `KRB5_KTNAME` должен начинаться с префикса `FILE:`

-  Keytab файл должен иметь права доступа `600` (только владелец может читать/писать)