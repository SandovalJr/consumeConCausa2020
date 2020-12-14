//aquí declaramos las rutas para nuestro user
const express = require("express");
const clientes = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Cliente = require("../models/Cliente");
const bcrypt = require('bcrypt');

clientes.use(cors());

process.env.SECRET_KEY = "secret";

clientes.get("/", (req, res) => {
  res.json({ status: "API WORKS" });
});

// REGISTRO
clientes.post("/registerCliente", (req, res) => {
  const today = new Date();

  // res.send(console.log(req.body));
  const clientesData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    correo: req.body.correo,
    telefono: req.body.telefono,
    fecha_de_nacimiento: req.body.fecha_de_nacimiento,
    genero: req.body.genero,
    password: req.body.password,
    admin: false,
    created: today,
  };

  // Encriptar contraseña
  clientesData.password = bcrypt.hashSync(clientesData.password, 10);
  // res.send(console.log(userData));

  Cliente.findOne({
    where: {
      correo: req.body.correo,
    },
  })
    //TODO bcrypt
    .then((user) => {
      if (!user) {
        Cliente.create(clientesData)
          .then((user) => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440,
            });
            res.json({ token: token });
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

module.exports = clientes;
