
// Função assíncrona para buscar a lista de clientes e preencher o campo de seleção
const fetchClients = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/clients');
        const clients = await response.json();

        // Seleciona o elemento de seleção de cliente
        const select = document.getElementById('clienteId');
        // Limpa o conteúdo anterior do elemento de seleção e adiciona uma opção padrão
        select.innerHTML = '<option value="">Selecionar</option>'

        // Preenche o elemento de seleção com as opções de clientes
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client._id;
            option.textContent = client.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar lista de clientes:', error);
    }
};

document.addEventListener('DOMContentLoaded', fetchClients);

document.getElementById("add_agendamento").addEventListener("submit", async function(event) {
    event.preventDefault();

    const clienteValue = document.getElementById('clienteId').value;
    const aulaValue = document.getElementById('aula').value;
    const pagamentoValue = document.getElementById('pagamento').value;
    const confirmadoRadio = document.querySelector('input[name="confirmado"]:checked');
    const confirmadoValue = confirmadoRadio ? confirmadoRadio.value : null;

    if (!clienteValue || !aulaValue || !pagamentoValue ||
        clienteValue === 'Selecionar' || aulaValue === 'Selecionar' || pagamentoValue === 'Selecionar' || !confirmadoValue) {
        alert("Por favor, preencha todos os campos antes de enviar o formulário.");
        return; 
    }

    try {
        const response = await fetch(`http://localhost:3000/api/agendamentos`);
        const agendamentos = await response.json();

        // Filtra os agendamentos para encontrar se existe algum para o mesmo cliente e aula
        const agendamentoExistente = agendamentos.find(agendamento => 
            agendamento.cliente._id === clienteValue && agendamento.aula === aulaValue);

        if (agendamentoExistente) {
            alert("O cliente já tem um agendamento para esta aula.");
        } else {
            document.getElementById("add_agendamento").submit();
            alert("Cadastro realizado com sucesso!");
        }
    } catch (error) {
        console.error('Erro ao verificar agendamentos do cliente:', error);
        alert("Erro ao verificar agendamentos do cliente. Por favor, tente novamente mais tarde.");
    }
});