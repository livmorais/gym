import { atualizarTabelaAgendamentos } from './domAgendamentos.js';

export const fetchAgendamentos = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/agendamentos');
        const agendamentos = await response.json();

        atualizarTabelaAgendamentos(agendamentos);

    } catch (error) {
        console.error('Erro ao buscar os agendamentos:', error);
    }
};

export const buscarAulas = async (aula) => {
    try {
        const response = await fetch(`http://localhost:3000/api/agendamentos/aula/${aula}`);
        const agendamentos = await response.json();
        atualizarTabelaAgendamentos(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar aulas:', error);
        alert('Erro ao buscar aulas.');
    }
};

export const buscarPorConfirmacao = async (status) => {
    try {
        const response = await fetch(`http://localhost:3000/api/agendamentos/confirmacao/${status}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar agendamentos por status de confirmação: ${response.statusText}`);
        }
        const agendamentos = await response.json();
        atualizarTabelaAgendamentos(agendamentos);
    } catch (error) {
        console.error('Erro ao buscar confirmação:', error);
        alert('Erro ao buscar agendamentos por status de confirmação.');
    }
};