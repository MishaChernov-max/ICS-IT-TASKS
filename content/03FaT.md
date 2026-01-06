---
title: ИИ-функции Gramax Enterprise Server
---

{% table header="row" %}

---

*  {% colwidth=[203] %}

   Переменная

*  {% colwidth=[316] %}

   Описание

*  {% colwidth=[212] %}

   Пример значения

---

*  {% colwidth=[203] %}

   `VECTORDB__TYPE`

*  {% colwidth=[316] %}

   Тип векторной БД.

*  {% colwidth=[212] %}

   По умолчанию: `qdrant`.

---

*  {% colwidth=[203] %}

   `VECTORDB__HOST`

*  {% colwidth=[316] %}

   Адрес для подключения к БД Qdrant.

*  {% colwidth=[212] %}

   По умолчанию:

   `http://enteprise-gramax-qdrant` для Helm-чарта.

---

*  {% colwidth=[203] %}

   `EMBEDDING__TYPE`

*  {% colwidth=[316] %}

   Тип провайдера для создания эмбеддингов.

   Варианты:

   -  `openai`: для OpenAI и любых других API-совместимых сервисов (например, Deepseek, OpenRouter).

   -  `ollama`: для локально запущенного сервиса Ollama.

*  {% colwidth=[212] %}

   `EMBEDDING__TYPE=openai`

---

*  {% colwidth=[203] %}

   `EMBEDDING__MODEL`

*  {% colwidth=[316] %}

   Название модели, которую будет использовать провайдер. Модель должна поддерживать создание эмбеддингов (Embeddings).

   *Примечание: Список доступных моделей и их названия смотрите в документации вашего провайдера (OpenAI, Ollama и т.д.).*

*  {% colwidth=[212] %}

   `text-embedding-3-large`, `text-embedding-3-small`, `mxbai-embed-large`

---

*  {% colwidth=[203] %}

   `EMBEDDING__HOST`

*  {% colwidth=[316] %}

   Адрес API-сервера провайдера. Нужно указывать для OpenAI-совместимых провайдеров (кроме самого OpenAI) или для удаленного Ollama.

*  {% colwidth=[212] %}

   `https://api.deepseek.com/v1`, `http://my-ollama-host:11434`.

---

*  {% colwidth=[203] %}

   `EMBEDDING__APIKEY`

*  {% colwidth=[316] %}

   API-ключ для доступа к сервису провайдера. Некоторые провайдеры могут требовать его наличие, даже если он не используется. В таком случае можно указать любую строку.

*  {% colwidth=[212] %}

   

---

*  {% colwidth=[203] %}

   `EMBEDDING__SOCKSPROXYURL`

*  {% colwidth=[316] %}

   Адрес SOCKS5-прокси. Полезно, если доступ к API провайдера возможен только через прокси-сервер (например, из-за корпоративных ограничений или блокировок).

   Формат: `socks5://user:password@host:port`

*  {% colwidth=[212] %}

   `socks5://proxy_user:proxy_pass@192.168.1.1:1080`

---

*  {% colwidth=[203] %}

   `EMBEDDING__QUERYTEMPLATE`

*  {% colwidth=[316] %}

   

*  {% colwidth=[212] %}

   

---

*  {% colwidth=[203] %}

   `EMBEDDING__DOCUMENTTEMPLATE`

*  {% colwidth=[316] %}

   

*  {% colwidth=[212] %}

   

---

*  {% colwidth=[203] %}

   `EMBEDDING__DIMENSIONS`

*  {% colwidth=[316] %}

   Размерность векторов, которую создает модель. Это значение обычно указано в документации к модели.

*  {% colwidth=[212] %}

   `1536`

---

*  {% colwidth=[203] %}

   `FEATURE__SENDEMBEDDINGDIMENSIONS`

*  {% colwidth=[316] %}

   

*  {% colwidth=[212] %}

   

---

*  {% colwidth=[203] %}

   `CHAT__TYPE`

*  {% colwidth=[316] %}

   Тип провайдера.

   Значение: `openai` (поддерживает OpenAI и совместимые с ним сервисы).

*  {% colwidth=[212] %}

   

---

*  {% colwidth=[203] %}

   `CHAT__HOST`

*  {% colwidth=[316] %}

   Адрес API-сервера провайдера. Нужно указывать для OpenAI-совместимых провайдеров (кроме самого OpenAI) или для удаленного Ollama.

*  {% colwidth=[212] %}

   `https://api.deepseek.com/v1`, `http://my-ollama-host:11434`.

---

*  {% colwidth=[203] %}

   `CHAT__MODEL`

*  {% colwidth=[316] %}

   Название модели, которая будет использоваться для генерации текста.

*  {% colwidth=[212] %}

   `gpt-4o`, `gpt-3.5-turbo`.

---

*  {% colwidth=[203] %}

   `CHAT__APIKEY`

*  {% colwidth=[316] %}

   API-ключ для доступа к сервису провайдера. Некоторые провайдеры могут требовать его наличие, даже если он не используется. В таком случае можно указать любую строку

*  {% colwidth=[212] %}

   

---

*  {% colwidth=[203] %}

   `CHAT__SOCKSPROXYURL`

*  {% colwidth=[316] %}

   Адрес SOCKS5-прокси. Полезно, если доступ к API провайдера возможен только через прокси-сервер (например, из-за корпоративных ограничений или блокировок).

   Формат: `socks5://user:password@host:port`

*  {% colwidth=[212] %}

   

---

*  {% colwidth=[203] %}

   `AUTH__ADMIN__TOKEN`

*  {% colwidth=[316] %}

   Cекретный токен для авторизации запросов от Gramax к LLM-сервису. Придумайте надежное строковое значение.

*  {% colwidth=[212] %}

   

{% /table %}
