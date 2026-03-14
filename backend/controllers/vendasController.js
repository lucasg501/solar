const VendasModel = require('../model/vendasModel');

class VendasController {

    async listar(req, res) {
        let vendasModel = new VendasModel();
        let lista = await vendasModel.listar();
        let listaRetorno = [];
        if (lista.length > 0) {
            for (let i = 0; i < lista.length; i++) {
                listaRetorno.push(lista[i].toJSON());
            }
            res.status(200).json(listaRetorno);
        } else {
            res.status(404).json({ message: 'Nenhuma venda encontrada' });
        }
    }

    async obter(req, res) {
        if (req.params.idVenda != 0) {
            let vendasModel = new VendasModel();
            vendasModel = await vendasModel.obter(req.params.idVenda);
            if (vendasModel != null) {
                res.status(200).json(vendasModel);
            } else {
                res.status(404).json({ message: 'Venda não encontrada' });
            }
        } else {
            res.status(400).json({ message: 'ID da venda inválido' });
        }
    }

    async gravar(req, res) {
        if (Object.keys(req.body).length > 0) {
            let vendasModel = new VendasModel();

            vendasModel.idVenda = 0;
            vendasModel.idCliente = req.body.idCliente;
            vendasModel.tipoVenda = req.body.tipoVenda;
            vendasModel.descricaoVenda = req.body.descricaoVenda;
            vendasModel.valorVenda = req.body.valorVenda;
            vendasModel.dataVenda = req.body.dataVenda;
            vendasModel.statusVenda = req.body.statusVenda;
            vendasModel.createdBy = req.body.createdBy;

            let ok = await vendasModel.gravar();
            if (ok) {
                res.status(200).json({ message: 'Venda gravada com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao gravar venda' });
            }
        } else {
            res.status(400).json({ message: 'Dados da venda inválidos' });
        }
    }

    async alterar(req, res) {
        if (Object.keys(req.body).length > 0) {
            let vendasModel = new VendasModel();

            vendasModel.idVenda = req.body.idVenda;
            vendasModel.idCliente = req.body.idCliente;
            vendasModel.tipoVenda = req.body.tipoVenda;
            vendasModel.descricaoVenda = req.body.descricaoVenda;
            vendasModel.valorVenda = req.body.valorVenda;
            vendasModel.dataVenda = req.body.dataVenda;
            vendasModel.statusVenda = req.body.statusVenda;
            vendasModel.updatedBy = req.body.updatedBy;

            let ok = await vendasModel.gravar();
            if (ok) {
                res.status(200).json({ message: 'Venda alterada com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao alterar venda' });
            }
        } else {
            res.status(400).json({ message: 'Dados da venda inválidos' });
        }
    }

    async excluir(req, res) {
        if (req.params.idVenda != 0) {
            let vendasModel = new VendasModel();
            let ok = await vendasModel.excluir(req.params.idVenda);
            if (ok) {
                res.status(200).json({ message: 'Venda excluida com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao excluir venda' });
            }
        } else {
            res.status(400).json({ message: 'ID da venda inválido' });
        }
    }

    async attStatus(req,res){
        if (Object.keys(req.body).length > 0) {
            let vendasModel = new VendasModel();

            vendasModel.idVenda = req.body.idVenda;
            vendasModel.statusVenda = req.body.statusVenda;
            vendasModel.updatedBy = req.body.updatedBy;

            let ok = await vendasModel.attStatus(req.body.idVenda, req.body.statusVenda, req.body.updatedBy);
            if (ok) {
                res.status(200).json({ message: 'Venda alterada com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao alterar venda' });
            }
        }else{
            res.status(400).json({ message: 'Dados da venda inválidos' });
        }
    }

}

module.exports = VendasController;