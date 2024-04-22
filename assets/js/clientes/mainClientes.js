import { populateClientsTable, toggleSearchInput } from './logicClientes.js';
import './eventsClientes.js';

document.addEventListener('DOMContentLoaded', () => {
    populateClientsTable();

    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', toggleSearchInput);
    }
});

