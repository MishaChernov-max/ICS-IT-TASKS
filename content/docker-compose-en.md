---
title: docker-compose-en
---

### Starting Up

1. Download the ready-made file using the command `curl -Lo docker-compose.yaml https://gram.ax/docportal-docker-compose.yaml`.

2. Set environment variables:

   1. `ROOT_PATH` -- path to the folder where catalogs will be cloned. If not specified, a folder named `gramax` will be created.

   2. `ADMIN_LOGIN` -- administrator login. If not specified, `admin` is used.

   3. `ADMIN_PASSWORD` -- administrator password. If not specified, `password` is used.

   4. `PORT` -- application port. If not specified, port 80 is used.

   5. `DEFAULT_UI_LANGUAGE` -- overrides the default UI language. Available values: `ru`, `en`. If not specified, the preferred language is used.

   6. `COOKIE_SECRET` -- key for encrypting user secrets in cookies. If not specified, `.` is used, but it is recommended to replace it with a 32-byte key (can be generated using `openssl rand -hex 32`).

### Container Management

-  Start container: `docker compose up -d`. Option `-d` is used for start the container in background.

-  Stop container: `docker compose down`.

-  See logs: `docker logs -ftn 1000 gramax`. The command will show last 1000 lines of logs. See [docker](https://docs.docker.com/reference/cli/docker/container/logs/) / [podman](https://docs.podman.io/en/latest/markdown/podman-logs.1.html) docs for additional info.

-  To update, stop the container and run `docker compose pull && docker compose up -d`.