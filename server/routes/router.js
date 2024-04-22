import express from 'express';
import { find, getClientById, getClientByName, findByStatus, create, update, deleteClient } from '../controller/controller.js';
import { getAgendamentoById, getAgendamentos, findByAula, getAgendamentoByClientId, getAgendamentoByName, findByConfirm, createAgendamento, updateAgendamento, deleteAgendamento } from '../controller/controllerAgendamento.js';

const route = express.Router();

//API CLIENTE
route.get('/api/clients', find);
route.get('/api/clients/:id', getClientById);
route.get('/api/clients/name/:name', getClientByName);
route.get('/api/clients/status/:status', findByStatus);
route.post('/api/clients', create);
route.put('/api/clients/:id', update);
route.delete('/api/clients/:id', deleteClient);

//API AGENDAMENTOS
route.get('/api/agendamentos/:id', getAgendamentoById);
route.get('/api/agendamentos', getAgendamentos);
route.get('/api/agendamentos/aula/:aula', findByAula);
route.get('/api/agendamentos/clientes/:clientId', getAgendamentoByClientId);
route.get('/api/agendamentos/cliente/:name', getAgendamentoByName);
route.get('/api/agendamentos/confirmacao/:status', findByConfirm);
route.get('/api/agendamentos/aula/:aula', findByAula);
route.post('/api/agendamentos', createAgendamento);
route.put('/api/agendamentos/:id', updateAgendamento);
route.delete('/api/agendamentos/:id', deleteAgendamento);

export default route;
