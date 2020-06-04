import express from "express";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

// Request param: Parâmetros que vem da própria rota que identificamum recurso
// Query param: Parâmetros quem vem na própria rota geralmente opcionais para filtros, paginação
// Request Body: Parâmetros para criação/atualização de informação

app.listen(3333);
