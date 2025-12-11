import { db } from "../database/connection";

export const listarAtores = async (req, res) => {
  const data = await db("ator").select("*");
  return res.json(data);
};

export const buscarAtor = async (req, res) => {
  const { id } = req.params;
  const data = await db("ator").where({ id }).first();
  return res.json(data);
};

export const criarAtor = async (req, res) => {
  const { nome } = req.body;
  const id = await db("ator").insert({ nome });
  return res.json({ id });
};

export const atualizarAtor = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  await db("ator").where({ id }).update({ nome });
  return res.json({ message: "Ator atualizado" });
};

export const deletarAtor = async (req, res) => {
  const { id } = req.params;
  await db("ator").where({ id }).delete();
  return res.json({ message: "Ator deletado" });
};
