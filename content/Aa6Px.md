---
title: Получение списка пользователей SSO
---

#### При `CONNECTOR_TYPE=ldap`

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[310] %}

   Описание

*  {% colwidth=[203] %}

   Пример значения

---

*  {% colwidth=[206] %}

   `LDAP_URL`

*  {% colwidth=[252] %}

   URL LDAP-сервера.

*  {% colwidth=[262] %}

   `ldap://ldap.example.com:389` или `ldaps://ldap.example.com:636`.

---

*  {% colwidth=[206] %}

   `LDAP_ADMIN_DN`

*  {% colwidth=[252] %}

   DN пользователя с правами поиска в каталоге.

*  {% colwidth=[262] %}

   `gramax@gramax.ru`

---

*  {% colwidth=[206] %}

   `LDAP_ADMIN_PASSWORD`

*  {% colwidth=[252] %}

   Пароль пользователя, указанного в `LDAP_ADMIN_DN`

*  {% colwidth=[262] %}

   `secretAdminPass`.

---

*  {% colwidth=[206] %}

   `LDAP_USER_SEARCH_BASE`

*  {% colwidth=[252] %}

   DN базовой точки поиска пользователей.

*  {% colwidth=[262] %}

   `ou=users,dc=example,dc=com`.

{% /table %}

#### При `CONNECTOR_TYPE=keycloak`

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[310] %}

   Описание

*  {% colwidth=[203] %}

   Пример значения

---

*  {% colwidth=[206] %}

   `KEYCLOAK_SERVER_URL`

*  {% colwidth=[240] %}

   URL сервера Keycloak.

*  {% colwidth=[276] %}

   `https://keycloak.gram.ax/auth/`[﻿](https://keycloak.gram.ax/auth/).

---

*  {% colwidth=[206] %}

   `KEYCLOAK_REALM`

*  {% colwidth=[240] %}

   Имя Realm в Keycloak.

*  {% colwidth=[276] %}

   `gramax`.

---

*  {% colwidth=[206] %}

   `KEYCLOAK_API_TOKEN`

*  {% colwidth=[240] %}

   Токен доступа.

   Можно создать [используя﻿](https://www.keycloak.org/securing-apps/oidc-layers#_token_endpoint)

*  {% colwidth=[276] %}

   

{% /table %}

#### При `CONNECTOR_TYPE=scim`

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[310] %}

   Описание

*  {% colwidth=[203] %}

   Пример значения

---

*  {% colwidth=[169] %}

   `SCIM_SERVER_URL`

*  {% colwidth=[290] %}

   URL сервера SCIM.

*  {% colwidth=[255] %}

   `https://scim.gram.ax/auth/`

---

*  {% colwidth=[169] %}

   `SCIM_TOKEN`

*  {% colwidth=[290] %}

   Токен доступа. Используется либо он, либо `SCIM_ADMIN_LOGIN` и `SCIM_ADMIN_PASSWORD` для авторизации через Basic.

*  {% colwidth=[255] %}

   

---

*  {% colwidth=[169] %}

   `SCIM_GET_USERS_FILTER`

*  {% colwidth=[290] %}

   Фильтр [для поиска﻿](https://is.docs.wso2.com/en/5.10.0/develop/scim2-rest-apis/#/Users%20Endpoint/getUser) пользователей. Если не задан, используется `userName co "${searchSubstring}"`, где `${searchSubstring}` заменяется на строку, переданную пользователем при поиске.

*  {% colwidth=[255] %}

   

---

*  {% colwidth=[169] %}

   `SCIM_ADMIN_LOGIN`

*  {% colwidth=[290] %}

   Username, если используется Basic-авторизация (необязательно, используется вместо `SCIM_TOKEN`).

*  {% colwidth=[255] %}

   

---

*  {% colwidth=[169] %}

   `SCIM_ADMIN_PASSWORD`

*  {% colwidth=[290] %}

   Password, если используется Basic авторизация (необязательно, используется вместо `SCIM_TOKEN`).

*  {% colwidth=[255] %}

   

{% /table %}
