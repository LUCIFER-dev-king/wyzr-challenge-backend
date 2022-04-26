const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");
const searchRoutes = require("./routes/search");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://wyzruser:M01lYmBUY4P4hRCX@cluster0.jb8kk.mongodb.net/wyzrDB?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  });
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", searchRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Server running" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
