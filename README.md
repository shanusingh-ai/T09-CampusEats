# CampusEats – Secured Catalogue API + Frontend

**T09 – CS543 Web Services Practical Project**

CampusEats is a secure food catalogue web application developed using Node.js, Express.js, HTML, CSS, and JavaScript.

This project demonstrates important API security concepts such as JWT Authentication, Bcrypt Password Hashing, and Role-Based Authorization for Customer and Restaurant users.

## 1. Project Objectives

- To develop a secure food catalogue web application.
- To implement JWT-based user authentication.
- To protect user passwords using Bcrypt hashing.
- To implement role-based access control.
- To allow only authorized restaurant users to add food items.
- To connect a browser-based frontend with a secured REST API.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime environment |
| Express.js | REST API development |
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Frontend functionality |
| JWT | User authentication |
| Bcrypt.js | Password hashing |
| Postman | API testing |

## 3. Requirements

- Node.js 18 or later
- VS Code (recommended)
- Google Chrome or any modern web browser
- Postman (for API testing)

## 4. Installation and Setup

Follow these steps to run the project on your computer.

**Step 1: Clone or Download the Repository**

Download the project from GitHub or clone it using:

```bash
git clone https://github.com/shanusingh-ai/T09-CampusEats.git
```

**Step 2: Open the Project in VS Code**

Open the downloaded project folder in Visual Studio Code.

**Step 3: Install Dependencies**

Open the VS Code terminal and run:

```bash
npm install
```

**Step 4: Create Environment File**

Copy `.env.example` and create a new file named `.env`.

For Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

For macOS/Linux:

```bash
cp .env.example .env
```

Set a strong random JWT secret in the `.env` file.

**Step 5: Start the Server**

```bash
npm start
```

**Step 6: Open the Application**

Open your browser and visit:

```text
http://localhost:3000
```

The CampusEats frontend will open in your browser.

## 5. Demo User Accounts

The project provides two demo accounts for testing authentication and authorization.

| Role | Email | Password |
|---|---|---|
| Customer | asha@campus.edu | customer123 |
| Restaurant | mealhub@campus.edu | resto123 |

Customers can view the food catalogue, while restaurant users can add new food items.

## 6. Main Features

- **Secure Login:** Users can log in using their email and password.
- **JWT Authentication:** JSON Web Tokens are used to authenticate users.
- **Password Hashing:** Bcrypt is used to securely hash passwords.
- **Role-Based Authorization:** Different permissions are provided to Customer and Restaurant users.
- **Food Catalogue:** Users can view available food items.
- **Add Food Items:** Authorized restaurant users can add new dishes.
- **Frontend Integration:** The frontend communicates with the secured backend API.
- **Logout:** Users can log out and clear their login session.

## 7. API Routes

| HTTP Method | API Endpoint | Access |
|---|---|---|
| POST | `/login` | Public |
| GET | `/items` | Authenticated Users |
| POST | `/items` | Restaurant/Admin |
| GET | `/api/health` | Public |

### Expected API Responses

- **200 OK:** Successful login or data retrieval.
- **201 Created:** Food item successfully added.
- **401 Unauthorized:** Missing or invalid authentication token.
- **403 Forbidden:** User does not have the required role.
- **422 Unprocessable Entity:** Invalid or missing food item name.

## 8. Security Testing Using Postman

The following tests can be performed using Postman:

1. Send a GET request to `/items` without a token. Expected response: `401 Unauthorized`.
2. Log in using the Customer account.
3. Try to add a food item using the Customer token. Expected response: `403 Forbidden`.
4. Log in using the Restaurant account.
5. Add a new food item using the Restaurant token. Expected response: `201 Created`.
6. Submit an empty food item name. Expected response: `422 Unprocessable Entity`.

## 9. Project Structure

```text
T09-CampusEats/
│
├── Screenshots/
│
├── docs/
│   └── Assignment_Report.md
│
├── postman/
│   └── CampusEats_API_Security.postman_collection.json
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── .env.example
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
└── server.js
```

## 10. Important Notes

- Demo users and food items are stored in memory and reset when the server restarts.
- Never upload your actual `.env` file or JWT secret to GitHub.
- Use `.env.example` to show the required environment variables.
- Use HTTPS and secure database storage in a production application.
- This project is developed for academic and practical learning purposes.

## 11. Conclusion

CampusEats demonstrates how authentication, password hashing, and role-based authorization can be implemented in a REST API using Node.js and Express.js.

The project provides a practical understanding of API security and frontend-backend integration.

---

**Project Name:** T09 – CampusEats  
**Subject:** CS543 – Web Services  
**Repository:** https://github.com/shanusingh-ai/T09-CampusEats
