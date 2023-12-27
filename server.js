const express = require("express");
require("dotenv").config();

const connectDB = require("./config/dbConnection");
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHander");

connectDB();
const app = express();

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log("App runnig on port", PORT));
