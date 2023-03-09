package user

import (
	"github.com/Bukhashov/med_uchet/configs"
	"github.com/Bukhashov/med_uchet/internal/model"
	"github.com/Bukhashov/med_uchet/pkg/logging"

	"go.mongodb.org/mongo-driver/mongo"
	"github.com/gin-gonic/gin"
)

type User interface {
	Singin(c *gin.Context)
	Singup(c *gin.Context)
	Delete(c *gin.Context)
}

type user struct {
	client	*mongo.Client
	cfg 	*configs.Config
	logger 	*logging.Logger
	model 	model.User
}

func NewUserHandler(cfg *configs.Config, logger *logging.Logger, client *mongo.Client) User {
	return &user{
		cfg: cfg,
		logger: logger,
		client: client,
	}
}