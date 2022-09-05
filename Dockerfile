FROM node:16-slim as prod

RUN groupadd --gid 1001 saurav \
  && useradd --uid 1001 --gid saurav --shell /bin/bash --create-home saurav

EXPOSE  3000  

ENV NODE_ENV=production

USER saurav

WORKDIR /home/saurav

COPY --chown=saurav:saurav package*.json ./

RUN npm install \
    && npm cache clean --force

COPY --chown=saurav:saurav . .

CMD ["npm", "start"]
