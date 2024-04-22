
export const createTableRow = (client) => `
<tr>
    <td>${client._id}</td>
    <td>${client.name}</td>
    <td>${formatPhoneNumber(client.telefone)}</td>
    <td>${client.email}</td>
    <td>${client.genero}</td>
    <td><span class="${client.status}">${client.status}</span></td>
    <td>
        <a class="btn border-shadow view-agendamentos" data-client-id="${client._id}">
            <span class="view-icon text-gradient"><i class="fa-solid fa-calendar-alt"></i></span>
        </a>
        <a href="/update-client?id=${client._id}" class="btn border-shadow update">
            <span class="text-gradient"><i class="fa-solid fa-user-pen"></i></span>
        </a>
        <a class="btn border-shadow delete" data-id="${client._id}">
            <span class="delete-icon"><i class="fa-solid fa-trash"></i></span>
        </a>
    </td>
</tr>
`;

export const formatPhoneNumber = (phoneNumber) => { 
    const cleaned = phoneNumber.toString().replace(/\D/g, ''); 
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/); // Tenta encontrar uma correspondência (DDD + número, com 8 ou 9 dígitos)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`; 
    }
    return phoneNumber;
};

export const showModal = (title, content) => { 
    const modalContent = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${title}</h2>
            ${content}
        </div>
    `;

    const modal = document.createElement('div');
    modal.className = 'modal'; 
    modal.innerHTML = modalContent; 
    document.body.appendChild(modal); 

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => modal.remove());

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
};





