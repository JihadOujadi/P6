const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");
const rateLimit = require("express-rate-limit");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");
require('dotenv').config();

const app = express();
app.use(express.json());



app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_MONGOOSE_USERNAME}:${process.env.DB_MONGOOSE_PASSWORD}@${process.env.DB_MONGOOSE_CLUSTER}.mongodb.net/${process.env.DB_MONGOOSE_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
