import { populateClientsTable, toggleSearchInput } from './logicClientes.js';
import './eventsClientes.js';

document.addEventListener('DOMContentLoaded', () => {
    populateClientsTable();

    //verifica o icone de pesquisa 
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', toggleSearchInput);
    }
});

