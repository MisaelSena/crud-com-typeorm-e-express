import express from "express";
import { atualizaUsuario, cadastrarUsuario, mostrarUsuarios } from "./controllers/user";

const app = express();

app.use(express.json());

app.post('/users', cadastrarUsuario);

app.get('/users', mostrarUsuarios);

app.patch('/users/:id_usuario', atualizaUsuario);


export default app;