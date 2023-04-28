const mongoose = require('mongoose'); /*importatação do mongoose*/
const validator = require('validator'); /*importantação do validator*/

const esquema = new mongoose.Schema(
    /*objeto que vai definir cada campo do banco de dados*/
    {
        nome: {
            type: String,
            required: 'é obrigatório!',
        },
        email: {
            type: String,
            unique: true, /*unico, não pode se repetir no banco de dados*/
            required: 'é obrigatório!',
            lowercase: true, /*vai forçar que tudo que seja preenchido nesse campo, seja minusculo*/
            index: true, /*ajuda a fazer uma busca mais rápica sobre o valor desse campo*/
            validate: {
                validator: (valorDigitado) => { return validator.isEmail(valorDigitado) }, /*se não estivesse usando validator poderia usar um if para true e false*/
                message: 'inválido!'
            }
        },
        senha: {
            type: String,
            required: 'é obrigatório!',
            select: false, /*vai ou não vai ser ocultado nas respostas de get dessa informação no banco de dados*/
        },
    },
    {
        timestamps: true /*configurações do esquema.automaticamente faz com que o mongoose crie dois outros campos*/
    }
);

const EsquemaUsuario = mongoose.models.Usuario || mongoose.model('Usuario', esquema); /*exportação da estrutura para que consiga utilizar nas rotas da api*/
module.exports = EsquemaUsuario;