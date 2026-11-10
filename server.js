// CS543 Web Services - CampusEats Secured Catalogue
// Demonstrates password hashing, JWT authentication and role-based authorization.

require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
// Serve the CampusEats web frontend from the public folder.
app.use(express.static(require('path').join(__dirname, 'public')));

// In a real deployment, JWT_SECRET must be a long, random environment variable.
const SECRET = process.env.JWT_SECRET || 'development-only-secret-change-before-deployment';
const PORT = Number(process.env.PORT) || 3000;

// Demo users. Passwords are hashed at startup; plain-text passwords are not stored.
const users = [
  {
    id: 1,
    email: 'asha@campus.edu',
    role: 'customer',
    hash: bcrypt.hashSync('customer123', 10)
  },
  {
    id: 2,
    email: 'mealhub@campus.edu',
    role: 'restaurant',
    hash: bcrypt.hashSync('resto123', 10)
  }
];

// In-memory catalogue from the starter service.
let items = [
  { id: 1, name: 'Veg Thali', price: 90 },
  { id: 2, name: 'Paneer Roll', price: 70 }
];
let nextId = 3;

// Public route: verify credentials and return a signed JWT.
app.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = users.find((entry) => entry.email === email);
  if (!user || !bcrypt.compareSync(password, user.hash)) {
    return res.status(401).json({ error: 'bad login' });
  }

  const token = jwt.sign(
    { role: user.role },
    SECRET,
    { subject: String(user.id), expiresIn: '1h' }
  );

  return res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, email: user.email, role: user.role }
  });
});

// Authentication middleware: identify the caller from a valid Bearer token.
function auth(req, res, next) {
  const authorization = req.get('Authorization') || '';
  const parts = authorization.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ error: 'missing or invalid Authorization header; use Bearer <token>' });
  }

  try {
    req.user = jwt.verify(parts[1], SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'invalid or expired token' });
  }
}

// Authorization middleware: allow only the listed roles.
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'forbidden: your role cannot perform this action' });
    }
    return next();
  };
}

// Any authenticated user can view the menu.
app.get('/items', auth, (req, res) => {
  return res.status(200).json({ items });
});

// Only restaurant/admin roles can add a dish.
app.post('/items', auth, requireRole('restaurant', 'admin'), (req, res) => {
  const { name, price } = req.body || {};

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(422).json({ error: 'name required' });
  }

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return res.status(422).json({ error: 'price must be a valid non-negative number' });
  }

  const item = {
    id: nextId++,
    name: name.trim(),
    price: numericPrice
  };

  items.push(item);
  return res.status(201).json({ message: 'Item added successfully', item });
});

// Health-check endpoint. The root URL serves the frontend (public/index.html).
app.get('/api/health', (req, res) => {
  res.json({ service: 'CampusEats Secured Catalogue API', status: 'running' });
});

// Handle malformed JSON with a clear response.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'invalid JSON body' });
  }
  return next(err);
});

app.listen(PORT, () => {
  console.log(`Secured Catalogue running at http://localhost:${PORT}`);
  console.log('Demo customer: asha@campus.edu / customer123');
  console.log('Demo restaurant: mealhub@campus.edu / resto123');
});
