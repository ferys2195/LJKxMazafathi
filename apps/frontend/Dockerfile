# Gunakan Node.js sebagai base image
FROM node:22.14.0-alpine

# Set working directory
WORKDIR /var/www/frontend

# Copy package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Copy semua file
COPY . .

# Build React untuk produksi
RUN npm run build

# Jalankan menggunakan server statis
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
