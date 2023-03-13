package storage

import (
	"fmt"
	"context"

	"github.com/Bukhashov/med_uchet/internal/model"
	"github.com/Bukhashov/med_uchet/pkg/logging"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/pgconn"
)

type UserStorage interface {
	Create(ctx context.Context, newUser *model.User)(err error)
	FindByEmail(ctx context.Context, user *model.User)(err error)
	
	Confirm(ctx context.Context, confirm *model.Confirm)(err error)
}

type userStorage struct {
	client *pgxpool.Pool
	logger *logging.Logger
}

func (u *userStorage) FindById() {

}
func (u *userStorage) FindByEmail(ctx context.Context, user *model.User)(err error) {
	q := `
		SELECT lastname, firstname, password, position, confirm
		FROM users
		WHERE email=$1
	`

	if err = u.client.QueryRow(ctx, q, user.Email).Scan(user.LastName, user.FirstName, user.Password, user.Position, user.Confirm); err != nil {
		return err
	}

	return nil
}

func (u *userStorage) Create(ctx context.Context, user *model.User)(err error){
	q := `
		INSERT INTO users (lastname, firstname, email, password, position, confirm)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id
	`
	
	if err = u.client.QueryRow(ctx, q, user.LastName, user.FirstName, user.Email, user.Password, user.Position, user.Confirm).Scan(&user.Id); err != nil {
		if pgErr, ok := err.(*pgconn.PgError); ok {
			newErr := fmt.Errorf(fmt.Sprintf("SQL ERROR Massage: %s Detail: %s Where: %s Code: %s SQLSelect: %s", pgErr.Message, pgErr.Detail, pgErr.Where, pgErr.Code, pgErr.SQLState()))
			u.logger.Info(newErr)
			return err
		}
		return nil
	}
	return nil
}

func (u *userStorage) Confirm(ctx context.Context, confirm *model.Confirm)(err error){
	q := `
		UPDATE users
		SET confirm=$1
		WHERE id=$2
	`
	_, err = u.client.Exec(ctx, q, true, confirm.Id); if err != nil {
		return err
	}
	return nil
}

func NewUser(client *pgxpool.Pool, logger *logging.Logger) UserStorage {
	return &userStorage{
		client: client,
		logger: logger,
	}
}
