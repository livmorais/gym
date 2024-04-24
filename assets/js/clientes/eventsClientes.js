import { populateClientsTable, deleteClient, buscarClientesPorStatus, buscarClientes, debounce } from './logicClientes.js';
import { showModal } from './domClientes.js';

document.addEventListener('click', async (event) => {
    const viewButton = event.target.closest('.view-agendamentos');
    if (viewButton) {
        // Extrai o ID do cliente do atributo 'data-client-id' do botão clicado
        const clientId = viewButton.getAttribute('data-client-id');
        try {
            const response = await fetch(`http://localhost:3000/api/agendamentos/clientes/${clientId}`);
            const agendamentos = await response.json(); 

            let content = '<p>Nenhum agendamento encontrado para este cliente.</p>';
            if (agendamentos.length > 0) {
                content = '<ul>' + agendamentos.map(agendamento => `<li>Aula: ${agendamento.aula} / Pagamento: ${agendamento.pagamento} / Status: ${agendamento.confirmado}</li>`).join('') + '</ul>';
            }

            showModal('Agendamentos do Cliente', content);
        } catch (error) {
            console.error('Erro ao buscar os agendamentos do cliente:', error);
        }
    }
});

document.addEventListener('click', async (event) => {
    const deleteButton = event.target.closest('.delete');
    if (deleteButton) {
        const clientId = deleteButton.getAttribute('data-id');  // Extrai o ID do cliente do atributo 'data-id' do botão clicado
        try {
            await deleteClient(clientId); 
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar cliente. Por favor, tente novamente.');
        }
    }
});

document.getElementById('statusFilter').addEventListener('change', (event) => {
    const selectedStatus = event.target.value;
    if (selectedStatus === 'todos') {
        populateClientsTable(); 
    } else {
        buscarClientesPorStatus(selectedStatus);
    }
});
    
//a função buscarClientes só será chamada 500 milissegundos após o usuário parar de digitar
document.getElementById("searchInput").addEventListener("input", debounce(buscarClientes, 500));
