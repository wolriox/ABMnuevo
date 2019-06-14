CREATE DATABASE db_stock;

USE db_stock;

CREATE TABLE articulos(
    id VARCHAR(6) NOT NULL,
    nombre VARCHAR(16) NOT NULL,
    grupo VARCHAR(2),
    año VARCHAR(4),
    color VARCHAR(10) NOT NULL,
    talle VARCHAR(3) NOT NULL,
    cantidad INT,   
);

ALTER TABLE articulos
ADD PRIMARY KEY (id);

CREATE TABLE usuarios(
    id VARCHAR(2) NOT NULL,
    nombre VARCHAR(16) NOT NULL,
    contraseña VARCHAR(16) NOT NULL
);

ALTER TABLE usuarios
ADD PRIMARY KEY (id);

