FROM node:12-alpine
WORKDIR /app
# COPY package*.json ./
COPY *.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "./dist/index.js"]
