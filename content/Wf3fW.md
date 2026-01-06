---
title: Логирование Gramax Enterprise Server
---

{% table header="row" %}

---

*  {% colwidth=[183] %}

   Переменная

*  {% colwidth=[311] %}

   Описание

*  {% colwidth=[226] %}

   Пример значения

---

*  {% colwidth=[183] %}

   `LOG_TYPE`

*  {% colwidth=[311] %}

   Формат логов.

   Варианты:

   -  `default`

   -  `cef`

*  {% colwidth=[226] %}

   По умолчанию: `default`

---

*  {% colwidth=[183] %}

   `LOG_LEVEL`

*  {% colwidth=[311] %}

   Минимальный уровень логирования.

   Варианты:

   -  `debug`

   -  `info`

   -  `warn`

   -  `error`

   -  `fatal`

*  {% colwidth=[226] %}

   По умолчанию: `info`

---

*  {% colwidth=[183] %}

   `LOG_TRANSPORTER`

*  {% colwidth=[311] %}

   Канал вывода логов.

   Варианты:

   -  `console`

   -  `syslog`

*  {% colwidth=[226] %}

   По умолчанию: `console`

---

*  {% colwidth=[183] %}

   `LOG_SYSLOG_HOST`

*  {% colwidth=[311] %}

   Хост Syslog-сервера.

*  {% colwidth=[226] %}

   По умолчанию: `127.0.0.1`

---

*  {% colwidth=[183] %}

   `LOG_SYSLOG_PORT`

*  {% colwidth=[311] %}

   Порт Syslog-сервера.

*  {% colwidth=[226] %}

   По умолчанию: `514`

---

*  {% colwidth=[183] %}

   `LOG_SYSLOG_PROTOCOL`

*  {% colwidth=[311] %}

   Протокол соединения с Syslog (поддерживаются IPv4/IPv6 и TLS).

   Варианты:

   -  `udp4`

   -  `tcp4`

   -  `tls4`

   -  `udp6`

   -  `tcp6`

   -  `tls6`

*  {% colwidth=[226] %}

   По умолчанию: `udp4`

---

*  {% colwidth=[183] %}

   `LOG_SYSLOG_APP_NAME`

*  {% colwidth=[311] %}

   Имя приложения, отображаемое в сообщениях Syslog.

*  {% colwidth=[226] %}

   По умолчанию: `gramax`

{% /table %}
