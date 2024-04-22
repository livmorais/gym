import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './server/database/connection.js';
import router from './server/routes/router.js';

// Configuração inicial
const app = express();

//Carrega variáveis de ambiente
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

// manipular caminhos de arquivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware de logging que registra informações sobre cada requisição HTTP recebida
app.use(morgan('tiny'));
connectDB(); // Conexão com o banco de dados

// Middleware para analisar corpos de requisição de formulários HTML
app.use(express.urlencoded({extended: true})); // Substitui bodyParser.urlencoded

// Rotas para servir os arquivos HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/add-client', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add_client.html'));
});
app.get('/update-client', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'update_client.html'));
});
app.get('/agendamentos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index_agendamento.html'));
});
app.get('/add-agendamento', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add_agendamento.html'));
});
app.get('/update-agendamento', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'update_agendamento.html'));
});

// Rotas estáticas para servir arquivos de assets
app.use('/img', express.static(path.resolve(__dirname,"assets/img")));
app.use('/css', express.static(path.resolve(__dirname,"assets/css")));
app.use('/js', express.static(path.resolve(__dirname,"assets/js")));

// Carrega as rotas
app.use('/', router);

// Inicialização do servidor
app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)});
