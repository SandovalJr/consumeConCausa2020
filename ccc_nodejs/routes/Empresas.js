const express = require('express');
const empresas = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Empresa = require('../models/Empresa');
const Cliente = require('../models/Cliente');
const { response } = require('express');

empresas.use(cors());

process.env.SECRET_KEY = 'secret';

empresas.get('/', (req, res) => {
    res.json({
        status: 'Empresa Works'
    });
});

//Alta empresas
empresas.post('/registerEmpresa', (req, res) => {
    const today = new Date().toJSON();
    console.log(today);

    const empresaData = {
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
        imagen: req.body.imagen, 
        created: today, 
        link_fb: req.body.link_fb, 
        link_whatsapp: req.body.link_fb, 
        password: req.body.password,
        status:0
    }

    console.log('Empresa', empresaData);

    empresaData.password = bcrypt.hashSync(req.body.password, 10);

    Empresa.findOne({
        where: {
            correo: req.body.correo,
        }
    })
    .then((empresa) => {
        if(!empresa){
            Empresa.create(empresaData)
            .then((empresa) => {
                let token = jwt.sign(empresa.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440,
                });
                res.json({token});
            })
            .catch((err) => {
                res.send('error: '+ err);
            });
        }else{
            return res.status(500).json({
                ok: false,
                err
            });
        }
    })
    .catch((err) => {
        res.send('error' + err);
    });
});

empresas.post('/login', async(req, res = response) => {
    console.log('Entra')
    const { correo, password } = req.body;
    try {
        let usuarioDB = await Empresa.findOne({
            where: {
                correo
            }
        });
        if(!usuarioDB){
            usuarioDB = await Cliente.findOne({
                where: {
                    correo
                }
            });
            if(!usuarioDB){
                return res.status(404).json({
                    ok: false, 
                    msg: 'Correo Erroneo'
                });
            }
        }

        console.log(usuarioDB);

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Pass erroneo'
            })
        }

        // Aqui va el token

        res.json({
            ok: true, 
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Contacte al administrador'
        })
    }
});

module.exports = empresas;