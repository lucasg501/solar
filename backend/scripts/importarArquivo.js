const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');
const ImportacaoModel = require('../model/importacaoModel');

async function executarImportacao() {
    try {
        // Caminho do arquivo
        const arquivo = path.join(__dirname, '../uploads/arquivo.xlsx');

        // Verifica se o arquivo existe
        if (!fs.existsSync(arquivo)) {
            console.error(`Arquivo não encontrado em: ${arquivo}`);
            return;
        }

        // Lê o Excel
        const workbook = xlsx.readFile(arquivo);
        const sheetName = workbook.SheetNames[0]; // primeira aba
        const tabela = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

        if (!Array.isArray(tabela) || tabela.length === 0) {
            console.log('O arquivo está vazio ou não contém dados válidos!');
            return;
        }

        console.log(`Iniciando importação de ${tabela.length} linhas...`);

        // Chama a ImportacaoModel
        const userId = 1; // pode ser ajustado para pegar de autenticação
        const resultados = await ImportacaoModel.importarTabela(tabela, userId);

        console.log('Importação concluída com sucesso!');
        console.log(JSON.stringify(resultados, null, 2));

    } catch (error) {
        console.error('Erro durante a importação:', error.message);
        console.error(error.stack);
    }
}

// Executa
executarImportacao();
