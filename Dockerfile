# Use Node.js LTS version as base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container (including models directory)
COPY . .

# Expose the port that the app will run on
EXPOSE 5001

# Define the command to run the app
CMD ["npm", "start"]