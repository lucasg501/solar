const ContratosModel = require('../model/contratoModel');

class ContaratosController {

    async listar(req, res) {
        try {
            let contratos = new ContratosModel();
            let lista = await contratos.listar();
            let listaRetorno = [];
            for (let i = 0; i < lista.length; i++) {
                listaRetorno.push(lista[i].toJSON());
            }
            res.status(200).json(listaRetorno);
        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async listaPag(req, res) {
        try {

            let pagina = req.query.pagina ? parseInt(req.query.pagina) : 1;
            let limite = req.query.limite ? parseInt(req.query.limite) : 10;
            let nome = req.query.nome ? req.query.nome : '';

            let contratos = new ContratosModel();
            let lista = await contratos.listaPag(pagina, limite, nome);

            let listaRetorno = [];

            for (let i = 0; i < lista.length; i++) {
                listaRetorno.push(lista[i].toJSON());
            }

            res.status(200).json(listaRetorno);

        } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }

    async obter(req, res) {
        if (req.params.idContrato != 0) {
            let contratos = new ContratosModel();
            contratos = await contratos.obter(req.params.idContrato);
            if (contratos != null) {
                res.status(200).json(contratos.toJSON());
            } else {
                res.status(404).json({ message: 'Contrato nao encontrado' });
            }
        } else {
            res.status(400).json({ message: 'ID do contrato inválido' });
        }
    }

    async gravar(req, res) {
        if (Object.keys(req.body).length > 0) {
            let contratos = new ContratosModel();

            contratos.idContrato = 0;
            contratos.idCliente = req.body.idCliente;
            contratos.numeroContrato = req.body.numeroContrato;
            contratos.dataContrato = req.body.dataContrato;
            contratos.statusContrato = req.body.statusContrato;
            contratos.obsContrato = req.body.obsContrato;
            contratos.createdBy = 1;

            let ok = await contratos.gravar();
            if (ok) {
                res.status(200).json({ message: 'Contrato gravado com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao gravar contrato' });
            }

        }
    }

    async alterar(req, res) {
        if (Object.keys(req.body).length > 0) {
            let contratos = new ContratosModel();
            contratos.idContrato = req.body.idContrato;
            contratos.idCliente = req.body.idCliente;
            contratos.numeroContrato = req.body.numeroContrato;
            contratos.dataContrato = req.body.dataContrato;
            contratos.statusContrato = req.body.statusContrato;
            contratos.obsContrato = req.body.obsContrato;
            contratos.updatedBy = 1;
            let ok = await contratos.gravar();
            if (ok) {
                res.status(200).json({ message: 'Contrato alterado com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao alterar contrato' });
            }
        }
    }

    async excluir(req, res) {
        if (req.params.idContrato != 0) {
            try {
                let contratos = new ContratosModel();
                let ok = await contratos.excluir(req.params.idContrato);
                if (ok) {
                    res.status(200).json({ message: 'Contrato excluído com sucesso' });
                } else {
                    res.status(404).json({ message: 'Contrato não encontrado' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID do contrato inválido' });
        }
    }

}

module.exports = ContaratosController;