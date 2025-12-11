import { db } from "../database/connection";

export const listarCategorias = async (req, res) => {
  const data = await db("categoria").select("*");
  return res.json(data);
};

export const buscarCategoria = async (req, res) => {
  const { id } = req.params;
  const data = await db("categoria").where({ id }).first();
  return res.json(data);
};

export const criarCategoria = async (req, res) => {
  const { nome } = req.body;
  const [id] = await db("categoria").insert({ nome });
  return res.json({ id });
};

export const atualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  await db("categoria").where({ id }).update({ nome });
  return res.json({ message: "Categoria atualizada" });
};

export const deletarCategoria = async (req, res) => {
  const { id } = req.params;
  await db("categoria").where({ id }).delete();
  return res.json({ message: "Categoria deletada" });
};
