<<<<<<< HEAD
# CampusEats — Secured Catalogue API + Frontend

CS543 Web Services practical project demonstrating bcrypt password hashing, JWT authentication, role-based authorization, and a responsive browser frontend.

## Requirements
- Node.js 18 or later
- VS Code (recommended)

## Run in VS Code
1. Extract this ZIP file.
2. Open the extracted `CampusEats_API_Security_Assignment` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Create your environment file:
   - Windows PowerShell: `Copy-Item .env.example .env`
   - macOS/Linux: `cp .env.example .env`
6. Start the server:
   ```bash
   npm start
   ```
7. Open **http://localhost:3000** in Chrome or another browser. This is the graphical CampusEats frontend.

The terminal will display the server URL. The API health check is at `http://localhost:3000/api/health`.

## Demo accounts
| Role | Email | Password |
|---|---|---|
| Customer | asha@campus.edu | customer123 |
| Restaurant | mealhub@campus.edu | resto123 |

Use the demo account buttons on the login page to fill the credentials automatically.

## Frontend features
- CampusEats catalogue interface using the supplied HTML/CSS frontend, extended with a secure login screen
- Customer and restaurant demo sign-in
- Menu catalogue loaded from the secured API
- Restaurant-only add-dish form
- Login state stored in browser session storage; logout clears it
- Clear API success and error messages

## API routes
| Method | Route | Access | Expected result |
|---|---|---|---|
| POST | `/login` | Public | 200 with JWT, or 401 for invalid credentials |
| GET | `/items` | Any valid token | 200 with menu items |
| POST | `/items` | Restaurant/admin token | 201 when item is added |
| GET | `/api/health` | Public | 200 health status |

## Test the security rules
- Open `/items` without a token using Postman: expect **401**.
- Sign in as customer and try `POST /items`: expect **403**.
- Sign in as restaurant and add a dish: expect **201**.
- Submit an empty dish name: expect **422**.

The frontend automatically sends `Authorization: Bearer <token>` for protected API calls. The restaurant-only form is hidden from customer accounts; server-side role authorization remains the actual security control.

## Project structure
```text
CampusEats_API_Security_Assignment/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docs/
│   └── Assignment_Report.md
├── postman/
│   └── CampusEats_API_Security.postman_collection.json
├── server.js
├── package.json
├── .env.example
└── README.md
```

## Notes
- Demo users and menu items are held in memory. They reset when the server restarts; this is suitable for the tutorial demonstration, not production storage.
- Set a strong random `JWT_SECRET` in `.env` before deployment. Never commit `.env` or expose production secrets.
- Use HTTPS in production. This local classroom demo runs over HTTP on localhost.
=======
# T09-CampusEats
CampusEats is a secure food catalogue web application developed using Node.js, Express.js, HTML, CSS and JavaScript. It implements JWT Authentication, Bcrypt Password Hashing and Role-Based Authorization for Customer and Restaurant users.
>>>>>>> c432a6b9a0a7af2c277b63aa3a6a64ed478bc0bb
