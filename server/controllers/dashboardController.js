const logger = require("../middleware/logger");
const Expense = require("../models/expense");

exports.pieChart = async (req, res, next) => {
  try {
    const customerData = await Expense.find();
    if (!customerData) {
      throw new Error("No Expenses data found.");
    } else {
      const categoryAmounts = {};
      const maxExpenseAmount = 10000;
      let totalExpenseAmount = 0;

      // Calculate the total expense amount and assign each category's expense to the categoryAmounts object
      customerData.forEach((expense) => {
        const category = expense.category;
        const amount = expense.amount;
        totalExpenseAmount += amount;

        if (categoryAmounts[category]) {
          categoryAmounts[category] += amount;
        } else {
          categoryAmounts[category] = amount;
        }
      });

      // Calculate the remaining balance
      const remainingBalance = maxExpenseAmount - totalExpenseAmount;

      // Prepare the data array with each category's percentage
      const data = Object.keys(categoryAmounts).map((category) => ({
        type: category,
        value: (categoryAmounts[category] / totalExpenseAmount) * 100,
      }));

      // If there is remaining balance, add a "Free" category to the data array
      if (remainingBalance > 0) {
        data.push({
          type: "Free",
          value: (remainingBalance / totalExpenseAmount) * 100,
        });
      }

      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "No Expenses data found." });
  }
};

exports.balanceSummary = async (req, res, next) => {
  try {
    const customerData = await Expense.find();
    if (!customerData) {
      throw new Error("No Expenses data found.");
    } else {
      const maxExpenseAmount = 10000;
      let totalExpenseAmount = 0;

      // Calculate the total expense amount
      customerData.forEach((expense) => {
        const amount = expense.amount;
        totalExpenseAmount += amount;
      });

      // Calculate the balance
      const balance = maxExpenseAmount - totalExpenseAmount;

      // Calculate the spend
      const spend = totalExpenseAmount;

      // Calculate the balance percentage
      const balancePercentage = (balance / maxExpenseAmount) * 100;

      res.status(200).json({
        balance: balance.toFixed(2),
        spend: spend.toFixed(2),
        balancePercentage: balancePercentage.toFixed(2),
      });
    }
  } catch (error) {
    res.status(500).json({ error: "No Expenses data found." });
  }
};
