import express, { response } from "express";

const app = express();

app.use(express.json());

// Request param: Parâmetros que vem da própria rota que identificamum recurso
// Query param: Parâmetros quem vem na própria rota geralmente opcionais para filtros, paginação
// Request Body: Parâmetros para criação/atualização de informação

const users = ["Marcos", "Daniel", "DreSantosz"];

app.get("/users", (req, res) => {
  // localhost:3333/users?search=on
  const search = String(req.query.search);

  const filteredUsers = search
    ? users.filter((user) => user.includes(search))
    : users;

  res.json(filteredUsers);
});

app.post("/users", (req, res) => {
  const data = req.body;

  const user = {
    name: data.name,
    email: data.email,
  };

  return res.json(user);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users[id];

  return res.json({ usuario: user });
});

app.listen(3333);
