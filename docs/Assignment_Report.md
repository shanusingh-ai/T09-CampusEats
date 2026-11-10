# Assignment Report: Securing the CampusEats API

**Course:** CS543 – Web Services  
**Topic:** Securing the API  
**Project:** CampusEats Secured Catalogue  
**Tools:** Node.js, Express.js, bcryptjs, JSON Web Token (JWT), Postman, Visual Studio Code

## 1. Aim

The aim of this assignment is to secure the CampusEats Catalogue API by implementing password hashing, token-based authentication, and role-based authorization.

## 2. Introduction

An API allows different applications to communicate with a server. An unsecured API may allow unknown users to access protected information or make changes. This project adds security checks to the catalogue service. A user must log in to receive a JWT. The token is sent with protected requests. The server verifies the token and checks the user's role before allowing restricted actions.

## 3. Technologies Used

- **Node.js:** JavaScript runtime used to run the server.
- **Express.js:** framework used to create API routes and middleware.
- **bcryptjs:** hashes passwords and compares login passwords with stored hashes.
- **jsonwebtoken:** creates and verifies signed JWT tokens.
- **Postman:** sends API requests and checks responses.
- **Visual Studio Code:** editor used to develop and run the project.

## 4. Implementation

### 4.1 Password Hashing

Two demo users are created: a customer and a restaurant. Their passwords are hashed using `bcrypt.hashSync()` with a salt-round value of 10. The application does not store the passwords as plain text.

### 4.2 Login Route

The `POST /login` route accepts an email and password. It finds the user and checks the password using `bcrypt.compareSync()`. If the credentials are correct, `jwt.sign()` creates a signed token containing the user's ID and role. The token expires after one hour. Incorrect credentials return HTTP 401.

### 4.3 Authentication Middleware

The `auth` middleware reads the token from the `Authorization` header in the format `Bearer <token>`. It verifies the token using `jwt.verify()`. If the token is missing, invalid, or expired, the server returns HTTP 401. Otherwise, the decoded user information is attached to `req.user`.

### 4.4 Authorization Middleware

The `requireRole()` middleware checks the role stored in the verified token. Only a restaurant or admin role can add a dish. A customer trying to add a dish receives HTTP 403.

### 4.5 Catalogue Routes

- `GET /items`: any authenticated user can view the menu.
- `POST /items`: only a restaurant or admin can add a dish.
- The server checks that a dish name is present and that the price is a valid non-negative number. Invalid input returns HTTP 422.

## 5. Testing and Expected Results

| Test condition | Expected HTTP status | Result meaning |
|---|---:|---|
| Read items without token | 401 | Authentication required |
| Correct login | 200 | Token generated |
| Incorrect login | 401 | Credentials rejected |
| Read items with valid token | 200 | Access granted |
| Customer adds a dish | 403 | Role permission denied |
| Restaurant adds a dish | 201 | Dish created |
| Missing dish name / invalid price | 422 | Validation failed |

Record actual Postman screenshots after running the project. Do not claim a test passed until you have performed it.

## 6. Difference Between 401 and 403

- **401 Unauthorized:** the server cannot authenticate the request because the token is missing, invalid, or expired.
- **403 Forbidden:** the server knows the user, but that user's role does not allow the requested action.

## 7. Security Practices

1. Store password hashes instead of plain-text passwords.
2. Keep the JWT secret in an environment variable.
3. Set an expiry time on tokens.
4. Authenticate before checking authorization.
5. Validate incoming data.
6. Use HTTPS in production.
7. Check access to individual resources in a real application.

## 8. Conclusion

The CampusEats Catalogue API is protected using bcrypt password hashing, JWT-based authentication, and role-based authorization. Authenticated users can view the menu, while only restaurant/admin users can add dishes. The project demonstrates the purpose of HTTP status codes 200, 201, 401, 403, and 422 in a secured web service.

## 9. Future Scope

The demo can be improved by storing users and menu items in a database, adding an admin account, moving the JWT secret to a secure environment configuration, and implementing object-level authorization for individual orders.
