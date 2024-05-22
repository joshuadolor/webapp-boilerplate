# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE ${FRONTEND_PORT}

# Command to run the development server
CMD ["npm", "run", "dev"]
