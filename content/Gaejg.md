---
title: Основные параметры Gramax Enterprise Server
---

{% table header="row" %}

---

*  {% colwidth=[203] %}

   Переменная

*  {% colwidth=[249] %}

   Описание

*  {% colwidth=[279] %}

   Пример значения

---

*  {% colwidth=[203] %}

   `CLIENT_NAME`

*  {% colwidth=[249] %}

   Значение будет выдано при покупке Gramax Enteprise Server. **Обязателен.**

*  {% colwidth=[279] %}

   

---

*  {% colwidth=[203] %}

   `GES_URL`

*  {% colwidth=[249] %}

   URL, на котором будет доступен GES. **Обязателен.**

*  {% colwidth=[279] %}

   `https://enterprise.gramax.local`

---

*  {% colwidth=[203] %}

   `SSO_SERVICE_URL`

*  {% colwidth=[249] %}

   URL по которому будет доступен SSO. **Обязателен.**

*  {% colwidth=[279] %}

   `https://ges.gram.ax/sso`

---

*  {% colwidth=[203] %}

   `AUTH_SERVICE_URL`

*  {% colwidth=[249] %}

   URL по которому будет доступен сервис auth. **Обязателен.**

*  {% colwidth=[279] %}

   `https://ges.gram.ax/auth`

---

*  {% colwidth=[203] %}

   `DIAGRAM_RENDERER_SERVICE_URL`

*  {% colwidth=[249] %}

   URL по которому будет доступен сервис Diagram-renderer. **Обязателен.**

*  {% colwidth=[279] %}

   `https://ges.gram.ax/diagram-renderer`

---

*  {% colwidth=[203] %}

   `GIT_PROXY_SERVICE_URL`

*  {% colwidth=[249] %}

   URL, по которому будет доступен сервис Git-proxy. **Обязателен.**

*  {% colwidth=[279] %}

   `https://ges.gram.ax`

---

*  {% colwidth=[203] %}

   `CLIENT_NAME`

*  {% colwidth=[249] %}

   Имя клиента в нижнем регистре (lowercase). **Обязателен.**

*  {% colwidth=[279] %}

   `gramax`

---

*  {% colwidth=[203] %}

   `ALLOWED_GRAMAX_URLS`

*  {% colwidth=[249] %}

   URL-адреса  инстансов Gramax (портал документации, браузерная версия и Gramax Enterprise Server). Запятая в конце не нужна. **Обязателен.**

*  {% colwidth=[279] %}

   `https://some-instance.gram.ax,https://another-instance.gram.ax`

---

*  {% colwidth=[203] %}

   `LICENSE_KEY`

*  {% colwidth=[249] %}

   Лицензионный ключ.

   Значение будет выдано при покупке Gramax Enteprise Server. **Обязателен.**

*  {% colwidth=[279] %}

   `765d562b9092eec39b38fd901f013086`

---

*  {% colwidth=[203] %}

   `GIT_SERVER_TOKEN`

*  {% colwidth=[249] %}

   Токен для доступа к Git-хранилищу. **Обязателен.**

*  {% colwidth=[279] %}

   

---

*  {% colwidth=[203] %}

   `GES_ADMIN_EMAILS`

*  {% colwidth=[249] %}

   Почты владельцев воркспейса (через запятую). Устанавливаются в конфиг только при первом запуске. **Обязателен.**

*  {% colwidth=[279] %}

   `admin1@gramax.local,admin2@gramax.local`

---

*  {% colwidth=[203] %}

   `GIT_SERVER_URL`

*  {% colwidth=[249] %}

   Адрес GitLab-сервера для внешнего хранилища. **Обязателен.**

*  {% colwidth=[279] %}

   `https://gitlab.example.com`

---

*  {% colwidth=[203] %}

   `ENTERPRISE_STORAGE_TYPE`

*  {% colwidth=[249] %}

   Тип хранилища конфигураций (`gitlab` или `local`). **Обязателен.**

*  {% colwidth=[279] %}

   `gitlab`

---

*  {% colwidth=[203] %}

   `ENTERPRISE_CONFIG_PATH`

*  {% colwidth=[249] %}

   Если `ENTERPRISE_STORAGE_TYPE = local`:

   путь до папки с настройками GES на виртуальной машине. **Обязателен.**

*  {% colwidth=[279] %}

   `/app/config` (по умолчанию)

---

*  {% colwidth=[203] %}

   `GIT_PROJECT_PATH`

*  {% colwidth=[249] %}

   Если `ENTERPRISE_STORAGE_TYPE = gitlab`:

   путь до репозитория с настройками в GitLab. **Должен быть создан до инициализации**. Хранится в формате «группа/название-репозитория». **Обязателен.**

*  {% colwidth=[279] %}

   `dr/gramax-yaml-manager`

---

*  {% colwidth=[203] %}

   `SSO_SERVICE_ENCRYPTION_KEY`

*  {% colwidth=[249] %}

   Ключ для безопасной передачи данных между сервисами. Генерируется через `openssl rand -hex 32` **Обязателен.**

*  {% colwidth=[279] %}

   `7cdf59ed...cccb8489`

---

*  {% colwidth=[203] %}

   `ENTERPRISE_SERVICE_ENCRYPTION_KEY`

*  {% colwidth=[249] %}

   Ключ, используется для безопасной передачи данных между сервисами. Не должен совпадать с `SSO_SERVICE_ENCRYPTION_KEY`. **Обязателен.**

*  {% colwidth=[279] %}

   `5caf59ed...cddb8489`

---

*  {% colwidth=[203] %}

   `COOKIE_SECRET`

*  {% colwidth=[249] %}

   Ключ для шифрования секретов пользователя в куках. Если не указан, используется `.`, рекомендуется заменить его на 32-байтный ключ (можно сгенерировать, используя `openssl rand -hex 32` **Обязателен.**

*  {% colwidth=[279] %}

   `397b6f3bf51a73b9352e997f837f1d78ac0b68f12058d33a89dd33ade48ff928`

{% /table %}


