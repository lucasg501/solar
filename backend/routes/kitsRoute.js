const express = require('express');
const router = express.Router();
const KitsController = require('../controllers/KitsController');
const ctrl = new KitsController();

router.get('/listar', (req,res)=>{
    //#swagger.tags = ['Kits']
    //#swagger.summary = 'Endpoint para listar os kits.'
    ctrl.listar(req,res);
});

router.get('/obter/:idKit', (req,res)=>{
    //#swagger.tags = ['Kits']
    //#swagger.summary = 'Endpoint para obter um kit específico.'
    ctrl.obter(req,res);
});

router.post('/criar', (req,res)=>{
    // #swagger.tags = ['Kits']
    // #swagger.summary = 'Adiciona um kit'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/kits" }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res)=>{
    // #swagger.tags = ['Kits']
    // #swagger.summary = 'Altera um kit'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/kits" }
                }
            }
        }
    */

    ctrl.alterar(req,res);
});

router.delete('/excluir/:idKit', (req,res)=>{
    // #swagger.tags = ['Kits']
    // #swagger.summary = 'Exclui um kit'
    ctrl.excluir(req,res);
});

module.exports = router;