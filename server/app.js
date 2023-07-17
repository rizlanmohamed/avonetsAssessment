const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Routes

const expensesRoutes = require("./routes/expenses");
app.use("/api/Expense", expensesRoutes);

const dashboardRoute = require("./routes/dashboard");
app.use("/api/Visualization", dashboardRoute);

app.all("*", (req, res) => {
    res.status(404).json({
        status: "Fail",
        message: "URL not found, Please try other URL",
    });
    //next(new AppError(`can't find ${req.originalUrl} on this se`));
});

//Global error handling which can pass send this response from every middleware if that occures with error
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = app;
