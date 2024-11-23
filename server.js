import express from "express";
import routes from "./src/routes/postRoutes.js";

// Cria uma nova instância do servidor Express
const app = express();

app.use(express.static("uploads"))

// Chama a função `routes` para configurar as rotas da aplicação
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando na porta 3000...");
});