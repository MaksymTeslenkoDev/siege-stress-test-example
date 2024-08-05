# Use the official Node.js 14 image as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Basic deps for Node.js
RUN apk update && apk add --no-cache dumb-init python3 libc-dev make g++

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=dev

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port (replace 3000 with your application's port)
EXPOSE 3000

# Start the application
CMD [ "node", "server.js" ]