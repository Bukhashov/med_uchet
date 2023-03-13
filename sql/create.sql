
CREATE TABLE IF NOT EXISTS users(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    lastname VARCHAR(50),
    firstname VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(500),
    position VARCHAR(100),
    confirm BOOLEAN,
    create_time DATE,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS confirm (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userId INT,
    number VARCHAR(25)
);