CREATE DATABASE db_stock;

USE db_stock;

CREATE TABLE articulos(
    id VARCHAR(6) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    grupo VARCHAR(2),
    año VARCHAR(4)
);

ALTER TABLE articulos
ADD PRIMARY KEY (id);

CREATE TABLE usuarios(
    idUsuario VARCHAR(2) NOT NULL,
    nombreUsuario VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL
);

ALTER TABLE usuarios
ADD PRIMARY KEY (id);

