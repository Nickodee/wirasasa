# WiraSasa Backend API

Flask-based REST API for the WiraSasa service marketplace application.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py              # Application factory
│   ├── api/
│   │   └── v1/
│   │       ├── __init__.py      # API v1 blueprint
│   │       └── routes/          # API route handlers
│   │           ├── auth.py      # Authentication endpoints
│   │           ├── users.py     # User management endpoints
│   │           ├── services.py  # Service catalog endpoints
│   │           ├── jobs.py      # Job management endpoints
│   │           ├── providers.py # Provider endpoints
│   │           ├── payments.py  # Payment endpoints
│   │           ├── notifications.py # Notification endpoints
│   │           └── chat.py      # Chat endpoints
│   ├── models/                  # Database models
│   │   ├── user.py             # User and ProviderProfile models
│   │   ├── service.py          # Service models
│   │   ├── job.py              # Job and Review models
│   │   ├── payment.py          # Payment models
│   │   ├── notification.py     # Notification model
│   │   └── chat.py             # Chat models
│   ├── services/               # Business logic layer
│   │   ├── auth_service.py
│   │   ├── user_service.py
│   │   ├── service_service.py
│   │   ├── job_service.py
│   │   ├── provider_service.py
│   │   ├── payment_service.py
│   │   ├── notification_service.py
│   │   └── chat_service.py
│   ├── schemas/                # Marshmallow schemas for serialization
│   │   └── user_schema.py
│   ├── utils/                  # Utility functions
│   │   └── error_handlers.py
│   └── middleware/             # Custom middleware
│       └── auth_middleware.py
├── config/
│   └── config.py               # Configuration settings
├── migrations/                 # Database migrations (managed by Flask-Migrate)
├── tests/                      # Unit and integration tests
├── run.py                      # Application entry point
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
├── .gitignore
└── README.md

```

## Features

- **RESTful API** with versioning (v1)
- **JWT Authentication** for secure access
- **Role-based access control** (Client/Provider)
- **Database migrations** with Flask-Migrate
- **Error handling** middleware
- **CORS support** for React Native frontend
- **Modular architecture** with clear separation of concerns

## Setup Instructions

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Initialize Database

```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### 5. Run Development Server

```bash
python run.py
# Or using Flask CLI:
flask run
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password

### Users
- `GET /api/v1/users/profile` - Get current user profile
- `PUT /api/v1/users/profile` - Update current user profile
- `GET /api/v1/users/<id>` - Get user by ID

### Services
- `GET /api/v1/services` - Get all services
- `GET /api/v1/services/<id>` - Get service by ID
- `GET /api/v1/services/categories` - Get service categories

### Jobs
- `POST /api/v1/jobs` - Create job request
- `GET /api/v1/jobs/<id>` - Get job details
- `PUT /api/v1/jobs/<id>` - Update job
- `POST /api/v1/jobs/<id>/cancel` - Cancel job
- `GET /api/v1/jobs/upcoming` - Get upcoming jobs
- `GET /api/v1/jobs/history` - Get job history
- `GET /api/v1/jobs/available` - Get available jobs (providers)
- `POST /api/v1/jobs/<id>/accept` - Accept job (providers)
- `POST /api/v1/jobs/<id>/complete` - Complete job
- `POST /api/v1/jobs/<id>/review` - Submit review

### Providers
- `GET /api/v1/providers` - Get all providers
- `GET /api/v1/providers/<id>` - Get provider details
- `GET /api/v1/providers/dashboard` - Get provider dashboard stats
- `GET /api/v1/providers/availability` - Get provider availability
- `POST /api/v1/providers/availability` - Set provider availability
- `GET /api/v1/providers/services` - Get provider services
- `POST /api/v1/providers/services` - Add provider service
- `DELETE /api/v1/providers/services/<id>` - Remove provider service

### Payments
- `GET /api/v1/payments/methods` - Get payment methods
- `POST /api/v1/payments/methods` - Add payment method
- `DELETE /api/v1/payments/methods/<id>` - Delete payment method
- `POST /api/v1/payments/process` - Process payment
- `GET /api/v1/payments/history` - Get payment history

### Notifications
- `GET /api/v1/notifications` - Get notifications
- `POST /api/v1/notifications/<id>/read` - Mark as read
- `POST /api/v1/notifications/read-all` - Mark all as read
- `DELETE /api/v1/notifications/<id>` - Delete notification

### Chat
- `GET /api/v1/chat/conversations` - Get conversations
- `GET /api/v1/chat/conversations/<id>` - Get conversation details
- `GET /api/v1/chat/conversations/<id>/messages` - Get messages
- `POST /api/v1/chat/conversations/<id>/messages` - Send message

## Database Models

- **User** - User accounts (clients and providers)
- **ProviderProfile** - Extended profile for service providers
- **Service** - Service catalog
- **ProviderService** - Services offered by providers
- **Availability** - Provider availability schedule
- **Job** - Service requests/jobs
- **Review** - Job reviews and ratings
- **PaymentMethod** - User payment methods
- **Payment** - Payment transactions
- **Notification** - User notifications
- **Conversation** - Chat conversations
- **ConversationParticipant** - Conversation participants
- **Message** - Chat messages

## Development Guidelines

1. **Always use the service layer** for business logic
2. **Keep routes thin** - they should only handle HTTP concerns
3. **Use schemas** for request/response validation
4. **Write tests** for new features
5. **Follow PEP 8** style guidelines
6. **Document API changes** in this README

## Testing

```bash
pytest
```

## Production Deployment

1. Set `FLASK_ENV=production` in environment
2. Use a production-grade database (PostgreSQL)
3. Set strong secret keys
4. Use Gunicorn as WSGI server:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 run:app
   ```
5. Set up proper logging and monitoring
6. Use a reverse proxy (nginx)
7. Enable HTTPS

## License

Proprietary - WiraSasa
