import { Router } from "express";

import {
  atualizarDiretor,
  buscarDiretor,
  criarDiretor,
  deletarDiretor,
  listarDiretores,
} from "../controllers/diretor.controller";

import {
  atualizarCategoria,
  buscarCategoria,
  criarCategoria,
  deletarCategoria,
  listarCategorias,
} from "../controllers/categoria.controller";

import {
  atualizarAtor,
  buscarAtor,
  criarAtor,
  deletarAtor,
  listarAtores,
} from "../controllers/ator.controller";

import {
  atualizarFilme,
  buscarFilme,
  buscarFilmeComAtores,
  buscarFilmeCompleto,
  criarFilme,
  deletarFilme,
  listarFilmes,
  listarFilmesComAtores,
  listarFilmesCompleto,
} from "../controllers/filme.controller";

import {
  criarFilmeAtor,
  deletarFilmeAtor,
  listarFilmeAtores,
} from "../controllers/filmeAtor.controller";

import {
  alugarFilme,
  buscarLocacao,
  devolverFilme,
  listarFilmesDisponiveis,
  listarLocacoes,
} from "../controllers/locacao.controller";

export const router = Router();

/* ---------- DIRETOR ---------- */
router.get("/diretores", listarDiretores);
router.get("/diretores/:id", buscarDiretor);
router.post("/diretores", criarDiretor);
router.put("/diretores/:id", atualizarDiretor);
router.delete("/diretores/:id", deletarDiretor);

/* ---------- CATEGORIA ---------- */
router.get("/categorias", listarCategorias);
router.get("/categorias/:id", buscarCategoria);
router.post("/categororias", criarCategoria);
router.put("/categororias/:id", atualizarCategoria);
router.delete("/categororias/:id", deletarCategoria);

/* ---------- ATOR ---------- */
router.get("/atores", listarAtores);
router.get("/atores/:id", buscarAtor);
router.post("/atores", criarAtor);
router.put("/atores/:id", atualizarAtor);
router.delete("/atores/:id", deletarAtor);

/* ---------- FILME ---------- */
router.get("/filmes", listarFilmes);
router.get("/filmes-completo", listarFilmesCompleto);
router.get("/filmes-com-atores", listarFilmesComAtores);
router.get("/filmes/:id", buscarFilme);
router.get("/filmes-completo/:id", buscarFilmeCompleto);
router.get("/filmes-com-atores/:id", buscarFilmeComAtores);
router.post("/filmes", criarFilme);
router.put("/filmes/:id", atualizarFilme);
router.delete("/filmes/:id", deletarFilme);

/* ---------- FILME / ATOR (N:N) ---------- */
router.get("/filme-atores", listarFilmeAtores);
router.post("/filme-atores", criarFilmeAtor);
router.delete("/filme-atores", deletarFilmeAtor);

/* ---------- LOCAÇÃO (Lógica de Negócio) ---------- */
router.get("/locacoes", listarLocacoes);
router.get("/locacoes/:id", buscarLocacao);
router.get("/filmes-disponiveis", listarFilmesDisponiveis);
router.post("/locacoes/alugar", alugarFilme);
router.put("/locacoes/:id/devolver", devolverFilme);
