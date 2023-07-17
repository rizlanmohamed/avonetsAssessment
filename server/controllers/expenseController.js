const logger = require("../middleware/logger");
const Expense = require("../models/expense");

exports.post = async (req, res, next) => {
  try {
    const data = req.body;

    // expense
    // category
    // amount
    // date
    // paymentMethod
    // note

    if (
      data.expense &&
      data.category &&
      data.amount &&
      data.date &&
      data.paymentMethod
    ) {
      const customerData = await Expense.create(data);
      const savedData = await customerData.save();
      console.log(savedData)
      res.status(200).send(savedData);
    } else {
      res.status(400).send({
        status: 400,
        message: `Please fill all the data`,
      });
    }
  } catch (err) {
    logger.debug(`======== ${__filename} ========= ${err.stack}`);
    return res.status(500).json({
      message: err.message.code == 11000,
      res: "Duplicate record already in database",
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const customerData = await Expense.find();
    if (!customerData) {
      throw new Error("No Expenses data found.");
    } else {
      res.status(200).send(
        [...customerData],
      );
    }
  } catch (error) {
    throw new Error("No Expenses data found.");
  }
};

exports.get = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singlecustomer = await Expense.findById(id);
    if (singlecustomer) {
      res.status(200).send({
        status: true,
        data: singlecustomer,
      });
    } else {
      throw new Error(`No Expenses found.`);
    }
  } catch (err) {
    logger.debug(`======== ${__filename} ========= ${err.stack}`);
    return res.status(500).json({
      res: `No Expenses found.`,
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    const {
      _id,
      expense,
      category,
      amount,
      date,
      paymentMethod,
      note,
    } = req.body;

    const customerToUpdate = {
      expense,
      category,
      amount,
      date,
      paymentMethod,
      note,
    };

    const updatedData = await Expense.findOneAndUpdate(
      { _id },
      customerToUpdate,
      { new: true }
    );
    //const updatedData = await Customer.findById(_id);
    console.log(updatedData);
    if (updatedData) {
      res.status(200).send({
        status: true,
        message: "data updated",
        data: updatedData,
      });
    } else {
      res.status(400).send({
        status: true,
        message: "data update failed",
      });
    }
  } catch (err) {
    logger.debug(`======== ${__filename} ========= ${err.stack}`);
    return res.status(500).json({
      message: "unknown_error",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteCustomer = await Expense.findOneAndDelete({ _id: id });
    if (deleteCustomer) {
      res.status(200).send({
        status: true,
        message: "Expenses deleted.",
        data: deleteCustomer,
      });
    } else {
      res.status(400).send({
        status: true,
        message: "Expenses delete failed.",
        err: "Not deleted",
      });

      throw new Error(`No expenses found.`);
    }
  } catch (err) {
    logger.debug(`======== ${__filename} ========= ${err.stack}`);
    return res.status(500).json({
      res: `No expenses found.`,
    });
  }
};

exports.search = async (req, res, next) => {
  try {
    const { query } = req.query;

    const expenses = await Expense.find({
      $or: [
        { expense: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { paymentMethod: { $regex: query, $options: "i" } },
      ],
    });

    if (expenses.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No expenses found.",
      });
    } else {
      return res.status(200).json(expenses);
    }
  } catch (err) {
    logger.debug(`======== ${__filename} ========= ${err.stack}`);
    return res.status(500).json({
      message: "Unknown error occurred.",
    });
  }
};
