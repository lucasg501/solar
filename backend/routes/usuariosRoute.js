const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const ctrl = new UsuarioController();

router.get('/listar', (req,res)=>{
    //#swagger.tags = ['Usuarios']
    //#swagger.summary = 'Endpoint para listar os usuários.'
    ctrl.listar(req,res);
});

router.get('/obter/:idUsuario', (req,res)=>{
    //#swagger.tags = ['Usuarios']
    //#swagger.summary = 'Endpoint para obter um usuário específico.'
    ctrl.obter(req,res);
});

router.post('/criar', (req,res)=>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Adiciona um usuário'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/usuarios" }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res)=>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Altera um usuário'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/usuarios" }
                }
            }
        }
    */

    ctrl.alterar(req,res);
});

router.delete('/excluir/:idUsuario', (req,res)=>{
    // #swagger.tags = ['Usuarios']
    // #swagger.summary = 'Exclui um usuário'
    ctrl.excluir(req,res);
});

module.exports = router;