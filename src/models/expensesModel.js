const pool = require('../db');

const ExpenseModel = {
  // Get all
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM expenses ORDER BY created_at DESC');
    return rows;
  },

  // Get one
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM expenses WHERE id = ?', [id]);
    return rows[0];
  },

  // Create
  async create(expense) {
    const { title, amount, category } = expense;
    const [result] = await pool.query(
      'INSERT INTO expenses (title, amount, category) VALUES (?, ?, ?)',
      [title, amount, category]
    );
    return { id: result.insertId, title, amount, category };
  },

  // Update (return updated row, not just true/false)
  async update(id, expense) {
    const { title, amount, category } = expense;
    const [result] = await pool.query(
      'UPDATE expenses SET title = ?, amount = ?, category = ? WHERE id = ?',
      [title, amount, category, id]
    );

    if (result.affectedRows === 0) return null;

    // Fetch updated row
    return this.getById(id);
  },

  // Delete
  async delete(id) {
    const [result] = await pool.query('DELETE FROM expenses WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ExpenseModel;
