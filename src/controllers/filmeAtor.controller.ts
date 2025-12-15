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

export const cadastrarVariosAtoresNoFilme = async (req, res) => {
  const { id_filme, ids_atores } = req.body;

  if (!id_filme || !ids_atores || !Array.isArray(ids_atores)) {
    return res.status(400).json({
      message: "id_filme e ids_atores (array) são obrigatórios"
    });
  }

  for (let i = 0; i < ids_atores.length; i++) {
    await db("filme_ator").insert({
      id_filme,
      id_ator: ids_atores[i]
    });
  }

  return res.json({
    message: "Atores cadastrados no filme com sucesso",
    quantidade: ids_atores.length
  });
};

export const buscarAtoresDoFilme = async (req, res) => {
  const { id_filme } = req.params;

  const atores = await db("filme_ator")
    .innerJoin("ator", "filme_ator.id_ator", "ator.id")
    .where("filme_ator.id_filme", id_filme)
    .select("ator.*");

  return res.json(atores);
};
