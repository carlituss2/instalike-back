import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postModels.js";
import gerarDescricaoComGemini from "../services/geminiService.js";
 

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados (ou outra fonte de dados)
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON
  res.status(200).json(posts);
};

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const novoPost = req.body;
  // Tenta criar o novo post no banco de dados
  try {
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro, loga o erro no console e envia uma resposta HTTP com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
};

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  // Tenta criar o novo post no banco de dados e renomear a imagem
  try {
    const postCriado = await criarPost(novoPost);
    // Gera um novo nome para a imagem, utilizando o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro, loga o erro no console e envia uma resposta HTTP com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  };
};

export async function atualizarNovoPost(req, res) {
  
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
     try {
      
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer)

    const post = {
      imgUrl : urlImagem,
      descricao : descricao,
      alt : req.body.alt
  }

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
   
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
};