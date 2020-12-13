let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
const morgan = require("morgan");
// Settings
let port = process.env.PORT || 3000; //puerto donde correrá

app.use(cors());
// app.use(
//     bodyParser.urlencoded({
//         extended: false
//     })
// );

// Middlewares
app.use(morgan("dev"));
//app.use('/usuarios', Users);
app.use(express.json());

//ROUTES--------------------------------------------------------------

app.use("/api/clientes", require("./routes/Clientes"));

// Start listening
app.listen(port, function () {
  console.log("Server is running on port: " + port);
});