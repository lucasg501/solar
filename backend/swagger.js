const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const ClientesModel = require('./model/clientesModel.js');
const ContratosModel = require('./model/contratoModel.js');
const KitsModel = require('./model/kitsModel.js');
const ManutencaoModel = require('./model/manutencoesModel.js');
const ProjetoSolarModel = require('./model/projetoSolarModel.js');
const UsuariosModel = require('./model/usuarioModel.js');
const VendasModel = require('./model/vendasModel.js');
const doc = {
    info: {
        title: 'API de Gerenciamento de Projetos Solares',
        description: 'API para gerenciamento de clientes, contratos, kits, manutenções, projetos solares e usuários.',
    },
    host: 'localhost:4000',
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'chave',
            description: 'Chave de autenticação para acessar a API'
        }
    },
    components: {
        schemas: {
            clientes: new ClientesModel(0, 'Osvaldo', '1899999999', '0', 'Rua jose do osvaldo', 'Presidente Prudente', 'SP', '19064700', '1', '1').toJSON(),
            contratos: new ContratosModel(1, 2, 'Contrato 4', '2023-01-01', 'Ativo', "nao tem obs", 1, 1).toJSON(),
            kits: new KitsModel(1, 'Kit Solar 1', 'Descrição do kit solar 1', 'S').toJSON(),
            manutencao: new ManutencaoModel(1, 1, '2025', 0, 0, "nao tem obs", 0, '2026-01-03', 1, 1).toJSON(),
            projetoSolar: new ProjetoSolarModel(1, 1, '350', 1, '2026-04-04', 1, 1).toJSON(),
            usuarios: new UsuariosModel(1, 'Naomi', 'naomi@example.com', 'senha123', 1, 'S').toJSON(),
            vendas: new VendasModel(1, 1, 'limpeza', 'Limpeza para o dia 10', 500.00,'2023/01/01', 'aprovado', 1, 1).toJSON()
        }
    }
};

let outputJson = './outputSwagger.json';
let endpoints = ['./server.js'];

swaggerAutogen(outputJson, endpoints, doc)
.then(() => {
    require('./server.js');
});