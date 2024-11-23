import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts
export async function getTodosPosts() {
  // Seleciona o banco de dados 'imersao-instabytes'
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts'
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.find().toArray();
};

// Função assíncrona para criar um novo post
export async function criarPost(novoPost) {
  // Seleciona o banco de dados 'imersao-instabytes'
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção 'posts'
  const colecao = db.collection("posts");
  // Insere um novo documento na coleção com os dados do novo post
  return colecao.insertOne(novoPost);
};

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});
}