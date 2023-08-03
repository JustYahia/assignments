const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRouter = require("./routes/products");
const userRouter = require("./routes/users");


dotenv.config({ path: "./config.env" });


const app = express();


app.use(express.json());


app.use("/products", productRouter);
app.use("/users", userRouter);


mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
 
    const port = process.env.PORT || 5500;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
   
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });


app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "Internal server error." });
});

module.exports = app;
