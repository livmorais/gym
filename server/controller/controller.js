import Clientdb from '../model/model.js';
import Agendamentodb from '../model/agendamento.js';

/**
 * @param {Object} req - O objeto de requisição.
 * @param {Object} res - O objeto de resposta.
**/

// Busca clientes no banco de dados
export const find = (req, res) => {
    // Verifica se um ID foi fornecido na query
    if (req.query.id) {
        const id = req.query.id;

        Clientdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Não foi possível encontrar cliente com esse id ${id}` });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: `Erro ao acessar cliente com esse id ${id}` });
            })
    } else {
        // Busca todos os clientes se nenhum ID foi fornecido
        Clientdb.find()
            .then(client => {
                res.send(client)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Ocorreu algum erro ao tentar recuperar informações do cliente" });
            })
    };
};

// Cria um novo cliente no banco de dados
export const create = (req, res) => {
    if (!req.body) {
        res.status(404).send({ message: 'O conteúdo não pode estar vazio!' });
        return;
    }
    // Cria uma nova instância do modelo de cliente com os dados recebidos
    const client = new Clientdb({
        name: req.body.name,
        telefone: req.body.telefone,
        email: req.body.email,
        genero: req.body.genero,
        status: req.body.status
    });
    
    client.save()
        .then(data => {
            res.redirect('/add-client');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro ao criar um cliente"
            });
        });
};

// Função auxiliar para remover acentos de uma string
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Busca clientes pelo nome
export const getClientByName = (req, res) => {
    const name = req.params.name;

    // Busca clientes cujo nome corresponde ao fornecido, considerando acentos
    Clientdb.find({
        $or: [
            { name: { $regex: new RegExp(name, 'i') } },
            { name: { $regex: new RegExp(removeAccents(name), 'i') } }
        ]
    })
        .then(data => {
            if (!data.length) {
                return res.status(404).send({ message: `Não foi possível encontrar cliente com o nome ${name}` });
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: `Erro ao acessar cliente com o nome ${name}: ${err.message}` });
        });
};

// Busca um cliente pelo ID
export const getClientById = (req, res) => {
    const clientId = req.params.id;
    // Busca um cliente específico pelo ID
    Clientdb.findById(clientId)
        .then(client => {
            if (!client) {
                res.status(404).send({ message: `Cliente com o ID ${clientId} não encontrado` });
            } else {
                res.status(200).send(client);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Erro ao buscar cliente com ID ${clientId}: ${err.message}` });
        });
};

// Busca clientes por status
export const findByStatus = (req, res) => {
    let status = req.params.status;

    if (status !== 'Ativo' && status !== 'Inativo') {
        return res.status(400).send({ message: 'O status fornecido é inválido' });
    }

     // Busca clientes que correspondem ao status fornecido
    Clientdb.find({ status: status })
        .then(clients => {
            if (!clients || clients.length === 0) {
                return res.status(404).send({ message: `Não foi possível encontrar clientes com o status ${status}` });
            }
            res.send(clients);
        })
        .catch(err => {
            res.status(500).send({ message: `Erro ao buscar clientes pelo status ${status}: ${err.message}` });
        });
};

// Atualiza os dados de um cliente
export const update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Os dados a atualizar não podem estar vazios" });
    }

    const id = req.params.id;
    Clientdb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Não foi possível atualizar o cliente ${id}` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro ao atualizar as informações do cliente" })
        })
};

// Exclui um cliente e seus agendamentos associados
export const deleteClient = async (req, res) => {
    const clientId = req.params.id;

    try {
        const cliente = await Clientdb.findById(clientId);
        if (!cliente) {
            return res.status(404).send({ message: `Cliente com o ID ${clientId} não encontrado.` });
        }
         // Exclui o cliente e todos os seus agendamentos associados
        await Clientdb.findByIdAndDelete(clientId);
        await Agendamentodb.deleteMany({ cliente: clientId });

        res.send({ message: `Cliente com o ID ${clientId} foi excluído com sucesso, junto com seus agendamentos associados.` });
    } catch (error) {
        res.status(500).send({ message: `Erro ao excluir o cliente com o ID ${clientId}.`, error: error.message });
    }
};
