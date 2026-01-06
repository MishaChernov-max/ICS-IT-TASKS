---
title: Подключение Vault Gramax Enterprise Server
---

{% table header="row" %}

---

*  {% colwidth=[195] %}

   Переменная

*  {% colwidth=[255] %}

   Описание

*  {% colwidth=[235] %}

   Пример значения

---

*  {% colwidth=[195] %}

   `VAULT_API_VERSION`

*  {% colwidth=[255] %}

   Версия API Vault, используемая для взаимодействия с сервером.

*  {% colwidth=[235] %}

   `v1`

---

*  {% colwidth=[195] %}

   `VAULT_TOKEN`

*  {% colwidth=[255] %}

   Токен доступа для аутентификации в Vault.

*  {% colwidth=[235] %}

   `s.NG8kghWwZVZHX1wGnGzY9k5u`

---

*  {% colwidth=[195] %}

   `VAULT_ENDPOINT`

*  {% colwidth=[255] %}

   URL-адрес сервера Vault.

*  {% colwidth=[235] %}

   `https://vault.gram.ax`

---

*  {% colwidth=[195] %}

   `VAULT_PATH`

*  {% colwidth=[255] %}

   Путь к секрету в Vault, по которому выполняется чтение данных.

*  {% colwidth=[235] %}

   `secret/data/gramax/ldap`

---

*  {% colwidth=[195] %}

   `VAULT_MOUNT_PATH`

*  {% colwidth=[255] %}

   Монтируемый путь (mount path) для KV-хранилища, если отличается от `secret`.

*  {% colwidth=[235] %}

   `secret`

{% /table %}


