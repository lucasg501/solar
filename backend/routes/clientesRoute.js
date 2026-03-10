const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/ClientesController');
const ctrl = new ClientesController();

router.get('/listar', (req,res)=>{
    //#swagger.tags = ['Clientes']
    //#swagger.summary = 'Endpoint para listar os clientes.'
    ctrl.listar(req,res);
});

router.get('/obter/:idCliente', (req,res)=>{
    //#swagger.tags = ['Clientes']
    //#swagger.summary = 'Endpoint para obter um cliente específico.'
    ctrl.obter(req,res);
});

router.post('/criar', (req,res)=>{
    // #swagger.tags = ['Clientes']
    // #swagger.summary = 'Adiciona um cliente'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/clientes" }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Clientes']
    // #swagger.summary = 'Altera um cliente'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/clientes" }
                }
            }
        }
    */
    ctrl.alterar(req,res);
});

router.delete('/excluir/:idCliente', (req,res) =>{
    // #swagger.tags = ['Clientes']
    // #swagger.summary = 'Exclui um cliente'
    ctrl.excluir(req,res);
});

module.exports = router;