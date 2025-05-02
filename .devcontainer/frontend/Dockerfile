FROM node:18

WORKDIR /workspaces/BoozeOrNo/frontend
# COPY BoozeOrNo/frontend/package.json ./package.json
# COPY BoozeOrNo/frontend/package-lock.json ./package-lock.json
COPY BoozeOrNo/frontend/ ./frontend/

RUN npm install

CMD ["npm", "start"]
