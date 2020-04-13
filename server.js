const express = require("express");
const connectDb = require("./config/db");
const app = express();

connectDb();

const PORT = process.env.PORT || 5000;

//Body Parser
app.use(express.json({ extended: false }));

app.use("/api/v1/user", require("./routes/api/users"));
app.use("/api/v1/auth", require("./routes/api/auth"));
app.use("/api/v1/profile", require("./routes/api/profile"));
app.use("/api/v1/rentproperties", require("./routes/api/rentproperties"));
app.use("/api/v1/sellproperties", require("./routes/api/sellproperties"));

app.listen(PORT, () =>
  console.log(
    `Hello sir whattup  your server thingy is running on port ${PORT}`
  )
);
