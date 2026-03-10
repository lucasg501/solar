const KitsModel = require('../model/kitsModel');

class KitsController {

    async listar(req, res) {
        try {
            let kits = new KitsModel();
            let lista = await kits.listar();
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
        if (req.params.idKit != 0) {
            try {
                let kits = new KitsModel();
                let kit = await kits.obter(req.params.idKit);
                if (kit) {
                    res.status(200).json(kit.toJSON());
                } else {
                    res.status(404).json({ message: 'Kit não encontrado' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID do kit inválido' });
        }
    }

    async gravar(req, res) {
        if (Object.keys(req.body).length > 0) {

            let kits = new KitsModel();

            kits.idKit = 0;
            kits.nomeKit = req.body.nomeKit;
            kits.descKit = req.body.descKit;
            kits.kitAtivo = req.body.kitAtivo;

            let ok = await kits.gravar();

            if (ok) {
                res.status(200).json({ message: 'Kit gravado com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao gravar kit' });
            }
        }
    }

    async alterar(req, res) {
        if (Object.keys(req.body).length > 0) {

            let kits = new KitsModel();

            kits.idKit = req.body.idKit;
            kits.nomeKit = req.body.nomeKit;
            kits.descKit = req.body.descKit;
            kits.kitAtivo = req.body.kitAtivo;

            let ok = await kits.gravar(); // usa o mesmo método gravar que faz update

            if (ok) {
                res.status(200).json({ message: 'Kit alterado com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao alterar kit' });
            }
        }
    }

    async excluir(req, res) {
        if (req.params.idKit != 0) {
            try {
                let kits = new KitsModel();
                let ok = await kits.excluir(req.params.idKit);

                if (ok) {
                    res.status(200).json({ message: 'Kit excluído com sucesso' });
                } else {
                    res.status(404).json({ message: 'Kit não encontrado' });
                }

            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID do kit inválido' });
        }
    }

}

module.exports = KitsController;