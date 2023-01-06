FROM node:18-bullseye AS prebuild

FROM prebuild AS build
WORKDIR /srv
COPY application/package*.json ./
COPY application/yarn.lock ./
RUN yarn install
COPY application/. .
RUN yarn build

FROM build as dev
CMD yarn dev

FROM prebuild AS prod
RUN groupadd -g 1001 nodejs
RUN useradd -m -u 1001 -g 1001 nextjs
USER nextjs
EXPOSE 3000
WORKDIR /srv
COPY --from=build --chown=nextjs:nodejs /srv/. ./
CMD yarn build && yarn start
