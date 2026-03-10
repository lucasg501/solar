const express = require('express');
const router = express.Router();
const ProjetoSolarController = require('../controllers/ProjetoSolarController');
const ctrl = new ProjetoSolarController();

router.get('/listar', (req,res)=>{
    //#swagger.tags = ['ProjetoSolar']
    //#swagger.summary = 'Endpoint para listar os projetos solares.'
    ctrl.listar(req,res);
});

router.get('/obter/:idProjeto', (req,res)=>{
    //#swagger.tags = ['ProjetoSolar']
    //#swagger.summary = 'Endpoint para obter um projeto específico.'
    ctrl.obter(req,res);
});

router.post('/criar', (req,res)=>{
    // #swagger.tags = ['ProjetoSolar']
    // #swagger.summary = 'Adiciona um projeto solar'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/projetoSolar" }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res)=>{
    // #swagger.tags = ['ProjetoSolar']
    // #swagger.summary = 'Altera um projeto solar'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/projetoSolar" }
                }
            }
        }
    */

    ctrl.alterar(req,res);
});

router.delete('/excluir/:idProjeto', (req,res)=>{
    // #swagger.tags = ['ProjetoSolar']
    // #swagger.summary = 'Exclui um projeto solar'
    ctrl.excluir(req,res);
});

module.exports = router;