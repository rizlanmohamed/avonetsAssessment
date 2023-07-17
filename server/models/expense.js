const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    expense: {
        type: String,
        required: [true, "Enter Expense"],
    },
    category: {
        type: String,
        required: [true, "Enter Category"],
    },
    amount: {
        type: Number,
        required: [true, "Enter Amount"],
    }, date: {
        type: String,
        required: [true, "Please provide the date"],
    }, paymentMethod: {
        type: String,
        required: [true, "Enter Payment Method"],
    }, note: {
        type: String,
    }
}, {
    timestamps: true
})

const Expense = mongoose.model("expense", expenseSchema)

module.exports = Expense