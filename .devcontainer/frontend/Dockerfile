FROM node:18

WORKDIR /workspaces/BoozeOrNo/frontend
COPY frontend/package.json ./package.json
COPY frontend/package-lock.json ./package-lock.json
COPY frontend/ ./frontend/

RUN npm install

CMD ["npm", "start"]
