CREATE DATABASE IF NOT EXISTS tyba;
USE tyba;

create table if not exists Users (
	username VARCHAR(50) NOT NULL unique,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    primary key(username)
);


create table if not exists Locations (
	id int NOT NULL AUTO_INCREMENT,
	estado ENUM('Confirmado', 'En preparacion', 'En camino', 'Entregado'),
    hora BIGINT,
    descripcion VARCHAR(100),
    pago BIGINT,
    primary key(id)
);
