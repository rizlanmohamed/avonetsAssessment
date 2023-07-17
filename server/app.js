const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');

const corsOptions = {
    origin: '*',
    credentials: true,            
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) 

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
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = app;
