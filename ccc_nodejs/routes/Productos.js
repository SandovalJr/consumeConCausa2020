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

// registro producto
productos.post("/registerProducto", (req, res) => {
    const today =  new Date().toJSON();
    const productoData = {
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio,
    genero: req.body.genero,
    descripcion: req.body.descripcion,
    stock: req.body.stock,
    marca: req.body.marca,
    otras_caracteristicas: req.body.otras_caracteristicas,
    created: today,
    nombre_empresa: req.body.nombre_empresa,
  };
  console.log(productoData);
  Producto.findOne({
    where: {
      nombre: req.body.nombre,
    },
  })
    .then((producto) => {
      if (!producto) {
        Producto.create(productoData)
          .then( function (producto) {
            res.status(200).json(productoData);
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

module.exports = productos;
