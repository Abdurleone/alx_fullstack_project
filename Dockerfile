# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 2704

# Set the environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["node", "index.js"]