CREATE DATABASE db_stock;

USE db_stock;

CREATE TABLE articulos(
    id VARCHAR(6) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    grupo VARCHAR(2),
    año VARCHAR(4),
    idProveedor VARCHAR(4)
);

ALTER TABLE articulos
ADD PRIMARY KEY (id);

CREATE TABLE usuarios(
    idUsuario VARCHAR(2) NOT NULL,
    nombreUsuario VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL
);

ALTER TABLE usuarios
ADD PRIMARY KEY (idUsuario);

CREATE TABLE proveedores(
    idProveedor VARCHAR(4) NOT NULL,
    nombreProveedor VARCHAR(20) NOT NULL,
    pDireccion VARCHAR(50),
    pTelefono VARCHAR(16),
    pContacto VARCHAR(30)
);
ALTER TABLE proveedores
ADD PRIMARY KEY (idProveedor);

ALTER TABLE articulos
ADD FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor);

