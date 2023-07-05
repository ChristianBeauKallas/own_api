CREATE DATABASE coaches_app;

USE coaches_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    teamName VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    passwordHash VARCHAR(255),
    email VARCHAR(255) NOT NULL
);