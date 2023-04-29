const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
  {
    posicao: { /*antes do posição tem o id mas é criado automaticamente pelo mongoose*/
      type: Number, /*ser a posição que a tarefa está*/
      required: 'é obrigatório!',
    },
    titulo: {
      type: String,
      required: 'é obrigatório!',
    },
    descricao: { /*como não é obrigatorio o default preenche com uma string vazia. se não colocar o mongoose não vai definir o campo na estrutura da tarefa no front */
      type: String,
      default: '',
    },
    status: { /*qual estados a tarefa está */
      type: String,
      required: 'é obrigatório!',
    },
    dataEntrega: {
      type: Date,
      default: null,
    },
    usuarioCriador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario', /*ele está referenciado com a collectio usuário - saber de quem é a tarefa */
      required: 'é obrigatório!',
    },
  },
  {
    timestamps: true
  }
);

const EsquemaTarefa = mongoose.models.Tarefa || mongoose.model('Tarefa', esquema);
module.exports = EsquemaTarefa;