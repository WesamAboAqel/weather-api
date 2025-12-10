# Weather API Wrapper Service

A lightweight Node.js + Express wrapper around the VisualCrossing Weather API featuring:

-   Redis caching
-   Rate-limiting
-   Optional date-range weather queries
-   Clean logging
-   Centralized error handling
-   Dockerized environment
-   Modular and scalable architecture

This project is built as part of:
**[https://roadmap.sh/projects/weather-api-wrapper-service](https://roadmap.sh/projects/weather-api-wrapper-service)**

---

# Project Structure

```
.
├── controllers/
│   └── controllers.js
├── middleware/
│   ├── error_handler.js
│   ├── logger.js
│   ├── validateDates.js
├── utils/
│   ├── formatAPIDate.js
│   └── formatDateTime.js
├── services/
│   └── redis.js
├── routes/
│   └── routes.js
├── Dockerfile
├── docker-compose.yml
├── server.js
├── package-lock.js
├── package.js
├── ReadMe.md
└── .env
```

---

# Features

### **Weather Fetching**

Fetches weather data for a given country, _**with**_ or _**without**_ date ranges.

### **Redis Caching**

Each weather response is cached under a generated key:

```
weather:<country>
weather:<country>::<startDate>:<endDate>
```

TTL is set to **3600 seconds**.

### **Rate Limiting**

Each client IP may make **10 requests per minute**.

### **Date Range Support**

You can request:

-   Latest weather:
    `GET /api/weather/jordan`
-   Weather for a specific date range:
    `GET /api/weather/jordan/12-5-2025/12-10-2025`

Internal date formatting uses:

```
MM-DD-YYYY
```

### **Custom Logging**

All requests are logged with timestamps:

```
[2025-01-01 14:33:22] GET http://localhost:3000/api/weather/jordan
```

### **Error Handling**

Errors are centrally captured and output as:

```
[2025-01-01 14:35:10]  Error: Invalid Date Format
```

---

# Endpoints

## **1. Get Weather for a Country**

```
GET /api/weather/:country
```

### Example:

```
GET /api/weather/jordan
```

---

## **2. Get Weather for a Date Range**

```
GET /api/weather/:country/:date1/:date2
```

### Example:

```
GET /api/weather/jordan/12-5-2025/12-10-2025
```

### Date Rules

-   Accepts any format that `new Date()` can parse.
-   Rejects invalid dates via `validateDates.js`.
-   Produces API dates in:

```
YYYY-MM-DD
```

---

# Redis Caching Logic

### Key Format:

| Query Type | Redis Key                           |
| ---------- | ----------------------------------- |
| No dates   | `weather:jordan`                    |
| With dates | `weather:jordan::2025-1-1:2025-1-5` |

### TTL:

```
3600 seconds
```

---

# Rate Limiting

Each request increments:

```
rate-limiter:<ip>
```

Rules:

-   First request → key lifetime set to **60s**
-   After 10 requests → block with a 429 response
-   Response body:

```
{ "msg": "You hit the rate limit, try again in X seconds" }
```

---

# Docker Setup

### **1. Environment Variables**

Create `.env`:

```
PORT=3000
HOST=0.0.0.0
REDIS_PORT=6379
REDIS_HOST=redis
WEATHER_API=YOUR_API_KEY
```

---

### **2. Start the Stack**

```
docker compose up -d --build
```

This launches:

-   A Node backend container
-   A Redis cache container

---

# Example Responses

### **Cache Hit**

```
[2025-01-01 14:20:12]  Found in Cache
```

---

### **Error Example**

If the weather API rejects a request:

```
[2025-01-01 14:21:10]  Error: Bad API Request: Address is too short
```

---

# Tech Used

-   Node.js
-   Express.js
-   Redis
-   Docker / Docker Compose
-   VisualCrossing Weather API

---
