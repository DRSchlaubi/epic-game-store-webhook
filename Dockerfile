FROM node:17 as builder

COPY . .

RUN npm i --dev

RUN npm run build

RUN pwd
RUN ls /

FROM node:17

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY --from=builder build build

CMD [ "node", "build/index.js" ]
