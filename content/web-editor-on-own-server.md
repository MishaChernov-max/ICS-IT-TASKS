---
order: 3
title: Браузерная версия на собственном сервере
---

Вы можете развернуть браузерную версию на собственном сервере, если по требованиям безопасности не можете использовать app.gram.ax. Например, если в вашей компании запрещено использование CORS-прокси поставщика ПО.

## Запуск

1. Скачайте готовый файл командой `curl -LO https://gram.ax/editor-docker-compose.yaml`.

   :::quote:true Подробнее

   ```yaml
   version: "3.8"
   
   services:
     editor:
       image: docker.io/gramax/editor:latest
       container_name: editor
       restart: unless-stopped
       ports:
         - ${PORT:-3000}:80
       environment:
         - GIT_PROXY_SERVICE_URL=${GIT_PROXY_SERVICE_URL:-http://localhost:3001}
   
     git-proxy:
       image: docker.io/gramax/git-proxy:latest
       container_name: git_proxy
       restart: unless-stopped
       ports:
         - ${GIT_PROXY_PORT:-3001}:80
       environment:
         - ALLOWED_GRAMAX_URLS=${ALLOWED_GRAMAX_URLS:-}
   ```

   :::

2. Задайте переменные среды:

   1. `PORT` -- порт, по которому будет доступен Gramax editor. Если не указан, используется порт 3000.

   2. `GIT_PROXY_SERVICE_URL` -- URL, по которому редактор обращается к сервису Git Proxy. По умолчанию используется [`http://localhost:3001`](http://localhost:3001).

   3. `GIT_PROXY_PORT` -- порт для сервиса Git Proxy. Если не указан, используется 3001.

   4. `ALLOWED_GRAMAX_URLS` -- список доменов, которым разрешено отправлять запросы через Git Proxy (указывается через запятую). Подключение с [localhost](http://localhost) всегда разрешено.

:::info Развернуть с помощью Podman

Если вы предпочитаете использовать Podman, выполните следующие шаги:

1. Создайте папку для хранения данных (например, рядом с файлом `editor-docker-compose.yaml`, либо укажите её через переменную среды).

2. Замените во всех командах `docker` на `podman`.

:::

## Доступ с других устройств

Чтобы браузерная версия была доступна другим сотрудникам в локальной сети, нужно использовать HTTPS.

:::info:true Зачем нужен HTTPS при доступе из сети

Это требование браузеров: для работы приложения нужен `SharedArrayBuffer`, который доступен только при соблюдении следующих условий:

-  Соединение настроено по HTTPS.

-  Есть заголовки `Cross-Origin-Opener-Policy: same-origin` и `Cross-Origin-Embedder-Policy: require-corp` (Настроено на стороне контейнера `editor`)

:::

### Настройка HTTPS

1. Создайте конфигурационный файл для OpenSSL (например, `openssl.cnf`) со следующим содержимым:

   ```ini
   [req]
   distinguished_name = dn
   x509_extensions = ext
   prompt = no
   
   [dn]
   CN = editor.local
   
   [ext]
   subjectAltName = @alt_names
   
   [alt_names]
   DNS.1 = editor.local   # Домен для редактора
   DNS.2 = gitproxy.local # Домен для Git Proxy
   ```

2. Сгенерируйте самоподписанный сертификат следующей командой:

   ```bash
   mkdir -p certs
   
   openssl req -x509 -nodes -days 365 \
     -newkey rsa:2048 \
     -keyout certs/private.key \
     -out certs/certificate.crt \
     -config openssl.cnf
   ```

   В результате файлы сертификата и ключа будут сохранены в папке `certs/`.

3. Дополните `docker-compose.yaml`, добавив Caddy и настройки HTTPS. Не забудьте заменить домены из примера на свои:

   ```yaml
   version: "3.8"
   
   services:
     caddy:
       image: caddy:latest
       container_name: caddy
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./certs:/certs
       restart: unless-stopped
       configs:
         - source: caddy_config
           target: /etc/caddy/Caddyfile
   
     editor:
       image: docker.io/gramax/editor:latest
       restart: unless-stopped
       container_name: editor
       environment:
         - GIT_PROXY_SERVICE_URL=${GIT_PROXY_SERVICE_URL:-https://gitproxy.local}
   
     git-proxy:
       image: docker.io/gramax/git-proxy:latest
       container_name: git_proxy
       restart: unless-stopped
       environment:
         - ALLOWED_GRAMAX_URLS=${ALLOWED_GRAMAX_URLS:-https://editor.local}
   
   configs:
     caddy_config:
       content: |
         editor.local {
           reverse_proxy editor:80
           tls /certs/certificate.crt /certs/private.key
         }
         gitproxy.local {
           reverse_proxy git-proxy:80
           tls /certs/certificate.crt /certs/private.key
         }
   ```

4. Настройте локальный DNS-сервер или роутер так, чтобы домены `editor.local` и `gitproxy.local` разрешались в IP-адрес сервера, где развернуты сервисы редактора и git-proxy.

5. Запустите контейнеры:

   ```
   docker-compose up -d
   ```

6. Откройте в браузере:

   ```
   https://editor.local
   ```

   При первом открытии браузер может предупредить о самоподписанном сертификате.\
   Вы можете либо:

   -  Временно подтвердить исключение в браузере.

   -  Установить сертификат `certificate.crt` в доверенные корневые центры сертификации вашей системы, чтобы избежать предупреждений в будущем.

## Поддержка диаграмм Draw.io и PlantUML

Если хотите, чтобы диаграммы формировались на вашем сервере, а не сервере диаграмм -- разверните их в собственном контуре.

1. Добавьте сервисы в `docker-compose.yaml`**:**

   -  `drawio` -- редактор диаграмм Draw.io.

   -  `plantuml` -- сервис для рендеринга PlantUML.

   -  `caddy` -- реверс-прокси, объединяющий доступ к диаграммам.

2. Укажите переменную окружения `DIAGRAM_RENDERER_SERVICE_URL` в блоке `editor`.

3. Ниже -- пример расширенного фрагмента `docker-compose.yaml` с поддержкой диаграмм и HTTPS:

   ```yaml
   version: "3.8"
   
   services:
     caddy:
       image: caddy:latest
       container_name: caddy
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./certs:/certs
       restart: unless-stopped
       configs:
         - source: caddy_config
           target: /etc/caddy/Caddyfile
   
     editor:
       image: docker.io/gramax/editor:latest
       restart: unless-stopped
       container_name: editor
       environment:
         - GIT_PROXY_SERVICE_URL=${GIT_PROXY_SERVICE_URL:-https://services.local}
         - DIAGRAM_RENDERER_SERVICE_URL=${DIAGRAM_RENDERER_SERVICE_URL:-https://services.local/diagram-renderer}
   
     git-proxy:
       image: docker.io/gramax/git-proxy:latest
       container_name: git_proxy
       restart: unless-stopped
       environment:
         - ALLOWED_GRAMAX_URLS=${ALLOWED_GRAMAX_URLS:-https://editor.local}
   
     drawio:
       image: jgraph/drawio
       container_name: drawio
       restart: unless-stopped
   
     plantuml:
       image: plantuml/plantuml-server:tomcat-v1.2024.8
       container_name: plantuml
       restart: unless-stopped
   
   configs:
     caddy_config:
       content: |
         editor.local {
           reverse_proxy editor:80
           tls /certs/certificate.crt /certs/private.key
         }
         services.local {
           handle_path /* {
             reverse_proxy git-proxy:80
           }
           handle_path /diagram-renderer/drawio/* {
             reverse_proxy drawio:8080
             header Content-Security-Policy "frame-ancestors 'self' https://editor.local;"
             header cross-origin-embedder-policy "require-corp"
             header cross-origin-resource-policy "cross-origin"
           }
           handle_path /diagram-renderer/plantuml* {
             reverse_proxy plantuml:8080
           }
           tls /certs/certificate.crt /certs/private.key
         }
   ```

:::info 

В предыдущем примере для `git-proxy` использовался отдельный домен (`gitproxy.local`). В этом применяется единый домен `services.local` -- он используется как для `git-proxy`, так и для доступа к сервисам диаграмм.

:::

### Как это работает в редакторе

-  Draw.io будет доступен по пути: `${DIAGRAM_RENDERER_SERVICE_URL}/drawio`.

-  PlantUML -- по пути: `${DIAGRAM_RENDERER_SERVICE_URL}/plantuml`.