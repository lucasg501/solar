const ManutencoesModel = require('../model/manutencoesModel');

class ManutencoesController {

    async listar(req, res) {
        try {
            let manutencoes = new ManutencoesModel();
            let lista = await manutencoes.listar();
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
        if (req.params.idManutencao != 0) {
            try {
                let manutencoes = new ManutencoesModel();
                let manutencao = await manutencoes.obter(req.params.idManutencao);

                if (manutencao) {
                    res.status(200).json(manutencao.toJSON());
                } else {
                    res.status(404).json({ message: 'Manutenção não encontrada' });
                }

            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID da manutenção inválido' });
        }
    }

    async gravar(req, res) {
        if (Object.keys(req.body).length > 0) {

            let manutencoes = new ManutencoesModel();

            manutencoes.idManutencao = 0;
            manutencoes.idContrato = req.body.idContrato;
            manutencoes.anoManutencao = req.body.anoManutencao;
            manutencoes.ligacaoRealizada = req.body.ligacaoRealizada;
            manutencoes.servicoRealizado = req.body.servicoRealizado;
            manutencoes.observacoes = req.body.observacoes;
            manutencoes.finalizado = req.body.finalizado;
            manutencoes.dataServico = req.body.dataServico;
            manutencoes.createdBy = req.body.createdBy;
            manutencoes.updatedBy = req.body.updatedBy;

            let ok = await manutencoes.gravar();

            if (ok) {
                res.status(200).json({ message: 'Manutenção gravada com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao gravar manutenção' });
            }
        }
    }

    async alterar(req, res) {
        if (Object.keys(req.body).length > 0) {

            let manutencoes = new ManutencoesModel();

            manutencoes.idManutencao = req.body.idManutencao;
            manutencoes.idContrato = req.body.idContrato;
            manutencoes.anoManutencao = req.body.anoManutencao;
            manutencoes.ligacaoRealizada = req.body.ligacaoRealizada;
            manutencoes.servicoRealizado = req.body.servicoRealizado;
            manutencoes.observacoes = req.body.observacoes;
            manutencoes.finalizado = req.body.finalizado;
            manutencoes.dataServico = req.body.dataServico;
            manutencoes.createdBy = req.body.createdBy;
            manutencoes.updatedBy = req.body.updatedBy;

            let ok = await manutencoes.gravar();

            if (ok) {
                res.status(200).json({ message: 'Manutenção alterada com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao alterar manutenção' });
            }
        }
    }

    async excluir(req, res) {
        if (req.params.idManutencao != 0) {
            try {

                let manutencoes = new ManutencoesModel();
                let ok = await manutencoes.excluir(req.params.idManutencao);

                if (ok) {
                    res.status(200).json({ message: 'Manutenção excluída com sucesso' });
                } else {
                    res.status(404).json({ message: 'Manutenção não encontrada' });
                }

            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID da manutenção inválido' });
        }
    }

}

module.exports = ManutencoesController;