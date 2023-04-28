const mongoose = require('mongoose'); /*importação do mongoose*/
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');

async function conectarBancoDados(req = null, res = null, next = null) { /*pra usar o await eu preciso usar async na frente da função*/
  try { /*tudo que está dentro desse trecho de código ele vai tentar executar*/
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); /*await o javascript deve aguardar a execução completa da funcionalidade mongoose.connect*/
   /*process.env.MONGODB_URI é a variável de ambiente*/ /*{ useNewUrlParser: true, useUnifiedTopology: true }); são configurações do proprio mongoose*/
   
    console.log('Conectado ao banco de dados!');
    try { next(); } catch { }; /* next vem através do middleware. Faz com que continue executando a ação da rota*/
    return mongoose;
  } catch (error) { /*caso alguma coisa der erro no try, ele cai aqui no catch, que vai existe essa resposta de erro na api*/
    console.error(error);
    tratarErrosEsperados(res, 'Error: Erro ao conectar no banco de dados')
    return error;
  }
}

module.exports = conectarBancoDados;