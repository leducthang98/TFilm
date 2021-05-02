FROM node:12.18.1

WORKDIR /app 

COPY package.json /app 

RUN npm install

COPY . /app

RUN npm uninstall bcrypt
RUN npm install bcrypt

EXPOSE 3110

CMD ["npm","start"]