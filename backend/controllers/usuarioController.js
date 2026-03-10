const UsuarioModel = require('../model/usuarioModel');

class UsuarioController {

    async listar(req, res) {
        try {

            let usuarios = new UsuarioModel();
            let lista = await usuarios.listar();
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

        if (req.params.idUsuario != 0) {
            try {

                let usuarios = new UsuarioModel();
                let usuario = await usuarios.obter(req.params.idUsuario);

                if (usuario) {
                    res.status(200).json(usuario.toJSON());
                } else {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                }

            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID do usuário inválido' });
        }

    }

    async gravar(req, res) {

        if (Object.keys(req.body).length > 0) {

            let usuarios = new UsuarioModel();

            usuarios.idUsuario = 0;
            usuarios.nomeUsuario = req.body.nomeUsuario;
            usuarios.emailUsuario = req.body.emailUsuario;
            usuarios.senhaUsuario = req.body.senhaUsuario;
            usuarios.nivelUsuario = req.body.nivelUsuario;
            usuarios.usuarioAtivo = req.body.usuarioAtivo;
            usuarios.created_at = req.body.created_at;

            let ok = await usuarios.gravar();

            if (ok) {
                res.status(200).json({ message: 'Usuário gravado com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao gravar usuário' });
            }

        }

    }

    async alterar(req, res) {

        if (Object.keys(req.body).length > 0) {

            let usuarios = new UsuarioModel();

            usuarios.idUsuario = req.body.idUsuario;
            usuarios.nomeUsuario = req.body.nomeUsuario;
            usuarios.emailUsuario = req.body.emailUsuario;
            usuarios.senhaUsuario = req.body.senhaUsuario;
            usuarios.nivelUsuario = req.body.nivelUsuario;
            usuarios.usuarioAtivo = req.body.usuarioAtivo;
            usuarios.created_at = req.body.created_at;

            let ok = await usuarios.gravar();

            if (ok) {
                res.status(200).json({ message: 'Usuário alterado com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao alterar usuário' });
            }

        }

    }

    async excluir(req, res) {

        if (req.params.idUsuario != 0) {
            try {

                let usuarios = new UsuarioModel();
                let ok = await usuarios.excluir(req.params.idUsuario);

                if (ok) {
                    res.status(200).json({ message: 'Usuário excluído com sucesso' });
                } else {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                }

            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        } else {
            res.status(400).json({ message: 'ID do usuário inválido' });
        }

    }

}

module.exports = UsuarioController;