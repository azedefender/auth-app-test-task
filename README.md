```markdown
# Auth App

Это простое веб-приложение на Node.js, использующее Express и Redis для аутентификации пользователей. Приложение реализует регистрацию, вход в систему и выход с использованием JWT (JSON Web Tokens).

## Функциональные возможности

- Регистрация пользователей
- Вход в систему с использованием JWT
- Выход из системы с использованием черного списка токенов
- Хранение данных пользователей в Redis

## Установка

### Предварительные требования

- [Node.js](https://nodejs.org/) (версия 14 или выше)
- [Docker](https://www.docker.com/) и [Docker Compose](https://docs.docker.com/compose/)

### Клонирование репозитория

```bash
git clone https://github.com/yourusername/my-auth-app.git
cd my-auth-app
```

### Установка зависимостей

Если вы не используете Docker, выполните следующие команды:

```bash
npm install
```

### Настройка переменных окружения

Создайте файл `.env` в корне проекта и добавьте следующие переменные:

```
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

### Запуск приложения

#### С помощью Docker

1. Запустите приложение с помощью Docker Compose:

```bash
docker-compose up
```

2. Приложение будет доступно по адресу `http://localhost:3000`.

#### Без Docker

Если вы хотите запустить приложение без Docker, используйте следующую команду:

```bash
node src/app.js
```

### Использование

API имеет следующие конечные точки:

- **POST /api/register**
  - Регистрация нового пользователя.
  - Тело запроса:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

- **POST /api/login**
  - Вход в систему.
  - Тело запроса:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - Ответ:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

- **POST /api/logout**
  - Выход из системы. Требует токен в заголовке `Authorization` в формате `Bearer your_jwt_token`.
```
