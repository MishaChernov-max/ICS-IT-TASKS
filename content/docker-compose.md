---
title: docker-compose
---

### Запуск

1. Скачайте готовый файл командой `curl -Lo docker-compose.yaml https://gram.ax/docportal-docker-compose.yaml`.

2. Задайте переменные Пользователь среды:

   1. `ROOT_PATH` -- путь до папки, в которую будут склонированы каталоги. Если не указан, создается папка с названием `gramax`.

   2. `ADMIN_LOGIN` -- логин администратора. Если не указан, используется `admin`.

   3. `ADMIN_PASSWORD` -- пароль администратора. Если не указан, используется `password`.

   4. `PORT` -- порт приложения. Если не указан, используется 80.

   5. `DEFAULT_UI_LANGUAGE` -- язык интерфейса по умолчанию, возможные значения: `ru`, `en`. Если не указан, используется предпочитаемый язык пользователя.

   6. `COOKIE_SECRET` -- ключ для шифрования секретов пользователя в куках. Если не указан, используется `.`, рекомендуется заменить его на 32-байтный ключ (можно сгенерировать, используя `openssl rand -hex 32`).

   7. `DOCPORTAL_FEATURES` -- включение экспериментальных функций, перечисляемых через запятую. Пример: `DOCPORTAL_FEATURES=filtered-catalog,export-pdf`

      1. `filtered-catalog` -- [фильтрация каталога по содержимому](./../../catalog/filter).

      2. `export-pdf` -- [новый экспорт в PDF](./../../collaboration/export-docx-pdf/app).

### Управление контейнером

- Запустить контейнер: `docker compose up -d`. Параметр `-d` используется для запуска в фоновом режиме.

- Остановка контейнера: `docker compose down`.

- Для обновления, остановите контейнер и запустите: `docker compose pull && docker compose up -d`.

- Просмотреть логи: `docker logs -ftn 1000 gramax`. Команда отобразит последние 1000 строк логов. Справка по параметрам `docker logs -h` или документация [docker](https://docs.docker.com/reference/cli/docker/container/logs/) / [podman](https://docs.podman.io/en/latest/markdown/podman-logs.1.html).
