FROM node:18-bullseye AS prebuild
FROM prebuild AS build
WORKDIR /srv
COPY application/package*.json ./
RUN npm install --frozen-lockfile
COPY application/. .
RUN chmod -R uog+r .
RUN npm run build

FROM build as dev
CMD npm run dev

FROM prebuild AS prod
RUN groupadd -g 1001 nodejs
RUN useradd -u 1001 -g 1001 nextjs
USER nextjs
EXPOSE 3000
WORKDIR /srv
COPY --from=build /srv/node_modules ./node_modules
COPY --from=build /srv/package*.json ./
COPY --from=build /srv/next.config.js ./
COPY --from=build --chown=nextjs:nodejs /srv/src/.next ./.next
COPY --from=build /srv/src/public ./public
CMD node_modules/.bin/next start
