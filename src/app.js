require('dotenv').config();
const express = require('express');
const cors = require('cors');
const expensesRoutes = require('./routes/expenses');
const path = require('path');
const swagger = require('../swagger');  // ✅ import correctly

const app = express();

// Swagger Docs
app.use('/api-docs', swagger.serve, swagger.setup);

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/expenses', expensesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
