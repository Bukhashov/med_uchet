package storage

import (
	"fmt"
	"context"

	"github.com/Bukhashov/med_uchet/internal/model"
	"github.com/Bukhashov/med_uchet/pkg/logging"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/pgconn"
)

type ConfirmStorage interface {
	Create(ctx context.Context, confirm *model.Confirm)(err error)
	FindByEmail(ctx context.Context, confirm *model.Confirm)(err error)
	Delete(ctx context.Context, confirm *model.Confirm)(err error)
}

type confirmStorage struct {
	client *pgxpool.Pool
	logger *logging.Logger
}

func (c confirmStorage) Create(ctx context.Context, confirm *model.Confirm)(err error) {
	q := `
		INSERT INTO confirm (userid, number)
		VALUES ($1, $2)
		RETURNING id
	`

	if err = c.client.QueryRow(ctx, q, confirm.UserId, confirm.Number).Scan(&confirm.Id); err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok {
			newErr := fmt.Errorf(fmt.Sprintf("SQL ERROR Massage: %s Detail: %s Where: %s Code: %s SQLSelect: %s", pgErr.Message, pgErr.Detail, pgErr.Where, pgErr.Code, pgErr.SQLState()))
			c.logger.Info(newErr)
			return err
		}
		return nil
	}

	return nil
}
func (c confirmStorage) FindByEmail(ctx context.Context, confirm *model.Confirm)(err error) {
	q := `
		SELECT id 
		FROM confirm
		WHERE userid=$1 AND number=$2
	`

	if err = c.client.QueryRow(ctx, q, confirm.UserId, confirm.Number).Scan(confirm.Id); err != nil {
		return err
	}

	return nil
}
func (c confirmStorage) Delete(ctx context.Context, confirm *model.Confirm)(err error){
	q := `
		DROP FROM confirm
		WHERE id=$1
	`

	_, err = c.client.Exec(ctx, q, confirm.Id); if err != nil {
		return err
	}
	
	return nil
}

func NewConfirmStrage(client *pgxpool.Pool, logger *logging.Logger) ConfirmStorage {
	return &confirmStorage{
		client: client,
		logger: logger,
	}
}