//aquí declaramos las rutas para nuestro user
const express = require("express");
const dprods = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const DProd = require("../models/Donacion_Producto");
dprods.use(cors());
process.env.SECRET_KEY = "secret";

dprods.get("/apidp", (req, res) => {
  res.json({ status: "API DONACION dprods" });
});

// REGISTRO DONACION DE dprods
dprods.post("/registerDonacionProduct", (req, res) => {
  const today = new Date().toJSON();
  const donacionData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    tipo_pago: req.body.tipo_pago,
    organizacion_dona: req.body.organizacion_dona,
    nombre_producto: req.body.nombre_producto,
    descripcion_producto: req.body.descripcion_producto,
    cantidad_producto: req.body.cantidad_producto,
    total_compra: req.body.total_compra,
    imagen_producto: req.body.imagen_producto,
    fecha_compra: today,
    estatus_compra: req.body.estatus_compra,
    nombre_empresa: req.body.nombre_empresa,
  };
  console.log(donacionData);
  DProd.findOne({
    where: {},
  })
    .then((producto) => {
      if (!producto) {
        Producto.create(donacionData)
          .then(function (producto) {
            res.status(200).json(donacionData);
          })
          .catch((err) => {
            res.send("error: " + err);
          });
      } else {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = dprods;
