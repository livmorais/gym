import { fetchAgendamentos, buscarAulas, buscarPorConfirmacao } from './logicAgendamentos.js'

//busca um elemento no DOM com ID aulaFilter
document.getElementById('aulaFilter').addEventListener('change', (event)  => {
    const selectedAula = event.target.value;
    if (selectedAula === 'todos') {
        fetchAgendamentos(); 
    } else {
        buscarAulas(selectedAula);
    }
});

//busca um elemento no DOM com o ID confirmFilter
document.getElementById('confirmFilter').addEventListener('change', (event) => {
    const selectedConfirm = event.target.value;
    if (selectedConfirm === 'todos') {
        fetchAgendamentos(); 
    } else {
        buscarPorConfirmacao(selectedConfirm);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const tabelaAgendamentos = document.querySelector('tbody');

    tabelaAgendamentos.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.delete');
        if (deleteButton) {
            const agendamentoId = deleteButton.getAttribute('data-id');
            if (agendamentoId && confirm('Você tem certeza que quer deletar esse agendamento?')) {
                fetch(`http://localhost:3000/api/agendamentos/${agendamentoId}`, { method: 'DELETE' })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Falha ao deletar agendamento');
                        }
                        return response.json();
                    })
                    .then(() => {
                        alert('Agendamento deletado com sucesso!');
                        fetchAgendamentos();
                    })
                    .catch(error => console.error('Erro:', error));
            }
        }
    });
});

