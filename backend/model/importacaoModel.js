const fs = require("fs");
const path = require("path");

const ClientesModel = require("./clientesModel");
const ContratosModel = require("./contratoModel");
const KitsModel = require("./kitsModel");
const ProjetoSolarModel = require("./projetoSolarModel");
const ManutencoesModel = require("./manutencoesModel");

class ImportacaoModel {

    // Normaliza datas no formato MM/YY
    static normalizarDataServico(valor) {
        if (!valor) return null;
        const [mes, ano] = valor.split("/");
        const anoCompleto = ano.length === 2 ? `20${ano}` : ano;
        return new Date(`${anoCompleto}-${mes.padStart(2, "0")}-10`);
    }

    // Salva erros em arquivo
    static salvarErro(linha, error) {
        const logPath = path.join(__dirname, "../logs/importacao_erros.log");
        const mensagem = `[${new Date().toISOString()}] Erro: ${error.message}\nLinha: ${JSON.stringify(linha)}\n\n`;
        fs.appendFileSync(logPath, mensagem, "utf8");
    }

    // Limpa telefone (somente números, máximo 20 dígitos)
    static limparTelefone(valor) {
        if (!valor) return "";
        return valor.toString().replace(/\D/g, "").substring(0, 20);
    }

    // Trunca texto para caber no banco
    static limitarTexto(valor, limite) {
        if (!valor) return "";
        return valor.toString().substring(0, limite);
    }

    // Importa uma linha
    static async importarLinha(linha, userId = 1) {
        const dataServico = ImportacaoModel.normalizarDataServico(linha['Data do serviço']);

        try {
            // Tratamentos
            const telefone = ImportacaoModel.limparTelefone(linha['TELEFONE']);
            const kwp = linha['KWP'] ? parseFloat(linha['KWP']) : null;
            const numeroContrato = ImportacaoModel.limitarTexto(
                linha['Clientes'] + ' ' + (linha['proj nova'] || ''),
                50
            );
            const observacoes = ImportacaoModel.limitarTexto(linha['Observações'] || '', 255);
            const kitNome = ImportacaoModel.limitarTexto(linha['KIT'] || '', 100);

            // 1. Cliente
            const cliente = new ClientesModel(
                0,
                ImportacaoModel.limitarTexto(linha['Clientes'], 100),
                telefone,
                1,
                ImportacaoModel.limitarTexto(linha['ENDEREÇO'], 255),
                ImportacaoModel.limitarTexto(linha['REGIÃO'], 100),
                ImportacaoModel.limitarTexto(linha['ESTADO'] || '', 50),
                ImportacaoModel.limitarTexto(linha['CEP'] || '', 20),
                ImportacaoModel.limitarTexto(linha['BAIRRO'] || '', 100)
            );
            const resultadoCliente = await cliente.gravar();
            const idCliente = resultadoCliente.insertId || cliente.idCliente;

            // 2. Contrato
            const contrato = new ContratosModel(
                0,
                idCliente,
                numeroContrato,
                dataServico,
                'Ativo',
                observacoes,
                userId
            );
            const resultadoContrato = await contrato.gravar();
            const idContrato = resultadoContrato.insertId || contrato.idContrato;

            // 3. Kit
            let kitExistente = await KitsModel.obterPorNome(kitNome);
            let idKit;
            if (kitExistente) {
                idKit = kitExistente.idKit;
            } else {
                const kit = new KitsModel(
                    0,
                    kitNome,
                    `Descrição do ${kitNome}`,
                    'S'
                );
                const resultadoKit = await kit.gravar();
                idKit = resultadoKit.insertId || kit.idKit;
            }

            // 4. Manutenção
            const manutencao = new ManutencoesModel(
                0,
                idContrato,
                2025,
                linha['Ligação manutenção 2025'] === 'sim' ? 1 : 0,
                linha['Realizado'] === 'Sim' ? 1 : 0,
                observacoes,
                linha['Finalizado'] === 'sim' ? 1 : 0,
                dataServico,
                userId
            );
            const resultadoManutencao = await manutencao.gravar();
            const idManutencao = resultadoManutencao.insertId || manutencao.idManutencao;

            // 5. Projeto Solar
            const projeto = new ProjetoSolarModel(
                0,
                idContrato,
                kwp,
                idKit,
                dataServico,
                userId
            );
            const resultadoProjeto = await projeto.gravar();

            return {
                cliente: { idCliente },
                contrato: { idContrato },
                kit: { idKit },
                manutencao: { idManutencao },
                projeto: { idProjeto: resultadoProjeto.insertId || projeto.idProjeto }
            };

        } catch (error) {
            ImportacaoModel.salvarErro(linha, error);
            throw error;
        }
    }

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
