require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
// router links
const indexRouter = require("./routes/indexRouter");

//url encoding middleware
app.use(express.urlencoded({ extended: true }));

//set views and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//routing for static pages eg styles.css
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// routers
app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
