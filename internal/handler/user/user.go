package user

import (
	"github.com/Bukhashov/med_uchet/configs"
	"github.com/Bukhashov/med_uchet/pkg/logging"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type User interface {
	Singin(c *gin.Context)
	Singup(c *gin.Context)
	Delete(c *gin.Context)
	Confirm(c *gin.Context)
}

type user struct {
	client	*pgxpool.Pool
	cfg 	*configs.Config
	logger 	*logging.Logger
}


var validate *validator.Validate

func NewUserHandler(cfg *configs.Config, logger *logging.Logger, client	*pgxpool.Pool) User {
	return &user{
		cfg: cfg,
		logger: logger,
		client: client,
	}
}