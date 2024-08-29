const express = require("express");
const Register = require("./src/register");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

const corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use("/user", Register);

app.post("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => console.log(`app is running on ${PORT}`));
