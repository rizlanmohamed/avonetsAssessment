const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const DB = process.env.DATABASE.replace(
            "<password>",
            process.env.DATABASE_PASSWORD
        );
        mongoose
            .connect(DB, {
                useNewUrlParser: true,
            })
            .then(() => {
                console.log("DB Connected");
            });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
