const ClientesModel = require("./clientesModel");
const ContratosModel = require("./contratoModel");
const KitsModel = require("./kitsModel");
const ProjetoSolarModel = require("./projetoSolarModel");
const ManutencoesModel = require("./manutencoesModel");

class ImportacaoModel {

    // Importa uma linha da tabela para todas as models
    static async importarLinha(linha, userId = 1) {
        // Converte data do serviço para objeto Date
        const dataServico = linha['Data do serviço'] ? new Date(linha['Data do serviço']) : null;

        // 1. Cliente
        const cliente = new ClientesModel(
            0,                              // idCliente = 0 para inserir
            linha['Clientes'],              // nomeCliente
            linha['TELEFONE'],              // telefoneCliente
            1,                              // pode_ligar = sim
            linha['ENDEREÇO'],              // enderecoCliente
            linha['REGIÃO'],                // cidadeCliente
            linha['ESTADO'] || '',          // estadoCliente
            linha['CEP'] || '',             // cepCliente
            linha['BAIRRO'] || ''           // bairroCliente
        );

        const resultadoCliente = await cliente.gravar();
        const idCliente = resultadoCliente.insertId || cliente.idCliente;

        // 2. Contrato
        const contrato = new ContratosModel(
            0,                              // idContrato
            idCliente,                      // idCliente
            linha['Clientes'] + ' ' + (linha['proj nova'] || ''), // numeroContrato
            dataServico,                    // dataContrato
            'Ativo',                        // statusContrato padrão
            linha['Observações'] || '',     // obsContrato
            userId                          // createdBy
        );

        const resultadoContrato = await contrato.gravar();
        const idContrato = resultadoContrato.insertId || contrato.idContrato;

        // 3. Kit (verifica duplicado pelo nome)
        let kitExistente = await KitsModel.obterPorNome(linha['KIT']);
        let idKit;
        if (kitExistente) {
            idKit = kitExistente.idKit;
        } else {
            const kit = new KitsModel(
                0,                      // idKit
                linha['KIT'],           // nomeKit
                `Descrição do ${linha['KIT']}`, // descKit
                'S'                     // kitAtivo
            );
            const resultadoKit = await kit.gravar();
            idKit = resultadoKit.insertId || kit.idKit;
        }

        // 4. Manutenção
        const manutencao = new ManutencoesModel(
            0,                                      // idManutencao
            idContrato,                             // idContrato
            2025,                                   // anoManutencao fixo
            linha['Ligação manutenção 2025'] === 'sim' ? 1 : 0, // ligacaoRealizada
            linha['Realizado'] === 'Sim' ? 1 : 0,   // servicoRealizado
            linha['Observações'] || '',             // observacoes
            linha['Finalizado'] === 'sim' ? 1 : 0,  // finalizado
            dataServico,                            // dataServico
            userId                                  // createdBy
        );

        const resultadoManutencao = await manutencao.gravar();
        const idManutencao = resultadoManutencao.insertId || manutencao.idManutencao;

        // 5. Projeto Solar
        const projeto = new ProjetoSolarModel(
            0,              // idProjeto
            idContrato,     // idContrato
            linha['KWP'],   // kwp
            idKit,          // idKit
            dataServico,    // dataInstalacao
            userId          // createdBy
        );

        const resultadoProjeto = await projeto.gravar();

        return {
            cliente: { idCliente },
            contrato: { idContrato },
            kit: { idKit },
            manutencao: { idManutencao },
            projeto: { idProjeto: resultadoProjeto.insertId || projeto.idProjeto }
        };
    }

    // Importa várias linhas (array de objetos)
    static async importarTabela(tabela, userId = 1) {
        const resultados = [];
        for (const linha of tabela) {
            try {
                const res = await ImportacaoModel.importarLinha(linha, userId);
                resultados.push(res);
            } catch (error) {
                console.error('Erro ao importar linha:', linha, error);
                resultados.push({ erro: error.message, linha });
            }
        }
        return resultados;
    }
}

module.exports = ImportacaoModel;
