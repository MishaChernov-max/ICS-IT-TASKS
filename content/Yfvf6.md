---
title: Подключение SSO
---

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

   `SSO_SERVICE_ENCRYPTION_KEY`

*  {% colwidth=[310] %}

   Ключ, используется для безопасной передачи данных между сервисами. Для генерации можно использовать `openssl rand -hex 32`. **Обязателен**.

*  {% colwidth=[203] %}

   `SSO_SERVICE_ENCRYPTION_KEY=7cdf59ed...cccb8489`

---

*  {% colwidth=[183] %}

   `SSO_URL`

*  {% colwidth=[310] %}

   URL по которому будет доступен сервис SSO. **Обязателен**.

*  {% colwidth=[203] %}

   `SSO_URL=https://sso.gram.ax`.

---

*  {% colwidth=[183] %}

   `AUTH_METHOD`

*  {% colwidth=[310] %}

   Метод авторизации в SSO. Необходимо выбрать любой доступный один способ авторизации.

   Варианты:

   -  `azure`

   -  `adfs`

   -  `keycloak`

   -  `openid`

   -  `ldap`

   -  `kerberos`

   Все параметры связанные с `AUTH_METHOD`, **обязательны**.

*  {% colwidth=[203] %}

   `AUTH_METHOD=azure`

---

*  {% colwidth=[183] %}

   `CONNECTOR_TYPE`

*  {% colwidth=[310] %}

   Метод получения списка пользователей. Варианты:

   -  `ldap`

   -  `keycloak`

   -  `scim`

   Все параметры связанные с `CONNECTOR_TYPE` **обязательны**.

*  {% colwidth=[203] %}

   `CONNECTOR_TYPE=ldap`

{% /table %}
