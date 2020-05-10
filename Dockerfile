FROM node
WORKDIR /app
COPY package.json /app
RUN npm install -g nodemon
RUN npm install
COPY . /app
CMD nodemon --exec babel-node ./api/index.js
EXPOSE 8081
