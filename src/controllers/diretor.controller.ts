import { db } from "../database/connection";

export const listarDiretores = async (req, res) => {
  const data = await db("diretor").select("*");
  return res.json(data);
};

export const buscarDiretor = async (req, res) => {
  const { id } = req.params;
  const data = await db("diretor").where({ id }).first();
  return res.json(data);
};

export const criarDiretor = async (req, res) => {
  const { nome } = req.body;
  const [id] = await db("diretor").insert({ nome });
  return res.json({ id });
};

export const atualizarDiretor = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  await db("diretor").where({ id }).update({ nome });
  return res.json({ message: "Diretor atualizado" });
};

export const deletarDiretor = async (req, res) => {
  const { id } = req.params;
  await db("diretor").where({ id }).delete();
  return res.json({ message: "Diretor deletado" });
};
