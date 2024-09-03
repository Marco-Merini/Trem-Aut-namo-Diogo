const express = require("express");
const app = express();
const tremRoute = require("./routes/tremRoute");

app.use(express.json());
app.use("/trem", tremRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
