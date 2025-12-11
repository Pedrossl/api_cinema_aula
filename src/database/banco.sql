DROP DATABASE IF EXISTS cinema_db;

CREATE DATABASE cinema_db;

USE cinema_db;

/* Criando as tabelas principais */
CREATE TABLE diretor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE ator (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE filme (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    estoque INT DEFAULT 0,
    id_diretor INT,
    id_categoria INT,
    FOREIGN KEY (id_diretor) REFERENCES diretor (id),
    FOREIGN KEY (id_categoria) REFERENCES categoria (id)
);

/* Tabela intermediária para o relacionamento muitos-para-muitos entre filmes e atores */
CREATE TABLE filme_ator (
    id_filme INT,
    id_ator INT,
    PRIMARY KEY (id_filme, id_ator),
    FOREIGN KEY (id_filme) REFERENCES filme (id),
    FOREIGN KEY (id_ator) REFERENCES ator (id)
);

/* Tabela de locações */
CREATE TABLE locacao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_filme INT NOT NULL,
    nome_cliente VARCHAR(100) NOT NULL,
    data_locacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_devolucao DATETIME,
    status ENUM('alugado', 'devolvido') DEFAULT 'alugado',
    FOREIGN KEY (id_filme) REFERENCES filme (id)
);

/* Inserindo dados de exemplo */
INSERT INTO diretor (nome) VALUES
('Christopher Nolan'),
('Steven Spielberg'),
('Quentin Tarantino');

INSERT INTO categoria (nome) VALUES
('Ação'),
('Ficção Científica'),
('Drama');

INSERT INTO ator (nome) VALUES
('Leonardo DiCaprio'),
('Tom Hanks'),
('Brad Pitt');

INSERT INTO filme (titulo, ano, estoque, id_diretor, id_categoria) VALUES
('A Origem', 2010, 5, 1, 2),
('Interestelar', 2014, 3, 1, 2),
('Pulp Fiction', 1994, 2, 3, 1);

INSERT INTO filme_ator (id_filme, id_ator) VALUES
(1, 1),
(3, 3);
