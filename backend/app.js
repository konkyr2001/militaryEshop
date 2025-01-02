const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database is connected successfully.");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const user = require("./routes/user");
app.use("/users", user);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
