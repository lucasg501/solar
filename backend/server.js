const express = require('express');
const swaggerJson = require('./outputSwagger.json');
const swaggerUi = require('swagger-ui-express');
const ClientesRoute = require('./routes/ClientesRoute');
const ContratosRoute = require('./routes/ContratosRoute');
const KitsRoute = require('./routes/KitsRoute');
const ManutencaoRoute = require('./routes/ManutencaoRoute');
const ProjetoSolarRoute = require('./routes/ProjetoSolarRoute');
const UsuariosRoute = require('./routes/UsuariosRoute');

const cors = require('cors');
const app = express();
const porta = "4000";

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use('/clientes', ClientesRoute);
app.use('/contratos', ContratosRoute);
app.use('/kits', KitsRoute);
app.use('/manutencao', ManutencaoRoute);
app.use('/projetoSolar', ProjetoSolarRoute);
app.use('/usuarios', UsuariosRoute);

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
    console.log(`Acesse a documentação em http://localhost:${porta}/docs`);
});