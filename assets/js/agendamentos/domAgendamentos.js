export const createTableRow = (agendamento, cliente) => `
    <tr>
        <td>${agendamento._id}</td>
        <td>${cliente ? cliente.name : 'Cliente não encontrado'}</td>
        <td>${agendamento.aula}</td>
        <td>${agendamento.pagamento}</td>
        <td>${agendamento.confirmado}</td>
        <td>
            <a href="/update-agendamento?id=${agendamento._id}" class="btn border-shadow update">
                <span class="text-gradient"><i class="fa-solid fa-pen-to-square"></i></span>
            </a>
            <a class="btn border-shadow delete" data-id="${agendamento._id}">
                <span class="delete-icon"><i class="fa-solid fa-trash"></i></span>
            </a>
        </td>
    </tr>
`;

// Atualiza a tabela de agendamentos com base na lista de agendamentos fornecida
export const atualizarTabelaAgendamentos = (agendamentos) => {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; 

    if (!agendamentos.length) {
        tbody.innerHTML = '<tr><td colspan="6">Não existem agendamentos para exibir.</td></tr>';
        return;
    }

    // Itera sobre cada agendamento na lista
    agendamentos.forEach(agendamento => {
        const cliente = agendamento.cliente ? agendamento.cliente : null;
        // Cria uma nova linha da tabela usando a função createTableRow e adiciona à tabela
        const row = document.createElement('tr');
        row.innerHTML = createTableRow(agendamento, cliente);  
        tbody.appendChild(row);
    });
};