const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');
const ctrl = new vendasController();

router.get('/listar', (req,res) =>{
    //#swagger.tags = ['Vendas']
    //#swagger.summary = 'Endpoint para listar as vendas.'
    ctrl.listar(req,res);
});

router.get('/obter/:idVenda', (req,res) =>{
    //#swagger.tags = ['Vendas']
    //#swagger.summary = 'Endpoint para obter uma venda específica.'
    ctrl.obter(req,res);
});

router.post('/criar', (req,res) =>{
    // #swagger.tags = ['Vendas']
    // #swagger.summary = 'Adiciona uma venda'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/vendas" }
                }
            }
        }
    */

    ctrl.gravar(req,res);
});

router.put('/alterar', (req,res) =>{
    // #swagger.tags = ['Vendas']
    // #swagger.summary = 'Altera uma venda'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/vendas" }
                }
            }
        }
    */

    ctrl.alterar(req,res);
});

router.post('/attStatus', (req,res) =>{
    // #swagger.tags = ['Vendas']
    // #swagger.summary = 'Atualiza o status de uma venda'
    /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { "$ref": "#/definitions/vendas" }
                }
            }
        }
    */

    ctrl.attStatus(req,res);
});

router.delete('/excluir/:idVenda', (req,res) =>{
    // #swagger.tags = ['Vendas']
    // #swagger.summary = 'Exclui uma venda'
    ctrl.excluir(req,res);
});

module.exports = router;