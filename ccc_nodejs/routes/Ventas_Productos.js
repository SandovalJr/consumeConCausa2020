//aquí declaramos las rutas para nuestro user
const express = require("express");
const ventasproductos = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const VentProdu = require("../models/Venta_Producto");
ventasproductos.use(cors());
process.env.SECRET_KEY = "secret";

ventasproductos.get("/apiventprod", (req, res) => {
  res.json({ status: "API venta" });
});

module.exports = ventasproductos;
// ESTUS:

// PAGADO
// ESPERA
