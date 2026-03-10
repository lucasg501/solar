const express = require('express');
const router = express.Router();
const ManutencoesController = require('../controllers/ManutencoesController');
const ctrl = new ManutencoesController();

router.get('/listar', (req,res)=>{
    //#swagger.tags = ['Manutenções']
    //#swagger.summary = 'Endpoint para listar as manutenções.'
    ctrl.listar(req,res);
});

router.get('/obter/:idManutencao', (req,res)=>{
    //#swagger.tags = ['Manutenções']
    //#swagger.summary = 'Endpoint para obter uma manutenção específica.'
    ctrl.obter(req,res);
});

router.post('/criar', (req,res)=>{
    // #swagger.tags = ['Manutenções']
    // #swagger.summary = 'Adiciona uma manutenção'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/manutencoes" }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res)=>{
    // #swagger.tags = ['Manutenções']
    // #swagger.summary = 'Altera uma manutenção'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/manutencoes" }
                }
            }
        }
    */

    ctrl.alterar(req,res);
});

router.delete('/excluir/:idManutencao', (req,res)=>{
    // #swagger.tags = ['Manutenções']
    // #swagger.summary = 'Exclui uma manutenção'
    ctrl.excluir(req,res);
});

module.exports = router;