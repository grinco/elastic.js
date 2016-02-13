FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

# Create a directory to export via http
RUN mkdir /usr/src/app/public/
RUN echo '<script src="synaptic.js"></script>' > /usr/src/app/public/index.html

# will install all necessary libraries
RUN npm install

# We will need those for future.
RUN cp /usr/src/app/node_modules/synaptic/dist/*.js /usr/src/app/public/

# Check the contents...
RUN find

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]

