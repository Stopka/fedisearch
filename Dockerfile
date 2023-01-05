FROM node:18-bullseye AS prebuild
FROM prebuild AS build
WORKDIR /srv
COPY application/package*.json ./
RUN yarn install
COPY application/. .
RUN chmod -R uog+r .
RUN yarn build

FROM build as dev
CMD yarn dev

FROM prebuild AS prod
RUN groupadd -g 1001 nodejs
RUN useradd -u 1001 -g 1001 nextjs
USER nextjs
EXPOSE 3000
WORKDIR /srv
COPY --from=build /srv/node_modules ./node_modules
COPY --from=build /srv/package*.json ./
COPY --from=build /srv/next.config.js ./
COPY --from=build --chown=nextjs:nodejs /srv/src/.next ./src/.next
COPY --from=build /srv/src/public ./src/public
CMD yarn start
