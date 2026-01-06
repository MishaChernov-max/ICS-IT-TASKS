---
order: 3
title: Развернуть как статический сайт
---

Вы можете развернуть портал документации, как статический сайт.

-  Для сборки статического сайта используется Gramax CLI -- это инструмент для генерации статических сайтов на основе контента, созданного в Gramax.

## Что потребуется

1. Node.js версии 18 или выше (необходим для работы CLI).

2. Текстовый редактор, например Visual Studio Code.

3. Терминал.

## Быстрый старт

1. Установите Gramax CLI: `npm install -g gramax-cli`.

2. Сгенерируйте сайт: `gramax-cli build --source ./content --destination ./output`.

ЯчЯч

[drawio:./static-site-generator.svg:акуйауцвйцвййцйцуйцуйцуйцуцвййцццафывавцйвйцуйцуцйувцвц:211px:101px]

## Основные шаги

### Шаг 1: Установка Gramax CLI

Gramax CLI можно использовать двумя способами: без установки через npx или с глобальной установкой.

-  **Без установки:** Для использования выполните: `npx gramax-cli <command> [options]`.

-  **Глобальная установка:** Для регулярного использования выполните: `npm install -g gramax-cli`.

После этого команды CLI доступны из любой папки.

### Шаг 2: Генерация статического сайта

Для генерации сайта выполните команду: `gramax-cli build [options]`.

#### Параметры `build`

| Опция                      | Описание                                                                                                        | По умолчанию       |
|----------------------------|-----------------------------------------------------------------------------------------------------------------|--------------------|
| `--source, -s`             | Путь к каталогу с контентом (созданным в Gramax).                                                               | Текущая директория |
| `--destination, -d`        | Папка, куда будет сгенерирован статический сайт.                                                                | `./build`          |
| `--skip-check`             | Пропустить этап проверок перед сборкой.                                                                         | `false`            |
| `--force-ui-lang-sync, -l` | Использовать язык UI такой же, как язык контента (если локаль доступна).                                        | `false`            |
| `--features, -f`           | Включить экспериментальные функции (через запятую).                                                             | Не задано          |
| `--custom-css, -cc`        | Путь до CSS-файла, подключаемого при сборке.                                                                    | Не задано          |
| `--docx-templates, -dt`    | Путь или glob-шаблон к DOCX-шаблонам для экспорта.                                                              | Не задано          |
| `--pdf-templates, -pt`     | Путь или glob-шаблон к стилям для экспорта в PDF (требуется включенная экспериментальная функции `export-pdf`). | Не задано          |
| `--base-url`               | Базовый URL сайта; при передаче генерируются `sitemap.xml` и `robots.txt`.                                      | Не задано          |

#### **Дополнительные настройки**

Вы можете задать дополнительные настройки сайта: [индексацию](./../indexing-in-search-engines), [сбор метрик](./../yandex-metrics), [стили](./../css-styles) и [логотип каталога](./../logo-and-go-to-site).

1. Через файл `gramax.config.yaml`. Создайте файл в корне контента:

   ```yaml
   build:
     logo:
       imageUrl: "https://example.com/logo.png"   # см. раздел «Логотип портала»
       linkUrl: "https://example.com"
   
     metrics:                                     # см. раздел «Сбор метрик»
       yandex:
         metricCounter: 12345678
       matomo:
         matomoSiteId: 1
         matomoUrl: "https://example.com/matomo"
         matomoContainerUrl: "https://example.com/container"
   
     forceUiLangSync: true                        # выравнивать язык UI по языку контента
   
     features:                                    # включение экспериментальных функций
       - filtered-catalog                         # фильтрация каталога по содержимому
       - export-pdf                               # новый экспорт в PDF
   ```

2. Через переменные окружения.

   [tabs]

   [tab:Linux/macOS (bash/zsh)]

   ```bash
   # Логотип
   export LOGO_IMAGE_URL="https://example.com/logo.png"
   export LOGO_LINK_URL="https://example.com"
   
   # Метрики (выберите схему)
   # Яндекс Метрика:
   export YANDEX_METRIC_COUNTER=12345678
   
   # Matomo — сайт:
   export MATOMO_SITE_ID=1
   export MATOMO_URL="https://example.com/matomo"
   # (опционально) контейнер:
   # export MATOMO_CONTAINER_URL="/container"                       # относительный при наличии MATOMO_URL
   # export MATOMO_CONTAINER_URL="https://example.com/container"    # абсолютный при отсутствии MATOMO_URL
   
   # Синхронизация языка UI
   export FORCE_UI_LANG_SYNC=true
   
   # Экспериментальные функции
   export FEATURES="filtered-catalog,export-pdf"
   
   # Сборка
   gramax-cli build
   ```

   [/tab]

   [tab:Windows (PowerShell)]

   ```powershell
   # Логотип
   $env:LOGO_IMAGE_URL = "https://example.com/logo.png"
   $env:LOGO_LINK_URL  = "https://example.com"
   
   # Метрики
   # Яндекс Метрика:
   $env:YANDEX_METRIC_COUNTER = "12345678"
   
   # Matomo — сайт:
   $env:MATOMO_SITE_ID = "1"
   $env:MATOMO_URL     = "https://example.com/matomo"
   # (опционально) контейнер:
   # $env:MATOMO_CONTAINER_URL = "/container"                       # относительный при наличии MATOMO_URL
   # $env:MATOMO_CONTAINER_URL = "https://example.com/container"    # абсолютный при отсутствии MATOMO_URL
   
   # Синхронизация языка UI
   $env:FORCE_UI_LANG_SYNC = "true"
   
   # Экспериментальные функции
   $env:FEATURES = "filtered-catalog,export-pdf"
   
   # Сборка
   gramax-cli build
   ```

   [/tab]

   [tab]

   

   [/tab]

   [/tabs]

3. CLI-флаги (эквиваленты).

   -  `forceUiLangSync` -> `--force-ui-lang-sync` (`-l`)\
      Если включено, язык пользовательского интерфейса автоматически выравнивается с языком выбранного контента (при наличии перевода интерфейса). Пример:

      ```shell
      gramax-cli build -l
      ```

   -  `features` -> `--features` (`-f`)\
      Включение экспериментальных функций, перечисляемых через запятую. Поддерживается:

      -  `filtered-catalog` -- фильтрация каталога по содержимому;

      -  `export-pdf` -- новый экспорт в PDF.

      Пример:

      ```shell
      gramax-cli build -f "filtered-catalog,export-pdf"
      ```

## Развертывание в поддиректорию

После сборки статический сайт можно разместить в корне хоста или в любой поддиректории -- в зависимости от желаемого URL.

Например:

-  В корне: `https://example.org/`.

-  В поддиректории: `https://example.org/docs/`.

Чтобы развернуть сайт в поддиректории, просто загрузите сгенерированные файлы в соответствующую папку на сервере (например, `/docs/`).

Gramax CLI создает сайт с относительными путями, поэтому он будет корректно работать из любой подпапки -- без необходимости менять ссылки или структуру проекта.

### Поддержка страницы 404

Чтобы страница 404 корректно отображалась при размещении сайта в поддиректории (например, `https://example.org/docs/non-existent-page`), необходимо скорректировать базовый путь (`base href`) в файле `404.html`.

Один из вариантов -- сделать это вручную: в файле `404.html` замените `<base href="/">` на `<base href="/docs/">`.

### Настройка через Nginx

Вместо ручного редактирования можно настроить веб-сервер для автоматической подмены `base href` при отдаче страницы 404.

Ниже пример конфигурации Nginx для случая, когда сайт размещён в поддиректории `/docs/`:

```nginx
location /docs/ {
    try_files {%formula content="$uri $" /%}uri/ =404;
    error_page 404 /docs/404.html;
}

location = /docs/404.html {
    # Подменяем base href для корректной загрузки ресурсов
    sub_filter '<base href="/">' '<base href="/docs/">';
    sub_filter_once on;
    internal;
}
```