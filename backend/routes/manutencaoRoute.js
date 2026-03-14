const express = require('express');
const router = express.Router();
const ManutencaoController = require('../controllers/ManutencaoController');
const ctrl = new ManutencaoController();

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
                    schema: { "$ref": "#/definitions/manutencao" }
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
                    schema: { "$ref": "#/definitions/manutencao" }
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