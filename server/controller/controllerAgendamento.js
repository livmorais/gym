import Agendamentodb from '../model/agendamento.js';
import Clientedb from '../model/model.js';

// Obtém agendamentos, podendo ser um único agendamento por ID ou todos os agendamentos
export const getAgendamentos = async (req, res) => {
    try {
        let agendamentos;
        if (req.query.id) {
            // Busca um único agendamento pelo ID e inclui os dados do cliente associado
            agendamentos = await Agendamentodb.findById(req.query.id).populate('cliente');
            if (!agendamentos) {
                return res.status(404).send({ message: `Não foi possível encontrar agendamento com o ID ${req.query.id}` });
            }
        } else {
            // Busca todos os agendamentos e inclui os dados dos clientes associados
            agendamentos = await Agendamentodb.find().populate('cliente');
        }
        res.send(agendamentos);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao acessar agendamento', error: error.message });
    }
};

// Atualiza um agendamento existente pelo ID
export const updateAgendamento = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Os dados a atualizar não podem estar vazios" });
    }

    const id = req.params.id;
    Agendamentodb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Não foi possível atualizar o agendamento ${id}` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Erro ao atualizar as informações do agendamento" })
        })
};

// Obtém um agendamento específico pelo ID
export const getAgendamentoById = (req, res) => {
    const agendamentoId = req.params.id;

    Agendamentodb.findById(agendamentoId)
        .then(agendamento => {
            if (!agendamento) {
                res.status(404).send({ message: `Agendamento com o ID ${agendamentoId} não encontrado` });
            } else {
                res.status(200).send(agendamento);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Erro ao buscar agendamento com ID ${agendamentoId}: ${err.message}` });
        });
};

// Busca agendamentos por aula
export const findByAula = (req, res) => {
    let aula = req.params.aula;

    // Busca agendamentos que correspondem à aula fornecida
    Agendamentodb.find({ aula: aula }).populate('cliente')
        .then(agendamentos => {
            // Se não houver agendamentos, retorna uma lista vazia ou uma mensagem
            if (!agendamentos || agendamentos.length === 0) {
                return res.status(200).send({ message: `Não existem agendamentos para a aula ${aula}` });
            }
            res.send(agendamentos);
        })
        .catch(err => {
            res.status(500).send({ message: `Erro ao buscar a aula ${aula}: ${err.message}` });
        });
};

// Busca agendamentos pelo nome do cliente
export const getAgendamentoByName = (req, res) => {
    const clienteName = req.params.name;
    // Primeiro, busca o cliente pelo nome
    Clientedb.findOne({ name: clienteName })
        .then(cliente => {
            if (!cliente) {
                return res.status(404).send({ message: `Cliente não encontrado: ${clienteName}` });
            }
            // Em seguida, busca agendamentos associados ao cliente encontrado
            Agendamentodb.find({ cliente: cliente._id })
                .then(agendamentos => {
                    res.send(agendamentos);
                })
                .catch(err => {
                    res.status(500).send({ message: `Erro ao acessar agendamentos: ${err.message}` });
                });
        })
        .catch(err => {
            res.status(500).send({ message: `Erro ao buscar agendamento: ${err.message}` });
        });
};

// Busca agendamentos pelo ID do cliente
export const getAgendamentoByClientId = (req, res) => {
    const clientId = req.params.clientId;

    Agendamentodb.find({ cliente: clientId })
        .then(agendamentos => {
            res.send(agendamentos);
        })
        .catch(err => {
            res.status(500).send({ message: `Erro ao acessar agendamentos: ${err.message}` });
        });
};

// Busca agendamentos pelo status de confirmação
export const findByConfirm = (req, res) => {
    const status = req.params.status;

    Agendamentodb.find({ confirmado: status }).populate('cliente')
        .then(agendamentos => {
            if (agendamentos.length === 0) {
                // Envia uma resposta indicando que não foram encontrados agendamentos com o status especificado
                return res.status(200).send({ message: `Não existem agendamentos com o status de confirmação '${status}'` });
            }
            res.send(agendamentos);
        })
        .catch(error => {
            res.status(500).send({ message: `Erro ao buscar agendamentos por status de confirmação: ${error.message}` });
        });
};

// Cria um novo agendamento
export const createAgendamento = (req, res) => {
    if (!req.body) {
        res.status(404).send({ message: 'O conteúdo não pode estar vazio!' });
        return;
    }

     // Cria uma nova instância do modelo de agendamento com os dados fornecidos
    const agendamento = new Agendamentodb({
        cliente: req.body.clienteId,
        nomeCliente: req.body.nomeCliente,
        aula: req.body.aula,
        pagamento: req.body.pagamento,
        confirmado: req.body.confirmado
    });

    agendamento
        .save(agendamento)
        .then(data => {
            res.redirect('/add-agendamento');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro ao criar um agendamento"
            });
        });
};

// Deleta um agendamento pelo ID
export const deleteAgendamento = (req, res) => {
    const id = req.params.id;

    Agendamentodb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Não é possível deletar esse agendamento: ${id}. Talvez o id esteja errado` });
            } else {
                res.send({ message: "Agendamento deletado com sucesso!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Não foi possível deletar o agendamento com esse id" });
        });
};
