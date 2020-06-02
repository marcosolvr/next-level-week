import express, { response } from "express";

const app = express();

app.get("/users", (req, res) => {
  console.log("listagem de usuários");
  res.json(["Marcos", "Daniel", "DreSantoSz"]);
});

app.listen(3333);
