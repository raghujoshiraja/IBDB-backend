// Imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// PORT
const PORT = process.env.PORT || 4020;

// Initialization
const app = express();
app.use(express.json());

// MongoDB ORM connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

// Welcome message
app.get("/", (_, res) =>
  res.json({
    message:
      "Hey, you reached the IBDB backend! Explore the /books or /authors routes, or use the frontend for this website.",
  })
);

// Routes
app.use("/authors", require("./routes/authorRouter"));
app.use("/books", require("./routes/bookRouter"));

// Statup
app.listen(PORT, () =>
  console.log(`🚀 Started on port ${PORT} (http://localhost:${PORT}/)`)
);
