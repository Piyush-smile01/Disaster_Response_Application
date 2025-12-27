const express = require("express");
const cors = require("cors");

const sosRoutes = require("./routes/sos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sos", sosRoutes);

const PORT =process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
