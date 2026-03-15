const express = require('express');
const router = express.Router();
const ContratosController = require('../controllers/ContratosController');
const ctrl = new ContratosController();

router.get('/listar', (req,res)=>{
    //#swagger.tags = ['Contratos']
    //#swagger.summary = 'Endpoint para listar os contratos.'
    ctrl.listar(req,res);
});

router.get('/listarPag', (req,res) =>{
    //#swagger.tags = ['Contratos']
    //#swagger.summary = 'Endpoint para listar os contratos.'
    ctrl.listaPag(req,res);
});

router.get('/obter/:idContrato', (req,res)=>{
    //#swagger.tags = ['Contratos']
    //#swagger.summary = 'Endpoint para obter um contrato específico.'
    ctrl.obter(req,res);
});

router.post('/criar', (req,res)=>{
    // #swagger.tags = ['Contratos']
    // #swagger.summary = 'Adiciona um contrato'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/contratos" }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res)=>{
    // #swagger.tags = ['Contratos']
    // #swagger.summary = 'Altera um contrato'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/contratos" }
                }
            }
        }
    */

    ctrl.alterar(req,res);
});

router.delete('/excluir/:idContrato', (req,res)=>{
    // #swagger.tags = ['Contratos']
    // #swagger.summary = 'Exclui um contrato'
    ctrl.excluir(req,res);
});

module.exports = router;