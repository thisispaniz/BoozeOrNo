FROM node:18

WORKDIR /workspaces/BoozeOrNo/frontend
COPY . /workspaces/BoozeOrNo/frontend
COPY . /workspaces/BoozeOrNo/frontend/package.json ./package.json  # Ensure this is correct
COPY . /workspaces/BoozeOrNo/frontend/package-lock.json ./package-lock.json  # If you have it

RUN npm install


CMD ["npm", "start"]