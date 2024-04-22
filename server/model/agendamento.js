import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const agendamentoSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'clientdb',
        required: true
    },
    aula: {
        type: String,
        required: true
    },
    pagamento: String,
    confirmado: String
});

const Agendamentodb = model('agendamentodb', agendamentoSchema);

export default Agendamentodb;
