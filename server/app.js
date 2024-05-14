require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoConnect = require("./config/mongooseConifig");
const logger = require("morgan");
const socketModule = require("./socketIo");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);
const server = app.listen(5000, () => {
  console.log(`Application running on port 5000`);
});
socketModule(server);
