require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bodyParser = require('body-parser');



const routes = require("./Routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/run", routes);

app.get('/health', (req, res) => {
  console.log("happy is codeing ");
  res.json({
    status: 'ok',
    message: 'Server is running'
  })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Running on ", PORT);
});