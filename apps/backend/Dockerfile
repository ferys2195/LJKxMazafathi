# Gunakan image PHP dengan FPM
FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/backend

# Copy seluruh proyek
COPY . .

# Install dependensi Laravel
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/backend/storage /var/www/backend/bootstrap/cache

# Jalankan PHP-FPM
CMD ["php-fpm"]
