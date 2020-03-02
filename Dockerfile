FROM node:12

# Create start directory
WORKDIR /usr/src/start

# Install start dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# If you are building your code for production
# RUN npm install --only=production
RUN npm i npm@latest -g && npm i --only=production
# Bundle start source
COPY . .
# Start the application
CMD [ "npm", "start" ]
