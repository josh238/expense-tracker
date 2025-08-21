const ExpenseModel = require('../models/expensesModel');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseModel.getAll();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one expense
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await ExpenseModel.getById(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res.status(400).json({ error: "Title, amount, and category are required" });
    }

    const newExpense = await ExpenseModel.create({ title, amount, category });
    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create expense" });
  }
};




// Update
exports.updateExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res.status(400).json({ error: "Title, amount, and category are required" });
    }

    const updated = await ExpenseModel.update(req.params.id, { title, amount, category });

    if (!updated) return res.status(404).json({ error: "Expense not found" });

    res.json({ message: "Expense updated successfully", expense: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update expense" });
  }
};


// Delete
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await ExpenseModel.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};

