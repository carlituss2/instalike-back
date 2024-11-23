import multer from "multer";
import express from "express";
import cors from "cors";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para uploads como 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo
    cb(null, file.originalname);
  }
});

// Define o middleware para upload de arquivos únicos com o nome 'imagem'
const upload = multer({ storage });

// Função para criar rotas da aplicação
const routes = (app) => {
  // Habilita o parseamento de dados JSON na requisição
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota para listar posts (provavelmente definida em postController.js)
  app.get("/posts", listarPosts);

  // Rota para criar um novo post (provavelmente definida em postController.js)
  app.post("/posts", postarNovoPost);

  // Rota para upload de imagem e criação de um novo post (provavelmente definida em postController.js)
  // O middleware 'upload.single("imagem")' garante que apenas um arquivo seja enviado com o campo 'imagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;