//aquí declaramos las rutas para nuestro user
const express = require("express");
const productos = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Producto = require("../models/Producto");
const bcrypt = require("bcrypt");

productos.use(cors());

process.env.SECRET_KEY = "secret";

productos.get("/Productosapiwork", (req, res) => {
  res.json({ status: "API PRODUCTOS WORKS" });
});

module.exports = productos;