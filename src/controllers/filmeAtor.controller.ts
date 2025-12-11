import { db } from "../database/connection";

export const listarFilmeAtores = async (req, res) => {
  const data = await db("filme_ator").select("*");
  return res.json(data);
};

export const criarFilmeAtor = async (req, res) => {
  const { id_filme, id_ator } = req.body;

  await db("filme_ator").insert({ id_filme, id_ator });

  return res.json({ message: "Relacionamento criado" });
};

export const deletarFilmeAtor = async (req, res) => {
  const { id_filme, id_ator } = req.body;

  await db("filme_ator").where({ id_filme, id_ator }).delete();

  return res.json({ message: "Relacionamento removido" });
};
