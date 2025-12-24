

const express = require("express");
const cors = require("cors");

const sosRoutes = require("./routes/sos");
const volunteerRoutes = require("./routes/volunteer");
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/sos", sosRoutes);
app.use("/volunteer", volunteerRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Disaster Response Backend Running");
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
