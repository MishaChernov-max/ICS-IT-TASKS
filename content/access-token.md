---
order: 6
title: Аутентификация по токену
---

Для аутентификации в [GitLab](./gitlab), [Gitea](./gitea) и [других Git-хранилищах](./other-git-storages) используйте *Access Token*, созданный для пользователя или репозитория. Убедитесь, что у токена есть права:

-  Gitlab: `read_api` и `write_repository`. Документацию по созданию *Access Token* в GitLab можно просмотреть в [официальной документации](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html).

-  Gitea: `repository`, `user` (Read and Write). Документацию по созданию *Access Token* в Gitea можно просмотреть в [официальной документации](https://docs.gitea.com/development/oauth2-provider#scopes)


