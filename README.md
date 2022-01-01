# FediSearch

Search accounts and channels to follow on Fediverse

App makes queries to database of collected Fediverse feeds and nodes.

Only fulltext search is currently supported. More precise filtering is planned for one of the future releases.

## Config

Configuration is done using environmental variables:

| Variable                     | Description                                                                                                        | Value example                                                           |
|------------------------------|--------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `POSTGRES_URL`               | Postgres database uri                                                                                              | `postgresql://fedisearch:passwd@postgres:5432/fedisearch?schema=public` |
| `NEXT_PUBLIC_MATOMO_URL`     | Optional url of Matomo server for collecting usage statistics. Leaving it empty disables collecting analytics.     | `https://matomo.myserver.tld`                                           |
| `NEXT_PUBLIC_MATOMO_SITE_ID` | Optional Matomo site id parameter for collecting usage statistics. Leaving it empty disables collecting analytics. | `8`                                                                     |

## Deploy

App is designed to be run in docker container and deployed using docker-compose. More info can be found
in [FediSearch example docker-compose](https://github.com/Stopka/fedisearch-compose) project

For crawling Fediverse network and collecting feeds to database there is a companion
app [FediCrawl](https://github.com/Stopka/fedicrawl)
