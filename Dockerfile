FROM node:10.15-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY --chown=node:node . .

# start app
CMD ["npm", "start"]

