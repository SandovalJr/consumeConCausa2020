const express = require("express");
const empresas = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fileUpload = require("express-fileupload");

const Empresa = require("../models/Empresa");
const Cliente = require("../models/Cliente");
const { response } = require("express");

const fs = require("fs");
const path = require("path");

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'wolf-code',
    api_key: '622561925972199',
    api_secret: '1QsmR8t0FawDTGPeYsXqkhnhL04'
});

empresas.use(cors());

process.env.SECRET_KEY = "secret";

empresas.get("/", (req, res) => {
  res.json({
    status: "Empresa Works",
  });
});

//Alta empresas
empresas.post("/registerEmpresa", async(req, res) => {
  const today = new Date().toJSON();
  const nowDate = today.toString();
  console.log(today);
  console.log(req.body);
  let tipo = "";

  let archivo;
  // let imagen = JSON.stringify(req.body.imagen.file);
  let imagen = (req.body.imagen.file);
  let encod = Buffer.from(imagen, 'base64');

  console.log('files', req.files);

  try {
    const body = req.body;
    body.created = nowDate;
    body.password = bcrypt.hashSync(req.body.password, 10);
    body.status = 0;
    body.imagen = req.body.imagen.name;

    archivo = body.imagen.name;

    let a = fs.writeFile(archivo, encod, {encoding: 'base64'}, function(err){
      console.log('File Created')
    });
    //imagen.src = req.body.imagen.file;


    let empresaDB = await Empresa.findOne({
      where: {
        correo: req.body.correo,
      },
    });

    if(!empresaDB){
      Empresa.create(body).then(
        (empresa) => {
          let token = jwt.sign(empresa.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });

          cloudinary.uploader.upload(encod.toString, {public_id: `Causa/${encod}`, tags: `blog`},
            function(err, image){
                if(err) res.send(err);
                console.log('File upload with cloudinary');
                //res.json(image);
            }
          );

          res.json({
            ok: true,
            token,
            empresa: body
          });
        }
      )
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacte al administrador",
    });
  }

  // if(req.files){
  //   console.log('Entro')
  //   archivo = req.files.imagen;
  //   let nombreCortado = archivo.name.split('.');
  //   extencion = nombreCortado[nombreCortado.length - 1];
  //   extencionesValidas = ["png", "jpg", "gif", "jpeg"];

  //   if (extencionesValidas.indexOf(extencion) < 0) {
  //     return res.status(400).json({
  //         ok: false,
  //         err: {
  //             message: "Las extenciones permitidas son " + extencionesValidas.join(","),
  //             ext: extencion,
  //         },
  //     });
  //   }

  //   let nombreArchivo = `${id} - ${new Date().getMilliseconds()}`;

  //   cloudinary.uploader.upload(archivo.tempFilePath, {public_id: `Causas/${nombreArchivo}`, tags: `blog`}, 
  //       function(err, image){
  //           if(err) res.send(err);
  //           console.log('File upload with cloudinary');
  //           // res.json(image);
  //       }
  //   )
  // }

  // const empresaData = {
  //   nombre: req.body.nombre,
  //   apellidos: req.body.apellidos,
  //   nombre_empresa: req.body.nombre_empresa,
  //   correo: req.body.correo,
  //   telefono: req.body.telefono,
  //   giro_empresa: req.body.giro_empresa,
  //   direccion: req.body.direccion,
  //   cp: req.body.cp,
  //   ciudad: req.body.ciudad,
  //   rfc: req.body.rfc,
  //   descripcion: req.body.descripcion,
  //   imagen: req.body.imagen, //`${req.files.name}.${extencion}`,//req.body.imagen,
  //   created: nowDate,
  //   link_fb: req.body.link_fb,
  //   link_whatsapp:
  //     `https://api.whatsapp.com/send?phone=52` + req.body.link_whatsapp,
  //   password: req.body.password,
  //   status: 0,
  // };

  // console.log("Empresa", empresaData);

  // empresaData.password = bcrypt.hashSync(req.body.password, 10);

  // Empresa.findOne({
  //   where: {
  //     correo: req.body.correo,
  //   },
  // })
  //   .then((empresa) => {
  //     if (!empresa) {
  //       Empresa.create(empresaData)
  //         .then((empresa) => {
  //           console.log(empresa);
  //           let token = jwt.sign(empresa.dataValues, process.env.SECRET_KEY, {
  //             expiresIn: 1440,
  //           });
  //           return res.json(token);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           return res.send("error: " + err);
  //         });
  //     } else {
  //       return res.status(500).json({
  //         ok: false,
  //         err,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.send("error" + err);
  //   });
});

empresas.post("/login", async (req, res = response) => {
  console.log("Entra");
  const { correo, password } = req.body;
  try {
    let usuarioDB = await Empresa.findOne({
      where: {
        correo,
      },
    });
    if (!usuarioDB) {
      usuarioDB = await Cliente.findOne({
        where: {
          correo,
        },
      });
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: "Correo Erroneo",
        });
      } else {
        tipo = "cliente";
      }
    } else {
      tipo = "empresa";
    }

    console.log(usuarioDB);

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Pass erroneo",
      });
    }

    // Aqui va el token

    res.json({
      ok: true,
      tipo,
      datos: usuarioDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contacte al administrador",
    });
  }
});

// listar empresas si estan o no aprobadas
empresas.get("/ListarEmpresasPorStatus/:status", (req, res) => {
  Empresa.findAll({
    where: {
      status: req.params.status,
    },
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.send("data no hay");
      }
    })
    .catch((errr) => {
      res.send("error" + errr);
    });
});

// Actualizar empresa a aprovada
empresas.put("/AprobarEmpresa/:id_empresa", (req, res) => {
  const userData = {
    status: req.body.status,
  };
  Empresa.update(userData, {
    where: {
      id_empresa: req.params.id_empresa,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// Informacion de una Empresa
empresas.get("/InformacionEmpresa/:id_empresa", (req, res) => {
  Empresa.findAll({
    where: {
      id_empresa: req.params.id_empresa,
    },
  })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.send("data no hay");
      }
    })
    .catch((errr) => {
      res.send("error" + errr);
    });
});

// Eliminar una empresa
empresas.get("/EliminarEmpresa/:id_empresa", (req, res) => {
  Empresa.destroy({
    where: {
      id_empresa: req.params.id_empresa,
    },
  })
    .then(function (deletedRecords) {
      res.status(200).json(deletedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

// Actualizar datos de la empresa
// SIN PASSOWRD
empresas.put("/ActEmpresaSinpassword/:id_empresa", (req, res) => {
  const userData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    nombre_empresa: req.body.nombre_empresa,
    correo: req.body.correo,
    telefono: req.body.telefono,
    giro_empresa: req.body.giro_empresa,
    direccion: req.body.direccion,
    cp: req.body.cp,
    ciudad: req.body.ciudad,
    rfc: req.body.rfc,
    descripcion: req.body.descripcion,
    link_fb: req.body.link_fb,
    link_whatsapp:
      `https://api.whatsapp.com/send?phone=52` + req.body.link_whatsapp,
  };
  Empresa.update(userData, {
    where: {
      id_empresa: req.params.id_empresa,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});
// CON PASSWORD
empresas.put("/ActEmpresaConPassword/:id_empresa", (req, res) => {
  const userData = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    nombre_empresa: req.body.nombre_empresa,
    correo: req.body.correo,
    telefono: req.body.telefono,
    giro_empresa: req.body.giro_empresa,
    direccion: req.body.direccion,
    cp: req.body.cp,
    ciudad: req.body.ciudad,
    rfc: req.body.rfc,
    descripcion: req.body.descripcion,
    link_fb: req.body.link_fb,
    link_whatsapp:
      `https://api.whatsapp.com/send?phone=52` + req.body.link_whatsapp,
    password: req.body.password,
  };
  userData.password = bcrypt.hashSync(req.body.password, 10);

  Empresa.update(userData, {
    where: {
      id_empresa: req.params.id_empresa,
    },
  })
    .then(function (updatedRecords) {
      res.status(200).json(updatedRecords);
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = empresas;
