const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 4020;

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost/ibdb", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

app.get('/', (req, res) => res.json({message: ""}))

app.use("/authors", require("./routes/authorRouter"));
app.use("/books", require("./routes/bookRouter"));

app.listen(PORT, () =>
  console.log(`🚀 Started on port ${PORT} (http://localhost:${PORT}/)`)
);
