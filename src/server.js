const express = require("express");
const { routes } = require("./routes/index.routes");
const cors = require("cors");
require("./database");

const app = express();

app.use(express.json());
app.use(cors("http://localhost:8080"));

const PORT = 3333;

app.use(routes);

app.listen(process.env.PORT || PORT);
