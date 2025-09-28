FROM node:20

WORKDIR /app

# chỉ copy package.json trước để cache npm install
COPY package*.json ./

RUN npm install

# copy toàn bộ source
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
