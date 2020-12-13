//aquí declaramos las rutas para nuestro user
const express = require("express");
const clientes = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Cliente = require("../models/Cliente");
clientes.use(cors());

process.env.SECRET_KEY = "secret";

clientes.get("/", (req, res) => {
  res.json({ status: "API WORKS" });
});

module.exports = clientes;
