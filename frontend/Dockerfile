FROM node:18

WORKDIR /workspaces/BoozeOrNo/frontend
COPY . /workspaces/BoozeOrNo/frontend
COPY . /workspaces/BoozeOrNo/frontend/package.json ./package.json
COPY . /workspaces/BoozeOrNo/frontend/package-lock.json ./package-lock.json

RUN npm install


CMD ["npm", "start"]