package inits

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
)

type InitTable interface {
	CreateTables(ctx context.Context)(err error)  
}

type initTable struct {
	client	*pgxpool.Pool
}

func (i initTable) CreateTables(ctx context.Context)(err error){
	if err = i.CreateTableUsers(ctx); err != nil {
		return err
	}
	if err = i.CreateTableConfirm(ctx); err != nil {
		return err
	}

	return nil
}

func (i initTable) CreateTableUsers(ctx context.Context)(err error) {
	q := `
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
	`
	
	_, err = i.client.Exec(ctx, q); if err != nil {
		return err
	}
	return nil
}

func (i initTable) CreateTableConfirm(ctx context.Context)(err error) {
	q := `
		CREATE TABLE IF NOT EXISTS confirm (
			id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			userId INT,
			number VARCHAR(25)
		);
	`
	_, err = i.client.Exec(ctx, q); if err != nil {
		return err
	}
	return nil
}



func NewInit(client *pgxpool.Pool) InitTable {
	return &initTable{
		client: client,
	}
}