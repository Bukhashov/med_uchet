package mongodb

import (
	"context"
	"fmt"
	"github.com/Bukhashov/med_uchet/configs"
	
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect(ctx context.Context, cfg *configs.StorageConfig)(client *mongo.Client, err error){
	dsn := fmt.Sprintf("mongodb+srv://%s:%s@cluster0.wchx7f7.mongodb.net/?retryWrites=true&w=majority", cfg.User, cfg.Password)

	serverAPIOptions := options.ServerAPI(options.ServerAPIVersion1)
	clientOptions := options.Client().
		ApplyURI(dsn).
		SetServerAPIOptions(serverAPIOptions)

	client, err = mongo.Connect(ctx, clientOptions); if err != nil {
		return nil, err
	}
	
	return client, nil
}