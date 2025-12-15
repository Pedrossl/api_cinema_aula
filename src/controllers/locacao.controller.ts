import { db } from "../database/connection";

// Listar todas as locações
export const listarLocacoes = async (req, res) => {
  const data = await db("locacao")
    .select(
      "locacao.id",
      "locacao.nome_cliente",
      "locacao.data_locacao",
      "locacao.data_devolucao",
      "locacao.status",
      "filme.titulo as filme"
    )
    .innerJoin("filme", "locacao.id_filme", "filme.id");
  return res.json(data);
};

// Buscar locação por ID
export const buscarLocacao = async (req, res) => {
  const { id } = req.params;
  const data = await db("locacao")
    .select(
      "locacao.id",
      "locacao.nome_cliente",
      "locacao.data_locacao",
      "locacao.data_devolucao",
      "locacao.status",
      "filme.titulo as filme"
    )
    .innerJoin("filme", "locacao.id_filme", "filme.id")
    .where("locacao.id", id)
    .first();
  return res.json(data);
};

// Alugar filme (diminui estoque)
export const alugarFilme = async (req, res) => {
  const { id_filme, nome_cliente } = req.body;

  // Verificar se o filme existe e tem estoque
  const filme = await db("filme").where({ id: id_filme }).first();

  if (!filme) {
    return res.status(404).json({ error: "Filme não encontrado" });
  }

  if (filme.estoque <= 0) {
    return res.status(400).json({ error: "Filme sem estoque disponível" });
  }

  // Diminui o estoque
  await db("filme")
    .where({ id: id_filme })
    .update({ estoque: filme.estoque - 1 });

  // Cria a locação
  const [id] = await db("locacao").insert({
    id_filme,
    nome_cliente,
    status: "alugado",
  });

  return res.json({
    id,
    message: "Filme alugado com sucesso",
    estoque_restante: filme.estoque - 1,
  });
};

// Devolver filme (aumenta estoque)
export const devolverFilme = async (req, res) => {
  const { id } = req.params;

  // Buscar a locação
  const locacao = await db("locacao").where({ id }).first();

  if (!locacao) {
    return res.status(404).json({ error: "Locação não encontrada" });
  }

  if (locacao.status === "devolvido") {
    return res.status(400).json({ error: "Filme já foi devolvido" });
  }

  // Buscar o filme
  const filme = await db("filme").where({ id: locacao.id_filme }).first();

  // Aumenta o estoque
  await db("filme")
    .where({ id: locacao.id_filme })
    .update({ estoque: filme.estoque + 1 });

  // Atualiza a locação
  await db("locacao").where({ id }).update({
    status: "devolvido",
    data_devolucao: db.fn.now(),
  });

  return res.json({
    message: "Filme devolvido com sucesso",
    estoque_atual: filme.estoque + 1,
  });
};

// Listar filmes disponíveis (com estoque)
export const listarFilmesDisponiveis = async (req, res) => {
  const data = await db("filme")
    .select(
      "filme.id",
      "filme.titulo",
      "filme.ano",
      "filme.estoque",
      "diretor.nome as diretor",
      "categoria.nome as categoria"
    )
    .innerJoin("diretor", "filme.id_diretor", "diretor.id")
    .innerJoin("categoria", "filme.id_categoria", "categoria.id")
    .where("filme.estoque", ">", 0);
  return res.json(data);
};
