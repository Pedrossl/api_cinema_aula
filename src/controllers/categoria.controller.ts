import { Request, Response } from "express";
import { db } from "../database/connection";
import { IdParam, CategoriaBody } from "../types";

export const listarCategorias = async (req: Request, res: Response) => {
  const data = await db("categoria").select("*");
  return res.json(data);
};

export const buscarCategoria = async (req: Request<IdParam>, res: Response) => {
  const { id } = req.params;
  const data = await db("categoria").where({ id }).first();
  return res.json(data);
};

export const criarCategoria = async (req: Request<{}, {}, CategoriaBody>, res: Response) => {
  const { nome } = req.body;
  const [id] = await db("categoria").insert({ nome });
  return res.json({ id });
};

export const atualizarCategoria = async (req: Request<IdParam, {}, CategoriaBody>, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;
  await db("categoria").where({ id }).update({ nome });
  return res.json({ message: "Categoria atualizada" });
};

export const deletarCategoria = async (req: Request<IdParam>, res: Response) => {
  const { id } = req.params;
  await db("categoria").where({ id }).delete();
  return res.json({ message: "Categoria deletada" });
};
