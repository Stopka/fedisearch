# FediSearch

Search accounts and channels to follow on Fediverse

App makes queries to Fedistore app using graphql api.

Only fulltext search is currently supported. More precise filtering is planned for one of the future releases.

## Config

Configuration is done using environmental variables or command flags

| Env variable     | Command argument   | Description                                                                                                          | Value example                   | Default value  |
|------------------|--------------------|----------------------------------------------------------------------------------------------------------------------|---------------------------------|----------------|
| `MATOMO_URL`     | `--matomo-url`     | _Optional_ url of Matomo server for collecting usage statistics. Leaving it empty disables collecting analytics.     | `https://matomo.myserver.tld`   | empty          |
| `MATOMO_SITE_ID` | `--matomo-site-id` | _Optional_ Matomo site id parameter for collecting usage statistics. Leaving it empty disables collecting analytics. | `8`                             | `0`            |
| `GRAPHQL_URL`    | `--graphql-url`    | *Required* Fedistore graphql api url                                                                                 | `https://fedistore.example/api` | `/api/graphql` |

## Deploy

App is designed to be run in docker container and deployed using docker-compose. More info can be found
in [FediSearch example docker-compose](https://github.com/Stopka/fedisearch-compose) project

