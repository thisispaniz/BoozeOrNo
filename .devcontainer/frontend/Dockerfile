FROM node:18

WORKDIR /workspaces/BoozeOrNo/frontend
COPY . /workspaces/BoozeOrNo/frontend

RUN npm install
RUN npm run dev

CMD ["npm", "start"]