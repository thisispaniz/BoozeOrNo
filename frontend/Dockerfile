FROM node:18

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build  # optional if you want to serve production build

CMD ["npm", "start"]