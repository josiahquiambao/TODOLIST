FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy code
COPY . .

# Build AdonisJS
RUN node ace build

EXPOSE 3333

# Run Adonis server
CMD ["node", "node ace serve --watch"]
