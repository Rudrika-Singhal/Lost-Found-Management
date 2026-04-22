const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const auth = require("../middleware/auth");

// ADD EXPENSE
router.post("/", auth, async (req, res) => {
  const expense = new Expense({
    ...req.body,
    userId: req.user.id
  });

  await expense.save();
  res.json(expense);
});
// Delete Expense
router.delete("/:id", auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

// GET ALL EXPENSES
router.get("/", auth, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id });
  res.json(expenses);
});

module.exports = router;