
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const agendamentoId = urlParams.get('id');

        const agendamentoResponse = await fetch(`http://localhost:3000/api/agendamentos?id=${agendamentoId}`);
        if (!agendamentoResponse.ok) {
            throw new Error(`HTTP error! status: ${agendamentoResponse.status}`);
        }
        const agendamentoData = await agendamentoResponse.json();

        document.getElementById('aula').value = agendamentoData.aula;
        document.getElementById('pagamento').value = agendamentoData.pagamento;

        const radioMapping = {
            'Confirmado': 'radio-2',
            'Pendente': 'radio-3'
        };
        document.getElementById(radioMapping[agendamentoData.confirmado]).checked = true;

        const clienteSelect = document.getElementById('clienteId');
        const option = document.createElement('option');
        option.value = agendamentoData.cliente._id; 
        option.textContent = agendamentoData.cliente.name; 
        clienteSelect.appendChild(option);

        document.getElementById('update_agendamento').addEventListener('submit', async (event) => {
            event.preventDefault();
            
            // Cria um objeto FormData a partir do formulário e converte para um objeto JavaScript
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);

            const request = {
                method: "PUT",
                body: new URLSearchParams(data),  // Converte os dados do formulário para URLSearchParams
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            try {
                const response = await fetch(`http://localhost:3000/api/agendamentos/${agendamentoId}`, request);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                await response.json();
                alert("Agendamento alterado com sucesso!");
            } catch (error) {
                console.error('Erro:', error);
            }
        });

    } catch (error) {
        console.error('Erro ao buscar dados do agendamento:', error);
        alert('Erro ao buscar dados do agendamento. Por favor, tente novamente.');
    }
});
