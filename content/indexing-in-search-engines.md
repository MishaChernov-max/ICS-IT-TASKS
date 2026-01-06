---
order: 3.5
title: Индексация в поисковых системах
---

По умолчанию портал документации индексируется автоматически -- после каждой публикации обновляются файлы [sitemap.xml](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=ru) и [robot.txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=ru). Это поведение можно изменить: например, скрыть портал от механизмов индексации поисковых систем.

## Для портала на Docker

### Индексировать

По умолчанию портал документации индексируется автоматически.

### Не индексировать

При [разворачивании](./deploy-with-docker/deploy-docportal-on-own-server) портала документации в переменных среды укажите параметр `DISABLE_SEO: True`.

:::tip 

Если `DISABLE_SEO` в значении **true**, но на сервер добавлен файл *robots.txt*, то приоритет будет отдан этому файлу.

:::

### Индексировать частично

1. Создайте и заполните файл `robots.txt`.

2. Добавьте файл на сервер в одну папку с `docker-compose.yaml` Gramax.

3. В `docker-compose.yaml` в поле `volumes:` добавьте путь до файла:

   ```
   - ./robots.txt:/app/public/robots.txt
   ```

4. Перезапустите `docker-compose.yaml`.

## Для статического сайта

### Индексировать

При сборке портала документации через CLI для генерации `robots.txt` и `sitemap.xml` передайте параметр `--base-url`  -- полный URL с протоколом (`https://`).

```shell
gramax-cli build --base-url https://docs.example.com
```

В результате в корне артефактов сборки появятся:

-  `sitemap.xml` -- со всеми публичными страницами портала и абсолютными ссылками на основе `--base-url`.

-  `robots.txt` -- со строкой `Sitemap: https://docs.example.com/sitemap.xml` и директивой `Allow: /`.

### Не индексировать

Собирайте без параметра `--base-url`. В этом случае `robots.txt` и `sitemap.xml` не генерируются.

### Индексировать частично

1. Создайте и заполните файл `robots.txt`.

2. Добавьте файл на сервер в одну папку с сайтом.