import { Request, Response } from "express";

// Tipos das entidades do banco de dados
export type Filme = {
  id: number;
  titulo: string;
  ano: number;
  estoque: number;
  id_diretor: number;
  id_categoria: number;
};

export type Ator = {
  id: number;
  nome: string;
};

export type Diretor = {
  id: number;
  nome: string;
};

export type Categoria = {
  id: number;
  nome: string;
};

export type Locacao = {
  id: number;
  id_filme: number;
  nome_cliente: string;
  data_locacao: Date;
  data_devolucao?: Date;
  status: "alugado" | "devolvido";
};

export type FilmeAtor = {
  id_filme: number;
  id_ator: number;
};

// Tipos para request params
export type IdParam = {
  id: string;
};

// Tipos para request body
export type FilmeBody = {
  titulo: string;
  ano: number;
  estoque?: number;
  id_diretor: number;
  id_categoria: number;
};

export type AtorBody = {
  nome: string;
};

export type DiretorBody = {
  nome: string;
};

export type CategoriaBody = {
  nome: string;
};

export type LocacaoBody = {
  id_filme: number;
  nome_cliente: string;
};

export type FilmeAtorBody = {
  id_filme: number;
  id_ator: number;
};

// Tipos para os controllers
export type Controller = (req: Request, res: Response) => Promise<Response>;
