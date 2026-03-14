const ImportacaoModel = require('../model/importacaoModel');

class ImportacaoController {

    // Método para importar várias linhas
    static async importar(req, res) {
        try {
            // Espera um array de linhas no corpo da requisição
            const tabela = req.body.tabela;
            if (!Array.isArray(tabela) || tabela.length === 0) {
                return res.status(400).json({ 
                    sucesso: false,
                    erro: 'Nenhuma linha para importar' 
                });
            }

            // Se houver autenticação, pega o userId; senão usa 1 como padrão
            const userId = req.user && req.user.id ? req.user.id : 1;

            // Chama a model para importar todas as linhas
            const resultados = await ImportacaoModel.importarTabela(tabela, userId);

            // Retorna resultado detalhado por linha
            return res.status(200).json({
                sucesso: true,
                totalLinhas: tabela.length,
                resultados
            });

        } catch (error) {
            console.error('Erro na importação:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Ocorreu um erro durante a importação',
                detalhes: error.message
            });
        }
    }
}

module.exports = ImportacaoController;
