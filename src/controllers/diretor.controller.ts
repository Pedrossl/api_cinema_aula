import { Request, Response } from "express";
import { db } from "../database/connection";
import { DiretorBody, IdParam } from "../types";

export const listarDiretores = async (req: Request, res: Response) => {
  const data = await db("diretor").select("*");
  return res.json(data);
};

export const buscarDiretor = async (req: Request<IdParam>, res: Response) => {
  const { id } = req.params;
  const data = await db("diretor").where({ id }).first();
  return res.json(data);
};

export const criarDiretor = async (
  req: Request<{}, {}, DiretorBody>,
  res: Response
) => {
  const { nome } = req.body;
  const [id] = await db("diretor").insert({ nome });
  return res.json({ id });
};

export const atualizarDiretor = async (
  req: Request<IdParam, {}, DiretorBody>,
  res: Response
) => {
  const { id } = req.params;
  const { nome } = req.body;
  await db("diretor").where({ id }).update({ nome });
  return res.json({ message: "Diretor atualizado" });
};

export const deletarDiretor = async (req: Request<IdParam>, res: Response) => {
  const { id } = req.params;
  await db("diretor").where({ id }).delete();
  return res.json({ message: "Diretor deletado" });
};
