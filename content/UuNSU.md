---
title: Настройки докпортала Gramax Enterprise Server
---

{% table header="row" %}

---

- {% colwidth=[218] %}

  Переменная

- {% colwidth=[321] %}

  Описание

- {% colwidth=[207] %}

  Пример значения

---

- {% colwidth=[218] %}

  `AUTO_PULL_TOKEN`

- {% colwidth=[321] %}

  Пользовательский токен.

- {% colwidth=[207] %}

  `HIDDEN TOKEN`

---

- {% colwidth=[218] %}

  `AUTO_PULL_INTERVAL`

- {% colwidth=[321] %}

  Интервал автоматической синхронизации. Если не указан, каталоги будут обновляться каждые 3 минуты. Указывается в секундах.

- {% colwidth=[207] %}

  `120`

---

- {% colwidth=[218] %}

  `AUTO_PULL_USERNAME`

- {% colwidth=[321] %}

  При методе аутентификации через логин и пароль:

  `AUTO_PULL_USERNAME` -- укажите имя пользователя. `AUTO_PULL_TOKEN` -- укажите пароль пользователя

- {% colwidth=[207] %}

  `autopull`

---

- {% colwidth=[218] %}

  `DISABLE_SEO`

- {% colwidth=[321] %}

  Отключает автоматическую генерацию `sitemap.xml` и `robots.txt` для индексации поисковыми системами. При `true` портал не индексируется.

- {% colwidth=[207] %}

  По умолчанию: `true`

---

- {% colwidth=[218] %}

  `YANDEX_METRIC_COUNTER`

- {% colwidth=[321] %}

  Идентификатор счётчика Яндекс Метрики. Используется для отправки аналитических событий.

- {% colwidth=[207] %}

---

- {% colwidth=[218] %}

  `AI_TOKEN`

- {% colwidth=[321] %}

  Токен авторизации. Укажите здесь то же значение, что и в `AUTH__ADMIN__TOKEN` для LLM-сервиса.

- {% colwidth=[207] %}

---

- {% colwidth=[218] %}

  `AI_SERVER_URL`

- {% colwidth=[321] %}

  URL для доступа к LLM-сервису.

- {% colwidth=[207] %}

  По умолчанию: `{GES_URL}/ai`

---

- {% colwidth=[218] %}

  `AI_INSTANCE_NAME`

- {% colwidth=[321] %}

  Уникальный идентификатор вашего портала. Это позволяет одному LLM-сервису работать с несколькими независимыми порталами Gramax. Придумайте любое уникальное имя, например, `my-docs-portal`.

- {% colwidth=[207] %}

---

- {% colwidth=[218] %}

  `GES_REFRESH_INTERVAL`

- {% colwidth=[321] %}

  Интервал синхронизации докпортала с настройками Gramax Enterprise Server. Задается в секундах. По умолчанию установлен на 600сек.

- {% colwidth=[207] %}

{% /table %}
