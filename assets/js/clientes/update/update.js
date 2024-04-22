
document.addEventListener("DOMContentLoaded", async () =>  {
    // Obtenha o ID do cliente da URL
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const r_client = await response.json();

        document.getElementById('client_id').value = r_client._id;
        document.getElementById('name').value = r_client.name;
        document.getElementById('telefone').value = r_client.telefone;
        document.getElementById('email').value = r_client.email;

       
        document.getElementById(r_client.genero === 'Feminino' ? 'radio-1' : 'radio-2').checked = true;
        document.getElementById(r_client.status === 'Ativo' ? 'radio-3' : 'radio-4').checked = true;
    } catch (error) {
        console.error('Error:', error);
    }

    document.getElementById('update_client').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Cria um objeto FormData a partir do formulário e converte para um objeto JavaScript
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        const request = {
            method: "PUT",
            body: new URLSearchParams(data), // Converte os dados do formulário para URLSearchParams
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        try {
            const response = await fetch(`http://localhost:3000/api/clients/${data.id}`, request);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            await response.json(); 
            alert("Cadastro alterado com sucesso!");
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

