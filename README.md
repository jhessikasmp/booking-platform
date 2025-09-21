# Booking Platform API

Appointment scheduling platform for small and medium businesses. This API lets you manage users, professionals, availabilities, and appointments, with secure authentication, email notifications, optional Google Calendar sync, Stripe payments, and structured logging.

## Features
- ✅ User authentication (JWT)
- ✅ Professional management and availability
- ✅ Appointment creation, listing (mine), and cancellation
- ✅ Payments via Stripe (checkout session)
- ✅ Email notifications (SMTP) — providers like Mailgun/Resend supported
- ✅ Optional Google Calendar integration
- ✅ Centralized error handling and validation with Zod
- ✅ Structured logging with Winston
- ✅ 12-Factor App friendly

## Technologies Used
- Node.js, TypeScript
- Express, CORS
- PostgreSQL (`pg`)
- JSON Web Token (`jsonwebtoken`)
- Zod (schema validation)
- Nodemailer (email) — with optional Mailgun/Resend
- Stripe (payments)
- Google APIs (Calendar)
- Winston (logging)
- Dotenv (env config)

## Project Structure
```
booking-platform/
├── src/
│   ├── controllers/          # Route controllers
│   │   ├── appointmentController.ts
│   │   ├── authController.ts
│   │   ├── paymentController.ts
│   │   ├── professionalController.ts
│   │   └── userController.ts
│   ├── middleware/           # Auth, validation, error handler
│   │   ├── auth.ts
│   │   ├── error.middleware.ts
│   │   └── validation.ts
│   ├── models/               # Domain models (TS)
│   │   ├── Appointment.ts
│   │   ├── Availability.ts
│   │   ├── Professional.ts
│   │   └── User.ts
│   ├── routes/               # API routes
│   │   ├── appointments.ts
│   │   ├── auth.ts
│   │   ├── payments.ts
│   │   ├── professionals.ts
│   │   └── users.ts
│   ├── services/             # Business/services (email, payments, calendar)
│   │   ├── calendarService.ts
│   │   ├── emailService.ts
│   │   └── paymentService.ts
│   ├── config/               # Environment and database
│   │   ├── database.ts
│   │   └── environment.ts
│   ├── utils/                # Helpers and logger
│   │   ├── helpers.ts
│   │   └── logger.ts
│   ├── app.ts                # Express app wiring
│   └── server.ts             # HTTP server entry
├── .env                      # Environment variables (ignored)
├── .env.example              # Example environment variables
├── package.json              # Scripts and deps
├── tsconfig.json             # TypeScript config
├── .gitignore                # Git ignore rules
└── README.md                 # Project docs
```

## Installation

1) Clone the repository:

```bash
git clone https://github.com/jhessikasmp/booking-platform.git
cd booking-platform
```

2) Install dependencies:

```bash
npm install
```

3) Configure environment variables. Create a `.env` at the project root (you can copy from `.env.example`):

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/booking_db
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=7d
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
# Optional: path to Google service account key for Calendar
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./service-account-key.json
```

4) Build and run:

- Development (watch):
```bash
npm run dev
```
- Production build and start:
```bash
npm run build
npm start
```

Server will start on: `http://localhost:<PORT>`

## API Endpoints
Base URL: `/api`

- Auth
  - `POST /api/auth/register` — Register a new user
  - `POST /api/auth/login` — Login and receive JWT

- Users
  - `GET /api/users/me` — Get current user profile (requires `Authorization: Bearer <token>`)

- Professionals
  - `GET /api/professionals` — List professionals (auth)
  - `GET /api/professionals/:id/availability` — Get availability for a professional (auth)
  - `POST /api/professionals/:id/availability` — Set availability (auth)

- Appointments
  - `POST /api/appointments` — Create appointment (auth)
  - `GET /api/appointments/my` — List my appointments (auth)
  - `PUT /api/appointments/:id/cancel` — Cancel an appointment (auth)

- Payments
  - `POST /api/payments/create-checkout` — Create Stripe checkout session (auth)

- Health
  - `GET /api/health` — Health check

## Usage Examples

- Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Alice",
    "email":"alice@example.com",
    "password":"secret123"
  }'
```

- Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"alice@example.com",
    "password":"secret123"
  }'
```

- Get my profile
```bash
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer <JWT>"
```

- Create an appointment
```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "professionalId":"<professional_id>",
    "datetime":"2025-09-30T14:00:00.000Z",
    "notes":"First consultation"
  }'
```

- List my appointments
```bash
curl http://localhost:3000/api/appointments/my \
  -H "Authorization: Bearer <JWT>"
```

- Cancel an appointment
```bash
curl -X PUT http://localhost:3000/api/appointments/<appointment_id>/cancel \
  -H "Authorization: Bearer <JWT>"
```

- Professionals: list, get/set availability
```bash
curl http://localhost:3000/api/professionals \
  -H "Authorization: Bearer <JWT>"

curl http://localhost:3000/api/professionals/<id>/availability \
  -H "Authorization: Bearer <JWT>"

curl -X POST http://localhost:3000/api/professionals/<id>/availability \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "slots":[
      {"start":"2025-09-30T14:00:00Z","end":"2025-09-30T15:00:00Z"}
    ]
  }'
```

- Create Stripe checkout session
```bash
curl -X POST http://localhost:3000/api/payments/create-checkout \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "appointmentId":"<appointment_id>",
    "currency":"usd",
    "amount":5000
  }'
```

> Note: Request/response shapes may vary according to your controllers; adjust payloads accordingly.

## 12-Factor App Methodology
This project follows the 12-Factor principles:
1. Codebase — One codebase, many deploys
2. Dependencies — Explicitly declared in `package.json`
3. Config — Stored in the environment (`.env`)
4. Backing services — Treated as attached resources (DB, SMTP, Stripe)
5. Build, release, run — Separated (`npm run build` -> `npm start`)
6. Processes — Stateless processes
7. Port binding — Expose via port binding
8. Concurrency — Scale out by process model
9. Disposability — Fast startup and graceful shutdown
10. Dev/prod parity — Keep environments similar
11. Logs — Treat logs as event streams (Winston)
12. Admin processes — One-off tasks as separate runs

## Deployment

### Render (example)
- Build Command: `npm run build`
- Start Command: `npm start`
- Environment Variables: add all from `.env.example`

Render provides SSL, scaling, and global CDN for static assets (if any).

## Documentation
- Swagger/OpenAPI: not set up yet. You can add `swagger-ui-express` and an OpenAPI spec to expose docs at `/api-docs`.

## License
MIT — see `LICENSE` (add one if not present).

## Contact
For questions or suggestions, please contact: your-email@example.com
# booking-platform
