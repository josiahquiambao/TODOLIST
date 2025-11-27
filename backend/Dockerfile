FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy code
COPY . .

# Copy Docker environment file
COPY .env.docker .env

# Build AdonisJS
RUN node ace build

EXPOSE 3333

# Run migrations and start server
CMD sh -c "node ace migration:run --force && node build/bin/server.js"
