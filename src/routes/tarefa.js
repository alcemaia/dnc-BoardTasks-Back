const express = require('express');
const tratarErrosEsperados = require('../functions/tratarErrosEsperados');
const authUser = require('../middleware/authUser');
const conectarBancoDados = require('../middleware/conectarBD');
const EsquemaTarefa = require('../models/tarefa');
const router = express.Router();


router.post('/criar', authUser, conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Tarefa']
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const usuarioCriador = req.usuarioJwt.id;
    const respostaBD = await EsquemaTarefa.create({ posicao, titulo, descricao, status, dataEntrega, usuarioCriador });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Tarefa criada com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.put('/editar/:id', authUser, conectarBancoDados, async function (req, res) { //put outro metodo de requisição :id parametro recebido através da url da api 
  try {
    // #swagger.tags = ['Tarefa']
    let idTarefa = req.params.id; //vai receber o valor do parâmentro que vem através da url 
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const usuarioLogado = req.usuarioJwt.id;

    const checkTarefa = await EsquemaTarefa.findOne({ _id: idTarefa, usuarioCriador: usuarioLogado }); //findOne vai objter um único item no banco de dado e o restante são as condições para achar no banco de dados
    if (!checkTarefa) { //vai checar se a tarefa veio sem nada ou porque pertence a outro usuário
      throw new Error("Tarefa não encontrada ou pertence a outro usuário");
    }

    const tarefaAtualizada = await EsquemaTarefa.updateOne({ _id: idTarefa }, { posicao, titulo, descricao, status, dataEntrega });
    if (tarefaAtualizada?.modifiedCount > 0) {
      const dadosTarefa = await EsquemaTarefa.findOne({ _id: idTarefa }).populate('usuarioCriador'); //populate função do mongoose

      res.status(200).json({
        status: "OK",
        statusMensagem: "Tarefa atualizada com sucesso.",
        resposta: dadosTarefa
      })
    }
  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

//get para obter informações do banco de dados 
router.get('/obter/usuario', authUser, conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Tarefa']
    // #swagger.description = "Endpoint para obter todas tarefas do usuario logado."
    //quando está utilizando o metodo get a gente não consegue receber os parametros via body - pelo corpo da requisição
    const usuarioLogado = req.usuarioJwt.id;
    const respostaBD = await EsquemaTarefa.find({ usuarioCriador: usuarioLogado }).populate('usuarioCriador'); //find retorna vários itens que ele achar

    res.status(200).json({
      status: "OK",
      statusMensagem: "Tarefas listadas na respota com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});


router.delete('/deletar/:id', authUser, conectarBancoDados, async function (req, res) {
  try {
    // #swagger.tags = ['Tarefa']
    const idTarefa = req.params.id;
    const usuarioLogado = req.usuarioJwt.id;

    const checkTarefa = await EsquemaTarefa.findOne({ _id: idTarefa, usuarioCriador: usuarioLogado });
    if (!checkTarefa) {
      throw new Error("Tarefa não encontrada ou pertence a outro usuário");
    }

    const respostaBD = await EsquemaTarefa.deleteOne({ _id: idTarefa });
    res.status(200).json({
      status: "OK",
      statusMensagem: "Tarefa deletada com sucesso.",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

module.exports = router;
