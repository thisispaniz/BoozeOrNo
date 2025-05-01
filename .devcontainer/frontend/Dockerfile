FROM node:18

WORKDIR /workspaces/BoozeOrNo/frontend
COPY . /workspaces/BoozeOrNo/frontend

RUN npm install
RUN npm run build  # optional if you want to serve production build

CMD ["npm", "start"]