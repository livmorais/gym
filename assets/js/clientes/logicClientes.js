import { createTableRow } from './domClientes.js';

export const populateClientsTable = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/clients');  
        const data = await response.json();  
        const clientTableBody = document.querySelector('.table tbody');  
        let tableRows = ''; 

        data.forEach(client => {
            tableRows += createTableRow(client); 
        });

        clientTableBody.innerHTML = tableRows;
    } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
    }    
};

export const buscarClientes = async () => {
    const name = document.getElementById('searchInput').value.trim();

    if (name === '') {
        populateClientsTable();
        return;
    }

    try {
        const response = await fetch(`/api/clients/name/${name}`);
        const data = await response.json();
        const clientTableBody = document.querySelector('.table tbody');
        clientTableBody.innerHTML = ''; 

        data.forEach(client => {
            const row = document.createElement('tr'); 
            row.innerHTML = createTableRow(client);
            clientTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
    }
};

export const buscarClientesPorStatus = async(status) => {
    try {
        const response = await fetch(`http://localhost:3000/api/clients/status/${status}`);
        const data = await response.json();
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; 

        data.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = createTableRow(client);
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar clientes por status:', error);
    }
};

// Função debounce que recebe uma função (func) e um tempo de espera (wait)
export const debounce = (func, wait) => { 
    let timeout;

     // Retorna uma função que será executada quando o evento ocorrer
    return (...args) => {
        clearTimeout(timeout); // Limpa o timeout anterior para garantir que func só seja chamada após o usuário parar de digitar
        timeout = setTimeout(() => func(...args), wait);  // Define um novo timeout para chamar func após o intervalo de espera
    };
};

export const deleteClient = async (clientId) => { 
    const response = await fetch(`http://localhost:3000/api/agendamentos/clientes/${clientId}`);
    const agendamentos = await response.json();

    let confirmMessage = '';
    if (agendamentos.length > 0) {
        confirmMessage = `O cliente possui ${agendamentos.length} agendamento(s). Ao deletar o cliente, os agendamentos também serão excluídos. Deseja continuar?`;
    } else {
        confirmMessage = 'Tem certeza que deseja deletar esse cliente?';
    }

    if (!confirm(confirmMessage)) {
        return; 
    }

    const deleteResponse = await fetch(`http://localhost:3000/api/clients/${clientId}`, { method: 'DELETE' });
    if (!deleteResponse.ok) {
        throw new Error('Falha ao deletar cliente');
    }

    alert('Cliente deletado com sucesso!');
    populateClientsTable(); 
};

// alterna a visibilidade do campo de pesquisa
export const toggleSearchInput = () => {
    const searchInputContainer = document.querySelector('.search-box');

    // adiciona ou remove a classe 'active' para alterar a visibilidade do campo de pesquisa
    searchInputContainer.classList.toggle('active');
};
window.toggleSearchInput = toggleSearchInput;
