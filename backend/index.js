const express = require("express");
const app = express();

const sosRoutes = require("./routes/sos");
const { loadModel } = require("./ml/model");

app.use(express.json());
app.use("/sos", sosRoutes);

const PORT = 3000;

async function startServer() {
  try {
    await loadModel();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
