package rest

import (
	"fmt"
	"github.com/Bukhashov/med_uchet/internal/handler/user"
	"github.com/Bukhashov/med_uchet/pkg/logging"
	"github.com/Bukhashov/med_uchet/configs"
	
	
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

type rest struct {
	client	*mongo.Client
	cfg 	*configs.Config
	logger 	*logging.Logger
}

func (r *rest) Run() {
	router := gin.Default();

	userHandler := user.NewUserHandler(r.cfg, r.logger, r.client);
	
	v1 := router.Group("/api/v1"); {
		authPath := v1.Group("/auth"); {
			authPath.POST("/singup", userHandler.Singup)
			authPath.POST("/singin", userHandler.Singin)
			authPath.POST("/delete", userHandler.Delete)
		}
		
	}

	err := router.Run(fmt.Sprintf(":%s", r.cfg.Lesten.Port)); if err != nil {
        panic("[Error] failed to start Gin server due to: " + err.Error())
    }

}

func NewRest(cfg *configs.Config, logger *logging.Logger, client *mongo.Client) *rest {
	return &rest{
		cfg: cfg,
		logger: logger,
		client: client,
	}
}