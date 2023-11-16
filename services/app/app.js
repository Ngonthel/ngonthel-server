if (process.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require("cors");

const mainRoutes = require("./routes/");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 App listens to PORT ${PORT}`));
