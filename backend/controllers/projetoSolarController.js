const ProjetoSolarModel = require('../model/projetoSolarModel');

class ProjetoSolarController {

    async listar(req, res) {
        try {
            let projetos = new ProjetoSolarModel();
            let lista = await projetos.listar();
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
        if (req.params.idProjeto != 0) {
            try {

                let projetos = new ProjetoSolarModel();
                let projeto = await projetos.obter(req.params.idProjeto);

                if (projeto) {
                    res.status(200).json(projeto.toJSON());
                } else {
                    res.status(404).json({ message: 'Projeto não encontrado' });
                }

            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID do projeto inválido' });
        }
    }

    async gravar(req, res) {

        if (Object.keys(req.body).length > 0) {

            let projetos = new ProjetoSolarModel();

            projetos.idProjeto = 0;
            projetos.idContrato = req.body.idContrato;
            projetos.kwp = req.body.kwp;
            projetos.idKit = req.body.idKit;
            projetos.dataInstalacao = req.body.dataInstalacao;
            projetos.createdAt = req.body.createdAt;
            projetos.updatedAt = req.body.updatedAt;
            projetos.createdBy = req.body.createdBy;
            projetos.updatedBy = req.body.updatedBy;

            let ok = await projetos.gravar();

            if (ok) {
                res.status(200).json({ message: 'Projeto gravado com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao gravar projeto' });
            }

        }

    }

    async alterar(req, res) {

        if (Object.keys(req.body).length > 0) {

            let projetos = new ProjetoSolarModel();

            projetos.idProjeto = req.body.idProjeto;
            projetos.idContrato = req.body.idContrato;
            projetos.kwp = req.body.kwp;
            projetos.idKit = req.body.idKit;
            projetos.dataInstalacao = req.body.dataInstalacao;
            projetos.createdAt = req.body.createdAt;
            projetos.updatedAt = req.body.updatedAt;
            projetos.createdBy = req.body.createdBy;
            projetos.updatedBy = req.body.updatedBy;

            let ok = await projetos.gravar();

            if (ok) {
                res.status(200).json({ message: 'Projeto alterado com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao alterar projeto' });
            }

        }

    }

    async excluir(req, res) {

        if (req.params.idProjeto != 0) {
            try {

                let projetos = new ProjetoSolarModel();
                let ok = await projetos.excluir(req.params.idProjeto);

                if (ok) {
                    res.status(200).json({ message: 'Projeto excluído com sucesso' });
                } else {
                    res.status(404).json({ message: 'Projeto não encontrado' });
                }

            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID do projeto inválido' });
        }

    }

}

module.exports = ProjetoSolarController;