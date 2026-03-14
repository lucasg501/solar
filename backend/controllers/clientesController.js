const ClientesModel = require('../model/clientesModel');

class ClientesController {

    async listar(req, res) {
        try {
            let clientes = new ClientesModel();
            let lista = await clientes.listar();
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
        if (req.params.idCliente != 0) {
            try {
                let clientes = new ClientesModel();
                let cliente = await clientes.obter(req.params.idCliente);
                if (cliente) {
                    res.status(200).json(cliente.toJSON());
                } else {
                    res.status(404).json({ message: 'Cliente não encontrado' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }


    async gravar(req, res) {
        if (Object.keys(req.body).length > 0) {
            try {
                let clientes = new ClientesModel();

                clientes.idCliente = 0;
                clientes.nomeCliente = req.body.nomeCliente;
                clientes.telefoneCliente = req.body.telefoneCliente;
                clientes.pode_ligar = req.body.pode_ligar;
                clientes.enderecoCliente = req.body.enderecoCliente;
                clientes.cidadeCliente = req.body.cidadeCliente;
                clientes.estadoCliente = req.body.estadoCliente;
                clientes.cepCliente = req.body.cepCliente;
                clientes.bairroCliente = req.body.bairroCliente;
                clientes.numCasa = req.body.numCasa;
                clientes.createdBy = req.body.createdBy;

                let ok = await clientes.gravar();
                if (ok) {
                    res.status(200).json({ message: 'Cliente gravado com sucesso' });
                } else {
                    res.status(400).json({ message: 'Erro ao gravar cliente' });
                }

            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async alterar(req, res) {
        if (Object.keys(req.body).length > 0) {
            try {
                let clientes = new ClientesModel();
                clientes.idCliente = req.body.idCliente;
                clientes.nomeCliente = req.body.nomeCliente;
                clientes.telefoneCliente = req.body.telefoneCliente;
                clientes.pode_ligar = req.body.pode_ligar;
                clientes.enderecoCliente = req.body.enderecoCliente;
                clientes.cidadeCliente = req.body.cidadeCliente;
                clientes.estadoCliente = req.body.estadoCliente;
                clientes.cepCliente = req.body.cepCliente;
                clientes.bairroCliente = req.body.bairroCliente;
                clientes.numCasa = req.body.numCasa;
                clientes.updatedBy = req.body.updatedBy;
                let ok = await clientes.gravar();
                if (ok) {
                    res.status(200).json({ message: 'Cliente alterado com sucesso' });
                } else {
                    res.status(400).json({ message: 'Erro ao alterar cliente' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async excluir(req, res) {
        if (req.params.idCliente != 0) {
            try {
                let clientes = new ClientesModel();
                let ok = await clientes.excluir(req.params.idCliente);
                if (ok) {
                    res.status(200).json({ message: 'Cliente excluído com sucesso' });
                } else {
                    res.status(400).json({ message: 'Erro ao excluir cliente' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }
}

module.exports = ClientesController;