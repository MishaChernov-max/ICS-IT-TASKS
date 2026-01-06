---
order: 3.8
title: Cбор метрик
---

Вы можете подключить сервис сбора метрик к своему порталу документации. Это позволит детально просматривать: кто, откуда и в какую статью зашел из поиска или по ссылке.

## Matomo

Предварительно создайте счетчик в Matomo.

### Для портала на Docker

1. В [docker-compose.yaml](./deploy-with-docker/deploy-docportal-on-own-server) Gramax добавьте переменные окружения (environment) на этот счетчик:

   -  `MATOMO_SITE_ID` -- ID сайта в `Matomo`. Необязательный параметр, если указан `MATOMO_CONTAINER_URL`.

   -  `MATOMO_URL` -- URL инстанса `Matomo`. Обязательный параметр, если используется `MATOMO_SITE_ID`. Пример: `https://matomo.gram.ax` или `https://metrics.gram.ax/matomo`.

   -  `MATOMO_CONTAINER_URL` -- URL `Matomo` контейнера. Необязательный параметр. [Подробнее.](https://developer.matomo.org/guides/tagmanager/embedding)

      -  Может быть абсолютным (при отсутствии `MATOMO_URL`). Пример: `https://matomo.gram.ax` или `https://metrics.gram.ax/matomo`.

      -  Может быть относительным (при наличии `MATOMO_URL`). Пример: `/` или `/metrics/matomo`.

2. Перезапустите `docker-compose.yaml`.

### Для статического сайта

1. Перед сборкой установите переменные, как для портала на Docker в описании выше. Или в [файле конфигурации](./static-site-generator/_index#дополнительные-настройки) пропишите:

   ```yaml
   build:
     metrics: 
       matomo:
         matomoSiteId: 1
         matomoUrl: 'https://example.com/matomo'
         matomoContainerUrl: 'https://example.com/container'
   ```

2. Cоберите сайт.

## Яндекс Метрика

1. [Создайте счетчик в Яндекс Метрике](https://yandex.ru/support/metrica/general/creating-counter.html).

2. Скопируйте номер счетчика.

### Для портала на Docker

1. В [docker-compose.yaml](./../quick-start/own-server/_index) Gramax добавьте переменную окружения (environment) на этот счетчик: `YANDEX_METRIC_COUNTER:{meter number}`

2. Перезапустите `docker-compose.yaml`.

### Для статического сайта

1. Перед сборкой установите `YANDEX_METRIC_COUNTER:{meter number}`.

   Или в [файле конфигурации](./static-site-generator/_index#дополнительные-настройки) пропишите:

   ```yaml
   build:
     metrics: 
       yandex: 
         metricCounter: 12345678
   ```

2. Cоберите сайт.