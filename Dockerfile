FROM node:17
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY src .

CMD [ "node", "src/index.js" ]
