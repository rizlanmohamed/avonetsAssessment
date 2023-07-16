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
      res.status(200).send({
        status: 200,
        message: `Customer Save Successfully.`,
        data: savedData,
      });
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
      throw new Error("No Customer data found.");
    } else {
      res.status(200).send({
        status: true,
        data: customerData,
      });
    }
  } catch (error) {
    throw new Error("No Customer data found.");
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
      throw new Error(`No Customer found.`);
    }
  } catch (err) {
    logger.debug(`======== ${__filename} ========= ${err.stack}`);
    return res.status(500).json({
      res: `No Customer found.`,
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    const {
      _id,
      name,
      address,
      phoneNumber,
      emailAddress,
      identityNumber,
      totalPoints,
      totalPurchased,
    } = req.body;

    const customerToUpdate = {
      name,
      address,
      phoneNumber,
      emailAddress,
      identityNumber,
      totalPoints,
      totalPurchased,
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
        message: "Customer member deleted.",
        data: deleteCustomer,
      });
    } else {
      res.status(400).send({
        status: true,
        message: "Customer member delete failed.",
        err: "Not deleted",
      });

      throw new Error(`No Customer Member found.`);
    }
  } catch (err) {
    logger.debug(`======== ${__filename} ========= ${err.stack}`);
    return res.status(500).json({
      res: `No Customer Member found.`,
    });
  }
};
