import { db } from "../database/connection";

export const listarFilmes = async (req, res) => {
  const data = await db("filme").select("*");
  return res.json(data);
};

export const listarFilmesCompleto = async (req, res) => {
  const data = await db("filme")
    .select(
      "filme.id",
      "filme.titulo",
      "filme.ano",
      "diretor.nome as diretor",
      "categoria.nome as categoria"
    )
    .innerJoin("diretor", "filme.id_diretor", "diretor.id")
    .innerJoin("categoria", "filme.id_categoria", "categoria.id");
  return res.json(data);
};

export const buscarFilme = async (req, res) => {
  const { id } = req.params;
  const data = await db("filme").where({ id }).first();
  return res.json(data);
};

export const buscarFilmeCompleto = async (req, res) => {
  const { id } = req.params;
  const data = await db("filme")
    .select(
      "filme.id",
      "filme.titulo",
      "filme.ano",
      "diretor.nome as diretor",
      "categoria.nome as categoria"
    )
    .innerJoin("diretor", "filme.id_diretor", "diretor.id")
    .innerJoin("categoria", "filme.id_categoria", "categoria.id")
    .where("filme.id", id)
    .first();
  return res.json(data);
};

export const listarFilmesComAtores = async (req, res) => {
  const data = await db("filme")
    .select(
      "filme.id",
      "filme.titulo",
      "filme.ano",
      "ator.nome as ator"
    )
    .innerJoin("filme_ator", "filme.id", "filme_ator.id_filme")
    .innerJoin("ator", "filme_ator.id_ator", "ator.id");
  return res.json(data);
};

export const buscarFilmeComAtores = async (req, res) => {
  const { id } = req.params;
  const data = await db("filme")
    .select(
      "filme.id",
      "filme.titulo",
      "filme.ano",
      "ator.nome as ator"
    )
    .innerJoin("filme_ator", "filme.id", "filme_ator.id_filme")
    .innerJoin("ator", "filme_ator.id_ator", "ator.id")
    .where("filme.id", id);
  return res.json(data);
};

export const criarFilme = async (req, res) => {
  const { titulo, ano, estoque, id_diretor, id_categoria } = req.body;

  const id = await db("filme").insert({
    titulo,
    ano,
    estoque: estoque || 0,
    id_diretor,
    id_categoria,
  });

  return res.json({ id });
};

export const atualizarFilme = async (req, res) => {
  const { id } = req.params;
  const { titulo, ano, estoque, id_diretor, id_categoria } = req.body;

  await db("filme")
    .where({ id })
    .update({ titulo, ano, estoque, id_diretor, id_categoria });

  return res.json({ message: "Filme atualizado" });
};

export const deletarFilme = async (req, res) => {
  const { id } = req.params;
  await db("filme").where({ id }).delete();
  return res.json({ message: "Filme deletado" });
};
